import './App.css'
import { Chessboard } from "react-chessboard";
import { Chess } from 'chess.js'
import { useState } from "react";

function App() {
  const [game, setGame] = useState(new Chess());

  function handleClick() {
    console.log('TEST MAKING SOME MOVE')
    makeRandomMove();
  
  }
  function makeAMove(move: string) {
    const gameCopy = new Chess(game.fen()); 
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }
  
  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }


  return (
    <div className='flex'>
      <div id='chessboard' className='w-lg h-lg flex-1'>
        <Chessboard position={game.fen()}></Chessboard>
      </div>

      <div id='llm-chat' className='flex-1'>
        SOME TEXT
        <br />
        <button onClick={handleClick} className='rounded-2xl bg-amber-800'> Make random move </button>
      </div>
    </div>
  )
}




export default App