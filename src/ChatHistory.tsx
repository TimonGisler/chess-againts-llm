import { useEffect, useRef } from "react";
import { Box, Paper, Typography } from "@mui/material";
import type { Message } from "./helper/LlmApi";

export default function ChatHistory({ messages }: { messages: Message[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Chat History
      </Typography>
      <Paper
        ref={scrollRef}
        elevation={2}
        sx={{
          height: "400px",
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          // Access theme for type-safe colors
          bgcolor: (theme) => theme.palette.background.default,
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent:
                message.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <Paper
              elevation={1}
              sx={(theme) => ({
                // Use the theme callback here
                p: 1.5,
                maxWidth: "70%",
                bgcolor:
                  message.role === "user"
                    ? theme.palette.primary.main
                    : theme.palette.secondary.light,
                color:
                  message.role === "user"
                    ? theme.palette.primary.contrastText
                    : theme.palette.secondary.contrastText,
              })}
            >
              <Typography variant="body1">{message.content}</Typography>
            </Paper>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
