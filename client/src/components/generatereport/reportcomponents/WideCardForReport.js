import React from "react";
function WideCardForReport(props) {
  const { heading, icon, description, dataValue,url } = props;
  return (
    <div className="mb-10 baseClass">
      <div className="relative xsm:h-32 sm:h-36 md:h-44 lg:h-52  flex items-center mb-0">  
        <div className="detailed-species-round-div sm:  md:">
          <img className="bg-transparent custom-width" alt="img" src={icon} />
        </div>
        <div className="detailed-species-ractangular-div min-w-[65vw] md:min-w-[17vw] lg:min-w-[17vw] xlg:min-w-[21vw]">
          <div className="inner-ractangular-div">
            <center>
              <div>
                <span className="gandhi-family bold text-2xl">{heading}</span>
              </div>
              <div>
                <span className="gandhi-family text-3xl">
                  {dataValue ? dataValue : 0}
                </span>
              </div>
            </center>
          </div>
        </div>
      </div>
      <div className="mt-0">
        <div className="detailed-species-discriptions "><span className="text-sm lg:text-lg md:text-base">{description} <a className="no-underline" target="_blank" href={url.url}>{url.label}</a></span></div>
      </div>
    </div>
  );
}

export default WideCardForReport;
