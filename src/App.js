import React, { Component } from "react";
import "./style/App.css";
import Calendar from "./components/Calendar";
import Nav from "./components/Nav";

class App extends Component {
  state = {
    isAuth: false,
    loggedinas: ""
  };

  render() {
    return (
      <>
        <div className="App">
          <Nav />
          <Calendar />
        </div>
      </>
    );
  }
}

export default App;
