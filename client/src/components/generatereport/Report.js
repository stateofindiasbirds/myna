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
  const allYearsCount = useSelector((state) => state?.UserReducer?.getAllYearsCount) || {};
  const completeListOfSpeciesGi = useSelector(state => state?.UserReducer?.completeListOfSpeciesGi);
  
  useEffect(() => {
    if (Object.keys(allYearsCount).length > 0) {
      setIsBarChartloaded(true);
    }
  }, [allYearsCount]);

  useEffect(()=>{
     if(completeListOfSpeciesGi.length > 0){
      setShowHeatMap(true);
     }
  },[completeListOfSpeciesGi])
  

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

  // const convertedData = dataForMap?.features[0]?.geometry?.coordinates[0]?.map(([lng, lat]) => ({ lat, lng }));
  // const boundaryData = (boundary?.features[0]?.geometry.type == 'Polygon' 
  //                      && boundary?.features[0]?.geometry.coordinates.length == 1
  //                      && boundary?.features[0]?.geometry?.coordinates[0]?.map(([lng, lat]) => ({ lat, lng })));
  //                     //  || (boundary?.features[0]?.geometry.type == 'MultiPolygon' 
  //                     //  && boundary?.features[0]?.geometry.coordinates.length == 2
  //                     //  && boundary?.features[0]?.geometry?.coordinates[0]?.map(([lng, lat]) => ({ lat, lng })))

  // const newData = boundary?.features[0]?.geometry?.type == 'MultiPolygon' 
  //                 // && boundary?.features[0]?.geometry?.coordinates.length > 2
  //                 && boundary?.features[0]?.geometry?.coordinates;
  // const formattedData = newData && newData?.map(polygon => polygon[0]?.map(([lng, lat]) => ({ lat, lng })));

  // const convertedData = dataForMap?.features[0]?.geometry?.coordinates[0]?.map(([lng, lat]) => ({ lat, lng }));
  // const boundaryData = boundary?.features[0]?.geometry?.coordinates[0]?.map(([lng, lat]) => ({ lat, lng }));

  const convertedData = dataForMap?.features[0]?.geometry?.coordinates[0]?.map(([lng, lat]) => ({ lat, lng }));
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
  }, [getHotspotAreas])

  // const getPolygonCenter = (polygon) => {
  //   if (polygon && polygon.length > 0) {
  //     const totalPoints = polygon.length;
  //     const latSum = polygon.reduce((sum, point) => sum + point.lat, 0);
  //     const lngSum = polygon.reduce((sum, point) => sum + point.lng, 0); 
  //     const center = {
  //       // lat: (latSum-offset)  / totalPoints,

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

  // const getPolygonCenter = (polygon) => {
  //   const totalPoints = polygon.length;
  //   const center = polygon.reduce((sum, point) => ({ lat: sum.lat + point.lat, lng: sum.lng + point.lng }), { lat: 0, lng: 0 });
  //   return { lat: center.lat / totalPoints, lng: center.lng / totalPoints };
  // };

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
    if (otherScreen.current) {
      otherScreen.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        triggerDownload(true);
      }, 1000);
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
        {getCountByScientificName?.total !== undefined && completeListOfSpeciesFetchSuccessFully && isBarChartloaded ? (
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
                  <Card className="mx-40 my-8">
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
                  <Card className="mx-40 my-8">
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

                  <Card className="mx-40 my-8">
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
                  <Card className="mx-40">
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

            <div className="mb-16 py-4" style={{ height: "70vh" }}>
              <div className="p-2 grid grid-cols-1 md:grid-cols-3  mx-20 mb-16" style={{ height: "70vh" }}>
                <div className="grid col-span-2" ref={otherScreen} >
                  <Map
                    ref={mapRef}
                    className="w-auto"
                    style={{
                      height: "58vh",
                      width: '58vw',
                    }}
                    google={props.google}
                    mapTypeControl={false}
                    scaleControl={true}
                    streetViewControl={false}
                    panControl={false}
                    rotateControl={false}
                    // zoom={ newZoom ||
                    //   editedData ? 9 :
                    //     convertedData ? 10.5 :
                    //       boundaryData ? 9 : 10.5
                    // }
                    zoom={changeLayoutForReport ? 8.5 : 8.5}
                    onReady={onMapReady}
                    // initialCenter={{
                    //   lat: (gridBounds.latMin + gridBounds.latMax) / 2,
                    //   lng: (gridBounds.lngMin + gridBounds.lngMax) / 2
                    // }}
                    // initialCenter={iCenter}
                    // initialCenter={(convertedData && getPolygonCenter(convertedData,props.google)) || (editedData && getPolygonCenter(editedData,props.google)) || boundaryData && (changeLayoutForReport ? getPolygonCenter(boundaryData,props.google) : getPolygonCenter(boundaryData,props.google)) || formattedData && (changeLayoutForReport ? getPolygonCenter(formattedData,props.google) : getPolygonCenter(formattedData,props.google)) ||{ lat: 25.21, lng: 79.32 }}
                    initialCenter={
                      MemoizedPolygonCenter.convertedData ||
                      MemoizedPolygonCenter.editedData ||
                      MemoizedPolygonCenter.boundaryData ||
                      MemoizedPolygonCenter.formattedData ||
                      { lat: 25.21, lng: 79.32 }  // Default center
                    }
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

            {showHeatMap && 
              <div style={{ display: polygonsCount < 1 || area <= 500 ? "none" : "block" }}>
              <div ref={heatmapRef} className='flex flex-col justify-center items-center relative'>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", margin: '2rem' }}>
                <h2 className="gandhi-family-bold" style={{ margin: 0, fontSize: "24px" }}>HEATMAP</h2>
                <button
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
                </button>
              </div>
              <CustomHeatMap onMapReady={onMapReady} paths={editedData || convertedData || boundaryData || formattedData} setPolygonsCount={setPolygonsCount} />
              <div>
                <div className="bottom-0 left-0 w-full flex justify-center items-center bg-white mt-[10px]">
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
                    <span className="text-sm">{'3 - 9'}</span>
                  </div>
                  <div className="flex items-center mx-2">
                    <div className="w-8 h-8 bg-[#c5cae9] border border-black mr-2"></div>
                    <span className="text-sm">{'1 - 2'}</span>
                  </div>
                  <div className="flex items-center mx-2">
                    <div className="w-8 h-8 bg-[#FFFFFF] border border-black mr-2"></div>
                    <span className="text-sm">{'0'}</span>
                  </div>
                </div>
              </div>
            <div className="text-center text-3xl  gandhi-family text-[20px]  mt-[5px]">
              NUMBER OF COMPLETE LISTS
            </div>
            </div>
            </div>
            }


            <div ref={chartRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', transform: 'translateY(48px)', margin: '6rem 0rem' }}>
              <Chart />
            </div>



            {/* <div className=" grid grid-cols-3 px-20 ">
              <div className="col-span-2">
                <Card className="h-[70vh] w-[88vw] mt-32">
                  <Map
                    className="w-auto"
                    style={{ height: "70vh", width: '65vw' }}
                    google={props.google}
                    zoom={(editedData ? 9 : 9.5)}
                    initialCenter={(convertedData && getPolygonCenter(convertedData)) || (editedData && getPolygonCenter(editedData)) || boundaryData && getPolygonCenter(boundaryData) || { lat: 25.21, lng: 79.32 }}
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

                    {convertedData && (
                      <Polygon
                        paths={convertedData}
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
                    {boundaryData && (
                      <Polygon
                        paths={boundaryData}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2.5}
                        fillOpacity={0}
                      />
                    )}

                    {gridPolygonsDataForMap.map((gridPolygon, index) => (
                      <Polygon
                        key={`gridPolygonDataForMap_${index}`}
                        paths={gridPolygon}
                        strokeColor="#FF0000"
                        strokeOpacity={0.8}
                        strokeWeight={1}
                        fillOpacity={0}

                      />
                    ))}
                  </Map>
                </Card>
              </div>
            </div> */}


            <div className="p-1 lg:px-8 mt-8 text-xs lg:text-base ">
              <Card className="mx-20 mt-8">
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
            onClick={() => {
              // handleZoomChange();
              setChangeLayoutForReport(true);
            }}
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
          Generated from myna.stateofindiasbirds.in v.2.1 on {formattedDate}
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
    getSoibConcernStatus: state?.UserReducer?.getSoibConcernStatus,
    completeListOfSpeciesFetchSuccessFully: state?.UserReducer?.completeListOfSpeciesFetchSuccess,
  };
};

export default connect(mapStateToProps, {
  RESET_ALL_DATA,
})(GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(Report));



