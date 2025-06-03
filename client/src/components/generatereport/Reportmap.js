// //old code


// import React, { useState } from "react";
// import { MapContainer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import Ziptogeojson from "./Ziptogeojson";
// //import { EditControl } from "react-leaflet-draw";
// import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
// import { IconButton, Menu, MenuItem } from "@mui/material";
// import { AiOutlineFileText } from "react-icons/ai";
// import kmlFileIcon from "../../../src/assets/images/kml.png";
// import { VscJson } from "react-icons/vsc";
// import geojsonToKml from "geojson-to-kml";
// // import shpwrite from "shp-write";
// import shpwrite from '@mapbox/shp-write';

// import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
// import { formattedDate } from "./helpers/generateReportTableData";
// import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
// import MyControls from "./MyControls";
// import Boundary from "./Boundary";

// function Reportmap(props) {
//   const { editedData, setEditedData } = props;
//   const [anchorEl, setAnchorEl] = useState(null);
//   const _onCreate = (e) => {
//     props.setMediumForReport("polygonR")
//     const coordinates = e.layer._latlngs;
//     const coordinatesForFile = [
//       coordinates[0].map((point) => [point.lng, point.lat]),
//     ];
//     props.setShowGeographySign(false);
//     props.setNewPolygon(e);
//     setEditedData(coordinates[0]);
//     const feature = {
//       type: "Feature",
//       properties: {},
//       geometry: {
//         type: "Polygon",
//         coordinates: coordinatesForFile,
//       },
//     };
//     const featureCollection = {
//       type: "FeatureCollection",
//       features: [feature],
//     };
//     const geoJSONString = JSON.stringify(featureCollection, null, 2);
//     const blob = new Blob([geoJSONString], { type: "application/json" });
//     props.setGeoJson(blob);
//   };
//   const _onDeleted = (e) => {
//     props.removeFile();
//     props.setNewPolygon(null);
//     props.setGeoJson(null);
//   };
//   // const _onEditPath = (e) => {};
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

  

//   const handleShapeFileDownload = async (e) => {
//     let featureCollection;
  
//     if (editedData && editedData.length > 0) {
//       const coordinates = [editedData.map((point) => [point.lng, point.lat])];
//       console.log('coordinates', coordinates);
//       const feature = {
//         type: "Feature",
//         properties: {
//           "fill-opacity": 0,
//           stroke: "#ff0000",
//           "stroke-opacity": 1,
//         },
//         geometry: {
//           type: "Polygon",
//           coordinates: coordinates,
//         },
//       };
//       featureCollection = {
//         type: "FeatureCollection",
//         features: [feature],
//       };
//     } else if (props.data) {
//       featureCollection = props.data;
//     } else {
//       console.error("No valid data available for download.");
//       return;
//     }
  
//     const baseFilename = `${props.reportName}_myna_${formattedDate()}.zip`;
//     const maxLength = 30;
  
//     const filename = baseFilename.length > maxLength
//       ? `${baseFilename.substring(0, maxLength - 4)}.zip` 
//       : baseFilename;
  
//     try {
//       const zipOptions = {
//         folder: 'shapes', 
//         outputType: 'blob', 
//         compression: 'DEFLATE',
//         types: {
//           point: 'points',
//           polygon: 'polygons',
//           polyline: 'lines',
//         },
//       };
  
//       const zipDataPromise = shpwrite.zip(featureCollection, zipOptions);
  
//       const zipData = await zipDataPromise;
  
//       const url = URL.createObjectURL(zipData);
  
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = filename;
//       document.body.appendChild(a);
//       a.click();
  
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error during shapefile download:", error);
//     }
//   };

//   const handleKmlDownload = (e) => {
//     if (editedData) {
//       const coordinates = [editedData.map((point) => [point.lng, point.lat])];
//       const feature = {
//         type: "Feature",
//         properties: {
//           "fill-opacity": 0,
//           stroke: "#ff0000",
//           "stroke-opacity": 1,
//         },
//         geometry: {
//           type: "Polygon",
//           coordinates: coordinates,
//         },
//       };

//       const featureCollection = {
//         type: "FeatureCollection",
//         features: [feature],
//       };
//       const kml = geojsonToKml(featureCollection);
//       const blob = new Blob([kml], {
//         type: "application/octet-stream",
//       });
//       const url = window.URL.createObjectURL(blob);
//       const downloadLink = document.createElement("a");
//       downloadLink.href = url;
//       downloadLink.download =
//         props.reportName + "_myna_" + formattedDate() + ".kml";
//       downloadLink.click();
//     } else {
//       const kml = geojsonToKml(props.data);
//       const blob = new Blob([kml], { type: "application/octet-stream" });
//       const url = window.URL.createObjectURL(blob);
//       const downloadLink = document.createElement("a");
//       downloadLink.href = url;
//       downloadLink.download =
//         props.reportName + "_myna_" + formattedDate() + ".kml";
//       downloadLink.click();
//     }
//   };

