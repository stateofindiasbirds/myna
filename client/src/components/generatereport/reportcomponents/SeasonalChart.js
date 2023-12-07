import { useState } from "react";
import { Grid } from "@mui/material";

const SeasonalChart = (props) => {
  const { getSeasonalChartData, changeLayoutForReport } = props;
  const [activePopover, setActivePopover] = useState(null);

  const handleMouseEnter = (id) => {
    setActivePopover(id);
  };

  const handleMouseLeave = () => {
    setActivePopover(null);
  };
  function Popover({ content }) {
    const { count, month, percentage } = content;
    return (
      <div className="absolute top-10 left-0 mt-2 p-4 z-50 bg-white border shadow-lg rounded">
        <h6>Month:{month}</h6>
        <h6>Count:{count}</h6>
        <h6>Percentage:{percentage}</h6>
      </div>
    );
  }
  return (
    <div className={changeLayoutForReport ? "" : ""} style={{ paddingLeft: `${changeLayoutForReport ? "200" : "180"}px`, paddingRight: `${changeLayoutForReport ? "200" : "180"}px` }}>
      <div className="">
        {getSeasonalChartData?.length > 0
          ? getSeasonalChartData.map((item, i) => {
            return (
              <Grid container key={i} className="">
                <Grid
                  item
                  sm={3}
                  md={3}
                  lg={3}
                  className="flex justify-start items-center"
                >
                  <div className="mt-4">
                    <div>
                      <span className={`gandhi-family text-[20px] ${changeLayoutForReport ? "text-[36px]" : "text-[20px]"}`}>
                        {item?.indiaChecklistCommonName}
                      </span>
                    </div>
                    <div className={` ${changeLayoutForReport ? "mt-3" : ""}`}>
                      <span className="font-sans text-[18px] ">
                        <i className={`${item?.indiaChecklistScientificName
                          } ${changeLayoutForReport ? " text-[36px]" : ""}`}>
                          {item?.indiaChecklistScientificName}
                        </i>
                      </span>
                    </div>
                  </div>
                </Grid>
                <Grid item sm={9} md={9} lg={9}>
                  <div className="flex justify-end mt-6">
                    {item?.monthlyData?.length > 0
                      ? item?.monthlyData.map((month, index) => (

                        <div key={index} className={`px-3 ${changeLayoutForReport && "p-4 px-3"
                          }`}>
                          <center
                            className={`bg-blue-200 gandhi-family  ${changeLayoutForReport && "pb-3  text-2xl"
                              }`}
                          >
                            {month?.month}
                          </center>

                          <div
                            key={item.id}
                            className={`relative container-styles  ${changeLayoutForReport && " pdf-container-styles"
                              }`}
                            onMouseEnter={() => handleMouseEnter(i + index.toString())}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div
                              className={`filler-styles  ${changeLayoutForReport && " pdf-filler-styles"
                                }`}
                              style={{ height: `${month?.percentage}` }}
                            ></div>
                            {activePopover === i + index.toString() && <Popover content={month} />}
                          </div>
                        </div>
                      ))
                      : ""}
                  </div>
                </Grid>
              </Grid>
            );
          })
          : ""}
      </div>
    </div>
  );
};
export default SeasonalChart;
