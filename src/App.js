import React from "react";
import "./style/App.css";
import Calendar from "./components/Calendar";
import Nav from "./components/Nav";
import User from "./components/User"

function App() {
    console.log(`user`, User)
    
  return (
    <div className="App">
        <Nav 
        />
      <Calendar 
      loggedUser={User}/>
    </div>
  );
}

export default App;

    