//   const handleGeoJSONDownload = (e) => {
//     if (editedData) {
//       const coordinates = [editedData.map((point) => [point.lng, point.lat])];

//       const feature = {
//         type: "Feature",
//         properties: {},
//         geometry: {
//           type: "Polygon",
//           coordinates: coordinates,
//         },
//       };

//       const featureCollection = {
//         type: "FeatureCollection",
//         features: [feature],
//       };
//       const geoJSONString = JSON.stringify(featureCollection, null, 2);
//       const blob = new Blob([geoJSONString], { type: "application/json" });
//       const downloadLink = document.createElement("a");
//       downloadLink.href = URL.createObjectURL(blob);
//       downloadLink.download =
//         props.reportName + "_myna_" + formattedDate() + ".geojson";
//       downloadLink.click();
//     } else {
//       const geoJSONString = JSON.stringify(props.data, null, 2);
//       const blob = new Blob([geoJSONString], { type: "application/json" });
//       const downloadLink = document.createElement("a");
//       downloadLink.href = URL.createObjectURL(blob);
//       downloadLink.download =
//         props.reportName + "_myna_" + formattedDate() + ".geojson";
//       downloadLink.click();
//     }
//   };

//   const handleEdit = (event) => {
//     setEditedData(event?.target?._latlngs[0]);
//     const coordinatesForFile = [
//       event?.target?._latlngs[0].map((point) => [point.lng, point.lat]),
//     ];
//     const feature = {
//       type: "Feature",
//       properties: {},
//       geometry: {
//         type: "Polygon",
//         coordinates: coordinatesForFile,
//       },
//     };
//     const featureCollection = {
//       type: "FeatureCollection",
//       features: [feature],
//     };
//     const geoJSONString = JSON.stringify(featureCollection, null, 2);
//     const blob = new Blob([geoJSONString], { type: "application/json" });
//     props.setGeoJson(blob);
//   };

//   return (
//     <div className="mt-14 md:mt-0  w-[100%]">
//       <MapContainer
//         className="h-[95vh] md:h-[100vh] relative w-[100%]"
//         center={[25.21, 79.32]}
//         zoom={4}
//         scrollWheelZoom={true}
//       // zoomControl={false}
//       >

        // <ReactLeafletGoogleLayer
        //   googleMapsLoaderConf={{ region: "IN" }}
        //   apiKey={process.env.REACT_APP_API_KEY}
        // />
//          <style jsx>{`
//         .leaflet-control-attribution {
//           display: none;
//         }
//       `}</style>


//         {!props.selectedState && (
//           <MyControls
//             _onDeleted={_onDeleted}
//             _onCreate={_onCreate}
//             data={props.data}
//             newPolygon={props.newPolygon}
//             setArea={props.setArea}
//             uploadedgeojson={props.uploadedgeojson}
//           />
//         )}

//         {props?.data !== null && (
//           <Ziptogeojson
//             setData={props?.setData}
//             toast={props.toast}
//             data={props?.data}
//             handleEdit={handleEdit}
//             onReport={false}
//             onDelete={_onDeleted}
//             isZoomRequired={props.isZoomRequired}
//             setIsZoomRequired={props.setIsZoomRequired}
//             setArea={props.setArea}
//           />
//         )}
//         {props.boundary &&
//           <Boundary
//             data={props.boundary}
//             setData={props.setBoundary}
//             isStateData={props.isStateData}
//           />
//         } 
//       </MapContainer>
//       <div className="download-div">
//         <IconButton onClick={handleClick} id="account-menu">
//           <FileDownloadOutlinedIcon
//             fontSize="small"
//             style={{ color: "#000" }}
//           />
//         </IconButton>
//       </div>
//       <Menu
//         anchorEl={anchorEl}
//         id="account-menu"
//         open={open}
//         onClose={() => setAnchorEl(null)}
//         onClick={() => setAnchorEl(null)}
//         transformOrigin={{ horizontal: "right", vertical: "top" }}
//         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//       >
//         <MenuItem onClick={handleShapeFileDownload} sx={{ cursor: "pointer" }}>
//           <AiOutlineFileText size="25" />
//           <span style={{fontFamily:'Gandhi Sans Regular'}} className="ml-1">Download in ShapeFile.zip</span>
//         </MenuItem>
//         <MenuItem onClick={handleKmlDownload} sx={{ cursor: "pointer" }}>
//           {" "}
//           <img
//             className="me-1.5"
//             src={kmlFileIcon}
//             alt="img"
//             height="20"
//             width={20}
//           />
//           <span style={{fontFamily:'Gandhi Sans Regular'}} className="ml-1">Download in .Kml</span>{" "}
//         </MenuItem>
//         <MenuItem onClick={handleGeoJSONDownload}>
//           {" "}
//           <VscJson size="25" />{" "}
//           <span  style={{fontFamily:'Gandhi Sans Regular'}} className="ml-1">Download in .geojson</span>{" "}
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// }

