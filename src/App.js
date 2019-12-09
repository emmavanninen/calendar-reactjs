import React from "react";
import ReactDOM from "react-dom";
import "./style/App.css";
import Calendar from "./components/Calendar";

function App() {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
}

export default App;


ReactDOM.render(<App />, document.getElementById("root"));