import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { generateShortcode, validateURL } from "./helpers";
import { useLogger } from "./LoggerMiddleware";

const UrlForm = ({ onShorten }) => {
  const [urls, setUrls] = useState([{ original: "", validity: "", custom: "" }]);
  const { log } = useLogger();

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleAdd = () => {
    if (urls.length < 5)
      setUrls([...urls, { original: "", validity: "", custom: "" }]);
  };

  const handleSubmit = () => {
    const results = [];
    const mapping = JSON.parse(localStorage.getItem("urlMappings") || "{}");

    for (let u of urls) {
      if (!validateURL(u.original)) {
        alert("Invalid URL: " + u.original);
        log("Invalid URL input");
        return;
      }
      const validity = parseInt(u.validity) || 30;
      let shortcode = u.custom || generateShortcode();

      if (mapping[shortcode]) {
        alert("Shortcode collision: " + shortcode);
        log("Shortcode collision: " + shortcode);
        return;
      }

      const expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() + validity);

      mapping[shortcode] = {
        original: u.original,
        expiry: expiry.toISOString(),
        created: new Date().toISOString(),
        clicks: [],
      };

      results.push({ shortcode, ...mapping[shortcode] });
    }

    localStorage.setItem("urlMappings", JSON.stringify(mapping));
    log("Shortened URLs created");
    onShorten(results);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Shorten URLs (Max 5)
      </Typography>
      {urls.map((u, i) => (
        <Box key={i} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Original URL"
                value={u.original}
                onChange={(e) => handleChange(i, "original", e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Validity (mins)"
                value={u.validity}
                onChange={(e) => handleChange(i, "validity", e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Custom Shortcode"
                value={u.custom}
                onChange={(e) => handleChange(i, "custom", e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button onClick={handleAdd} disabled={urls.length >= 5} sx={{ mr: 2 }}>
        Add URL
      </Button>
      <Button variant="contained" onClick={handleSubmit}>
        Shorten
      </Button>
    </Paper>
  );
};

export default UrlForm;
