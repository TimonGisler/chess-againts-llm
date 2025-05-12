import './App.css'
import { Chessboard } from "react-chessboard";
import { Chess } from 'chess.js'
import { useState } from "react";

function App() {
  const [game, setGame] = useState(new Chess());
  const [moveInput, setMoveInput] = useState<string>('')


  function handleClick() {
    console.log('TEST MAKING SOME MOVE the move is: ', moveInput)

    makeAMove(moveInput);
  }


  function makeAMove(move: string) {
    const gameCopy = new Chess(game.fen()); 
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }
  

  return (
    <div className='flex'>
      <div id='chessboard' className='w-lg h-lg flex-1'>
        <Chessboard position={game.fen()}></Chessboard>
      </div>

      <div id='llm-chat' className='flex-1'>
        SOME TEXT
        <br />

        <input type="text" placeholder='type your move here' value={moveInput} onChange={e => setMoveInput(e.target.value)}/>
        <button onClick={handleClick} className='rounded-2xl bg-amber-800'> Make the move </button>
      </div>
    </div>
  )
}




export default App