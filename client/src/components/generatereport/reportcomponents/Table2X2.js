import { Card } from "@mui/material";
import React from "react";

const Table2X2 = (props) => {
  const { tableData,changeLayoutForReport } = props;
  let dataForTable=[]
  if(props.title==="SoIB Conservation Priority Species")
  {
    dataForTable=[...tableData].reverse()
  }
  else
  {
    dataForTable=tableData
  }

  return (
    <Card className="mx-2">
      <div
        className="text-center p-2"
        style={{
          backgroundColor: "#DAB830",
        }}
      >
        <div className={`gandhi-family text-2xl ${changeLayoutForReport&&"pb-3"} `}>{props.title}</div>
      </div>
      <div style={{ backgroundColor: "#f3ede8", height:"100%" }} className={`p-6 ${changeLayoutForReport&&"pb-8"}`}>
        {dataForTable?.length > 0
          ? dataForTable?.map((data, i) => {
              return (
                <div key={i} className="grid grid-cols-2 ">
                  <div>
                    <span className="gandhi-family text-xl text-black">
                      {data.species}
                    </span>
                  </div>
                  <div className="ml-20">
                    <span className="gandhi-family text-xl text-black ">
                      {data.count}
                    </span>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </Card>
  );
};

export default Table2X2;

// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// // function createData(
// //   name: string,
// //   calories: number,
// //   fat: number,
// //   carbs: number,
// //   protein: number
// // ) {
// //   return { name, calories, fat, carbs, protein };
// // }

// // const rows = [
// //   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
// //   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
// //   createData("Eclair", 262, 16.0, 24, 6.0),
// //   createData("Cupcake", 305, 3.7, 67, 4.3),
// //   createData("Gingerbread", 356, 16.0, 49, 3.9),
// // ];

// const Table2X2 = (props) => {
//   return (
//     <TableContainer component={Paper}>
//       <Table aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>{props.title}</TableCell>
//             <TableCell>{props.title2}</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {props.tableSoib.map((row) => (
//             <TableRow
//               key={row.status}
//               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.status}
//               </TableCell>
//               <TableCell>{row.count}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };
// export default Table2X2;
