import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Addblog from "./components/add-blog.component";
import blog from "./components/blog.component";
import blogList from "./components/blog-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/blogs"} className="navbar-brand">
            Home page
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add a post
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/blogs"]} component={blogList} />
            <Route exact path="/add" component={Addblog} />
            <Route path="/blogs/:id" component={blog} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;