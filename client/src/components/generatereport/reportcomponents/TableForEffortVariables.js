import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Tooltip } from "@mui/material";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F3EDE8",
    color: theme.palette.common.black,
    fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
  "&:first-of-type": {
    paddingLeft: "60px",
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

const TableForEffortVariables = ({ effortDetails, heading }) => {
  return (
    <>
      <div
        style={{ backgroundColor: "#9A7269", color: "#fff" }}
        className="text-center text-3xl font-sans p-4 "
      >
        <span className="d-flex justify-center">
          <span className="gandhi-family">{heading}</span>
          <Tooltip
            title={
              "Except for unique lists and number of birding hours where shared lists are excluded, all other values are based on the complete set of observation data."
            }
          >
            <InformationCircleIcon className="cursor-help ms-1 text-yellow-500 h-7 w-7 my-auto" />
          </Tooltip>
        </span>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableBody>
            {effortDetails?.numberOfObservations ? (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  <p className="gandhi-family">Number of Observations</p>
                </StyledTableCell>
                <StyledTableCell>
                  <span className="gandhi-family"> {effortDetails.numberOfObservations}</span>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              ""
            )}
            {effortDetails?.numberOfList ? (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  <p className="gandhi-family">Number of Lists</p>
                </StyledTableCell>
                <StyledTableCell><span className="gandhi-family">{effortDetails.numberOfList}</span></StyledTableCell>
              </StyledTableRow>
            ) : (
              ""
            )}
            {effortDetails?.numberOfUniqueLists ? (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  <p className="gandhi-family">Number of Unique Lists</p>
                </StyledTableCell>
                <StyledTableCell>
                  <span className="gandhi-family"> {effortDetails.numberOfUniqueLists}</span>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              ""
            )}
            {effortDetails?.totalNumberOfHours ? (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  <p className="gandhi-family">Number of Hours of Birding</p>
                </StyledTableCell>
                <StyledTableCell>
                  <span className="gandhi-family">  {effortDetails.totalNumberOfHours}</span>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              ""
            )}

            {effortDetails?.totalNumberOfObservers ? (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  <p className="gandhi-family">Number of Observers</p>
                </StyledTableCell>
                <StyledTableCell>
                <span className="gandhi-family"> {effortDetails.totalNumberOfObservers}</span>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              ""
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default TableForEffortVariables;
