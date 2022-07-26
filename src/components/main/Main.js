import "./Main.css";
import React from "react";
import Header from "../header/Header";

function Main(props) {
  return (
    <>
      <Header {...props} />
      <main>
        <div>{props.children}</div>
      </main>
    </>
  );
}

export default Main;
