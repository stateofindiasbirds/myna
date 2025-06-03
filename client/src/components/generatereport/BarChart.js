import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useSelector } from "react-redux";
import { useMediaQuery, Tooltip } from "@mui/material";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const Chart = ({mapZoomOut}) => {
  const allYearsCount = useSelector((state) => state?.UserReducer?.getAllYearsCount?.data) || {};
  const startDate = useSelector((state) => state?.UserReducer?.getAllYearsCount?.startdate) 
  const startYear = new Date(startDate);
  const year = startYear.getFullYear();
  const [barWidth, setBarWidth] = useState('30')
  // console.log("year",year);
  // console.log("allYearsCount",allYearsCount);
  
  console.log("mapZoomOut",mapZoomOut);

  const isMobile = useMediaQuery("(min-width: 768px)"); 
  const smallScreen = useMediaQuery("(max-width: 500px)");
  const filteredData = Object.fromEntries(
    Object.entries(allYearsCount).filter(([key, value]) => value > 0)
  );

  // const filteredData = Object.fromEntries(
  //   Object.entries(allYearsCount)
  //     .filter(([year, value]) => value > 0 && parseInt(year, 10) >= startYear)
  // );

  const keys = Object.keys(filteredData);
  const values = Object.values(filteredData);

  useEffect(() => {
    // if (keys.length >= MIN_BARS) {
      if (mapZoomOut && smallScreen) {
        setBarWidth(30);
      } else if (smallScreen) {
        setBarWidth(10);
      }
    // }
  }, [smallScreen, mapZoomOut, keys.length]);
  
                

  // Threshold for displaying the chart
  const MIN_BARS = 1;
  if (keys.length < MIN_BARS) return null;
  // console.log(MIN_BARS);

  // Dynamic width based on number of bars
  const minWidth = 400;
  // let barWidth = 30;
  // console.log("smallScreen",smallScreen)
  //  if(smallScreen){
  //   barWidth = 10;
  //  }else if(mapZoomOut){
  //   barWidth = 30;
  //  }

 


  //  console.log("barWidth",barWidth)
  const calculatedWidth = Math.max(minWidth, keys.length * barWidth);
  

  return (
    <div style={{ textAlign: "center", margin: "20px 0", overflowX: "auto" }}>
      {/* Heading and Info Button */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
        <h2 className="text-center xsm:text-2xl sm:text-lg md:text-6xl lg:text-6xl gandhi-family-bold my-10 p-4 flex justify-center" style={{ margin: 0, fontSize: isMobile ? "18px" : "24px" }}>SPECIES ACCUMULATION</h2>
        {/* <button
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
        </button> */}
        <Tooltip
          title="This graph shows the cumulative number of species reported over the years."
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
        transform: `translate(${isMobile ? "-216px, 160px" : "-288px, 240px"}) rotate(-90deg)`,
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