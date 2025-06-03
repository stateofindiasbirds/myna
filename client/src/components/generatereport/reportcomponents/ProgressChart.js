
import React, { useEffect, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@mui/material";

function ProgressChart(props) {
  const { getMostCommonSpeciesData, changeLayoutForReport } = props;
  const [maxPercent, setMaxPercent] = useState(0);

  useEffect(() => {
    if (getMostCommonSpeciesData) {
      let maxValue = 0;
      getMostCommonSpeciesData.forEach((species) => {
        const percentageToNumber = parseFloat(species.percentage);
        if (percentageToNumber > maxValue) {
          maxValue = percentageToNumber;
        }
      });
      maxValue = Math.ceil(maxValue / 10) * 10;
      setMaxPercent(maxValue);
    }
  }, [getMostCommonSpeciesData]);

  const ProgressBar = ({ progress, color }) => {
    return (
      <div className="flex items-center w-full gap-4">
        <div className="h-5 flex-grow bg-red-100 flex items-center">
          <div
            className="h-full transition-all duration-200"
            style={{
              width: progress === maxPercent ? "100%" : `${(parseFloat(progress) / maxPercent) * 100}%`,
              backgroundColor: color,
            }}
          ></div>
        </div>
        <span className="gandhi-family text-[.6rem] sm:text-sm lg:text-lg md:text-sm">{`${progress}%`}</span>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6">
      {getMostCommonSpeciesData?.length > 0 && (
        <div className="gandhi-family-bold text-center xsm:text-2xl sm:text-base  lg:text-4xl md:text-4xl xlg:text-4xl  font-bold my-10 flex justify-center">
          MOST COMMON SPECIES
          {!changeLayoutForReport && (
            <Tooltip 
            title="Most Common Species chart includes the top ten common species by their frequency of reporting."
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
              <InformationCircleIcon className="cursor-help ml-1 text-yellow-500 h-6 w-6 md:h-7 md:w-7" />
            </Tooltip>
          )}
        </div>
      )}

      <div className="mx-auto w-full md:w-4/5 space-y-6">
        {getMostCommonSpeciesData?.map((item, i) => (
          <div key={i} className="flex flex-row items-center justify-between gap-6">
            {/* Name Section */}
            <div className="w-1/4">
              <div>
                <span className="gandhi-family text-[.6rem] sm:text-sm lg:text-lg md:text-sm font-medium">{item?.indiaChecklistCommonName}</span>
              </div>
              <div>
                <span className="gandhi-family text-[.6rem] sm:text-sm lg:text-lg md:text-sm italic">{item?.indiaChecklistScientificName}</span>
              </div>
            </div>

            {/* Progress Bar Section */}
            <div className="gandhi-family w-3/4 ">
              <ProgressBar
                progress={item?.percentage}
                color={i % 2 !== 0 ? "#9A7269" : "#DAB830"}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressChart;
