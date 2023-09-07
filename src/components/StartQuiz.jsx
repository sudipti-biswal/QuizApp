import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Box,
} from "@mui/material";

const isValidEmail = (email) => email.includes("@");

const StartQuiz = ({ onStart }) => {
  const [email, setEmail] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidEmail(email)) {
      onStart(email);
    } else {
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Paper elevation={3} sx={{ padding: 5, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Welcome to the Quiz!
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                marginTop: 2,
                fontSize: "15px",
                padding: "10px 24px",
                fontWeight: 600,
              }}
            >
              Start Quiz
            </Button>
          </form>
        </Paper>
      </Box>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>Please enter a valid email address.</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StartQuiz;
