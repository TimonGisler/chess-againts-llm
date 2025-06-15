import "./App.css";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Grid, Paper, Stack, styled } from "@mui/material";

function App() {
  const [game, setGame] = useState(new Chess());
  const [openrouterApiKey, setOpenrouterApiKey] = useState<string>("");
  const [moveInput, setMoveInput] = useState<string>("");
  const [llmPrompt, setLlmPrompt] = useState<string>(
    "Lets play a chess game, i will provide you with my move e.g. e4 and you will answer with your move. Your move must only be a chess notation e.g. e5, and nothing else, not other text"
  );

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
  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  return (
    <Box sx={{ height: "100vh", width: "100vw", padding: 2 }}>
      <Grid container spacing={2} height={"100%"}>
        <Grid size={8}>
          <StyledPaper elevation={3}>
            <Chessboard position={game.fen()}></Chessboard>
          </StyledPaper>
        </Grid>
        <Grid size={4}>
          <StyledPaper elevation={3}>
            <Stack spacing={2} sx={{ width: "100%" }}>
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
            </Stack>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
