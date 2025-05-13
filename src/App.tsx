import './App.css'
import { Chessboard } from "react-chessboard";
import { Chess } from 'chess.js'
import { useState } from "react";

function App() {
  const [game, setGame] = useState(new Chess());
  const [openrouterApiKey, setOpenrouterApiKey] = useState<string>('')
  const [moveInput, setMoveInput] = useState<string>('')
  const [llmPrompt, setLlmPrompt] = useState<string>('Lets play a chess game, i will provide you with my move e.g. e4 and you will answer with your move. Your move must only be a chess notation e.g. e5, and nothing else, not other text')


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
        <textarea placeholder='type your move here' value={llmPrompt} onChange={e => setLlmPrompt(e.target.value)}></textarea>
        <input type="text" placeholder='type your move here' value={openrouterApiKey} onChange={e => setOpenrouterApiKey(e.target.value)}/>
        <button onClick={handleClick} className='rounded-2xl bg-amber-800'> Test ask </button>
      </div>
    </div>
  )
}




export default App