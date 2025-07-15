import React from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper
} from "@mui/material";

const Stats = () => {
  const keys = Object.keys(localStorage).filter((key) =>
    localStorage.getItem(key).startsWith("http")
  );

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          📊 URL Stats
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Shortcode</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Short URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {keys.map((key) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{localStorage.getItem(key)}</TableCell>
                <TableCell>
                  <a
                    href={`/${key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {window.location.origin}/{key}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Stats;
