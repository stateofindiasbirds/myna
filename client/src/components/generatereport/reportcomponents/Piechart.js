import React from "react";
import { PieChart } from "react-minimal-pie-chart";

function Piechart(props) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 text-xs text-center my-2">
        {props.data.map((data, i) => (
          <div key={i}>
            <div key={data.color} className={data.font}>
              {data.title}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3">
        {" "}
        <PieChart segmentsShift={0.3} animate={true} data={props.data} />
      </div>
    </>
  );
}

export default Piechart;
