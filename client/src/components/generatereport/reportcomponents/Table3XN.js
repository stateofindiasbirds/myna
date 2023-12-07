import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Tooltip from "@mui/material/Tooltip";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F3EDE8",
    color: theme.palette.common.black,
    fontSize: 20,
    paddingLeft: "40px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    paddingLeft: "40px",
  },
  // "&:first-of-type": {
  //   paddingLeft: "30px",
  // },
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

const Table3XN = (props) => {
  const { heading, tableData, title1, title2, title3, includesScientificName } =
    props;
  return (
    tableData?.length > 0 && (
      <>
        <div
          style={{ backgroundColor: "#9A7269", color: "#fff" }}
          className="text-center text-3xl gandhi-family p-4 "
        >
          {heading}
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <b className="gandhi-family-bold text-2xl">{title1}</b>
                </StyledTableCell>
                <StyledTableCell>
                  <b className="gandhi-family-bold text-2xl">{title2}</b>
                </StyledTableCell>
                <StyledTableCell>
                  <span className="d-flex ">
                    <b className="gandhi-family-bold text-2xl">{title3}</b>
                    {(title3 === "Frequency of Reporting" ||
                      title3 === "1% of Biogeographic Population") && (
                        <Tooltip
                          title={
                            title3 === "Frequency of Reporting"
                              ? "How often a species is reported measured by the percentage of complete checklists reporting this species"
                              : "Total population of a specific waterbird species found within a particular biogeographic region (here South Asia) is its biogeographic population."
                          }
                        >
                          <InformationCircleIcon className="cursor-help ms-1 text-yellow-500 h-7 w-7" />
                        </Tooltip>
                      )}
                  </span>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.length > 0
                ? includesScientificName
                  ? tableData.map((item, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row">
                        <p className="gandhi-family">{item.indiaChecklistCommonName}</p>
                        <i>{item.indiaChecklistScientificName}</i>
                      </StyledTableCell>
                      <StyledTableCell><span className="gandhi-family">
                        {item.highestCongregation +
                          " (" +
                          item.maxObservationCount +
                          "%)"}
                          </span>
                      </StyledTableCell>
                      <StyledTableCell>
                        <span className="gandhi-family">
                        {item.onePercentBiographicPopulation}
                        </span>
                      </StyledTableCell>
                      {/* <StyledTableCell>{data.p3}</StyledTableCell> */}
                    </StyledTableRow>
                  ))
                  : tableData.map((item, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row">
                        <p className="gandhi-family">{item.indiaChecklistCommonName}</p>
                        <i>{item.indiaChecklistScientificName}</i>
                      </StyledTableCell>
                      <StyledTableCell><span className="gandhi-family">{item.region}</span></StyledTableCell>
                      <StyledTableCell>
                        <span className="gandhi-family">

                          {parseFloat(item.percentage) < 1
                            ? "<1%"
                            : item.percentage}
                        </span>
                      </StyledTableCell>
                      {/* <StyledTableCell>{data.p3}</StyledTableCell> */}
                    </StyledTableRow>
                  ))
                : ""}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  );
};
export default Table3XN;