// export default Reportmap;















//for scale

import React, { useEffect, useState } from "react";
import { MapContainer,TileLayer, GeoJSON,useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Ziptogeojson from "./Ziptogeojson";
//import { EditControl } from "react-leaflet-draw";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { AiOutlineFileText } from "react-icons/ai";
import kmlFileIcon from "../../../src/assets/images/kml.png";
import { VscJson } from "react-icons/vsc";
import geojsonToKml from "geojson-to-kml";
// import shpwrite from "shp-write";
import shpwrite from '@mapbox/shp-write';

import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import { formattedDate } from "./helpers/generateReportTableData";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import MyControls from "./MyControls";
import Boundary from "./Boundary";
import * as turf from '@turf/turf';
import Slider from '@mui/material/Slider';
import { TbRulerMeasure } from "react-icons/tb";
import L from 'leaflet';
import { useDrawing } from "./contexts/Mapcontext";


function Reportmap(props) {
  // console.log("props.boundary",props.boundary);
  // console.log("props.data",props.data);

  const { editedData, setEditedData } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  // const [bufferData, setBufferData] = useState(null);
  const [value, setValue] = useState(0);
  const [openScale, setOpenScale] = useState(false);
  // const [orgPolyCoords, setOrgPolyCoords] = useState(null);
  const [polyMapPropsCords, setpolyMapPropsCords] = useState(null);
  const { startPolygonDrawing, setStartPolygonDrawing } = useDrawing();
  const [polyEnd, setPolyEnd] = useState(false);
  function PolygonDrawer({ startPolygonDrawing, setStartPolygonDrawing,setPolyEnd }) {
    const map = useMap();
  
    useEffect(() => {
      if (startPolygonDrawing && map) {
        map.pm.enableDraw("Polygon", {
          snappable: true,
          templineStyle: {
            color: "rgb(51, 136, 255)",
          },
        });
  
        map.on("pm:create", () => {
          setStartPolygonDrawing(false);
          setPolyEnd(true);
          map.pm.disableDraw();
        });
      }
    }, [startPolygonDrawing, map]);
  
    useEffect(() => {
      if (polyEnd) {
        const timer = setTimeout(() => {
          setPolyEnd(false);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [polyEnd]);
  
    return null; 
  }


  const _onCreate = (e) => {
    props.setMediumForReport("polygonR")
    const coordinates = e.layer._latlngs;

    const coordinatesForFile = [
      coordinates[0].map((point) => [point.lng, point.lat]),
    ];
    
    props.setShowGeographySign(false);
    props.setNewPolygon(e);
    setEditedData(coordinates[0]);
    const feature = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: coordinatesForFile,
      },
    };
    const featureCollection = {
      type: "FeatureCollection",
      features: [feature],
    };
    const geoJSONString = JSON.stringify(featureCollection, null, 2);
    const blob = new Blob([geoJSONString], { type: "application/json" });
    props.setGeoJson(blob);
  };
  const _onDeleted = (e) => {
    props.removeFile();
    props.setNewPolygon(null);
    props.setGeoJson(null);
  };
  // const _onEditPath = (e) => {};
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  

  const handleShapeFileDownload = async (e) => {
    let featureCollection;
  
    if (editedData && editedData.length > 0) {
      const coordinates = [editedData.map((point) => [point.lng, point.lat])];
      // console.log('coordinates', coordinates);
      const feature = {
        type: "Feature",
        properties: {
          "fill-opacity": 0,
          stroke: "#ff0000",
          "stroke-opacity": 1,
        },
        geometry: {
          type: "Polygon",
          coordinates: coordinates,
        },
      };
      featureCollection = {
        type: "FeatureCollection",
        features: [feature],
      };
    } else if (props.data) {
      featureCollection = props.data;
    } else {
      console.error("No valid data available for download.");
      return;
    }
  
    const baseFilename = `${props.reportName}_myna_${formattedDate()}.zip`;
    const maxLength = 30;
  
    const filename = baseFilename.length > maxLength
      ? `${baseFilename.substring(0, maxLength - 4)}.zip` 
      : baseFilename;
  
    try {
      const zipOptions = {
        folder: 'shapes', 
        outputType: 'blob', 
        compression: 'DEFLATE',
        types: {
          point: 'points',
          polygon: 'polygons',
          polyline: 'lines',
        },
      };
  
      const zipDataPromise = shpwrite.zip(featureCollection, zipOptions);
  
      const zipData = await zipDataPromise;
  
      const url = URL.createObjectURL(zipData);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
  
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error during shapefile download:", error);
    }
  };

  const handleKmlDownload = (e) => {
    if (editedData) {
      const coordinates = [editedData.map((point) => [point.lng, point.lat])];
      const feature = {
        type: "Feature",
        properties: {
          "fill-opacity": 0,
          stroke: "#ff0000",
          "stroke-opacity": 1,
        },
        geometry: {
          type: "Polygon",
          coordinates: coordinates,
        },
      };

      const featureCollection = {
        type: "FeatureCollection",
        features: [feature],
      };
      const kml = geojsonToKml(featureCollection);
      const blob = new Blob([kml], {
        type: "application/octet-stream",
      });
      const url = window.URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download =
        props.reportName + "_myna_" + formattedDate() + ".kml";
      downloadLink.click();
    } else {
      const kml = geojsonToKml(props.data);
      const blob = new Blob([kml], { type: "application/octet-stream" });
      const url = window.URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download =
        props.reportName + "_myna_" + formattedDate() + ".kml";
      downloadLink.click();
    }
  };

  const handleGeoJSONDownload = (e) => {
    if (editedData) {
      const coordinates = [editedData.map((point) => [point.lng, point.lat])];

      const feature = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: coordinates,
        },
      };

      const featureCollection = {
        type: "FeatureCollection",
        features: [feature],
      };
      const geoJSONString = JSON.stringify(featureCollection, null, 2);
      const blob = new Blob([geoJSONString], { type: "application/json" });
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download =
        props.reportName + "_myna_" + formattedDate() + ".geojson";
      downloadLink.click();
    } else {
      const geoJSONString = JSON.stringify(props.data, null, 2);
      const blob = new Blob([geoJSONString], { type: "application/json" });
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download =
        props.reportName + "_myna_" + formattedDate() + ".geojson";
      downloadLink.click();
    }
  };

  const handleEdit = (event) => {
    setEditedData(event?.target?._latlngs[0]);
    const coordinatesForFile = [
      event?.target?._latlngs[0].map((point) => [point.lng, point.lat]),
    ];
    const feature = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: coordinatesForFile,
      },
    };
    const featureCollection = {
      type: "FeatureCollection",
      features: [feature],
    };
    const geoJSONString = JSON.stringify(featureCollection, null, 2);
    const blob = new Blob([geoJSONString], { type: "application/json" });
    props.setGeoJson(blob);
  };

  const createBuffer = (geojson, radius, units = 'kilometers') => {
   if(value  == 0){
    props.setBufferData(null);
    return
   }
    // console.log("geojson in reportmap buffer",geojson)
    const buffered = turf.buffer(geojson, radius, { units }); 
    // console.log("buffered",buffered)
    if((props.selectedState && props.selectedCounty) || props.newPolygon || props.uploadedgeojson){
      props.setBufferData(buffered);
    }
    return buffered;
  };
  
  useEffect(() => {
    const convertLeafletPolygonToGeoJSON = (leafletPolygon) => {
      const latlngs = leafletPolygon?.layer?._latlngs[0]; // Assuming it's a single polygon
    
      const coordinates = latlngs?.map((latlng) => [latlng.lng, latlng.lat]);
    
      // Make sure the polygon is closed (first point == last point)
      if (coordinates?.length && (coordinates[0][0] !== coordinates[coordinates.length - 1][0] ||
                                 coordinates[0][1] !== coordinates[coordinates.length - 1][1])) {
        coordinates.push(coordinates[0]);
      }
    
      return {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [coordinates],
        },
        properties: {},
      };
    };

    const newData = convertLeafletPolygonToGeoJSON(props.newPolygon)
    if(newData){
      setpolyMapPropsCords(newData);
    }
    if (props.boundary || props.data || props.newPolygon || editedData) {
      // console.log("props.boundary",props.boundary);
      // console.log('props.data',props.data);
      // console.log("newData",newData);
     const data = createBuffer(props.boundary || props.data ||newData, value, 'kilometers');
   
    if (data && data?.geometry?.coordinates && props.newPolygon.layer) {
      const coordinates = props.newPolygon.layer._latlngs;
      const coordinatesForFile = [
        coordinates[0].map((point) => [point.lng, point.lat]),
      ];
      if(coordinatesForFile){
        props.setOrgPolyCoords(coordinatesForFile);
      }

      const coords = data.geometry.coordinates[0].map(([lng, lat]) => L.latLng(lat, lng));
      // console.log("coords", coords);

      // Here you would directly update the coordinates of the selected polygon
      // This assumes the polygon is part of a Leaflet layer
      const modifiedPolygon = props.newPolygon.layer;
      modifiedPolygon.setLatLngs([coords]); // Update the polygon with new latlngs
      // setBufferData(modifiedPolygon);
      // console.log("modifiedData", modifiedPolygon);
    }

    }else{
      props.setBufferData(null);
    }
  }, [props.boundary, props.data,props.newPolygon,editedData]); 


  
  

  
  // console.log("value",value)
  const handleScale =()=>{
    if( (props.selectedCounty && props.selectedState && !props.selectedLocality) ||
    props.data !== null ||
   //  props.boundary ||
    props.newPolygon){
      setOpenScale(!openScale);
    }
    return
  }
  
  // console.log(`buffer-${value}`)
  // console.log("bufferData",bufferData);
  // console.log("props.newPolygon",props.newPolygon);
  // console.log("uploadedgeojson",props.uploadedgeojson);
  // console.log("editedData",editedData);



  function ensureRingClosed(geojson) {
    // If it's a FeatureCollection
    if (geojson.type === 'FeatureCollection') {
      geojson.features = geojson.features.map((feature) => {
        return {
          ...feature,
          geometry: closeGeometryRing(feature.geometry),
        };
      });
    }
  
    // If it's a single Feature
    else if (geojson.type === 'Feature') {
      geojson.geometry = closeGeometryRing(geojson.geometry);
    }
  
    // If it's just geometry (Polygon or MultiPolygon)
    else {
      geojson = closeGeometryRing(geojson);
    }
  
    return geojson;
  }
  
  function closeGeometryRing(geometry) {
    if (geometry.type === 'Polygon') {
      geometry.coordinates = geometry.coordinates.map((ring) => {
        const first = ring[0];
        const last = ring[ring.length - 1];
        if (first[0] !== last[0] || first[1] !== last[1]) {
          ring.push([...first]);
        }
        return ring;
      });
    } else if (geometry.type === 'MultiPolygon') {
      geometry.coordinates = geometry.coordinates.map((polygon) =>
        polygon.map((ring) => {
          const first = ring[0];
          const last = ring[ring.length - 1];
          if (first[0] !== last[0] || first[1] !== last[1]) {
            ring.push([...first]);
          }
          return ring;
        })
      );
    }
    return geometry;
  }
  
  
