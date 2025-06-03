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
        <div className={`gandhi-family xsm:text-lg sm:text-lg md:text-lg lg:text-2xl ${changeLayoutForReport&&"pb-3"} `}>{props.title}</div>
      </div>
      <div style={{ backgroundColor: "#f3ede8", height:"100%" }} className={`p-6 ${changeLayoutForReport&&"pb-8"}`}>
        {dataForTable?.length > 0
          ? dataForTable?.map((data, i) => {
              return (
                <div key={i} className="grid grid-cols-2 ">
                  <div>
                    <span className="gandhi-family xsm:text-base sm:text-base md:text-base lg:text-xl text-black">
                      {data.species}
                    </span>
                  </div>
                  <div className=" xsm:ml-[138px] sm:ml-[265px] ml-24 md:ml-20 lg:ml-20 ">
                    <span className="gandhi-family xsm:text-base sm:text-base md:text-base lg:text-xl text-black ">
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


