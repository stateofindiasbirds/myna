import React, { Fragment, useEffect, useState } from "react";
import { useRef } from "react";
import Table2X2 from "./reportcomponents/Table2X2";
import Table3XN from "./reportcomponents/Table3XN";
import ProgressChart from "./reportcomponents/ProgressChart";
import WideCardForReport from "./reportcomponents/WideCardForReport";
import CustomStyleCards from "./reportcomponents/CustomStyleCards";
import { Card, Grid, Tooltip } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import Group86 from "../../assets/images/Group 86.png";
import Group_26 from "../../assets/images/Group 26.png";
import Layer_1 from "../../assets/images/Layer_1.png";
import Layer_2 from "../../assets/images/Layer_2.png";
import India from "../../assets/images/India.png";
import whiteLogo from "../../assets/images/whiteLogo.png";
import VU_Logo from "../../assets/images/VU.png";
import CR_Logo from "../../assets/images/CR.png";
import EN_Logo from "../../assets/images/EN.png";
import NT_Logo from "../../assets/images/NT.png";
import TableCard from "./reportcomponents/TableCard";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import dayjs from "dayjs";
import Ziptogeojson from "./Ziptogeojson";
import { MapContainer, Marker, Tooltip as Tip, useMap } from "react-leaflet";
import { handleDownloadPdf } from "./helpers/generatePdf";
import "leaflet/dist/leaflet.css";
import Logo from "../../assets/images/logo.png";

import CompleteListOfSpecies from "./reportcomponents/CompleteListofSpecies";
import { RESET_ALL_DATA } from "../../redux/action";
import { connect } from "react-redux";
import SeasonalChart from "./reportcomponents/SeasonalChart";
import "./style.css";
import L from "leaflet";
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ReoprtSkeleton from "./ReoprtSkeleton";
import TableForEffortVariables from "./reportcomponents/TableForEffortVariables";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { calculateCentroid, calculateZoom, createTrackMiddlewareForPdfGenerate } from "./helpers/helperFunctions";

//@neerajminhas c1 by default react-leaflet doesnot provide so deleting default icon and changing it with new
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  className: "custom-icon",
});
//c1 end

