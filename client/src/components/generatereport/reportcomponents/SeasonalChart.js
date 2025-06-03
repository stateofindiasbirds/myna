import { useState, useEffect, useRef } from "react";
import { Grid, useMediaQuery } from "@mui/material";

const SeasonalChart = (props) => {
  const { getSeasonalChartData, changeLayoutForReport } = props;
  const [activePopover, setActivePopover] = useState(null);
  const [popoverContent, setPopoverContent] = useState(null);
  const [cursorX, setCursorX] = useState(0);
  const popoverRef = useRef(null);
  const [style, setStyle] = useState({});

  const isMobile = useMediaQuery("(max-width:600px)");
  const isTab = useMediaQuery("(max-width:900px)");
  const isPC = useMediaQuery("(max-width:1230px)");

  useEffect(() => {
    const popover = popoverRef.current;
    if (popover && cursorX !== null) {
      const viewportWidth = window.innerWidth;
      const popoverWidth = popover.offsetWidth;

      const offset = 10;
      let newStyle = {
        top: "40px", 
      };

      if (cursorX < viewportWidth / 2) {
        newStyle.left = `${offset}px`;
      } else {
        newStyle.right = `${offset}px`;
      }

      setStyle(newStyle);
    }
  }, [popoverContent, cursorX]);

  const handleMouseEnter = (id, content, event) => {
    setCursorX(event.clientX);
    setActivePopover(id);
    setPopoverContent(content);
  };

  const handleMouseLeave = () => {
    setActivePopover(null);
    setPopoverContent(null);
  };

  function Popover({ content }) {
    const { count, month, percentage } = content;
    return (
      <div
        ref={popoverRef}
        className="flex-col items-center absolute mt-2 p-4 z-50 bg-white border shadow-lg rounded max-w-sm w-[50vw]"
        style={style}
      >
        <h6>Month: {month}</h6>
        <h6>Count: {count}</h6>
        <h6>Percentage: {percentage}</h6>
      </div>
    );
  }

  return (
    <div className="xsm:px-1 sm:px-5 md:px-7 lg:px-7 xlg:px-11 xxlg:px-48 flex justify-center">
      <div className="">
        {getSeasonalChartData?.length > 0
          ? getSeasonalChartData.map((item, i) => (
              <Grid
                direction={{
                  xsm: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                  xl: "row",
                }}
                className="flex flex-col xsm:flex-col sm:flex-col md:flex-row lg:flex-row justify-between xsm:items-start"
                container
                key={i}
              >
                <Grid
                  item
                  sm={3}
                  md={3}
                  lg={3}
                  className="flex justify-start items-center"
                >
                  <div className="mt-4">
                    <div>
                      <span
                        className={`gandhi-family text-[14px] sm:text-[15px] md:text-[16px] lg:text-[15px] xlg:text-[20px] 
                          ${changeLayoutForReport ? "text-[14px] sm:text-[15px] md:text-[16px]" : ""}`}
                      >
                        {item?.indiaChecklistCommonName}
                      </span>
                    </div>

                    <div
                      className={`${
                        changeLayoutForReport
                          ? "mt-3"
                          : "mt-2 sm:mt-3 md:mt-4"
                      }`}
                    >
                      <span className="font-sans text-[14px] sm:text-[14px] md:text-[16px] lg:text-[18px]">
                        <i
                          className={`${
                            changeLayoutForReport
                              ? "text-[14px] sm:text-[15px] md:text-[16px]"
                              : ""
                          }`}
                        >
                          {item?.indiaChecklistScientificName}
                        </i>
                      </span>
                    </div>
                  </div>
                </Grid>

                <Grid item sm={9} md={9} lg={9}>
                  <div className="flex justify-end mt-6 sm:gap-0 md:gap-0 lg:gap-[.54rem]">
                    {item?.monthlyData?.length > 0
                      ? item?.monthlyData.map((month, index) => (
                          <div
                            key={index}
                            className={`xsm:px-[3px] sm:px-[5px] lg:px-3 md:px-3 ${
                              changeLayoutForReport &&
                              "lg:p-4 md:p-4 px-3"
                            }`}
                          >
                            <center
                              className={`bg-blue-200 gandhi-family  ${
                                changeLayoutForReport &&
                                "pb-3  text-2xl"
                              }`}
                            >
                              {month?.month}
                            </center>

                            <div
                              key={item.id}
                              className={`relative container-styles  ${
                                changeLayoutForReport &&
                                " pdf-container-styles"
                              }`}
                              onMouseEnter={(e) =>
                                handleMouseEnter(
                                  i + index.toString(),
                                  month,
                                  e
                                )
                              }
                              onMouseLeave={handleMouseLeave}
                            >
                              <div
                                className={`filler-styles  ${
                                  changeLayoutForReport &&
                                  " pdf-filler-styles"
                                }`}
                                style={{
                                  height: `${month?.percentage}`,
                                }}
                              ></div>
                              {activePopover ===
                                i + index.toString() && (
                                <Popover content={popoverContent} />
                              )}
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                </Grid>
              </Grid>
            ))
          : ""}
      </div>
    </div>
  );
};

export default SeasonalChart;
