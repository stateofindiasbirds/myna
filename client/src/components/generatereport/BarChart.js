import React, { useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";

const Chart = () => {
  const allYearsCount = useSelector((state) => state?.UserReducer?.getAllYearsCount?.data) || {};
  const startDate = useSelector((state) => state?.UserReducer?.getAllYearsCount?.startdate) 
  const startYear = new Date(startDate);
  const year = startYear.getFullYear();
  // console.log("year",year);
  // console.log("allYearsCount",allYearsCount);


  const isMobile = useMediaQuery("(max-width: 768px)"); 

  const filteredData = Object.fromEntries(
    Object.entries(allYearsCount).filter(([key, value]) => value > 0)
  );

  // const filteredData = Object.fromEntries(
  //   Object.entries(allYearsCount)
  //     .filter(([year, value]) => value > 0 && parseInt(year, 10) >= startYear)
  // );

  const keys = Object.keys(filteredData);
  const values = Object.values(filteredData);

 
  

  // Threshold for displaying the chart
  const MIN_BARS = 1;
  if (keys.length < MIN_BARS) return null;
  // console.log(MIN_BARS);

  // Dynamic width based on number of bars
  const minWidth = 600;
  const barWidth = 30;
  const calculatedWidth = Math.max(minWidth, keys.length * barWidth);
  

  return (
    <div style={{ textAlign: "center", margin: "20px 0", overflowX: "auto" }}>
      {/* Heading and Info Button */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
        <h2 className="gandhi-family-bold" style={{ margin: 0, fontSize: isMobile ? "18px" : "24px" }}>SPECIES ACCUMULATION</h2>
        <button
          className="gandhi-family"
          style={{
            background: "none",
            border: "1px solid #DAB830",
            borderRadius: "50%",
            color: "#DAB830",
            width: "24px",
            height: "24px",
            textAlign: "center",
            cursor: "pointer",
          }}
          title="This graph shows the cumulative number of species reported over the years."
        >
          i
        </button>
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <BarChart
  series={[{ data: values, color: "#DAB830" }]}
  height={isMobile ? 350 : 500}
  width={calculatedWidth}
  xAxis={[
    {
      data: keys,
      scaleType: "band",
      label: "YEAR",
      labelStyle: {
        fontSize: isMobile ? 12 : 16,
        fontFamily: "Gandhi Sans Bold",
        fontWeight: 700,
      },
      tickLabelStyle: {
        fontSize: isMobile ? 12 : 16,
        fontFamily: "Gandhi Sans Regular",
        fontWeight: "lighter",
      },
    },
  ]}
  yAxis={[
    {
      label: "CUMULATIVE NUMBER OF SPECIES",
      labelStyle: {
        fontSize: isMobile ? 12 : 15,
        fontFamily: "Gandhi Sans Bold",
        fontWeight: 700,
        transform: `translate(${isMobile ? "-140px, 160px" : "-288px, 240px"}) rotate(-90deg)`,
      },
      tickLabelStyle: {
        fontSize: isMobile ? 12 : 16,
        fontFamily: "Gandhi Sans Regular",
        fontWeight: "lighter",
      },
      tickSize: 5,
      tickPadding: 10,
      tickStyle: {
        fontSize: isMobile ? 12 : 15,
        fontFamily: "Gandhi Sans Regular",
        fontWeight: "lighter",
      },
    },
  ]}
/>

      </div>
    </div>
  );
};

export default Chart;