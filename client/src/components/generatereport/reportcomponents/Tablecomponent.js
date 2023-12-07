import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Tablecomponent(props) {
  const { tabledata } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Common Name </TableCell>
            <TableCell align="right">Name of Species</TableCell>
            <TableCell align="right">Number of Birds</TableCell>
            <TableCell align="right">Number of Observations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tabledata.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row["COMMON NAME"]}
              </TableCell>
              <TableCell align="right">{row["SCIENTIFIC NAME"]}</TableCell>
              <TableCell align="right">{row["PROTOCOL CODE"]}</TableCell>
              <TableCell align="right">{row["DURATION MINUTES"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
