import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";

const UrlTable = ({ data }) => {
  return (
    <Paper sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ p: 2 }}>
        Shortened URLs
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Expiry</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{window.location.origin + "/" + item.shortcode}</TableCell>
              <TableCell>{item.original}</TableCell>
              <TableCell>{new Date(item.expiry).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default UrlTable;
