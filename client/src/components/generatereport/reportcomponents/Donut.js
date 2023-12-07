import React from "react";
import { useMediaQuery } from "react-responsive";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
} from "recharts";
// ChartJS.register(ArcElement, Tooltip, Legend);
function Donut(props) {
  let dataOne = [];
  let labeldata = [];
  let value = [];
  if (props.data !== undefined) {
    for (let i = 0; i <= props.data.length - 1; i++) {
      labeldata.push(props.data[i].status);
      value.push(props.data[i].count);
      dataOne.push({
        name: props.data[i].status,
        species: props.data[i].count,
      });
    }
  }
  // const screanSize = useMediaQuery({
  //   query: "(max-device-width: 714px)",
  // })
  //   ? "isSevenOneFour"
  //   : useMediaQuery({
  //       query: "(max-device-width: 504px)",
  //     })
  //   ? "isFiveZeroFor"
  //   : "IsAnySize";
  // const isDesktopOrLaptop = useMediaQuery({
  //   query: "(max-device-width: 714px)",
  // })
  const isTablet = useMediaQuery({ minWidth: 506, maxWidth: 718 });
  const isMobile = useMediaQuery({ minWidth: 350, maxWidth: 505 });
  const isSmallMobile =  useMediaQuery({ minWidth: 300, maxWidth: 349 });
  return (
    // <ResponsiveContainer width="100%" height="100%">
    //   <BarChart width={150} height={40} data={data}>
    //     <Bar dataKey="amt" fill="#8884d8" />
    //   </BarChart>
    // </ResponsiveContainer>
    <BarChart
      screanSize
      // width={
      //   screanSize == "isSevenOneFour"
      //     ? 400
      //     : screanSize == "isFiveZeroFor"
      //     ? 300
      //     : 579
      // }
       width={  isTablet ?  449 :   isMobile ? 280 : isSmallMobile ? 270 : 579}
      //  width={  579}
      // {  window.innerWidth <= '800' ?   width={379}  : width={579}}
      // height={ isTablet ? 250 : 300}
      height={isMobile ?  250 :   isSmallMobile  ? 235 : 300}
      // height={ 300}
      // height={ window.innerWidth <= '800' ?  200 : 300}
      data={dataOne}
      margin={{
        top: 5,
        right: 30,
        // left: 80,
        left: 30,
        bottom: 5,
      }}
      barSize={20}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="species" fill="#8884d8" background={{ fill: "#eee" }} />
    </BarChart>
  );
}
export default Donut;
