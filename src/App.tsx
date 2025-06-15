import "./App.css";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Box,
  Grid,
  Paper,
  Stack,
  styled,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { LlmApi } from "./helper/LlmApi";
import type { Move } from "./type/Types";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  const game = useRef(new Chess());
  const [fen, setFen] = useState<string>(game.current.fen());
  const [openrouterApiKey, setOpenrouterApiKey] = useState<string>("");
  const [moveInput, setMoveInput] = useState<string>("");
  const [llmPrompt, setLlmPrompt] = useState<string>(
    "Lets play a chess game, i will provide you with my move e.g. e4 and you will answer with your move. Your move must only be a chess notation e.g. e5, and nothing else, not other text"
  );
  const llmApi = useRef<LlmApi>(new LlmApi(openrouterApiKey));
  useEffect(() => {
    if (openrouterApiKey) {
      llmApi.current = new LlmApi(openrouterApiKey);
    }
  }, [openrouterApiKey]); // Re-run when openrouterApiKey changes

  function handleClick() {
    console.log("TEST MAKING SOME MOVE the move is: ", moveInput);

    makeAMove(moveInput);
  }

  async function askLlmForMove(moveFromUser: Move) {
    let question = "test";
    let response = await llmApi.current?.askModel(question);

    console.log("response: " + JSON.stringify(response));
  }

  function handleOnDrop(sourceSquare: string, targetSquare: string) {
    console.log(
      "handleOnDrop called with sourceSquare:",
      sourceSquare,
      "targetSquare:",
      targetSquare
    );

    let move: Move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // Always promote to queen for simplicity
    };

    makeAMove(move);
    askLlmForMove(move);

    return true;
  }

  function makeAMove(move: Move) {
    const result = game.current.move(move);
    setFen(game.current.fen());
    return result; // null if the move was illegal, the move object if the move was legal
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          padding: 2,
          bgcolor: "background.default",
        }}
      >
        <Grid container spacing={2} height={"100%"}>
          <Grid size={8}>
            <StyledPaper elevation={3}>
              <Box
                sx={{
                  height: "100%",
                  aspectRatio: "1 / 1",
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
              >
                <Chessboard
                  position={fen}
                  onPieceDrop={handleOnDrop}
                ></Chessboard>
              </Box>
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
                  label="Enter OpenRouter API Key"
                  variant="outlined"
                  value={openrouterApiKey}
                  onChange={(e) => setOpenrouterApiKey(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="SIMULATE LLM MOVE"
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
                  MAKE MOVE
                </Button>
              </Stack>
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