useEffect(()=>{

  if(props.selectedState || props.selectedLocality){
    setValue(0)
  }

},[props.selectedState, props.selectedLocality]);


  
  return (
    <div className="mt-14 md:mt-0  w-[100%] relative">
    {/* <div style={{backgroundColor:"rgb(218 184 48)",cursor:
     (props.selectedCounty && props.selectedState && !props.selectedLocality) ||
     props.data !== null ||
    //  props.boundary ||
     props.newPolygon
        ? "pointer"
        : "not-allowed",}} className="h-[2.5rem] w-[2.5rem] z-[1000]  absolute top-[12px] left-[4rem] text-[1.4rem] flex justify-center items-center rounded-sm cursor-pointer  hover:bg-gray-200 border-slate-400 transition-colors duration-200" onClick={handleScale}><TbRulerMeasure style={{color:"rgb(100 98 88)"}}/></div>   */}
    {/* {openScale &&
      <div className="w-[10%] absolute z-[1000000] top-[56px] left-[76px]">
        <Slider
          value={value}
          onChange={(e, newValue) => {
            setValue(newValue);
            if (props.boundary || props.data !== null || polyMapPropsCords || props.newPolygon) {
              createBuffer(props.boundary || props.data || polyMapPropsCords, newValue, 'kilometers');
            }
          }}     valueLabelDisplay="auto"
          min={0}
          max={10}
        />
        <div style={{fontFamily:'Gandhi Sans Regular',backgroundColor:"rgb(218 184 48)",color:"rgb(100 98 88)"}}  className=" text-center width-[5rem] min-w-[3rem]"> {value} KM</div>
      </div>
    } */}
      <MapContainer
        className="h-[95vh] md:h-[100vh] relative w-[100%]"
        center={[25.21, 79.32]}
        zoom={4}
        scrollWheelZoom={true}
      // zoomControl={false}
      >
                <PolygonDrawer
    startPolygonDrawing={startPolygonDrawing}
    setStartPolygonDrawing={setStartPolygonDrawing}
    setPolyEnd={setPolyEnd}
  />

        <ReactLeafletGoogleLayer
          googleMapsLoaderConf={{ region: "IN" }}
          apiKey={process.env.REACT_APP_API_KEY}
        />
         {props.bufferData &&(
            <GeoJSON  key={`buffer-${value}`} data={ props.bufferData } style={{ color: '#4F9BC0', weight: 2, fillOpacity: 0.3 }} />
          )}
           {props.newPolygon && props.orgPolyCoords && (
            <GeoJSON  key={`Polybuffer-${value}`} data={props.orgPolyCoords} style={{ color: '#4F9BC0', weight: 2, fillOpacity: 0.3 }} />
          )}
         <style jsx>{`
        .leaflet-control-attribution {
          display: none;
        }                                                                                                                                                                                                                                                       
      `}</style>


        {!props.selectedState && (
          <MyControls
            _onDeleted={_onDeleted}
            _onCreate={_onCreate}
            data={props.data}
            newPolygon={props.newPolygon}
            setArea={props.setArea}
            uploadedgeojson={
              props.uploadedgeojson ? ensureRingClosed(props.uploadedgeojson) : null
            }
            bufferData={props.bufferData}
          />
        )}

        {props?.data !== null && (
          <Ziptogeojson
            setData={props?.setData}
            toast={props.toast}
            data={props?.data}
            handleEdit={handleEdit}
            onReport={false}
            onDelete={_onDeleted}
            isZoomRequired={props.isZoomRequired}
            setIsZoomRequired={props.setIsZoomRequired}
            setArea={props.setArea}
          />
        )}
        {props.boundary && 
          <Boundary
            data={props.boundary}
            setData={props.setBoundary}
            isStateData={props.isStateData}
            selectedState={props.selectedState}
          />
        } 
      </MapContainer>
      <div className="download-div">
        <IconButton onClick={handleClick} id="account-menu">
          <FileDownloadOutlinedIcon
            fontSize="small"
            style={{ color: "#000" }}
          />
        </IconButton>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleShapeFileDownload} sx={{ cursor: "pointer" }}>
          <AiOutlineFileText size="25" />
          <span style={{fontFamily:'Gandhi Sans Regular'}} className="ml-1">Download in ShapeFile.zip</span>
        </MenuItem>
        <MenuItem onClick={handleKmlDownload} sx={{ cursor: "pointer" }}>
          {" "}
          <img
            className="me-1.5"
            src={kmlFileIcon}
            alt="img"
            height="20"
            width={20}
          />
          <span style={{fontFamily:'Gandhi Sans Regular'}} className="ml-1">Download in .Kml</span>{" "}
        </MenuItem>
        <MenuItem onClick={handleGeoJSONDownload}>
          {" "}
          <VscJson size="25" />{" "}
          <span  style={{fontFamily:'Gandhi Sans Regular'}} className="ml-1">Download in .geojson</span>{" "}
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Reportmap;



