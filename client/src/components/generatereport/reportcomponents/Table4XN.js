import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.yellow - 100,
    color: theme.palette.common.black,
    fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Table4XN = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <b>{props.title1}</b>
            </StyledTableCell>
            <StyledTableCell>
              <b>{props.title2}</b>
            </StyledTableCell>
            <StyledTableCell>
              <b>{props.title3}</b>
            </StyledTableCell>
            <StyledTableCell>
              <b>{props.title4}</b>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tableSoib.map((data, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {data.title}
              </StyledTableCell>
              <StyledTableCell>{data.p1}</StyledTableCell>
              <StyledTableCell>{data.p2}</StyledTableCell>
              <StyledTableCell>{data.p3}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default Table4XN;
