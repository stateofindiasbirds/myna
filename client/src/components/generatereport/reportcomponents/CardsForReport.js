import React from 'react'

function CardsForReport(props) {
  const { heading, value } = props;
  return (
    <>
      <div className="grid grid-rows-2  bg-white rounded p-4 shadow-lg m-2">

        <div  className="font-thin" >
          {heading}
        </div>
        <div>
          <span className=" font-thin text-gray-600 leading-8 ">{value}</span>
        </div>

        {/* <div> <AssessmentIcon fontSize="large"></AssessmentIcon></div> */}
      </div></>
  )
}

export default CardsForReport