function Report(props) {
  const {
    dataForMap,
    selectedState,
    selectedCounty,
    uploadedgeojson,
    getCountByScientificName,
    getDataForIucnRedListTable,
    getDataForEndemicSpeciesTable,
    getMostCommonSpeciesData,
    getSeasonalChartData,
    getHotspotAreas,
    completeListOfSpecies,
    getDataForWaterbirdCongregation,
    getEffortDetails,
    RESET_ALL_DATA,
    reportName,
    setUploadedgeojson,
    setIsZoomRequired,
    setShowreport,
    editedData,
    setEditedData,
    setSelectedLocality,
    setSelectedCounty,
    setSelectedState,
    startDate,
    endDate,
    area,
    completeListOfSpeciesFetchSuccessFully,
    mediumForReport,
  } = props;
  const isTablet = useMediaQuery({ minWidth: 106, maxWidth: 624 });
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [pdfDownloadStatus, setPdfDownloadStatus] = useState("Download Pdf");
  const [changeLayoutForReport, setChangeLayoutForReport] = useState(false);
  const downloadPdfProgress = {
    "Download Pdf": "w-[0%]",
    "Creating Layout..": "w-[20%]",
    "Gathering Data...": "w-[30%]",
    "Creating Tables...": "w-[50%]",
    "Writing Images...": "w-[60%]",
    "Almost Done...": "w-[70%]",
    "Download will begin shortly...": "w-[90%]",
    Completed: "w[100%]",
  };
  const today = new Date();
  const formattedDate =
    today.getDate() +
    " " +
    monthNames[today.getMonth()] +
    " " +
    today.getFullYear();
  const PrintScreen = useRef();
  const otherScreen = useRef();
  const mostCommonSpeciesDiv = useRef();
  const seasonalChartDiv = useRef();
  const header = useRef();
  const footer = useRef();

  const closeHandler = () => {
    if (!selectedState && editedData) {
      console.log(editedData, "closebutton")
      const latlngs = [editedData.map((point) => [point.lng, point.lat])];
      const featureCollection = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: [...latlngs],
            },
          },
        ],
      };
      setUploadedgeojson(featureCollection);
    }
    setIsZoomRequired(true);
    RESET_ALL_DATA();
    setSelectedCounty("");
    setSelectedLocality("");
    setSelectedState("");
    setEditedData(null)
    setShowreport(false);
  };

  // const LocationMarker = ({ data,editedData }) => {
  //   console.log(editedData,"hhgggh")
  //   const map = useMap();
  //   map.invalidateSize();
  //   if (data && data.features && data.features.length > 0) {
  //     const arrayOfCords = data.features[0].geometry.coordinates[0];
  //     const centroid = calculateCentroid(arrayOfCords);
  //     const zoom = (calculateZoom(arrayOfCords)-1);
  //     map.flyTo(centroid, zoom);
  //   }

  const LocationMarker = ({ data, editedData, selectedState }) => {
    const map = useMap();
    map.invalidateSize();

    if (!selectedState && editedData) {
      // Zoom to edited data
      const latlngs = editedData.map((point) => [point.lng, point.lat]);
      const centroid = calculateCentroid(latlngs);
      const zoom = calculateZoom(latlngs) - 1;
      map.flyTo(centroid, zoom);
    } else if (data && data.features && data.features.length > 0) {
      // Zoom to polygon data
      const arrayOfCords = data.features[0].geometry.coordinates[0];
      const centroid = calculateCentroid(arrayOfCords);
      const zoom = calculateZoom(arrayOfCords) - 1;
      map.flyTo(centroid, zoom);
    }



    // this code defines zoom level and zoom point based on these conditions
    // 1. finding distance between most distance longitude and latitude and finding  average point X between them (X for zoom point)
    // 2. Finding out largest value by comparing most distant placed latitute and longitude
    // 3. Zoom point is defined in this way
    //    (a). zoom of 14 if only one point is there
    //    (b). zoom 10 if less than 0.5 degrees
    //    (c). zoom 9 if between 0.5 and 1
    //    (d). zoom 8 if between 1 and 2.5
    //    (e). zoom 7 if greater than 2.5 - Neeraj-dev
    if (getHotspotAreas.length > 1) {
      const sortedlatitude = [...getHotspotAreas].sort((a, b) => {
        if (a.latitude > b.latitude) {
          return 1;
        } else {
          return -1;
        }
      });
      const sortedlongitude = [...getHotspotAreas].sort((a, b) => {
        if (a.longitude > b.longitude) {
          return 1;
        } else {
          return -1;
        }
      });
      const latitudeAverage =
        (sortedlatitude[0].latitude +
          sortedlatitude[sortedlatitude.length - 1].latitude) /
        2;
      const longitudeAverage =
        (sortedlongitude[0].longitude +
          sortedlongitude[sortedlongitude.length - 1].longitude) /
        2;
      const distanceBetweenLatitude =
        sortedlatitude[0].latitude -
        sortedlatitude[sortedlatitude.length - 1].latitude;
      const distanceBetweenLongitude =
        sortedlongitude[0].longitude -
        sortedlongitude[sortedlongitude.length - 1].longitude;
      let largestDistance = 0;

      if (
        Math.abs(distanceBetweenLatitude) > Math.abs(distanceBetweenLongitude)
      ) {
        largestDistance = Math.abs(distanceBetweenLatitude);
      } else {
        largestDistance = Math.abs(distanceBetweenLongitude);
      }
      if (largestDistance <= 0.5) {
        map.flyTo([latitudeAverage, longitudeAverage], 10);
      }
      if (largestDistance > 0.5 && largestDistance <= 1) {
        map.flyTo([latitudeAverage, longitudeAverage], 9);
      }
      if (largestDistance > 1 && largestDistance <= 3) {
        map.flyTo([latitudeAverage, longitudeAverage], 8);
      }
      if (largestDistance > 3 && largestDistance <= 10) {
        map.flyTo([latitudeAverage, longitudeAverage], 7);
      }
      if (largestDistance > 10) {
        map.flyTo([latitudeAverage, longitudeAverage], 4);
      }
      if (getHotspotAreas.length === 1) {
        const { latitude, longitude } = getHotspotAreas[0];
        map.flyTo([latitude, longitude], 14);
      }
    }
    if (getHotspotAreas.length === 1) {
      const { latitude, longitude } = getHotspotAreas[0];
      map.flyTo([latitude, longitude], 14);
    }
    const sortedlatitude = [...getHotspotAreas].sort((a, b) => {
      if (a.latitude > b.latitude) {
        return 1;
      } else {
        return -1;
      }
    });

    return sortedlatitude.map((item, i) => {
      return (
        <>
          <Marker key={i} position={[item.latitude, item.longitude]}>
            <Tip>{item?.locality}</Tip>
          </Marker>
        </>
      );
    });
  };
  useEffect(() => {
    if (changeLayoutForReport) {
      createTrackMiddlewareForPdfGenerate(mediumForReport)
      handleDownloadPdf(
        PrintScreen,
        otherScreen,
        mostCommonSpeciesDiv,
        seasonalChartDiv,
        header,
        footer,
        getDataForIucnRedListTable,
        getDataForEndemicSpeciesTable,
        getDataForWaterbirdCongregation,
        completeListOfSpecies,
        selectedState,
        selectedCounty,
        getHotspotAreas,
        setPdfDownloadStatus,
        setChangeLayoutForReport,
        reportName,
        formattedDate,
        Group86,
        Group_26,
        Layer_1,
        Layer_2,
        whiteLogo,
        India,
        NT_Logo,
        EN_Logo,
        CR_Logo,
        VU_Logo,
        getCountByScientificName?.indiaEndemic,
        getCountByScientificName?.scheduleI,
        getCountByScientificName?.soibHighPriority,
        getCountByScientificName?.iucnRedList,
        getCountByScientificName?.migrate,
        getCountByScientificName?.total,
        getCountByScientificName?.cmsAppendixSpecies,
        getCountByScientificName?.citesAppendixSpecies,
        getCountByScientificName?.soibConservationConcernSpecies,
        getCountByScientificName?.iucnRedListCategoriesCount
          ? getCountByScientificName?.iucnRedListCategoriesCount[
          "Near Threatened"
          ]
          : 0,
        getCountByScientificName?.iucnRedListCategoriesCount
          ? getCountByScientificName?.iucnRedListCategoriesCount["Vulnerable"]
          : 0,
        getCountByScientificName?.iucnRedListCategoriesCount
          ? getCountByScientificName?.iucnRedListCategoriesCount["Endangered"]
          : 0,
        getCountByScientificName?.iucnRedListCategoriesCount
          ? getCountByScientificName?.iucnRedListCategoriesCount[
          "Critically Endangered"
          ]
          : 0,
        getEffortDetails,
        startDate,
        endDate,
        getSeasonalChartData
      );
    }
  }, [changeLayoutForReport]);

  return (
    <Fragment>
      <div style={{ backgroundColor: "#ffffff00" }}>
        <div ref={header}>
          <Card
            className={changeLayoutForReport && "p-8"}
            style={{ borderRadius: "0 0 0 0", backgroundColor: "#DAB830" }}
          >
            <div
              className={`${changeLayoutForReport && "p-8"
                }flex justify-center content-center items-center w-100`}
            >
              <Grid container spacing={3}>
                <Grid item xs className="flex justify-center">
                  <div>
                    <img
                      src={Logo}
                      alt="logo"
                      className="mb-0"
                      style={{ height: "120px", width: "180px", color: "#fff" }}
                    />
                    <div className="mb-4">
                      <h1 className="myna-text">MYNA</h1>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={8} className="flex justify-center ">
                  <div className={` my-auto`}>
                    <div className="main-heading">
                      {reportName ? "Birds Of " + reportName : ""}
                    </div>
                    {selectedState !== "" && (
                      <div className="flex justify-between">
                        <center className="text-2xl font-sans text-white font-bold">
                          {/* State: Himachal Pradesh */}
                          {selectedState !== "" && `State: ${selectedState}`}
                        </center>
                        <center className="ml-20 text-2xl font-sans text-white font-bold">
                          {selectedCounty !== "" &&
                            `District: ${selectedCounty}`}
                        </center>
                      </div>
                    )}
                  </div>
                </Grid>
                <Grid item xs>
                  <div className={`flex justify-end py-3 px-8 `}>
                    <div
                      className={
                        isTablet ? "hidden" : " d-flex justify-content-end"
                      }
                    >
                      <div className="me-4">
                        <Tooltip
                          title="Download"
                          className={changeLayoutForReport && "invisible"}
                        >
                          <FileDownloadOutlinedIcon
                            onClick={() => setChangeLayoutForReport(true)}
                            style={{ cursor: 'pointer' }}
                          />
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip
                          title="Close"
                          className={changeLayoutForReport && "invisible"}
                        >
                          <CloseIcon
                            onClick={closeHandler}
                            style={{ cursor: 'pointer' }}
                          />
                        </Tooltip>
                      </div>

                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="flex justify-end">
              {startDate !== "" && (
                <div className="flex justify-end mt-1 ">
                  <center className="text-xl gandhi-family text-gray-100 ">
                    {/* State: Himachal Pradesh */}
                    {startDate !== "" &&
                      `Dates : ${dayjs(startDate).format("DD/MM/YYYY") + " "}–${" " + dayjs(endDate).format("DD/MM/YYYY")
                      }`}
                  </center>
                </div>
              )}
            </div>
          </Card>
        </div>
        {getCountByScientificName?.total !== undefined && completeListOfSpeciesFetchSuccessFully ? (
          <div>
            <div
              ref={PrintScreen}
              style={{ backgroundColor: "#ffffff00" }}
              className="mt-10"
            >
              <div className="p-1 lg:px-8 mt-12 text-xs lg:text-base ">
                <div className="text-center text-6xl gandhi-family-bold mb-14 mt-4">
                  SPECIES DETAILS
                </div>
                {getCountByScientificName?.total < 1 && (
                  <div className="text-center text-2xl font-sans font-bold my-4 text-red-500">
                    (NO DATA FOUND FOR SELECTED AREA)
                  </div>
                )}
                <div className="grid grid-cols-1 my-3 md:grid-cols-3 px-16">
                  <WideCardForReport
                    url={{ label: null, url: null }}
                    description="Total number of species reported from this region"
                    dataValue={getCountByScientificName?.total}
                    icon={Group86}
                    heading={"Total"}
                  />
                  <WideCardForReport
                    url={{ label: null, url: null }}
                    description="Total number of migratory bird species reported from  this region"
                    dataValue={getCountByScientificName?.migrate}
                    icon={Layer_1}
                    heading={"Migratory "}
                  />
                  <WideCardForReport
                    url={{ label: "IUCN", url: "https://www.iucn.org/" }}
                    description="Number of bird species that are listed as globally threatened as per"
                    dataValue={getCountByScientificName?.iucnRedList}
                    icon={Group_26}
                    heading={"Threatened"}
                  />
                  <WideCardForReport
                    url={{
                      label: "State of India's Birds",
                      url: "https://www.stateofindiasbirds.in",
                    }}
                    description="Number of bird species that are listed as High Conservation Priority in"
                    dataValue={getCountByScientificName?.soibHighPriority}
                    icon={whiteLogo}
                    heading={"High Priority"}
                  />
                  <WideCardForReport
                    url={{
                      label: "Wild Life (Protection) Amendment Act (WLPA)",
                      url: "https://prsindia.org/files/bills_acts/acts_parliament/2022/The%20Wild%20Life%20(Protection)%20Amendment%20Act,%202022.pdf",
                    }}
                    description="Number of bird species that are listed in Schedule 1 of the"
                    dataValue={getCountByScientificName?.scheduleI}
                    icon={Layer_2}
                    heading={"Schedule I"}
                  />
                  <WideCardForReport
                    url={{ label: null, url: null }}
                    description="Number of bird species that are endemic to India"
                    dataValue={getCountByScientificName?.indiaEndemic}
                    icon={India}
                    heading={"Endemic"}
                  />
                </div>
                <div className=" grid grid-cols-2 lg:grid-cols-3 mt-20 px-24 ">
                  <Table2X2
                    changeLayoutForReport={changeLayoutForReport}
                    tableData={
                      getCountByScientificName?.soibConservationConcernSpecies
                    }
                    title={"SoIB Conservation Priority Species"}
                    title2={"Species"}
                  />
                  <Table2X2
                    changeLayoutForReport={changeLayoutForReport}
                    tableData={getCountByScientificName?.citesAppendixSpecies}
                    title={"CITES Appendix Species"}
                    title2={"Species"}
                  />
                  <Table2X2
                    changeLayoutForReport={changeLayoutForReport}
                    tableData={getCountByScientificName?.cmsAppendixSpecies}
                    title={"CMS Appendix Species"}
                    title2={"Species"}
                  />
                </div>
                <div className="text-center text-6xl gandhi-family-bold my-20">
                  IUCN RED LIST
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 my-8 px-24">
                  <CustomStyleCards
                    changeLayoutForReport={changeLayoutForReport}
                    color={"#cc3333"}
                    avatar={CR_Logo}
                    heading={"Critically Endangered"}
                    value={
                      getCountByScientificName?.iucnRedListCategoriesCount
                        ? getCountByScientificName?.iucnRedListCategoriesCount[
                        "Critically Endangered"
                        ]
                        : 0
                    }
                  />
                  <CustomStyleCards
                    changeLayoutForReport={changeLayoutForReport}
                    color={"#cc6633"}
                    avatar={EN_Logo}
                    heading={"Endangered"}
                    value={
                      getCountByScientificName?.iucnRedListCategoriesCount
                        ? getCountByScientificName?.iucnRedListCategoriesCount[
                        "Endangered"
                        ]
                        : 0
                    }
                  />
                  <CustomStyleCards
                    changeLayoutForReport={changeLayoutForReport}
                    color={"#CC9900"}
                    avatar={VU_Logo}
                    heading={"Vulnerable"}
                    value={
                      getCountByScientificName?.iucnRedListCategoriesCount
                        ? getCountByScientificName?.iucnRedListCategoriesCount[
                        "Vulnerable"
                        ]
                        : 0
                    }
                  />
                  <CustomStyleCards
                    changeLayoutForReport={changeLayoutForReport}
                    color={"#006666"}
                    avatar={NT_Logo}
                    heading={"Near Threatened"}
                    value={
                      getCountByScientificName?.iucnRedListCategoriesCount
                        ? getCountByScientificName?.iucnRedListCategoriesCount[
                        "Near Threatened"
                        ]
                        : 0
                    }
                  />
                </div>
              </div>
            </div>

            <div className="p-1 lg:px-8 mt-8 text-xs lg:text-base ">
              <div className={` mt-20 `}>
                <div className="">
                  <Card className="mx-64">
                    <Table3XN
                      heading="IUCN REDLIST SPECIES"
                      tableData={getDataForIucnRedListTable}
                      title1={"Species"}
                      title2={"IUCN Status"}
                      // title3={"SoIB Status"}
                      title3={"Frequency of Reporting"}
                      includesScientificName={false}
                    />
                  </Card>
                  <Card className="mx-64 my-8">
                    <Table3XN
                      heading="ENDEMIC SPECIES"
                      tableData={getDataForEndemicSpeciesTable}
                      title1={"Species"}
                      title2={"Endemic Region"}
                      title3={"Frequency of Reporting"}
                      includesScientificName={false}
                    />
                  </Card>
                  <Card className="mx-64">
                    <Table3XN
                      heading="WATERBIRD CONGREGATIONS"
                      tableData={getDataForWaterbirdCongregation}
                      title1={"Species"}
                      title2={"Highest Count"}
                      title3={"1% of Biogeographic Population"}
                      includesScientificName={true}
                    />
                  </Card>
                </div>
              </div>
            </div>
            <div className="p-1  lg:px-8 mt-12 text-xs lg:text-base">
              <div className="" ref={mostCommonSpeciesDiv}>
                <ProgressChart
                  getMostCommonSpeciesData={getMostCommonSpeciesData}
                  changeLayoutForReport={changeLayoutForReport}
                />
              </div>
            </div>
            <div ref={seasonalChartDiv} className="p-1 lg:px-8 mt-12 text-xs lg:text-base">
              {getSeasonalChartData && getSeasonalChartData.length > 0 && (
                <div className="text-center text-6xl gandhi-family-bold my-10 p-4 flex justify-center">
                  SEASONAL CHART
                  {!changeLayoutForReport && (
                    <Tooltip
                      title={
                        "Seasonal Chart includes the top ten migratory species and their frequency of reporting in each month of the year"
                      }
                    >
                      <InformationCircleIcon className="cursor-help ms-1 text-yellow-500 h-7 w-7" />
                    </Tooltip>
                  )}
                </div>
              )}
              {getSeasonalChartData && getSeasonalChartData.length > 0 && (
                <div className="">
                  <SeasonalChart
                    changeLayoutForReport={changeLayoutForReport}
                    getSeasonalChartData={getSeasonalChartData}
                  />
                </div>
              )}
            </div>

            <div>
              <div className="p-2 grid grid-cols-1 md:grid-cols-3 mt-24 mx-24">
                <div className="grid col-span-2" ref={otherScreen}>
                  <MapContainer
                    style={{ height: "70vh" }}
                    center={[32.21, 76.32]}
                    zoom={12}
                    scrollWheelZoom={false}
                  // whenCreated={(mapInstance) => {
                  //   mapInstance.flyTo([
                  //     getHotspotAreas[0]?.latitude,
                  //     getHotspotAreas[0]?.longitude,
                  //     10,
                  //   ]);
                  // }}
                  >
                    {console.log(process.env.REACT_APP_API_KEY)}
                    <ReactLeafletGoogleLayer
                      googleMapsLoaderConf={{ region: "IN" }}
                      apiKey={process.env.REACT_APP_API_KEY}
        

                    />
                    {dataForMap === null && editedData === null ? (
                      ""
                    ) : !changeLayoutForReport && (
                      <Ziptogeojson editedData={editedData} data={dataForMap} onReport={true} />
                    )}
                    {/* <HotSpotMarker allHotSpotAreas={allHotSpotAreas} /> */}
                    <LocationMarker editedData={editedData} data={dataForMap} />
                  </MapContainer >
                  {area != null ? (
                    <span className="bg-[#F3EDE8] text-gray-800 p-2 gandhi-family rounded-b-xl">
                      {" "}
                      {"Area: "}{parseFloat(area).toFixed(2)} sq. km
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="ml-2">
                  {" "}
                  <TableCard tabledata={getHotspotAreas} />
                </div>
              </div>
            </div>
            <div className="p-1 lg:px-8 mt-8 text-xs lg:text-base ">
              <Card className="mx-20">
                <div>
                  <CompleteListOfSpecies
                    completeListOfSpecies={completeListOfSpecies}
                  />
                </div>
              </Card>
            </div>
              <div className="p-1 lg:px-8 mt-8 text-xs lg:text-base ">
                <Card className="mx-96">
                  <div>
                    <TableForEffortVariables
                      heading={"DATA CONTRIBUTIONS"}
                      effortDetails={getEffortDetails}
                    />
                  </div>
                </Card>
              </div>
          </div>
        ) : (
          <ReoprtSkeleton />
        )}
      </div>

      <div className={"grid grid-cols-2  py-3 px-8"}>
        <div className="text-left"> </div>

        <div className="px-4 text-right gandhi-family">
          <button
            disabled={getCountByScientificName?.total ? false : true}
            onClick={() => setChangeLayoutForReport(true)}
            className=" text-right mt-4  px-4 py-2 bg-white-50 outline-none border border-indigo-100 rounded text-indigo-500 font-medium hover:bg-[#DAB830] hover:text-white transition-colors duration-200"
          >
            {pdfDownloadStatus}
          </button>
        </div>
      </div>

      <div
        className={`top-0 transition-all ease-linear duration-100  bg-[#2e7d32] h-[10px] ${downloadPdfProgress[pdfDownloadStatus]}`}
      ></div>

      <div
        ref={footer}
        className={`grid grid-cols-3 text-center text-gray-100 p-3  font-sans bg-[#9A7269] ${changeLayoutForReport && "pb-5"
          }`}
      >
        <div className="col-span-2 text-right me-4 gandhi-family">
          Generated from myna.stateofindiasbirds.in v1.0 on {formattedDate}
        </div>
        <div
          className={`${changeLayoutForReport && "invisible"
            } font-medium gandhi-family text-right`}
        >
          Developed by{" "}
          <a
            style={{ textDecoration: "none" }}
            className="text-[#dbb931]"
            target="_blank"
            href="https://www.alphanzo.io"
          >
            Alphanzo Technology Pvt Ltd
          </a>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    getCountByScientificName: state?.UserReducer?.getCountByScientificName,
    getDataForIucnRedListTable: state?.UserReducer?.getDataForIucnRedListTable,
    getMostCommonSpeciesData: state?.UserReducer?.getMostCommonSpeciesData,
    getSeasonalChartData: state?.UserReducer?.getSeasonalChartData,
    getHotspotAreas: state?.UserReducer?.getHotspotAreas,
    completeListOfSpecies: state?.UserReducer?.completeListOfSpecies,
    getDataForEndemicSpeciesTable:
      state?.UserReducer?.getDataForEndemicSpeciesTable,
    getDataForWaterbirdCongregation:
      state?.UserReducer?.getDataForWaterbirdCongregation,
    getEffortDetails: state?.UserReducer?.getEffortDetails,
    completeListOfSpeciesFetchSuccessFully: state?.UserReducer?.completeListOfSpeciesFetchSuccess,
  };
};

export default connect(mapStateToProps, {
  RESET_ALL_DATA,
})(Report);
