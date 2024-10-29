import React, { useState } from "react";
import { MapContainer } from "react-leaflet";
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

function Reportmap(props) {
  const { editedData, setEditedData } = props;
  const [anchorEl, setAnchorEl] = useState(null);
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

  // const handleShapeFileDownload = async (e) => {
  //   if (editedData) {
  //     const coordinates = [editedData.map((point) => [point.lng, point.lat])];

  //     const feature = {
  //       type: "Feature",
  //       properties: {
  //         "fill-opacity": 0,
  //         stroke: "#ff0000",
  //         "stroke-opacity": 1,
  //       },
  //       geometry: {
  //         type: "Polygon",
  //         coordinates: coordinates,
  //       },
  //     };

  //     const featureCollection = {
  //       type: "FeatureCollection",
  //       features: [feature],
  //     };
  //     shpwrite.download(featureCollection);
  //   } else {
  //     shpwrite.download(props.data);
  //   }
  // };

  const handleShapeFileDownload = async (e) => {
    let featureCollection;
  
    if (editedData && editedData.length > 0) {
      const coordinates = [editedData.map((point) => [point.lng, point.lat])];
      console.log('coordinates', coordinates);
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

  return (
    <div className="mt-14 md:mt-0  w-[100%]">
      <MapContainer
        className="h-[95vh] md:h-[100vh] relative w-[100%]"
        center={[25.21, 79.32]}
        zoom={5}
        scrollWheelZoom={true}
      // zoomControl={false}
      >

        <ReactLeafletGoogleLayer
          googleMapsLoaderConf={{ region: "IN" }}
          apiKey={process.env.REACT_APP_API_KEY}
        />
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
            uploadedgeojson={props.uploadedgeojson}
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

