import "./App.css";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Paper, styled } from "@mui/material";

function App() {
  const [game, setGame] = useState(new Chess());
  const [openrouterApiKey, setOpenrouterApiKey] = useState<string>("");
  const [moveInput, setMoveInput] = useState<string>("");
  const [llmPrompt, setLlmPrompt] = useState<string>(
    "Lets play a chess game, i will provide you with my move e.g. e4 and you will answer with your move. Your move must only be a chess notation e.g. e5, and nothing else, not other text"
  );

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  function handleClick() {
    console.log("TEST MAKING SOME MOVE the move is: ", moveInput);

    makeAMove(moveInput);
  }

  function makeAMove(move: string) {
    const gameCopy = new Chess(game.fen());
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        <Item>
          <div id="chessboard" className="w-lg h-lg flex-1">
            <Chessboard position={game.fen()}></Chessboard>
          </div>
        </Item>
      </Grid>
      <Grid size={4}>
        <Item>
          {" "}
          <div id="llm-chat" className="flex-1">
            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              defaultValue="type your llm prompt here"
              value={llmPrompt}
              onChange={(e) => setLlmPrompt(e.target.value)}
            />
            <TextField
              label="Your move"
              variant="outlined"
              value={moveInput}
              onChange={(e) => setMoveInput(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              fullWidth
            >
              Test ask
            </Button>
          </div>
        </Item>
      </Grid>
    </Grid>
  );
}

export default App;
