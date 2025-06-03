import React from "react";

function CustomStyleCards(props) {
  const { changeLayoutForReport,heading, value, avatar, color } = props;
  return (
    <div>
      <div className="py-2 flex justify-center items-center">
        <img className="w-2/6" src={avatar}></img>
      </div>
      <div className="py-2 flex justify-center items-center">
        <div className="text-lg text-center">
          <div className="gandhi-family xsm:text-sm sm:text-sm lg:text-2xl xsm:h-5 sm:h-5 lg:h-24 xlg:h-24">{heading}</div>
          <div className="gandhi-family sm:text-sm lg:text-5xl">{value}</div>
        </div>
      </div>
    </div>
  );
}

export default CustomStyleCards;
