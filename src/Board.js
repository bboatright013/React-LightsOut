import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /**use chanceLightStartsOn variable to compare a random float value and return boolean */
function lightsOn(val){
  return Math.random() < val;
}

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for( let i = 0; i < nrows; ++i){
      let col = [];
        for(let y = 0; y < ncols; ++y){
          col.push(lightsOn(chanceLightStartsOn));
        }
      initialBoard.push([...col]);
    }
    return initialBoard;
  }


  function hasWon() {
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const deepCopy = oldBoard.map( 
          row => [...row]
      );
      
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, deepCopy);
      flipCell(y, x - 1, deepCopy);
      flipCell(y, x + 1, deepCopy);
      flipCell(y - 1, x, deepCopy);
      flipCell(y + 1, x, deepCopy);
      // TODO: return the copy
      return deepCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if(hasWon()){
    return ( <div className="Congratulate">You Win!</div>);
  }

  


  // make table board
  function buildCol(i, width) {
    let column = [];
    for(let y = 0; y < width; ++y){
          let coord = `${i}-${y}`;
         column.push(<Cell key={coord} flipCellsAroundMe={() => flipCellsAround(coord)} isLit={board[i][y]}/>)
    }
    return [...column];
  }
  function buildRow(height){
    let rows = [];
    for(let i = 0; i < height; ++i){
    rows.push(<tr key={i}>{buildCol(i, ncols)}</tr>);
    }
    return [...rows];
  }

  return (
    <div className="GameBoard">
      <table>
        <tbody>
        {buildRow(nrows)}
        </tbody>
      </table>
    </div>
  )
}

Board.defaultProps = {
  nrows : 4,
  ncols : 4,
  chanceLightStartsOn : 0.5
}

export default Board;
