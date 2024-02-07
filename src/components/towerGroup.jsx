import React from "react";
import Tower from "./tower";
import Button from "./button";

class TowerGroup extends React.Component {
  constructor(props) {
    // debugger;
    super(props);
    this.state = {
      towers: {
        a: [1,2,3,4,5,6],
        b: [],
        c: []
      },
      moves: []
    };
    this.solutionMoves(this.getMaxDiscWidth(), "a", "c", "b");
  }

  styles = {
    fontWeight: "bold",
    fontSize: "20px",
    padding: "1em",
    textAlign: "center",
    backgroundColor: "#CDDC39"
  };
  
  getMaxDiscWidth() {
    // Create a single list of all disk sizes
    var sizes = [];
    Object.keys(this.state.towers).map(
      tower => (sizes = sizes.concat(this.state.towers[tower]))
    );
    return sizes.reduce(function(prev, current) {
      return prev > current ? prev : current;
    });
  }


  getSumDisksHeight() {
    var sizes = [];
    // Create a single list of all disk sizes
    Object.keys(this.state.towers).map(
      tower => (sizes = sizes.concat(this.state.towers[tower]))
    );
    return sizes.length ? sizes.length : 0;
  }


  render() {
    
   const updateArrayForTowerA = (newArray) => {
      this.setState({
        towers: {
          ...this.state.towers,  // Keep the other towers unchanged
          a: newArray
        }
      });
    };

   const updateArray=(event)=>{

     

      const newvalues = event.target.value;
      console.log(newvalues);
      
        const newArr = [];
      // Add numbers from 1 to 'n' to the array 'a'
      for (let i = 1; i <= newvalues; i++) {
        newArr.concat(newArr => [...newArr, i]);

      }
      this.updateArrayForTowerA(newArr);
      console.log(newArr);
      // this.state.towers.a.append(newArr);
  
   };
    return (
      
      <div id="game">

      <input
        type="text"
        placeholder="Enter a value"
        onChange={updateArray}
      />
     { console.log(this.state.towers.a)}
        <div id="towers" className="container" style={this.styles}>
          {Object.keys(this.state.towers).map(tower => (
            <Tower
              key={tower}
              disks={this.state.towers[tower]}
              maxDiscWidth={this.getMaxDiscWidth()}
              sumDisksHeight={this.getSumDisksHeight()}
            />
          ))}
        </div>
        {this.renderButton()}
      </div>
    );
  }

  renderButton() {
    return <Button onClick={() => this.handleClick()} />;
  }

  async handleClick() {
    var nextMove;
    while ((nextMove = this.state.moves.pop())) {
      await this.sleep(100);
      console.log(nextMove);
      var disk = this.state.towers[nextMove[0]].shift();
      console.log(disk);
      this.state.towers[nextMove[1]].unshift(disk);
      this.setState({ towers: this.state.towers });
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
  }

  solutionMoves(n, from, to, aux) {
    if (n === 1) {
      this.state.moves.unshift([from, to]);
      return;
    } else {
      this.solutionMoves(n - 1, from, aux, to);
      this.solutionMoves(1, from, to, aux);
      this.solutionMoves(n - 1, aux, to, from);
    }
  }
}

export default TowerGroup;
