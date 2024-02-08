import React, { Component } from "react";
import TowerGroup from "./components/TowerGroup.jsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div className="t">Tower of Hanoi</div>
         
          <TowerGroup />
        </header>
      </div>
    );
  }
}

export default App;
