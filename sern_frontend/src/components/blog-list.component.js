import React, { Component } from "react";
import blogDataService from "../services/blog.service";
import { Link } from "react-router-dom";

export default class blogList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveblogs = this.retrieveblogs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveblog = this.setActiveblog.bind(this);
    this.removeAllblogs = this.removeAllblogs.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      blogs: [],
      currentblog: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveblogs();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveblogs() {
    blogDataService.getAll()
      .then(response => {
        this.setState({
          blogs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveblogs();
    this.setState({
      currentblog: null,
      currentIndex: -1
    });
  }

  setActiveblog(blog, index) {
    this.setState({
      currentblog: blog,
      currentIndex: index
    });
  }

  removeAllblogs() {
    blogDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentblog: null,
      currentIndex: -1
    });

    blogDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          blogs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, blogs, currentblog, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>List of posts</h4>

          <ul className="list-group">
            {blogs &&
              blogs.map((currentblog, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveblog(currentblog, index)}
                  key={index}
                >
                  {currentblog.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllblogs}
          >
            Remove all the posts
          </button>
        </div>
        <div className="col-md-6">
          {currentblog ? (
            <div>
              <h4>Blog post</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentblog.title}
              </div>
              <div>
                <label>
                  <strong>Content:</strong>
                </label>{" "}
                {currentblog.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentblog.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/blogs/" + currentblog.id}
                className="badge badge-warning"
              >
                Edit a post
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Choose a post</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}