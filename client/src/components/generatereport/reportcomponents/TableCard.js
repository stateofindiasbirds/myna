import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { TableHead } from "@mui/material";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import suryaFont from "../../../fwdsoibfonts/ChaparralPro-Bold.otf";

function TableCard(props) {
  const { tabledata } = props;
  const StyledTableCell = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const themeOne = createTheme({
    typography: {
      fontFamily: [suryaFont, "sans"],
    },
  });
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#F3EDE8",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <ThemeProvider theme={themeOne}>
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 200 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow
              style={{ backgroundColor: "#9a7269", fontFamily: suryaFont }}
            >
              <TableCell
                style={{
                  fontWeight: "bold",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                <span className="gandhi-family">Top Hotspots</span>
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                <span className="gandhi-family"> No of Species</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {tabledata && tabledata.length > 0 ? (
    tabledata.map((row, i) => (
      <StyledTableRow key={i} hover>
        <StyledTableCell style={{ width: 100, fontSize: "20px" }} scope="row">
          <span className="gandhi-family">{row?.locality}</span>
        </StyledTableCell>
        <StyledTableCell style={{ width: 100, fontSize: "20px" }}>
          <span className="gandhi-family">{row?.count}</span>
        </StyledTableCell>
      </StyledTableRow>
    ))
  ) : (
    <StyledTableRow>
      <StyledTableCell  colSpan={2} style={{ textAlign: "center", fontSize: "20px" }}>
        <span className="gandhi-family">        
          No Data Available
        </span>
      </StyledTableCell>
    </StyledTableRow>
  )}
</TableBody>
          <TableFooter>
            <TableRow>
              {/* <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={tabledata.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                /> */}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export default TableCard;
