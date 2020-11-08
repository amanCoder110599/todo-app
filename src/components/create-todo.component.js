import React, { Component } from "react";
import axios from "axios";

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
    };
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  myChangeHandler(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const todo = {
      title: this.state.title,
      description: this.state.description,
    };

    console.log(todo);

    axios.post("/todos/add", todo).then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create New Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              required
              className="form-control"
              name="title"
              autoComplete="off"
              onChange={this.myChangeHandler}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <textarea
              required
              className="form-control"
              name="description"
              autoComplete="off"
              onChange={this.myChangeHandler}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Todo"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
