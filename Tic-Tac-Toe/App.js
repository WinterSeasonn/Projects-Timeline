import './App.css';
import { useState } from 'react'


const game_setting_config = {
  size: 6
}

function Square({value, onSquareClick}){
  return(
    <button 
      className='square'
      onClick={onSquareClick}
    
    >{value}</button>
  )
}

function Board(){
  //GameBoard itself
  const[squares, setSquares] = useState(Array(9).fill(null));

  //Player 
  const[playerturns, setPlayerturn] = useState(true)

  function onSquareClick(index){
    if(squares[index] || winning_detection(squares, index)){
      return;
    }
    const updateSquare = squares.slice();
    if(playerturns){
      updateSquare[index] = "X";
    }else{
      updateSquare[index] = "O";
    }
    setPlayerturn(!playerturns);
    setSquares(updateSquare)
  }
  
  //Handles the display
  let displayGame = []
  for(let row = 0; row < game_setting_config.size; row++){
    let emptyArray = []
    for(let col = 0; col < game_setting_config.size; col++){
      const index = row * game_setting_config.size + col;
      emptyArray.push(
        <Square
          key={index} 
          value={squares[index]}
          onSquareClick={() => onSquareClick(index)}
        />
      )
    }
    displayGame.push(
      <div className='board-row' key={row}>
        {emptyArray}
      </div>
    )
  }

  const winner = winning_detection(squares);
  let status;
  if(winner){
    status = "Winner is " + winner;
  } else{
    status = "Next player: " + (playerturns ? "X" : "O")
  }


  return(
    <div className='game'>

      <div className = "status">
        {status}
      </div>


      {displayGame}
    </div>
  )
}



function winning_detection(squares){
  let winning_combination = generatewincomb(squares)
  console.log(winning_combination)
  for(let combination of winning_combination){
    const firstsquare = combination[0]; 
    if (firstsquare !== null && combination.every(cell => cell === firstsquare)) {
      return firstsquare
    }
  }
  return null
}

function generatewincomb(squares){
  //Pre-generate all winning combination
  const winning_combination = []

  let row = Array.from({ length: game_setting_config.size }, () => Array(game_setting_config.size).fill(null));
  let col = Array.from({ length: game_setting_config.size }, () => Array(game_setting_config.size).fill(null));
  let diagonal = Array.from({ length: 2}, () => Array(game_setting_config.size).fill(null));

  let counter = 0
  let left_pointer = 0
  let right_pointer = game_setting_config.size - 1

  //Challenge doing it in one linear scan N
  for(let i = 1; i < (game_setting_config.size * game_setting_config.size) + 1; i++){

    if(i % game_setting_config.size === 0 && i !== 0){

      
      // Diagonal
      diagonal[0][Math.floor((i-1) / game_setting_config.size)] = squares[left_pointer]
      diagonal[1][Math.floor((i-1) / game_setting_config.size)] = squares[right_pointer]

      left_pointer += (game_setting_config.size + 1)
      right_pointer += (game_setting_config.size -1)

    }

    // Vertical
    row[Math.floor((i-1) / game_setting_config.size)][counter] = squares[(i-1)]
    col[counter][Math.floor((i-1) / game_setting_config.size)] = squares[(i-1)]
    counter++;
    if(counter === game_setting_config.size){
      counter = 0
    }
  }
  // For rows
  for (let r = 0; r < row.length; r++) {
    winning_combination.push(row[r]);
  }

  // For columns
  for (let c = 0; c < col.length; c++) {
    winning_combination.push(col[c]);
  }

  // For diagonals
  for (let d = 0; d < diagonal.length; d++) {
    winning_combination.push(diagonal[d]);
  }
  return winning_combination
}


export default function Main(){
  return(
    <div className='game-board'>
      <h1>Tic-Tac-Toe</h1>
      <Board />
    </div>
  )
 
}