//for layers

// import React, { useState,useEffect } from "react";
// import { MapContainer,TileLayer, GeoJSON,useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import Ziptogeojson from "./Ziptogeojson";
// //import { EditControl } from "react-leaflet-draw";
// import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
// import { IconButton, Menu, MenuItem } from "@mui/material";
// import { AiOutlineFileText } from "react-icons/ai";
// import kmlFileIcon from "../../../src/assets/images/kml.png";
// import { VscJson } from "react-icons/vsc";
// import geojsonToKml from "geojson-to-kml";
// // import shpwrite from "shp-write";
// import shpwrite from '@mapbox/shp-write';

// import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
// import { formattedDate } from "./helpers/generateReportTableData";
// import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
// import MyControls from "./MyControls";
// import Boundary from "./Boundary";
// import L from "leaflet";
// import { useDrawing } from "./contexts/Mapcontext";

// function Reportmap(props) {
//   const { editedData, setEditedData } = props;
//   const [anchorEl, setAnchorEl] = useState(null);
//   const { startPolygonDrawing, setStartPolygonDrawing } = useDrawing();
//   const [polyEnd, setPolyEnd] = useState(false);


// // Separate component inside Reportmap
// function PolygonDrawer({ startPolygonDrawing, setStartPolygonDrawing,setPolyEnd }) {
//   const map = useMap();

