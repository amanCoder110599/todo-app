import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Todo = (props) => (
  <tr>
    <td>{props.todo.title}</td>
    <td style={{ "white-space": "pre" }}>{props.todo.description}</td>
    <td>
      <Link to={"/edit/" + props.todo._id}>edit</Link> |{" "}
      <a
        href="/"
        onClick={() => {
          props.deleteTodo(props.todo._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class TodosList extends Component {
  constructor(props) {
    super(props);

    this.deleteTodo = this.deleteTodo.bind(this);

    this.state = { todos: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/todos/")
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteTodo(id) {
    axios.delete("http://localhost:5000/todos/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      todos: this.state.todos.filter((el) => el._id !== id),
    });
  }

  todoList() {
    return this.state.todos.map((currenttodo) => {
      return (
        <Todo
          todo={currenttodo}
          deleteTodo={this.deleteTodo}
          key={currenttodo._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Todos</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}
