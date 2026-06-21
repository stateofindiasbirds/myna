import React, { useEffect, useState, useRef } from "react";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Ziptogeojson from "./Ziptogeojson";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { AiOutlineFileText } from "react-icons/ai";
import kmlFileIcon from "../../../src/assets/images/kml.png";
import { VscJson } from "react-icons/vsc";
import geojsonToKml from "geojson-to-kml";
import shpwrite from '@mapbox/shp-write';
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import { formattedDate } from "./helpers/generateReportTableData";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import MyControls from "./MyControls";
import Boundary from "./Boundary"; 
import * as turf from '@turf/turf';
import Slider from '@mui/material/Slider';
import { TbRulerMeasure } from "react-icons/tb";
import { useDrawing } from "./contexts/Mapcontext";
import L from 'leaflet';

function Reportmap(props) {
  const { editedData, setEditedData } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  // const [props.bufferArea, props.setBufferArea] = useState(0); 
  const [openScale, setOpenScale] = useState(false);
  const { startPolygonDrawing, setStartPolygonDrawing } = useDrawing();
  const [polyEnd, setPolyEnd] = useState(false);
  const [geometryType, setGeometryType] = useState(null);

  // Track the last processed source to avoid infinite loops or missing updates
  const lastSourceRef = useRef(null);

  // --- COMPONENT: PolygonDrawer ---
  function PolygonDrawer({ startPolygonDrawing, setStartPolygonDrawing, setPolyEnd }) {
    const map = useMap();
    useEffect(() => {
      if (startPolygonDrawing && map) {
        map.pm.enableDraw("Polygon", {
          snappable: true,
          templineStyle: { color: "rgb(51, 136, 255)" },
        });
        map.on("pm:create", (e) => {
          setStartPolygonDrawing(false);
          setPolyEnd(true);
          map.pm.disableDraw();
        });
      }
    }, [startPolygonDrawing, map]);
    return null;
  }

  // --- UTILITY: Robust Geometry Converter ---
  // const convertToTurfGeoJSON = (source) => {
  //   if (!source) return null;

  //   // Case 1: Standard GeoJSON FeatureCollection/Feature (Uploads/Boundaries)
  //   if (source.type === "FeatureCollection" && source.features.length > 0) return source.features[0];
  //   if (source.type === "Feature") return source;

  //   // Case 2: Leaflet Layer (Manual Drawing)
  //   let layer = source.layer || source; // Handle if passed as event or direct layer
  //   if (layer && typeof layer.getLatLngs === 'function') {
  //     const pmType = layer.options?.pmType || (layer instanceof L.Polyline && !(layer instanceof L.Polygon) ? 'Line' : 'Polygon');
  //     const latLngs = layer.getLatLngs();
      
  //     // Flatten Leaflet's nested arrays for Polygons
  //     const coords = (pmType === 'Polygon') ? latLngs[0] : latLngs;
  //     const turfCoords = coords.map(ll => [ll.lng, ll.lat]);

  //     if (pmType === 'Line' || pmType === 'Polyline') {
  //       return turf.lineString(turfCoords);
  //     } else {
  //       // Ensure polygon is closed for Turf
  //       const closedCoords = [...turfCoords];
  //       if (closedCoords[0][0] !== closedCoords[closedCoords.length-1][0] || 
  //           closedCoords[0][1] !== closedCoords[closedCoords.length-1][1]) {
  //         closedCoords.push(closedCoords[0]);
  //       }
  //       return turf.polygon([closedCoords]);
  //     }
  //   }
  //   return null;
  // };

//  Recent working code ????????
  // const convertToTurfGeoJSON = (source) => {
  //   if (!source) return null;

  //   // Case 1: Standard GeoJSON (Uploads/Boundaries)
  //   if (source.type === "FeatureCollection" && source.features.length > 0) return source.features[0];
  //   if (source.type === "Feature") return source;

  //   // Case 2: Leaflet Layer (Manual Drawing)
  //   let layer = source.layer || source; 
  //   if (layer && typeof layer.getLatLngs === 'function') {
      
  //     // IMPROVED DETECTION:
  //     // Check pmType first, then fallback to Leaflet instance checks
  //     const pmType = layer.options?.pmType || layer.options?.pm?.pmType || (layer instanceof L.Polyline && !(layer instanceof L.Polygon) ? 'Line' : 'Polygon');
  //       //     const pmType = layer.options?.pmType || (layer instanceof L.Polyline && !(layer instanceof L.Polygon) ? 'Line' : 'Polygon');

  //     const latLngs = layer.getLatLngs();
      
  //     // Normalize latLngs (Polygons are nested [[...]], Lines are flat [...])
  //     const isPolygon = pmType === 'Polygon' || Array.isArray(latLngs[0]);
  //     const coords = isPolygon ? latLngs[0] : latLngs;
  //     const turfCoords = coords.map(ll => [ll.lng, ll.lat]);

  //     if (!isPolygon) {
  //       // Return a true LineString (No closing logic)
  //       return turf.lineString(turfCoords);
  //     } else {
  //       // Handle Polygon Closing
  //       const closedCoords = [...turfCoords];
  //       const first = closedCoords[0];
  //       const last = closedCoords[closedCoords.length - 1];
        
  //       if (first[0] !== last[0] || first[1] !== last[1]) {
  //         closedCoords.push(first);
  //       }
  //       return turf.polygon([closedCoords]);
  //     }
  //   }
  //   return null;
  // };
const convertToTurfGeoJSON = (source) => {
  if (!source) return null;

  // --- CASE 1: Standard GeoJSON (Uploads/Boundaries/State) ---
  if (source.type === "FeatureCollection" && source.features.length > 0 || source.type === "Feature") {
    let feature = source.type === "FeatureCollection" ? source.features[0] : source;

    // Deep clone to avoid mutating the original data
    let cleanFeature = JSON.parse(JSON.stringify(feature));

    // FIX: Ensure Polygon is closed for Turf.js
    if (cleanFeature.geometry && cleanFeature.geometry.type === "Polygon") {
      const coords = cleanFeature.geometry.coordinates[0];
      
      if (coords && coords.length >= 3) {
        const first = coords[0];
        const last = coords[coords.length - 1];

        // If first and last points don't match, Turf will throw the LinearRing error
        if (first[0] !== last[0] || first[1] !== last[1]) {
          coords.push([first[0], first[1]]);
        }
      }
    }
    return cleanFeature;
  }

  // --- CASE 2: Leaflet Layer (Manual Drawing) ---
  let layer = source.layer || source; 
  if (layer && typeof layer.getLatLngs === 'function') {
    const pmType = layer.options?.pmType || layer.options?.pm?.pmType || (layer instanceof L.Polyline && !(layer instanceof L.Polygon) ? 'Line' : 'Polygon');

    const latLngs = layer.getLatLngs();
    
    const isPolygon = pmType === 'Polygon' || Array.isArray(latLngs[0]);
    const coords = isPolygon ? latLngs[0] : latLngs;
    const turfCoords = coords.map(ll => [ll.lng, ll.lat]);

    if (!isPolygon) {
      // Return a true LineString (No closing logic)
      return turf.lineString(turfCoords);
    } else {
      // Handle Polygon Closing
      const closedCoords = [...turfCoords];
      if (closedCoords.length > 0) {
        const first = closedCoords[0];
        const last = closedCoords[closedCoords.length - 1];
        
        if (first[0] !== last[0] || first[1] !== last[1]) {
          closedCoords.push(first);
        }
        return turf.polygon([closedCoords]);
      }
    }
  }
  return null;
};

  // --- EFFECT: Default 5km for LineStrings ---
  // useEffect(() => {
  //   const sourceData = props.data || props.uploadedgeojson || props.newPolygon;
  //   if (sourceData) {
  //     const feature = convertToTurfGeoJSON(sourceData);
  //     // Trigger 5km default only if it's a LineString and slider is at 0
  //     if (feature?.geometry?.type === "LineString" && props.bufferArea === 0) {
  //       props.setBufferArea(5);
  //     }
  //   }
  // }, [props.data, props.uploadedgeojson, props.newPolygon]);

  useEffect(() => {
  const sourceData = props.data || props.uploadedgeojson || props.newPolygon;
  const feature = convertToTurfGeoJSON(sourceData);
  const type = feature?.geometry?.type;
  
  setGeometryType(type);

  if (type === "LineString" && props.bufferArea < 1) {
    props.setBufferArea(5); // Default to 5 if it's a new LineString
  }
}, [props.data, props.uploadedgeojson, props.newPolygon]);

  // --- EFFECT: Buffer Generation (Works for ALL sources) ---
  useEffect(() => {
    const sourceData = props.newPolygon || props.data || props.boundary || props.uploadedgeojson;
    
    if (sourceData) {
      const turfFeature = convertToTurfGeoJSON(sourceData);
      
      if (turfFeature && props.bufferArea > 0) {
        try {
          const buffered = turf.buffer(turfFeature, props.bufferArea, { units: 'kilometers' });
          props.setBufferData(buffered);
          
          // Generate blob for the report
          const featureCollection = { type: "FeatureCollection", features: [buffered] };
          const blob = new Blob([JSON.stringify(featureCollection)], { type: "application/json" });
          props.setGeoJson(blob);
        } catch (e) {
          console.error("Turf Buffer Error:", e);
        }
      } else if (props.bufferArea === 0) {
        props.setBufferData(null);

        const featureCollection = { 
          type: "FeatureCollection", 
          features: [
            turfFeature.type === "Feature" 
              ? turfFeature 
              : { type: "Feature", properties: {}, geometry: turfFeature.geometry || turfFeature }
          ] 
        };
        const blob = new Blob([JSON.stringify(featureCollection)], { type: "application/json" });
        props.setGeoJson(blob);
      }
    } else {
      props.setBufferData(null);
      props.setGeoJson(null);
    }
  }, [props.bufferArea, props.data, props.newPolygon, props.boundary, props.uploadedgeojson]);

  // Rest of your handlers (unchanged)
  // const _onCreate = (e) => {
  //   props.setMediumForReport("polygonR");
  //   const latlngs = e.layer.getLatLngs();
  //   const flat = Array.isArray(latlngs[0]) ? latlngs[0] : latlngs;
  //   props.setOrgPolyCoords(flat.map(p => [p.lng, p.lat]));
  //   props.setNewPolygon(e); 
  //   setEditedData(flat);
  // };
const _onCreate = (e) => {
    props.setMediumForReport("polygonR");
    // props.setNewPolygon(e.layer);
    
    // 1. Get the raw coordinates from the layer
    const latlngs = e.layer.getLatLngs();
    
    // 2. Identify the type (Polygon vs Polyline/Line)
    // Polygons have nested arrays, Polylines are flat
    const isPolygon = Array.isArray(latlngs[0]);
    
    // 3. Flatten only if it's a Polygon
    const flat = isPolygon ? latlngs[0] : latlngs;

    // Safety check: Ensure flat is an array before mapping
    if (Array.isArray(flat)) {
        const geoCoords = flat.map(p => [p.lng, p.lat]);
        props.setOrgPolyCoords(geoCoords);
        setEditedData(flat);
    }

    props.setNewPolygon(e); 
  };

  const _onDeleted = () => {
    props.removeFile();
    props.setNewPolygon(null);
    props.setGeoJson(null);
    props.setBufferData(null);
    props.setOrgPolyCoords(null);
    props.setBufferArea(0);
  };

  const handleEdit = (event) => {
    const rawLatLngs = event?.target?._latlngs[0] || event?.target?._latlngs;
    setEditedData(rawLatLngs);
    const geoJsonCoords = rawLatLngs.map((p) => [p.lng, p.lat]);
    props.setOrgPolyCoords(geoJsonCoords);
  };

  // --- DOWNLOAD HANDLERS ---
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

const handleGeoJSONDownload = () => {
  // 1. Identify the source
  const sourceData = props.bufferData || props.data || props.boundary || props.newPolygon;
  if (!sourceData) return;

  try {
    // 2. Clean the data to avoid Circular Structure errors
    const turfResult = convertToTurfGeoJSON(sourceData);

    // 3. Wrap in FeatureCollection for backend compatibility
    const featureCollection = {
      type: "FeatureCollection",
      features: [
        turfResult.type === "Feature" 
          ? turfResult 
          : { type: "Feature", properties: {}, geometry: turfResult.geometry || turfResult }
      ]
    };

    // 4. Use props for the filename (defaulting to 'Report' if prop is missing)
    const fileName = props.reportName || `Report_${formattedDate()}`;

    const blob = new Blob([JSON.stringify(featureCollection)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.geojson`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("GeoJSON Download Error:", err);
  }
};

const handleKmlDownload = () => {
  const sourceData = props.bufferData || props.data || props.boundary || props.newPolygon;
  if (!sourceData) return;

  try {
    const turfResult = convertToTurfGeoJSON(sourceData);

    const featureCollection = {
      type: "FeatureCollection",
      features: [
        turfResult.type === "Feature" 
          ? turfResult 
          : { type: "Feature", properties: {}, geometry: turfResult.geometry || turfResult }
      ]
    };

    const kml = geojsonToKml(featureCollection);
    const fileName = props.reportName || `Report_${formattedDate()}`;

    const blob = new Blob([kml], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.kml`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("KML Download Error:", err);
  }
};

  return (
    <div className="mt-14 md:mt-0 w-[100%] relative">
      <div 
        style={{ 
          backgroundColor: "rgb(218 184 48)",
          cursor: (props.selectedCounty || props.data || props.newPolygon || props.boundary) ? "pointer" : "not-allowed"
        }} 
        className="h-[2.5rem] w-[2.5rem] z-[1000] absolute top-[12px] left-[4rem] flex justify-center items-center rounded-sm"
        onClick={() => setOpenScale(!openScale)}
      >
        <TbRulerMeasure style={{ color: "rgb(100 98 88)" }} />
      </div>

      {openScale && (
        <div className="w-[150px] absolute z-[1000] top-[56px] left-[76px] bg-white p-3 rounded shadow-lg border">
          <Slider 
          value={props.bufferArea} 
          min={geometryType === "LineString" ? 1 : 0}
          max={10} 
          step={0.1} 
          onChange={(e, val) => props.setBufferArea(val)} 
          valueLabelDisplay="auto" 
          />
          <div className="text-center text-sm font-bold bg-[#dab830] p-1 rounded">
            {props.bufferArea} KM
          </div>
        </div>
      )}

      <MapContainer className="h-[95vh] md:h-[100vh] w-[100%]" center={[25.21, 79.32]} zoom={4}>
        <PolygonDrawer startPolygonDrawing={startPolygonDrawing} setStartPolygonDrawing={setStartPolygonDrawing} setPolyEnd={setPolyEnd} />
        <ReactLeafletGoogleLayer googleMapsLoaderConf={{ region: "IN" }} apiKey={process.env.REACT_APP_API_KEY} />

        {props.bufferData && (
          // <GeoJSON 
          //   key={`buffer-layer-${props.bufferArea}-${JSON.stringify(props.bufferData.geometry)}`} 
          //   data={props.bufferData} 
          //   style={{ color: '#4F9BC0', weight: 2, fillOpacity: 0.3 }} 
          // />
        
  <GeoJSON 
    key={`buffer-${props.bufferArea}`} 
    data={props.bufferData} 
    style={(feature) => ({
      color: '#4F9BC0',
      weight: 2,
      fillColor: '#4F9BC0',
      fillOpacity: 0.3,
      // Ensure the stroke doesn't close if it's somehow passed as a LineString
      noClip: true 
    })} 
  />
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
            uploadedgeojson={props.uploadedgeojson} 
          />
        )}
{console.log(">>>>>>>>>>>>>>>>>>",props.data)}
        {props.data !== null && (
          <Ziptogeojson
            data={props.data}
            setData={props.setData}
            handleEdit={handleEdit}
            onDelete={_onDeleted}
            isZoomRequired={props.isZoomRequired}
            setIsZoomRequired={props.setIsZoomRequired}
            setArea={props.setArea}
          />
        )}

        {props.boundary && (
          <Boundary
            data={props.boundary}
            setData={props.setBoundary}
            isStateData={props.isStateData}
            selectedState={props.selectedState}
          />
        )}
      </MapContainer>

      {/* Download UI */}
      <div className="download-div">
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <FileDownloadOutlinedIcon fontSize="small" style={{ color: "#000" }} />
        </IconButton>
      </div>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={handleShapeFileDownload}><AiOutlineFileText size="25" /> <span className="ml-2">ShapeFile (.zip)</span></MenuItem>
        <MenuItem onClick={handleKmlDownload}><img src={kmlFileIcon} alt="kml" height="20" width={20} /> <span className="ml-2">KML (.kml)</span></MenuItem>
        <MenuItem onClick={handleGeoJSONDownload}><VscJson size="25" /> <span className="ml-2">GeoJSON (.geojson)</span></MenuItem>
      </Menu>
    </div>
  );
}

export default Reportmap;