//   useEffect(() => {
//     if (startPolygonDrawing && map) {
//       map.pm.enableDraw("Polygon", {
//         snappable: true,
//         templineStyle: {
//           color: "rgb(51, 136, 255)",
//         },
//       });

//       map.on("pm:create", () => {
//         setStartPolygonDrawing(false);
//         setPolyEnd(true);
//         map.pm.disableDraw();
//       });
//     }
//   }, [startPolygonDrawing, map]);

//   useEffect(() => {
//     if (polyEnd) {
//       const timer = setTimeout(() => {
//         setPolyEnd(false);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [polyEnd]);

//   return null; 
// }


//   const _onCreate = (e) => {
//     props.setMediumForReport("polygonR")
//     const coordinates = e.layer._latlngs;
//     const coordinatesForFile = [
//       coordinates[0].map((point) => [point.lng, point.lat]),
//     ];
//     props.setShowGeographySign(false);
//     props.setNewPolygon(e);
//     setEditedData(coordinates[0]);
//     const feature = {
//       type: "Feature",
//       properties: {},
//       geometry: {
//         type: "Polygon",
//         coordinates: coordinatesForFile,
//       },
//     };
//     const featureCollection = {
//       type: "FeatureCollection",
//       features: [feature],
//     };
//     const geoJSONString = JSON.stringify(featureCollection, null, 2);
//     const blob = new Blob([geoJSONString], { type: "application/json" });
//     props.setGeoJson(blob);
//   };
//   const _onDeleted = (e) => {
//     props.removeFile();
//     props.setNewPolygon(null);
//     props.setGeoJson(null);
//   };
//   // const _onEditPath = (e) => {};
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

  

