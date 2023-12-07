import React from "react";

function CustomStyleCards(props) {
  const { changeLayoutForReport,heading, value, avatar, color } = props;
  return (
    //     <div className="grid grid-rows-2 text-center  bg-white rounded p-4 shadow-lg m-2">
    //     <div className='font-thin'>
    //         {heading}
    //     </div>
    //     <div className="text-center">
    //         <span className="font-thin text-gray-600 leading-8 ">{value}</span>

    //     </div>

    //     {/* <div> <AssessmentIcon fontSize="large"></AssessmentIcon></div> */}
    // </div>
    <div>
      <div className="py-2 flex justify-center items-center">
        <img className="w-2/6" src={avatar}></img>
        {/* <div
          style={{ backgroundColor: color }}
          className="avatar-icon "
        >
          {changeLayoutForReport?
          <p style={{paddingBottom:'35px'}}>{avatar}</p>:
          <p>{avatar}</p>
          }
    
        </div> */}
      </div>
      <div className="py-2 flex justify-center items-center">
        <div className="text-lg text-center">
          <div className="gandhi-family text-2xl">{heading}</div>
          <div className="gandhi-family text-5xl">{value}</div>
        </div>
      </div>
    </div>
  );
}

export default CustomStyleCards;
