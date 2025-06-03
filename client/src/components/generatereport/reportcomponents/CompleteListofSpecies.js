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
    backgroundColor: "#F3EDE8",
    color: theme.palette.common.black,
    fontSize: 20, // Default for large screens
    paddingLeft: "40px",
    [theme.breakpoints.down("lg")]: {
      fontSize: 18, // Adjust font size for large screens
      paddingLeft: "30px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: 16, // Adjust font size for medium screens
      paddingLeft: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 10, // Adjust font size for small screens
      paddingLeft: "0px",
      // width: ".5rem",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18, // Default for large screens
    paddingLeft: "40px",
    [theme.breakpoints.down("lg")]: {
      fontSize: 16,
      paddingLeft: "30px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
      paddingLeft: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: ".6rem",
      paddingLeft: "0px",
      // width: ".5rem",
    },
    [theme.breakpoints.down("xsm")]: {
      fontSize: ".6rem",
      paddingLeft: "2px",
      // width: ".5rem",
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#C8D8DC",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#F3EDE8",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CompleteListOfSpecies = ({ completeListOfSpecies }) => {
  return (
    completeListOfSpecies.length > 0 &&
    <>
      <div
        style={{ backgroundColor: "#9A7269", color: "#fff" }}
        className="text-center sm:text-xl md:text-3xl lg:text-3xl gandhi-family  p-4 "
      >
        COMPLETE LIST OF SPECIES
      </div>
      <TableContainer component={Paper}>
        <Table  
        sx={{
          "& th, & td": {
            padding: { xs: "8px", sm: "8px" },
            fontSize: { xs: "8px", sm: "8px" },
            // wordBreak: "break-word",
          },
        }}
        aria-label="responsive table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <b className="gandhi-family-bold">Species</b>
              </StyledTableCell>
              <StyledTableCell>
                <b className="gandhi-family-bold">SoIB Priority</b>
              </StyledTableCell>
              <StyledTableCell>
                <b className="gandhi-family-bold">IUCN</b>
              </StyledTableCell>
              <StyledTableCell>
                <b className="gandhi-family-bold">Endemic Region</b>
              </StyledTableCell>
              <StyledTableCell>
                <b className="gandhi-family-bold">WLPA</b>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completeListOfSpecies.map((data, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  <span className="gandhi-family">{data.indiaChecklistCommonName}</span>
                  <br />
                  <i>{data.indiaChecklistScientificName}</i>
                </StyledTableCell>
                <StyledTableCell><span className="gandhi-family">{data.soibConcernStatus}</span></StyledTableCell>
                <StyledTableCell> <span className="gandhi-family">{data.iucnCategory}</span> </StyledTableCell>
                <StyledTableCell> <span className="gandhi-family">{data?.endemicRegion}</span> </StyledTableCell>
                <StyledTableCell> <span className="gandhi-family">{data.wpaSchedule}</span> </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default CompleteListOfSpecies;
