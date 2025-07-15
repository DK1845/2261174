import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper
} from "@mui/material";
import { useLogger } from "./LoggerMiddleware";

const Home = () => {
  const [url, setUrl] = useState("");
  const [shortcode, setShortcode] = useState(null);
  const { log } = useLogger();

  const handleShorten = () => {
    if (!url.trim()) return;

    const code = Math.random().toString(36).substring(2, 8);
    localStorage.setItem(code, url);
    setShortcode(code);
    log(`Shortened ${url} to ${code}`);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          🔗 URL Shortener
        </Typography>

        <TextField
          fullWidth
          label="Enter Long URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button variant="contained" onClick={handleShorten}>
          Shorten
        </Button>

        {shortcode && (
          <Typography sx={{ mt: 2 }}>
            ✅ Short URL:{" "}
            <a
              href={`/${shortcode}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {window.location.origin}/{shortcode}
            </a>
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Home;
