import React, { Component } from "react";
import Tower from "./components/Tower.jsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div className="t">Tower of Hanoi</div>
         
          <Tower/>
        </header>
      </div>
    );
  }
}

export default App;
