import "./Header.css";
import React from "react";

function Header(props) {
  return (
    <>
      <div className="header">
        <header>
          <h1>
            {props.icon} {props.title}
          </h1>
        </header>
      </div>
    </>
  );
}

export default Header;