//   const handleShapeFileDownload = async (e) => {
//     let featureCollection;
  
//     if (editedData && editedData.length > 0) {
//       const coordinates = [editedData.map((point) => [point.lng, point.lat])];
//       console.log('coordinates', coordinates);
//       const feature = {
//         type: "Feature",
//         properties: {
//           "fill-opacity": 0,
//           stroke: "#ff0000",
//           "stroke-opacity": 1,
//         },
//         geometry: {
//           type: "Polygon",
//           coordinates: coordinates,
//         },
//       };
//       featureCollection = {
//         type: "FeatureCollection",
//         features: [feature],
//       };
//     } else if (props.data) {
//       featureCollection = props.data;
//     } else {
//       console.error("No valid data available for download.");
//       return;
//     }
  
//     const baseFilename = `${props.reportName}_myna_${formattedDate()}.zip`;
//     const maxLength = 30;
  
//     const filename = baseFilename.length > maxLength
//       ? `${baseFilename.substring(0, maxLength - 4)}.zip` 
//       : baseFilename;
  
//     try {
//       const zipOptions = {
//         folder: 'shapes', 
//         outputType: 'blob', 
//         compression: 'DEFLATE',
//         types: {
//           point: 'points',
//           polygon: 'polygons',
//           polyline: 'lines',
//         },
//       };
  
//       const zipDataPromise = shpwrite.zip(featureCollection, zipOptions);
  
//       const zipData = await zipDataPromise;
  
//       const url = URL.createObjectURL(zipData);
  
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = filename;
//       document.body.appendChild(a);
//       a.click();
  
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error during shapefile download:", error);
//     }
//   };

//   const handleKmlDownload = (e) => {
//     if (editedData) {
//       const coordinates = [editedData.map((point) => [point.lng, point.lat])];
//       const feature = {
//         type: "Feature",
//         properties: {
//           "fill-opacity": 0,
//           stroke: "#ff0000",
//           "stroke-opacity": 1,
//         },
//         geometry: {
//           type: "Polygon",
//           coordinates: coordinates,
//         },
//       };

//       const featureCollection = {
//         type: "FeatureCollection",
//         features: [feature],
//       };
//       const kml = geojsonToKml(featureCollection);
//       const blob = new Blob([kml], {
//         type: "application/octet-stream",
//       });
//       const url = window.URL.createObjectURL(blob);
//       const downloadLink = document.createElement("a");
//       downloadLink.href = url;
//       downloadLink.download =
//         props.reportName + "_myna_" + formattedDate() + ".kml";
//       downloadLink.click();
//     } else {
//       const kml = geojsonToKml(props.data);
//       const blob = new Blob([kml], { type: "application/octet-stream" });
//       const url = window.URL.createObjectURL(blob);
//       const downloadLink = document.createElement("a");
//       downloadLink.href = url;
//       downloadLink.download =
//         props.reportName + "_myna_" + formattedDate() + ".kml";
//       downloadLink.click();
//     }
//   };

//   const handleGeoJSONDownload = (e) => {
//     if (editedData) {
//       const coordinates = [editedData.map((point) => [point.lng, point.lat])];

//       const feature = {
//         type: "Feature",
//         properties: {},
//         geometry: {
//           type: "Polygon",
//           coordinates: coordinates,
//         },
//       };

//       const featureCollection = {
//         type: "FeatureCollection",
//         features: [feature],
//       };
//       const geoJSONString = JSON.stringify(featureCollection, null, 2);
//       const blob = new Blob([geoJSONString], { type: "application/json" });
//       const downloadLink = document.createElement("a");
//       downloadLink.href = URL.createObjectURL(blob);
//       downloadLink.download =
//         props.reportName + "_myna_" + formattedDate() + ".geojson";
//       downloadLink.click();
//     } else {
//       const geoJSONString = JSON.stringify(props.data, null, 2);
//       const blob = new Blob([geoJSONString], { type: "application/json" });
//       const downloadLink = document.createElement("a");
//       downloadLink.href = URL.createObjectURL(blob);
//       downloadLink.download =
//         props.reportName + "_myna_" + formattedDate() + ".geojson";
//       downloadLink.click();
//     }
//   };

