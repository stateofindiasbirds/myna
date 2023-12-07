import { Grid } from "@mui/material";
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
        if (parseFloat(percentageToNumber) > maxValue) {
          maxValue = percentageToNumber;
        }
      });
      maxValue = Math.ceil(maxValue / 10) * 10;
      setMaxPercent(maxValue);
    }
  }, [getMostCommonSpeciesData]);
  const ProgressBar = ({ progress, color }) => {
    const mainDiv = {
      display: "flex",
    };
    const containerStyles = {
      height: "20px",
      width: "80%",
      backgroundColor: "#fef1f2",
      // borderRadius: "10px",
      display: "flex",
      alignItems: "center",
    };
    const fillerStyles = {
      height: "100%",
      width: `${progress === maxPercent
        ? "100%"
        : `${(parseFloat(progress) / maxPercent) * 100}%`
        }`,
      backgroundColor: `${color}`,
      // borderRadius: "10px",
      transition: "width 0.2s ease-in-out",
    };
    return (
      <div style={mainDiv}>
        <div style={containerStyles}>
          <div style={fillerStyles}></div>
        </div>
        <span className=" gandhi-family text-2xl ml-6">{`${progress}%`}</span>
      </div>
    );
  };
  return (
    <>
      <div className=" p-4 m-2 ">
        {getMostCommonSpeciesData && getMostCommonSpeciesData.length > 0 && (

          <div className="text-center  text-6xl gandhi-family-bold my-20 flex justify-center">
            MOST COMMON SPECIES
            {props.changeLayoutForReport ? (
              ""
            ) : (
              <Tooltip
                title={
                  "Most Common Species chart includes the top ten common species by their frequency of reporting."
                }
              >
                <InformationCircleIcon className="cursor-help ms-1 text-yellow-500 h-7 w-7" />
              </Tooltip>
            )}
          </div>
        )}
        <div className="mx-24 ml-60">
          {getMostCommonSpeciesData?.length > 0
            ? getMostCommonSpeciesData.map((item, i) => (
              <Grid container spacing={2} key={i}>
                <Grid
                  sm={3}
                  md={3}
                  lg={3}
                  item
                  className="flex justify-start"
                >
                  <div className={` ${changeLayoutForReport ? "my-18 mb-16" : "my-4"}`}>
                    <div>
                      <span className="gandhi-family text-[20px]">
                        <span className={`${item?.indiaChecklistCommonName
                          } ${changeLayoutForReport ? " text-4xl" : "text-[20px]"}`}>
                          {item?.indiaChecklistCommonName}
                        </span>
                      </span>
                    </div>

                    <div>
                      <span className="gandhi-family text-[18px] ">
                        <i className={`${item?.indiaChecklistScientificName
                          } ${changeLayoutForReport ? " text-4xl" : "text-[18px]"}`}>
                          {item?.indiaChecklistScientificName}
                        </i>
                      </span>
                    </div>
                  </div>
                </Grid>
                <Grid sm={9} md={9} lg={9} item>
                  <div className="my-8 ">
                    <ProgressBar
                      progress={item?.percentage}
                      color={i % 2 !== 0 ? "#9A7269" : "#DAB830"}
                    />
                  </div>
                </Grid>
              </Grid>
            ))
            : ""}
        </div>
      </div>
    </>
  );
}

export default ProgressChart;
