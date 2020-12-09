import React, { Component } from "react";
import blogDataService from "../services/blog.service";

export default class Addblog extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveblog = this.saveblog.bind(this);
    this.newblog = this.newblog.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      published: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveblog() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    blogDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newblog() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Post submitted.</h4>
            <button className="btn btn-success" onClick={this.newblog}>
              Add a new post
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Content</label>
              <textarea
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description" align="top" style={{ width: 300, height: 200 }}
              />
            </div>

            <button onClick={this.saveblog} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}