import React, { Component } from "react";
import axios from "axios";

export default class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      active: true,
    };
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.onToggleHandler = this.onToggleHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get("/todos/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  myChangeHandler(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  onToggleHandler(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: !this.state[name],
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const todo = {
      title: this.state.title,
      description: this.state.description,
      active: this.state.active,
    };

    axios
      .post("/todos/update/" + this.props.match.params.id, todo)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit Todo Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              required
              className="form-control"
              name="title"
              autoComplete="off"
              value={this.state.title}
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
              value={this.state.description}
              onChange={this.myChangeHandler}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Todo"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
