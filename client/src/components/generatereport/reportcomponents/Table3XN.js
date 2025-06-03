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

const handleClickRedirect = (value) => {
  console.log('value handle redirect', value);
  window.open(`https://ebird.org/checklist/${value}`, '_blank');
}

const Table3XN = (props) => {
  const { heading, tableData, title1, title2, title3,title4, includesScientificName } =
    props;
  return (
    tableData?.length > 0 && (
      <div >
        <div
          style={{ backgroundColor: "#9A7269", color: "#fff" }}
          className="text-center sm:text-xl md:text-3xl lg:text-3xl gandhi-family p-4 "
        >
          {heading}
        </div>
        <TableContainer component={Paper} >
          <Table sx={{
            // minWidth: 700,
            "& th, & td": {
              padding: { xs: "4px", sm: "8px" },
              fontSize: { xs: "4px", sm: "8px" },
              // wordBreak: "break-word",
            },
            // "& th": {
            //   whiteSpace: "nowrap", // Prevents table headers from wrapping unnecessarily
            // },
          }}
          aria-label="responsive table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <b className="gandhi-family-bold text-[.6rem] sm:text-sm lg:text-lg md:text-sm">{title1}</b>
                </StyledTableCell>
                <StyledTableCell>
                  <b className="gandhi-family-bold text-[.6rem] sm:text-sm lg:text-lg md:text-sm">{title2}</b>
                </StyledTableCell>
                <StyledTableCell>
                  <span className="d-flex align-middle ">
                    <b className="gandhi-family-bold text-[.6rem] sm:text-sm lg:text-lg md:text-sm">{title3}</b>
                    {(title3 === "Frequency of Reporting" ||
                      title3 === "1% of Biogeographic Population") && (
                        <Tooltip
                          title={
                            title3 === "Frequency of Reporting"
                              ? "How often a species is reported measured by the percentage of complete checklists reporting this species"
                              : "Total population of a specific waterbird species found within a particular biogeographic region (here South Asia) is its biogeographic population."
                          }
                          placement="top"
                          arrow
                          enterTouchDelay={0} // show immediately on tap
                          leaveTouchDelay={4000} // stays visible for 4s
                          PopperProps={{
                            modifiers: [
                              {
                                name: 'preventOverflow',
                                options: {
                                  boundary: 'viewport',
                                },
                              },
                            ],
                          }}
                        >
                          <InformationCircleIcon className="cursor-help ms-1 text-yellow-500 h-7 w-7" />
                        </Tooltip>
                      )}
                  </span>
                </StyledTableCell>

                <StyledTableCell>
                  <span className="d-flex align-middle ">
                    <b className="gandhi-family-bold text-[.6rem] sm:text-sm lg:text-lg md:text-sm">{title4}</b>
                    {(title4 === "Year of Latest Report" ||
                      title4 === "Year of Report") && (
                        <Tooltip
                          title={
                            title4 === "Year of Latest Report"
                              ? "Most recent year when the species was reported"
                              : "Most recent year when the high count was reported"
                          }
                          placement="top"
                          arrow
                          enterTouchDelay={0} // show immediately on tap
                          leaveTouchDelay={4000} // stays visible for 4s
                          PopperProps={{
                            modifiers: [
                              {
                                name: 'preventOverflow',
                                options: {
                                  boundary: 'viewport',
                                },
                              },
                            ],
                          }}
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
                        <p className="mb-[.5rem] gandhi-family text-[.6rem] sm:text-sm lg:text-lg md:text-sm">{item.indiaChecklistCommonName}</p>
                        <span className="italic gandhi-family text-[.6rem] sm:text-sm lg:text-lg md:text-sm">
                          {item.indiaChecklistScientificName}
                        </span>
                      </StyledTableCell>
                      <StyledTableCell><span className="gandhi-family text-sm lg:text-lg md:text-sm">
                        {item.highestCongregation +
                          " (" +
                          item.maxObservationCount +
                          "%)"}
                          </span>
                      </StyledTableCell>
                      <StyledTableCell>
                        <span className="gandhi-family text-[.6rem] sm:text-sm lg:text-lg md:text-sm">
                        {item.onePercentBiographicPopulation}
                        </span>
                      </StyledTableCell>
                      <StyledTableCell>
                        <span className="mb-[.5rem] gandhi-family text-[.6rem] sm:text-sm lg:text-lg md:text-sm" style={{color:"blue",cursor: "pointer"}} onClick={()=>handleClickRedirect(item.samplingEventIdentifier)}>
                        {item.observationDate ? new Date(
                          item.observationDate.split('-')[2],
                          item.observationDate.split('-')[1] - 1,
                          item.observationDate.split('-')[0]
                          ).getFullYear() : ""}
                        </span>
                      </StyledTableCell>
                      {/* <StyledTableCell>{data.p3}</StyledTableCell> */}
                    </StyledTableRow>
                  ))
                  : tableData.map((item, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row">
                        <p className="mb-[.5rem] gandhi-family text-[.6rem] sm:text-sm lg:text-lg md:text-sm">{item.indiaChecklistCommonName}</p>
                        <i className="gandhi-family text-[.6rem] sm:text-sm lg:text-lg md:text-sm" >{item.indiaChecklistScientificName}</i>
                      </StyledTableCell>
                      <StyledTableCell><span className="gandhi-family text-[.6rem] sm:text-sm lg:text-lg md:text-sm">{item.region}</span></StyledTableCell>
                      <StyledTableCell>
                        <span className="gandhi-family text-[.6rem] sm:text-sm lg:text-lg md:text-sm">

                          {parseFloat(item.percentage) < 1
                            ? "<1%"
                            : item.percentage}
                        </span>
                      </StyledTableCell>
                      <StyledTableCell>
                        <span className="mb-[.5rem] gandhi-family text-[.6rem] sm:text-sm lg:text-lg md:text-sm" style={{color:"blue",cursor: "pointer"}} onClick={()=>handleClickRedirect(item.samplingEventIdentifier)}>
                          {item.observationDate ? new Date(
                          item.observationDate.split('-')[2],
                          item.observationDate.split('-')[1] - 1,
                          item.observationDate.split('-')[0]
                          ).getFullYear() : ""}
                        </span>
    </StyledTableCell>

                      {/* <StyledTableCell>{data.p3}</StyledTableCell> */}
                    </StyledTableRow>
                  ))
                : ""}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  );
};
export default Table3XN;