//   const handleEdit = (event) => {
//     setEditedData(event?.target?._latlngs[0]);
//     const coordinatesForFile = [
//       event?.target?._latlngs[0].map((point) => [point.lng, point.lat]),
//     ];
//     const feature = {
//       type: "Feature",
//       properties: {},
//       geometry: {
//         type: "Polygon",
//         coordinates: coordinatesForFile,
//       },
//     };
//     const featureCollection = {
//       type: "FeatureCollection",
//       features: [feature],
//     };
//     const geoJSONString = JSON.stringify(featureCollection, null, 2);
//     const blob = new Blob([geoJSONString], { type: "application/json" });
//     props.setGeoJson(blob);
//   };
 

  
  
  



//   return (
//     <div className="mt-14 md:mt-0  w-[100%] leaflet-container">
//       <MapContainer
//         className="h-[95vh] md:h-[100vh] relative w-[100%]"
//         center={[25.21, 79.32]}
//         zoom={4}
//         scrollWheelZoom={true}
//       // zoomControl={false}
//       maxBounds={[
//         [6, 68],  
//         [37, 97],  
//       ]}
//       maxBoundsViscosity={1.0}
//       >
//           {/* <PaneCreator />  */}
  
//           <PolygonDrawer
//     startPolygonDrawing={startPolygonDrawing}
//     setStartPolygonDrawing={setStartPolygonDrawing}
//     setPolyEnd={setPolyEnd}
//   />
      

//         <ReactLeafletGoogleLayer
//           googleMapsLoaderConf={{ region: "IN" }}
//           apiKey={process.env.REACT_APP_API_KEY}
//         />
//          <style jsx>{`
//         .leaflet-control-attribution {
//           display: none;
//         }
          
//       `}</style>


//         {!props.selectedState && (
//           <MyControls
//             _onDeleted={_onDeleted}
//             _onCreate={_onCreate}
//             data={props.data}
//             newPolygon={props.newPolygon}
//             setArea={props.setArea}
//             uploadedgeojson={props.uploadedgeojson}
//           />
//         )}

//         {props?.data !== null && (
//           <Ziptogeojson
//             setData={props?.setData}
//             toast={props.toast}
//             data={props?.data}
//             handleEdit={handleEdit}
//             onReport={false}
//             onDelete={_onDeleted}
//             isZoomRequired={props.isZoomRequired}
//             setIsZoomRequired={props.setIsZoomRequired}
//             setArea={props.setArea}
//           />
//         )}
//         {props.boundary &&
//           <Boundary
//             data={props.boundary}
//             setData={props.setBoundary}
//             isStateData={props.isStateData}
//           />
//         } 
//         {polyEnd && window.innerWidth < 600 &&(
//           <div className="tooltip-message  absolute top-[206px] left-14  bg-yellow-200 text-black px-4 py-2 rounded shadow-lg z-[1000000]">
//             Next - Open menu and generate report
//           </div>
//         )}
//       </MapContainer>
//       <div className="download-div">
//         <IconButton onClick={handleClick} id="account-menu">
//           <FileDownloadOutlinedIcon
//             fontSize="small"
//             style={{ color: "#000" }}
//           />
//         </IconButton>
//       </div>
//       <Menu
//         anchorEl={anchorEl}
//         id="account-menu"
//         open={open}
//         onClose={() => setAnchorEl(null)}
//         onClick={() => setAnchorEl(null)}
//         transformOrigin={{ horizontal: "right", vertical: "top" }}
//         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//       >
//         <MenuItem onClick={handleShapeFileDownload} sx={{ cursor: "pointer" }}>
//           <AiOutlineFileText size="25" />
//           <span style={{fontFamily:'Gandhi Sans Regular'}} className="ml-1">Download in ShapeFile.zip</span>
//         </MenuItem>
//         <MenuItem onClick={handleKmlDownload} sx={{ cursor: "pointer" }}>
//           {" "}
//           <img
//             className="me-1.5"
//             src={kmlFileIcon}
//             alt="img"
//             height="20"
//             width={20}
//           />
//           <span style={{fontFamily:'Gandhi Sans Regular'}} className="ml-1">Download in .Kml</span>{" "}
//         </MenuItem>
//         <MenuItem onClick={handleGeoJSONDownload}>
//           {" "}
//           <VscJson size="25" />{" "}
//           <span  style={{fontFamily:'Gandhi Sans Regular'}} className="ml-1">Download in .geojson</span>{" "}
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// }

// export default Reportmap;
