import React, { Fragment, useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Map, Marker, GoogleApiWrapper, Polygon, InfoWindow } from 'google-maps-react';
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
import { handleDownloadPdf } from "./helpers/generatePdf";
import dayjs from "dayjs";
import Logo from "../../assets/images/logo.png";
import CompleteListOfSpecies from "./reportcomponents/CompleteListofSpecies";
import { RESET_ALL_DATA } from "../../redux/action";
import { connect, useSelector } from "react-redux";
import SeasonalChart from "./reportcomponents/SeasonalChart";
import "./style.css";
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ReoprtSkeleton from "./ReoprtSkeleton";
import TableForEffortVariables from "./reportcomponents/TableForEffortVariables";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { calculateCentroid, calculateZoom, createTrackMiddlewareForPdfGenerate } from "./helpers/helperFunctions";
import CustomHeatMap from '../HeatMap';
import Chart from "./BarChart";
import * as turf from '@turf/turf';

// import { position } from "html2canvas/dist/types/css/property-descriptors/position";
function Report(props) {
  const {
    boundary,
    setBoundary,
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
    getSoibConcernStatus,
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
  const [activeMarker, setActiveMarker] = useState(null);
  const [center, setCenter] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [newZoom, setNewZoom] = useState(null);
  const [gridBounds, setGridBounds] = useState({ latMin: 0, latMax: 0, lngMin: 0, lngMax: 0 });
  const [polygonData, setPolygonData] = useState([]);
  const [isBarChartloaded, setIsBarChartloaded] = useState(false);
  const [showHeatMap, setShowHeatMap] = useState(false);
  const [polygonsCount, setPolygonsCount] = useState(null);
  const [stateName, setStateName] = useState(false);
  const allYearsCount = useSelector((state) => state?.UserReducer?.getAllYearsCount) || {};
  const completeListOfSpeciesGi = useSelector(state => state?.UserReducer?.completeListOfSpeciesGi);
  const [mapZoomOut,setMapZoomOut] = useState(false);
  const [highestNumber, sethighestNumber] = useState(null);
  const [newBufferdata,setNewBufferdata] = useState(null);
  useEffect(() => {
    if (Object.keys(allYearsCount).length > 0) {
      setIsBarChartloaded(true);
    }
  }, [allYearsCount]);

  useEffect(()=>{
     if(completeListOfSpeciesGi.length > 0){
      // console.log("completeListOfSpeciesGi.length",completeListOfSpeciesGi.length)
      setShowHeatMap(true);
     }
  },[completeListOfSpeciesGi])
  
// console.log("showHeatMap",showHeatMap);

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
  const chartRef = useRef();
  const heatmapRef = useRef();

  const closeHandler = () => {
    if (!selectedState && editedData) {
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
    setEditedData(null);
    setBoundary(null);
    setShowreport(null);
  };

  // console.log("dataForMap",dataForMap);
  let convertedData = dataForMap?.features[0]?.geometry?.coordinates[0]?.map(([lng, lat]) => ({ lat, lng }));
     if(editedData){
       convertedData =null;
     }
  const boundaryData = boundary?.features[0]?.geometry.type == 'Polygon'
    && boundary?.features[0]?.geometry.coordinates.length == 1
    && boundary?.features[0]?.geometry?.coordinates[0]?.map(([lng, lat]) => ({ lat, lng }))
    || (boundary?.features[0]?.geometry.type == 'Polygon'
      //  && boundary?.features[0]?.geometry.coordinates.length == 2
      && boundary?.features[0]?.geometry?.coordinates[0]?.map(([lng, lat]) => ({ lat, lng })))

  const newData = boundary?.features[0]?.geometry?.type == 'MultiPolygon'
    // && boundary?.features[0]?.geometry?.coordinates.length > 2
    && boundary?.features[0]?.geometry?.coordinates

  const formattedData = newData && newData?.map(polygon => polygon[0]?.map(([lng, lat]) => ({ lat, lng })));

  useEffect(() => {
    if (getHotspotAreas.length > 0 && polygonData.length === 0) {
      setPolygonData(getHotspotAreas);
    }
  }, [getHotspotAreas]);


  useEffect(()=>{
    if(dataForMap?.features[0]?.properties?.STATE_NAME || dataForMap?.features[0]?.properties?.STATE_N){
         setStateName(true)
    }
  },[dataForMap]);


  // console.log("stateNamestateNamestateNamestateName",stateName)

  //       lat: (latSum ) / totalPoints,
  //       lng: lngSum / totalPoints,
  //     };
  //     return center;
  //   }
  // }
  // const getPolygonCenter = (polygon, google) => {
  //   console.log('polygon',polygon)
  //   try {
  //     if (polygon && polygon.length > 0 && google) {
  //       console.log('polygon',polygon)
  //       const bounds = new google.maps.LatLngBounds();

  //       try {
  //         // Extend the bounds to include each point in the polygon
  //         if (Array.isArray(polygon[0][0])) {
  //           polygon.forEach((polygonPart) => {
  //             polygonPart.forEach((point) => {
  //               try {
  //                 if (isFinite(point.lat) && isFinite(point.lng)) {
  //                   bounds.extend(new google.maps.LatLng(point.lat, point.lng));
  //                 } else {
  //                   console.warn("Invalid coordinates detected:", point);
  //                 }
  //               } catch (error) {
  //                 console.error("Error extending bounds with point:", point, error);
  //               }
  //             });
  //           });
  //         } else {
  //           polygon.forEach((point) => {
  //             try {
  //               if (isFinite(point.lat) && isFinite(point.lng)) {
  //                 bounds.extend(new google.maps.LatLng(point.lat, point.lng));
  //               } else {
  //                 console.warn("Invalid coordinates detected:", point);
  //               }
  //             } catch (error) {
  //               console.error("Error extending bounds with point:", point, error);
  //             }
  //           });
  //         }
  //       } catch (error) {
  //         console.error("Error processing polygon parts:", error);
  //       }

  //       try {
  //         console.log(bounds);
  //         const center = bounds.getCenter();
  //         console.log("center", center);

  //         const centerLat = center.lat();
  //         const centerLng = center.lng();

  //         // If the center returns NaN, use the manual fallback logic
  //         if (isNaN(centerLat) || isNaN(centerLng)) {
  //           console.warn("Bounds returned NaN for center, using manual calculation.");

  //           const totalPoints = polygon.length;
  //           const latSum = polygon.reduce((sum, point) => sum + point.lat, 0);
  //           const lngSum = polygon.reduce((sum, point) => sum + point.lng, 0);
  //           const manualCenter = {
  //             lat: latSum / totalPoints,
  //             lng: lngSum / totalPoints,
  //           };
  //           console.log('manualCenter',manualCenter);
  //           return manualCenter;
  //         }

  //         // Return the bounds center if valid
  //         console.log({ lat: centerLat, lng: centerLng });
  //         return { lat: centerLat, lng: centerLng };
  //       } catch (error) {
  //         console.error("Error getting center of bounds:", error);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error in getPolygonCenter function:", error);
  //   }

  //   // Fallback in case polygon is empty
  //   console.log("Fallback - polygon is empty or not provided");
  //   return { lat: 25.21, lng: 79.32 };
  // };
  //  console.log("???????????/",props.google.maps.LatLngBounds()) 
  const getPolygonCenter = (polygon, google) => {
    if (polygon && polygon.length > 0 && google) {
      const bounds = new google.maps.LatLngBounds();

      const flattenPolygon = (polygon) => {
        return polygon.flatMap((part) => {
          if (Array.isArray(part[0])) {
            return flattenPolygon(part);
          }
          return part;
        });
      };

      const flattenedPolygon = flattenPolygon(polygon);

      flattenedPolygon.forEach((point) => {
        if (isFinite(point.lat) && isFinite(point.lng)) {
          bounds.extend(new google.maps.LatLng(point.lat, point.lng));
        } else {
        }
      });

      const center = bounds.getCenter();

      const centerLat = center.lat();
      const centerLng = center.lng();

      if (isNaN(centerLat) || isNaN(centerLng)) {
        const totalPoints = flattenedPolygon.length;
        const latSum = flattenedPolygon.reduce((sum, point) => sum + point.lat, 0);
        const lngSum = flattenedPolygon.reduce((sum, point) => sum + point.lng, 0);
        const manualCenter = {
          lat: latSum / totalPoints,
          lng: lngSum / totalPoints,
        };

        return manualCenter;
      }

      return { lat: centerLat, lng: centerLng };
    }

    return { lat: 25.21, lng: 79.32 };
  };



  // const memoizedData = useMemo(() => {
  //   return [convertedData, boundaryData, formattedData].find((d) => d && d !== false);
  // }, [convertedData, boundaryData, formattedData]);

  // useEffect(() => {
  //   try {
  //     if (memoizedData && memoizedData.length > 0) {
  //       console.log('memoizedData',memoizedData);
  //       // Flatten the nested multipolygon array
  //       const flattenCoordinates = (coordinates) => {
  //         return coordinates.flatMap((coord) => {
  //           if (Array.isArray(coord)) {
  //             return flattenCoordinates(coord);
  //           }
  //           return coord;
  //         });
  //       };

  //       const flattenedData = flattenCoordinates(memoizedData);

  //       const latitudes = flattenedData.map((p) => p.lat);
  //       const longitudes = flattenedData.map((p) => p.lng);

  //       const latMin = Math.min(...latitudes);
  //       const latMax = Math.max(...latitudes);
  //       const lngMin = Math.min(...longitudes);
  //       const lngMax = Math.max(...longitudes);

  //       setGridBounds((prevBounds) => {
  //         const newBounds = { latMin, latMax, lngMin, lngMax };
  //         if (
  //           prevBounds.latMin !== newBounds.latMin ||
  //           prevBounds.latMax !== newBounds.latMax ||
  //           prevBounds.lngMin !== newBounds.lngMin ||
  //           prevBounds.lngMax !== newBounds.lngMax
  //         ) {
  //           return newBounds;
  //         }
  //         return prevBounds;
  //       });
  //     }
  //   } catch (e) {
  //     console.log('error', e);
  //   }
  // }, [memoizedData]);



  // Calculate the center of the polygon
  // const polygonCenter = getPolygonCenter(polygonData, props.google);

  const mapRef = useRef(null);

  // This function will calculate and return the bounds for the boundary data
  const getBoundsForPolygon = (boundaryData) => {
    const bounds = new props.google.maps.LatLngBounds();
    boundaryData.forEach(coord => {
      bounds.extend(new props.google.maps.LatLng(coord.lat, coord.lng));
    });
    return bounds;
  };

  // This will be triggered when the map is loaded
  const onMapReady = (mapProps, map) => {
    const dataToUse = boundaryData || convertedData || editedData;

    if (dataToUse) {
      const bounds = getBoundsForPolygon(dataToUse);
      map.fitBounds(bounds);
    }
  };




  useEffect(() => {
    let delayTimeout;

    if (changeLayoutForReport) {
      delayTimeout = setTimeout(() => {
        createTrackMiddlewareForPdfGenerate(mediumForReport)

        handleDownloadPdf(
          PrintScreen,
          otherScreen,
          heatmapRef,
          chartRef,
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
          getSoibConcernStatus,
          startDate,
          endDate,
          getSeasonalChartData
        );
      }, 3000);
    }
    return () => {
      // Clear the timeout if the component is unmounted or changeLayoutForReport changes
      if (delayTimeout) {
        clearTimeout(delayTimeout);
      }
    };
  }, [changeLayoutForReport, otherScreen, chartRef, heatmapRef]);


  const [initialCenter, setInitialCenter] = useState({ lat: 25.21, lng: 79.32 });
  const [zoom, setZoom] = useState(9);
  const [gridPolygonsDataForMap, setGridPolygonsDataForMap] = useState([]);
  const [isRendered, setIsRendered] = useState(false);

  const generateGrid = (boundingBox) => {
    const grid = [];
    const gridSize = 0.045;

    for (let lat = boundingBox.minLat; lat <= boundingBox.maxLat; lat += gridSize) {
      for (let lng = boundingBox.minLng; lng <= boundingBox.maxLng; lng += gridSize) {
        const cellPolygon = [
          { lat, lng },
          { lat: lat + gridSize, lng },
          { lat: lat + gridSize, lng: lng + gridSize },
          { lat, lng: lng + gridSize },
        ];

        grid.push(cellPolygon);
      }
    }

    return grid;
  };

  const getBoundingBox = (coordinates) => {
    if (!Array.isArray(coordinates)) {
      return { minLat: 0, maxLat: 0, minLng: 0, maxLng: 0 };
    }

    const lats = coordinates.map(point => point[1]);
    const lngs = coordinates.map(point => point[0]);

    return {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs),
    };
  };

  const formatEditedData = (editedData) => {
    if (Array.isArray(editedData) && editedData.length > 0) {
      if (editedData[0] && editedData[0].lat !== undefined && editedData[0].lng !== undefined) {
        return {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [editedData.map(point => [point.lng, point.lat])]
              },
              properties: {
                stroke: "#ff0000",
                "stroke-opacity": 1,
                "fill-opacity": 0
              }
            }
          ]
        };
      }
    }
    return { type: "FeatureCollection", features: [] };
  };

  useEffect(() => {
    if (editedData) {
      const convertedEditedData = formatEditedData(editedData);
      const boundingBox = getBoundingBox(convertedEditedData.features[0].geometry.coordinates[0]);
      const grid = generateGrid(boundingBox);
      setGridPolygonsDataForMap(grid);
    }
  }, [editedData]);

  useEffect(() => {
    if (changeLayoutForReport) {
      const style = document.createElement('style');
      style.innerHTML = `
        .gm-style a {
          display: none !important;
        }
        button.gm-control-active.gm-fullscreen-control {
          display: none;
        }
        .gmnoprint {
          display: none;
        }
        .gm-style-iw-t {
         display: none;
       }
      `;
      style.id = "customMapStyles"; // Give the style a unique ID
      document.head.appendChild(style);
    } else {
      const existingStyle = document.getElementById("customMapStyles");
      if (existingStyle) {
        existingStyle.remove();
      }
    }
    return () => {
      const existingStyle = document.getElementById("customMapStyles");
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [changeLayoutForReport, boundaryData]);

  useEffect(() => {
    if (boundary) {
      const boundaryBoundingBox = getBoundingBox(boundary.features[0].geometry.coordinates[0]);
      const boundaryGrid = generateGrid(boundaryBoundingBox);
      setGridPolygonsDataForMap(boundaryGrid);

    }
  }, [changeLayoutForReport, boundary]);

  useEffect(() => {
    if (dataForMap && dataForMap.features && dataForMap.features.length > 0) {
      const polygonBoundary = dataForMap.features[0].geometry.coordinates[0].map(point => ({ lat: point[1], lng: point[0] }));
      const center = polygonBoundary.reduce((sum, point) => ({ lat: sum.lat + point.lat, lng: sum.lng + point.lng }), { lat: 0, lng: 0 });
      const zoom = 9.5;
      setInitialCenter({ lat: center.lat / polygonBoundary.length, lng: center.lng / polygonBoundary.length });
      setZoom(zoom);
      const coordinates = dataForMap.features[0].geometry.coordinates[0];
      const boundingBox = getBoundingBox(coordinates);
      const grid = generateGrid(boundingBox);
      setGridPolygonsDataForMap(grid);
    }
  }, [dataForMap]);


  const handleZoomChange = () => {
    setNewZoom(7);
  }

  const [downloadTriggered, setDownloadTriggered] = useState(false);

  const handleDownloadClick = () => {
    setMapZoomOut(true)   
    if (otherScreen.current) {
      otherScreen.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        triggerDownload(true);
      }, 1000);
      setTimeout(() => {
        setMapZoomOut(false);
      }, 25000);
    } else {
      triggerDownload(false);
    }
  };



  const triggerDownload = (value) => {
    setDownloadTriggered(value);
    console.log('Initiating PDF download...');
    setChangeLayoutForReport(value);
    setTimeout(() => {
      scrollToTop();
    }, 1000);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const timeoutRef = useRef(null);

  // const handleMouseOver = (marker) => {
  //   // clearTimeout(timeoutRef.current);
  //   // timeoutRef.current = setTimeout(() => {
  //     // Only update state if a different marker is hovered
  //     // if (!activeMarker || activeMarker.localityId !== marker.localityId) {
  //       // setActiveMarker(marker);
  //       // setShowInfoWindow(true);
  //     // }
  //   // }, 100); 
  //   console.log('data', marker)
  // }
  // const handleMouseOver = (marker) => {
  //   // debugger;
  //   // clearTimeout(timeoutRef.current);

  //   // Debounce the state update to prevent flickering on rapid hover
  //   // timeoutRef.current = setTimeout(() => {
  //     // Update the state only if the hovered marker is different
  //     // if (!activeMarker || activeMarker.localityId !== marker.localityId) {
  //       setActiveMarker(marker);
  //       setShowInfoWindow(true);
  //     // }
  //   // }, 100); // You can adjust the delay
  // };

  // // Memoized mouseout handler
  // const handleMouseOut = () => {
  //   // clearTimeout(timeoutRef.current);
  //   // timeoutRef.current = setTimeout(() => {
  //     // setActiveMarker(null);
  //     // setShowInfoWindow(false);
  //   // }, 100); // Debouncing mouseout as well
  // }




  const MemoizedPolygonCenter = useMemo(() => {
    return {
      convertedData: convertedData && getPolygonCenter(convertedData, props.google),
      editedData: editedData && getPolygonCenter(editedData, props.google),
      boundaryData: boundaryData && getPolygonCenter(boundaryData, props.google),
      formattedData: formattedData && getPolygonCenter(formattedData, props.google)
    };
  }, [convertedData, editedData, boundaryData, formattedData, props.google]);





  const handleMarkerClick = (marker) => {
    setActiveMarker(marker);
    setShowInfoWindow(true);
  };
  const [capturedMarkers, setCapturedMarkers] = useState([]);
  useEffect(() => {
    if (changeLayoutForReport) {
      const mapMarkers = getHotspotAreas.map(marker => ({
        id: marker.localityId,
        position: { lat: marker.latitude, lng: marker.longitude },
        onMouseover: () => handleMarkerClick(marker),
        onMouseout: () => setShowInfoWindow(false),
      }));
      setCapturedMarkers(mapMarkers);
    } else {
      setCapturedMarkers(getHotspotAreas?.map(marker => ({
        id: marker.localityId,
        position: { lat: marker.latitude, lng: marker.longitude },
        onMouseover: () => handleMarkerClick(marker),
        onMouseout: () => setShowInfoWindow(false),
      })));
    }
  }, [changeLayoutForReport, getHotspotAreas]);

  const roundToTwoDecimals = (num) => Math.round(num * 100) / 100;





//   function isBoundaryOutsideIndia(boundary) {
    
//     const indiaData = {
//       "type": "FeatureCollection",
//       "features": [
//         {
//           "type": "Feature",
//           "id": "IND",
//           "properties": { "name": "India" },
//           "geometry": {
//             "type": "Polygon",
//             "coordinates": [
//               [
      // {"type":"Feature","id":"IND","properties":{"name":"India"},"geometry":{"type":"Polygon","coordinates":[[[77.837451,35.49401],[78.912269,34.321936],[78.811086,33.506198],[79.208892,32.994395],[79.176129,32.48378],[78.458446,32.618164],[78.738894,31.515906],[79.721367,30.882715],[81.111256,30.183481],[80.476721,29.729865],[80.088425,28.79447],[81.057203,28.416095],[81.999987,27.925479],[83.304249,27.364506],[84.675018,27.234901],[85.251779,26.726198],[86.024393,26.630985],[87.227472,26.397898],[88.060238,26.414615],[88.174804,26.810405],[88.043133,27.445819],[88.120441,27.876542],[88.730326,28.086865],[88.814248,27.299316],[88.835643,27.098966],[89.744528,26.719403],[90.373275,26.875724],[91.217513,26.808648],[92.033484,26.83831],[92.103712,27.452614],[91.696657,27.771742],[92.503119,27.896876],[93.413348,28.640629],[94.56599,29.277438],[95.404802,29.031717],[96.117679,29.452802],[96.586591,28.83098],[96.248833,28.411031],[97.327114,28.261583],[97.402561,27.882536],[97.051989,27.699059],[97.133999,27.083774],[96.419366,27.264589],[95.124768,26.573572],[95.155153,26.001307],[94.603249,25.162495],[94.552658,24.675238],[94.106742,23.850741],[93.325188,24.078556],[93.286327,23.043658],[93.060294,22.703111],[93.166128,22.27846],[92.672721,22.041239],[92.146035,23.627499],[91.869928,23.624346],[91.706475,22.985264],[91.158963,23.503527],[91.46773,24.072639],[91.915093,24.130414],[92.376202,24.976693],[91.799596,25.147432],[90.872211,25.132601],[89.920693,25.26975],[89.832481,25.965082],[89.355094,26.014407],[88.563049,26.446526],[88.209789,25.768066],[88.931554,25.238692],[88.306373,24.866079],[88.084422,24.501657],[88.69994,24.233715],[88.52977,23.631142],[88.876312,22.879146],[89.031961,22.055708],[88.888766,21.690588],[88.208497,21.703172],[86.975704,21.495562],[87.033169,20.743308],[86.499351,20.151638],[85.060266,19.478579],[83.941006,18.30201],[83.189217,17.671221],[82.192792,17.016636],[82.191242,16.556664],[81.692719,16.310219],[80.791999,15.951972],[80.324896,15.899185],[80.025069,15.136415],[80.233274,13.835771],[80.286294,13.006261],[79.862547,12.056215],[79.857999,10.357275],[79.340512,10.308854],[78.885345,9.546136],[79.18972,9.216544],[78.277941,8.933047],[77.941165,8.252959],[77.539898,7.965535],[76.592979,8.899276],[76.130061,10.29963],[75.746467,11.308251],[75.396101,11.781245],[74.864816,12.741936],[74.616717,13.992583],[74.443859,14.617222],[73.534199,15.990652],[73.119909,17.92857],[72.820909,19.208234],[72.824475,20.419503],[72.630533,21.356009],[71.175273,20.757441],[70.470459,20.877331],[69.16413,22.089298],[69.644928,22.450775],[69.349597,22.84318],[68.176645,23.691965],[68.842599,24.359134],[71.04324,24.356524],[70.844699,25.215102],[70.282873,25.722229],[70.168927,26.491872],[69.514393,26.940966],[70.616496,27.989196],[71.777666,27.91318],[72.823752,28.961592],[73.450638,29.976413],[74.42138,30.979815],[74.405929,31.692639],[75.258642,32.271105],[74.451559,32.7649],[74.104294,33.441473],[73.749948,34.317699],[74.240203,34.748887],[75.757061,34.504923],[76.871722,34.653544],[77.837451,35.49401]]]}} 
//     ]
//   ]
// }
// }
// ]
// };
// console.log("indiaData.features[0].geometry.coordinates",indiaData.features[0].geometry.coordinates)
  
//   const india = turf.polygon(indiaData.features[0].geometry.coordinates);
  
//   if (!boundary.geometry.coordinates || boundary.geometry.coordinates.length === 0) {
//     console.error("Invalid boundary: No coordinates found.");
//     return false;
//   }
//   const boundaryCoordinates = boundary;
//   const boundaryPolygon = turf.polygon([boundaryCoordinates]);
//   const isInsideIndia = turf.booleanContains(india, boundaryPolygon);
//   console.log("isInsideIndia",isInsideIndia);
//   return !isInsideIndia;
//   }
  


  const indiaBounds = {
    north: 37.0841,   
    south: 6.4627,     
    east: 97.395,      
    west: 68.17665,    
  };

  const mapOptions = {
    restriction: {
      latLngBounds: indiaBounds, // Set boundary restrictions to India
      strictBounds: true,   
    },
  }

 


  useEffect(() => {
    if (!props.bufferData) return;
  
    let coordinates;
  
    // Case 1: FeatureCollection
    if (props.bufferData.type === 'FeatureCollection') {
      coordinates = props.bufferData?.features?.[0]?.geometry?.coordinates?.[0];
    }
  
    // Case 2: Single Feature
    else if (props.bufferData.type === 'Feature') {
      coordinates = props.bufferData?.geometry?.coordinates?.[0];
    }
  
    // Only continue if coordinates are found
    if (coordinates) {
      const latLngArray = coordinates.map(coordPair => ({
        lng: coordPair[0],
        lat: coordPair[1],
      }));
      setNewBufferdata(latLngArray);
    }
  }, [props.bufferData]);
  

  
  return (
    <Fragment>
      <div style={{ backgroundColor: "#ffffff00" }}>
        <div ref={header} style={{ opacity: getCountByScientificName?.total !== undefined && completeListOfSpeciesFetchSuccessFully && isBarChartloaded ? 1 : 0.4 }}>
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
                      className="mb-0 h-[95px] w-[130px] sm:h-[120px] sm:w-[180px] sm:min-w-[180px] "

                      // className="mb-0 h-[120px] w-[180px] min-w-[120px] max-w-full object-contain"
                      style={{  color: "#fff" }}
                    />
                    <div className="mb-4">
                      <h1 className="myna-text">MYNA</h1>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={8} className="flex xsm:justify-end sm:justify-end  lg:justify-center md:justify-center xlg:justify-center ">
                  <div className={` my-auto`}>
                    <div className="main-heading  text-[1.1rem] md:text-2xl lg:text-2xl xlg:text-2xl xsm:text-right sm:text-right sm:pr-[18px] xsm:pr-[18px]">
                      {reportName ? "Birds Of " + reportName : ""}
                    </div>
                    {selectedState !== "" && (
                      <div className="flex flex-col xsm:flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-between sm:pr-[18px] xsm:pr-[18px] ">
                      <center className=" text-[1.1rem] md:text-2xl lg:text-2xl xlg:text-2xl font-sans text-white font-bold xsm:text-right sm:text-right">
                          {/* State: Himachal Pradesh */}
                          {selectedState !== "" && `State: ${selectedState}`}
                        </center>
                        <center className=" md:ml-20  text-[1.1rem] md:text-2xl lg:text-2xl xlg:text-2xl font-sans text-white font-bold text-right  xsm:text-right sm:text-right">
                          {selectedCounty !== "" &&
                            `District: ${selectedCounty}`}
                        </center>
                      </div>
                    )}
                  </div>
                </Grid>
                <Grid item xs>
                  <div className={`flex justify-end py-3 px-8 xsm:pr-[18px] `}>
                    <div
                      className={
                        "d-flex justify-content-endent-end"
                      }
                    >
                  {window.innerWidth < 768 &&

                      <div className="flex justify-end">
                        {startDate !== "" && (
                          <div className="flex justify-end mt-1 ">
                            <center className="text-[.9rem] md:text-2xl lg:text-2xl xlg:text-2xl  gandhi-family text-gray-100 pr-[18px]">
                              {startDate !== "" &&
                                `Dates : ${dayjs(startDate).format("DD/MM/YYYY") + " "}–${" " + dayjs(endDate).format("DD/MM/YYYY")
                                }`}
                            </center>
                          </div>
                        )}
                      </div>
                   }
                      <div className="me-4">
                        <Tooltip
                          title="Download"
                          className={changeLayoutForReport && "invisible"}
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
                          {getCountByScientificName?.total &&
                            <FileDownloadOutlinedIcon
                              onClick={() => handleDownloadClick(true)}
                              style={{ cursor: 'pointer' }}
                            />
                          }
                        </Tooltip>
                      </div>

                      <div>
                        <Tooltip
                          title="Close"
                          className={changeLayoutForReport ? "invisible" : undefined}
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
            {window.innerWidth >=768 &&
            <div className="flex justify-end">
              {startDate !== "" && (
                <div className="flex justify-end mt-1 ">
                  <center className="text-[1.1rem] md:text-2xl lg:text-2xl xlg:text-2xl  gandhi-family text-gray-100 pr-[18px]">
                    {startDate !== "" &&
                      `Dates : ${dayjs(startDate).format("DD/MM/YYYY") + " "}–${" " + dayjs(endDate).format("DD/MM/YYYY")
                      }`}
                  </center>
                </div>
              )}
            </div>
            }
          </Card>
        </div>
        {getCountByScientificName?.total !== undefined && completeListOfSpeciesFetchSuccessFully && isBarChartloaded ? (
          <div>
            <div
              ref={PrintScreen}
              style={{ backgroundColor: "#ffffff00" }}
              className="mt-10"
            >
              <div className="p-1 lg:px-8 mt-12 text-xs lg:text-base ">
                <div className=" text-center xsm:text-2xl sm:text-base md:text-4xl lg:text-4xl gandhi-family-bold lg:mb-14 lg:mt-4 md:mb-14 md:mt-4 mb-2 mt-1">
                  SPECIES DETAILS
                </div>
                {getCountByScientificName?.total < 1 && (
                  <div className="text-center text-2xl font-sans font-bold my-4 text-red-500">
                    (NO DATA FOUND FOR SELECTED AREA)
                  </div>
                )}
                <div className="grid grid-cols-1 my-3 md:grid-cols-2 lg:grid-cols-3 px-16">
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
                <div className=" lg:grid md:grid md:grid-cols-2 lg:grid-cols-3 sm:mt-0 sm:px-0 md:mt-20 md:px-24 lg:mt-20 lg:px-24 flex flex-col gap-4">
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
                <div className="text-center xsm:text-2xl sm:text-2xl md:text-4xl lg:text-4xl xlg:text-6xl gandhi-family-bold my-20">
                  IUCN RED LIST
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:my-8 md:my-8 lg:px-24 md:px-24 px-0 my-0">
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
                <Card className="md:mx-5 lg:mx-40 mb-4">
                    <Table3XN
                      heading="SOIB HIGH CONSERVATION PRIORITY SPECIES"
                      tableData={getSoibConcernStatus}
                      title1={"Species"}
                      // title2={"IUCN Status"}
                      title3={"Frequency of Reporting"}
                      title4={"Year of Latest Report"}
                      includesScientificName={false}
                    />
                  </Card>
                  <Card className="md:mx-5 lg:mx-40 mb-4">
                    <Table3XN
                      heading="IUCN REDLIST SPECIES"
                      tableData={getDataForIucnRedListTable}
                      title1={"Species"}
                      title2={"IUCN Status"}
                      // title3={"SoIB Status"}
                      title3={"Frequency of Reporting"}
                      title4={"Year of Latest Report"}
                      includesScientificName={false}
                    />
                  </Card>

                  <Card className="md:mx-5 lg:mx-40 mb-4">
                    <Table3XN
                      heading="ENDEMIC SPECIES"
                      tableData={getDataForEndemicSpeciesTable}
                      title1={"Species"}
                      title2={"Endemic Region"}
                      title3={"Frequency of Reporting"}
                      title4={"Year of Latest Report"}
                      includesScientificName={false}
                    />
                  </Card>
                  <Card className="md:mx-5 lg:mx-40 mb-4">
                    <Table3XN
                      heading="WATERBIRD CONGREGATIONS"
                      tableData={getDataForWaterbirdCongregation}
                      title1={"Species"}
                      title2={"Highest Count"}
                      title3={"1% of Biogeographic Population"}
                      title4={"Year of Report"}
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
                <div className="text-center xsm:text-2xl sm:text-2xl md:text-4xl lg:text-4xl xlg:text-6xl gandhi-family-bold my-0 md:my-10 p-4 flex justify-center">
                  SEASONAL CHART
                  {!changeLayoutForReport && (
                    <Tooltip
                    title="Seasonal Chart includes the top ten migratory species and their frequency of reporting in each month of the year"
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

            <div className="mb-16 py-4 sm:px-0 lg:px-10 md:px-0" style={{ height: "70vh" }}>
              <div className="p-2 grid grid-cols-1 md:grid-cols-3  mx-0 md:mx-20 lg:mx-20 mb-16" style={{ height: "70vh" }}>
                <div className="grid col-span-2" ref={otherScreen} >
                  <Map
                    ref={mapRef}
                    className=""
                    style={{
                      height: "58vh",
                      // width: mapZoomOut ? "58vw" : window.innerWidth < 768 ? "90vw" : "58vw"
                      width: window.innerWidth < 768 ? "90vw" : "58vw"

                    }}
                    google={props.google}
                    mapTypeControl={false}
                    scaleControl={true}
                    scaleControlOptions={{
                      position: props.google.maps.ControlPosition.BOTTOM_LEFT
                    }}
                    streetViewControl={false}
                    panControl={false}
                    rotateControl={false}
                    zoom={changeLayoutForReport ? 7.5 : 7.5}
                    onReady={!mapZoomOut && onMapReady}
                    initialCenter={
                      MemoizedPolygonCenter.convertedData ||
                      MemoizedPolygonCenter.editedData ||
                      MemoizedPolygonCenter.boundaryData ||
                      MemoizedPolygonCenter.formattedData ||
                      { lat: 25.21, lng: 79.32 }  // Default center
                    }
                    options={mapOptions}

                  >
                    {props.data && props.data.features && props.data.features.length > 0 && (
                      <Polygon
                        paths={[props.data.features[0].geometry.coordinates[0]]}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2.5}
                        fillOpacity={0}

                      />
                    )}

                    { !boundaryData && editedData && (
                      <Polygon
                        paths={editedData}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2.5}
                        fillOpacity={0}

                      />
                    )}

                    {convertedData && (
                      <Polygon
                        paths={convertedData}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2.5}
                        fillOpacity={0}
                      />
                    )}

                    {boundaryData && (
                      <Polygon
                        paths={boundaryData}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2.5}
                        fillOpacity={0}
                      />
                    )}
                    {formattedData && (
                      <Polygon
                        paths={formattedData}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2.5}
                        fillOpacity={0}

                      />
                    )}
                    {(capturedMarkers?.length > 0 ? capturedMarkers : getHotspotAreas).map((marker) => (
                      <Marker
                        key={marker.id}
                        position={marker.position}
                        onMouseover={marker.onMouseover}
                      />
                    ))}

                    {getHotspotAreas && getHotspotAreas?.map(marker => (
                      <Marker
                        key={marker.localityId}
                        position={{ lat: marker.latitude, lng: marker.longitude }}
                        onMouseover={() => handleMarkerClick(marker)}
                        onMouseout={() => setShowInfoWindow(false)}
                      />
                    ))}

                    {getHotspotAreas && activeMarker && getHotspotAreas?.map(marker => (
                      <InfoWindow
                        key={marker.localityId}
                        position={{ lat: activeMarker.latitude, lng: marker.longitude }}
                        visible={showInfoWindow && activeMarker === marker}
                        zIndex={10000}
                      >
                        <div style={{ zIndex: '1000' }}>
                          <p>{marker.locality}</p>
                        </div>
                      </InfoWindow>
                    ))}
                  </Map>
                  {area != null ? (
                    <span className={`bg-[#F3EDE8] text-gray-800 h-[64vh] p-2 pb-4 gandhi-family rounded-b-xl`}
                      style={{ display: 'flex', alignItems: 'end', letterSpacing: '0.05em', fontFamily: '"Gandhi Sans Regular"' }}>
                      {" "}
                      {"Area: "}{parseFloat(roundToTwoDecimals(area))} square kilometers
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="ml-2 mt-8 md:mt-0 ">
                  {" "}
                  <TableCard tabledata={getHotspotAreas} />
                </div>
              </div>
            </div>

            {showHeatMap && 
              <div class='pr-0 pl-0 xsm:pr-[10px] sm:pr-[10px] xsm:pl-[10px] sm:pl-[10px]' style={{ display: polygonsCount < 1 || area <= 500 ? "block" : "block" }}>
              <div ref={heatmapRef} className=' mt-[40rem] sm:mt-[27rem] md:mt-0 lg:mt-0 flex flex-col justify-center items-center relative'>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <h2 className="text-center xsm:text-2xl sm:text-lg md:text-6xl lg:text-6xl gandhi-family-bold my-10 p-4 flex justify-center" style={{ margin: 0, fontSize: "24px" }}>HEATMAP</h2>
                {/* <button
                  className="gandhi-family"
                  style={{
                    background: "none",
                    border: "1px solid #DAB830",
                    borderRadius: "50%",
                    color: "#DAB830",
                    width: "24px",
                    height: "24px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  title="Intensity of the colour of a grid is proportional to the number of checklists from that grid"
                >
                  i
                </button> */}
                  <Tooltip
                    title="Intensity of the colour of a grid is proportional to the number of checklists from that grid"
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
                      <InformationCircleIcon className="cursor-help ms-1 text-yellow-500 h-7 w-7" />
                  </Tooltip>
              </div>
              <CustomHeatMap 
                sethighestNumber={sethighestNumber} 
                mapZoomOut={mapZoomOut} 
                area={area} 
                className="md:absolute lg:absolute" 
                onMapReady={onMapReady} 
                isPolygon={editedData?true:false} 
                stateName={stateName} 
                paths={boundaryData  || editedData || convertedData || newBufferdata || formattedData} 
                setPolygonsCount={setPolygonsCount}
                bufferData={props.bufferData}
                orgPolyCoords={props.orgPolyCoords} 
                mapBoundary={boundaryData  || convertedData || editedData || formattedData}
                newPolygon={props.newPolygon}
              />
              <div>
                <div className="bottom-0 left-0 w-full flex justify-center items-center bg-white mt-[10px]">
                  <div className="flex items-center mx-1 md:mx-2 lg:mx-2 xlg:mx-2">
                    <div className="  w-4 h-4 md:w-8 md:h-8 lg:w-8 lg:h-8 xlg:w-8 xlg:h-8 bg-[#562377] border border-black mr-2"></div>
                    <span className="text-xs">{'>= 70'}</span>
                  </div>
                  <div className="flex items-center mx-1 md:mx-2 lg:mx-2 xlg:mx-2">
                    <div className="w-4 h-4 md:w-8 md:h-8 lg:w-8 lg:h-8 xlg:w-8 xlg:h-8 bg-[#3949ab] border border-black mr-2"></div>
                    <span className="text-xs">{'30 - 69'}</span>
                  </div>
                  <div className="flex items-center mx-1 md:mx-2 lg:mx-2 xlg:mx-2">
                    <div className="w-4 h-4 md:w-8 md:h-8 lg:w-8 lg:h-8 xlg:w-8 xlg:h-8 bg-[#5c6bc0] border border-black mr-2"></div>
                    <span className="text-xs">{'10 - 29'}</span>
                  </div>
                  <div className="flex items-center mx-1 md:mx-2 lg:mx-2 xlg:mx-2">
                    <div className="w-4 h-4 md:w-8 md:h-8 lg:w-8 lg:h-8 xlg:w-8 xlg:h-8 bg-[#7986cb] border border-black mr-2"></div>
                    <span className="text-xs">{'3 - 9'}</span>
                  </div>
                  <div className="flex items-center mx-1 md:mx-2 lg:mx-2 xlg:mx-2">
                    <div className="w-4 h-4 md:w-8 md:h-8 lg:w-8 lg:h-8 xlg:w-8 xlg:h-8 bg-[#c5cae9] border border-black mr-2"></div>
                    <span className="text-xs">{'1 - 2'}</span>
                  </div>
                  <div className="flex items-center mx-1 md:mx-2 lg:mx-2 xlg:mx-2">
                    <div className="w-4 h-4 md:w-8 md:h-8 lg:w-8 lg:h-8 xlg:w-8 xlg:h-8 bg-[#FFFFFF] border border-black mr-2"></div>
                    <span className="text-xs">{'0'}</span>
                  </div>
                </div>
              </div>
            <div className="text-center text-3xl  gandhi-family text-[20px]  mt-[5px]">
             PERCENTAGE OF COMPLETE LISTS (Total={highestNumber})
            </div>
            </div>
            </div>
            }


            <div ref={chartRef}  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', transform: 'translateY(48px)', marginTop: !showHeatMap && getSeasonalChartData.length > 0 ? '28rem' : '6 rem', marginBottom:'6rem' }}>
              <Chart mapZoomOut={mapZoomOut}/>
            </div>



            {/* <div className=" grid grid-cols-3 px-20 ">
              <div className="col-span-2">
                <Card className="h-[70vh] w-[88vw] mt-32">
                  <Map
                    ref={mapRef}
                    className=" w-full"
                    style={{
                      height: "58vh",
                      width: window.innerWidth < 768 ? "100vw" : "58vw",
                    }}
                    google={props.google}
                    mapTypeControl={false}
                    scaleControl={false}
                    streetViewControl={false}
                    panControl={false}
                    rotateControl={false}

                    zoom={changeLayoutForReport ? 8.2 : 9}
                    initialCenter={(convertedData && getPolygonCenter(convertedData, props.google)) || (editedData && getPolygonCenter(editedData, props.google)) || boundaryData && (changeLayoutForReport ? getPolygonCenter(boundaryData, props.google) : getPolygonCenter(boundaryData, props.google)) || formattedData && (changeLayoutForReport ? getPolygonCenter(formattedData, props.google) : getPolygonCenter(formattedData, props.google)) || { lat: 25.21, lng: 79.32 }}
                  >
                    {props.data && props.data.features && props.data.features.length > 0 && (
                      <Polygon
                        paths={[props.data.features[0].geometry.coordinates[0]]}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2.5}
                        fillOpacity={0}
                      />
                    )}

                    {editedData && (
                      <Polygon
                        paths={editedData}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2.5}
                        fillOpacity={0}
                      />
                    )}

                    {convertedData && (
                      <Polygon
                        paths={convertedData}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2.5}
                        fillOpacity={0}
                      />
                    )}

                    {boundaryData && (
                      <Polygon
                        paths={boundaryData}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2.5}
                        fillOpacity={0}
                      />
                    )}
                    {formattedData && (
                      <Polygon
                        paths={formattedData}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2.5}
                        fillOpacity={0}
                      />
                    )}
                    {(capturedMarkers?.length > 0 ? capturedMarkers : getHotspotAreas).map((marker) => (
                      <Marker
                        key={marker.id}
                        position={marker.position}
                        onMouseover={marker.onMouseover}
                      />
                    ))}

                    {getHotspotAreas && getHotspotAreas?.map(marker => (
                      <Marker
                        key={marker.localityId}
                        position={{ lat: marker.latitude, lng: marker.longitude }}
                        onMouseover={() => handleMarkerClick(marker)}
                        onMouseout={() => setShowInfoWindow(false)}
                      />
                    ))}

                    {getHotspotAreas && activeMarker && getHotspotAreas?.map(marker => (
                      <InfoWindow
                        key={marker.localityId}
                        position={{ lat: activeMarker.latitude, lng: marker.longitude }}
                        visible={showInfoWindow && activeMarker === marker}
                        zIndex={10000}
                      >
                        <div style={{ zIndex: '1000' }}>
                          <p>{marker.locality}</p>
                        </div>
                      </InfoWindow>
                    ))}
                  </Map>
                  {area != null ? (
                    <span className={`bg-[#F3EDE8] text-gray-800 h-[64vh] p-2 pb-4 gandhi-family rounded-b-xl`}
                      style={{ display: 'flex', alignItems: 'end', letterSpacing: '0.05em', fontFamily: '"Gandhi Sans Regular"' }}>
                      {" "}
                      {"Area: "}{parseFloat(roundToTwoDecimals(area))} square kilometers
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="ml-2 ">
                  {" "}
                  <TableCard tabledata={getHotspotAreas} />
                </div>
              </div>
            </div>

            {/* <div style={{height:'80vh'}}> */}
            {/* <div
              ref={heatmapRef}
              className="mt-[27rem] md:mt-0 lg:mt-0 flex justify-center items-center relative"
            >
              <CustomHeatMap
                className="md:absolute lg:absolute"
                paths={editedData || convertedData || formattedData || boundaryData || []}
                setPolygonsCount={setPolygonsCount} 
              />

              <div className="absolute bottom-0 left-0 w-full flex justify-center items-center bg-white  py-2 translate-y-[48px]">
                <div className="flex items-center mx-2">
                  <div className="w-8 h-8 bg-[#562377] border border-black mr-2"></div>
                  <span className="text-sm">{'>= 70'}</span>
                </div>
                <div className="flex items-center mx-2">
                  <div className="w-8 h-8 bg-[#3949ab] border border-black mr-2"></div>
                  <span className="text-sm">{'30 - 69'}</span>
                </div>
                <div className="flex items-center mx-2">
                  <div className="w-8 h-8 bg-[#5c6bc0] border border-black mr-2"></div>
                  <span className="text-sm">{'10 - 29'}</span>
                </div>
                <div className="flex items-center mx-2">
                  <div className="w-8 h-8 bg-[#7986cb] border border-black mr-2"></div>
                  <span className="text-sm">{'2 - 9'}</span>
                </div>
                <div className="flex items-center mx-2">
                  <div className="w-8 h-8 bg-[#c5cae9] border border-black mr-2"></div>
                  <span className="text-sm">{'< 2'}</span>
                </div>
              </div>
            </div>

            <div ref={chartRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', transform: 'translateY(48px)', marginTop: '6rem', marginBottom: '6rem' }}>
              <Chart />
            </div> */}


            <div className="p-1 lg:px-8 mt-8 text-xs lg:text-base mb-4">
              <Card className="md:mx-5 lg:mx-40">
                <div>
                  <CompleteListOfSpecies
                    completeListOfSpecies={completeListOfSpecies}
                  />
                </div>
              </Card>
            </div>
            <div className="p-1 lg:px-8 mt-8 text-xs lg:text-base lg:max-w-4xl mx-auto mb-4">
              <Card className="">
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
            onClick={() => {
              // handleZoomChange();
              setChangeLayoutForReport(true);
            }}
            className=" min-w-[145px] text-right mt-4  px-4 py-2 bg-white-50 outline-none border border-indigo-100 rounded text-indigo-500 font-medium hover:bg-[#DAB830] hover:text-white transition-colors duration-200"
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
        className={`lmd:grid  grid-cols-3  text-center text-gray-100 p-3 break-normal font-sans bg-[#9A7269] ${changeLayoutForReport && "pb-5"
          }`}
      >
        <div className="col-span-2 md:text-right lg:text-right xlg:text-right lmd:me-4 gandhi-family">
          Generated from myna.stateofindiasbirds.in v.2.2 on {formattedDate}
        </div>
        <div
          className={`${changeLayoutForReport && "invisible"
            } font-medium gandhi-family text-center md:text-right lg:right xlg:right break-normal`}
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
    getSoibConcernStatus: state?.UserReducer?.getSoibConcernStatus,
    completeListOfSpeciesFetchSuccessFully: state?.UserReducer?.completeListOfSpeciesFetchSuccess,
  };
};

export default connect(mapStateToProps, {
  RESET_ALL_DATA,
})(GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(Report));