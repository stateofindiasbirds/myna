import React from "react";
function WideCardForReport(props) {
  const { heading, icon, description, dataValue,url } = props;
  return (
    <div className="mb-10 baseClass">
      <div className="relative h-52  flex items-center  mb-0 ml-6">  
        <div className="detailed-species-round-div">
          <img className="bg-transparent" alt="img" src={icon} />
        </div>
        <div className="detailed-species-ractangular-div">
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
        <div className="detailed-species-discriptions"><span className="startingText">{description} <a className="no-underline" target="_blank" href={url.url}>{url.label}</a></span></div>
      </div>
    </div>
  );
}

export default WideCardForReport;
