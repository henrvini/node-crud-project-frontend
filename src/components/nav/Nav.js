import React from "react";
import "./Nav.css";

import { Link } from "react-router-dom";

const nav = () => {
  return (
    <aside className="aside">
      <nav className="nav">
        <ul>
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/users">
              Users
            </Link>
          </li>
          <li>
            <Link className="link" to="/courses">
              Courses
            </Link>
          </li>
          <li>
            <Link className="link" to="/allCourseModules">
              Modules
            </Link>
          </li>
          <li>
            <Link className="link" to="/allContents">
              Contents
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default nav;
