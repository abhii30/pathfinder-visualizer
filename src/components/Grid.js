import React, { Component } from "react";
import "./Grid.css";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numRows: 15,
      numCols: 25,
      grid: [],
      isStart: null,
      isEnd: null,
      settingStart: true,
    };
  }

  handleCellClick(row, col) {
    const { settingStart } = this.state;

    const newGrid = this.state.grid.map((rowArray) =>
      rowArray.map((cell) => {
        if (cell.row === row && cell.col === col) {
          return {
            ...cell,
            [settingStart ? "isStart" : "isEnd"]: true,
          };
        }
        return {
          ...cell,
          [settingStart ? "isStart" : "isEnd"]: false,
        };
      })
    );

    this.setState({
      grid: newGrid,
      [settingStart ? "isStart" : "isEnd"]: { row, col },
    });
  }

  handleToggleSetting = () => {
    this.setState((prevState) => ({
      settingStart: !prevState.settingStart,
      isStart: null,
      isEnd: null,
    }));
  };

  componentDidMount() {
    this.initializeGrid();
  }

  initializeGrid() {
    const grid = [];
    for (let row = 0; row < this.state.numRows; row++) {
      const currentRow = [];
      for (let col = 0; col < this.state.numCols; col++) {
        currentRow.push({
          row,
          col,
          isWall: false,
        });
      }
      grid.push(currentRow);
    }
    this.setState({ grid });
  }

  render() {
    const { settingStart, isStart, isEnd } = this.state;

    return (
      <div className="grid">
        <div className="button-container">
          <button onClick={this.handleToggleSetting}>
            Set {settingStart ? "End" : "Start"}
          </button>
          {isStart && (
            <p>
              Start Position: Row {isStart.row}, Column {isStart.col}
            </p>
          )}
          {isEnd && (
            <p>
              End Position: Row {isEnd.row}, Column {isEnd.col}
            </p>
          )}
        </div>
        {this.state.grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell.isStart ? "start" : ""} ${
                  cell.isEnd ? "end" : ""
                } ${cell.isWall ? "wall" : ""}`}
                onClick={() => this.handleCellClick(cell.row, cell.col)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Grid;
