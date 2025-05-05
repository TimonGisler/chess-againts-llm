import './App.css'
import { Chessboard } from "react-chessboard";


function App() {

  return (
      <div style={ {height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center"} }>
        
        <h1 className='text-red-300'>TEST</h1>
        <Chessboard id="BasicBoard" />
      </div>
  )
}

export default App
