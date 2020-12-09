import React, { Component } from "react";
import blogDataService from "../services/blog.service";

export default class blog extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getblog = this.getblog.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateblog = this.updateblog.bind(this);
    this.deleteblog = this.deleteblog.bind(this);

    this.state = {
      currentblog: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getblog(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentblog: {
          ...prevState.currentblog,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentblog: {
        ...prevState.currentblog,
        description: description
      }
    }));
  }

  getblog(id) {
    blogDataService.get(id)
      .then(response => {
        this.setState({
          currentblog: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentblog.id,
      title: this.state.currentblog.title,
      description: this.state.currentblog.description,
      published: status
    };

    blogDataService.update(this.state.currentblog.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentblog: {
            ...prevState.currentblog,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateblog() {
    blogDataService.update(
      this.state.currentblog.id,
      this.state.currentblog
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The blog post was updated successfully."
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteblog() {    
    blogDataService.delete(this.state.currentblog.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/blogs')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentblog } = this.state;

    return (
      <div>
        {currentblog ? (
          <div className="edit-form">
            <h4>Blog post</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentblog.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Content</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentblog.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentblog.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentblog.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                Unpublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteblog}
            >
              Delete post
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateblog}
            >
              Update post
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Choose a post</p>
          </div>
        )}
      </div>
    );
  }
}