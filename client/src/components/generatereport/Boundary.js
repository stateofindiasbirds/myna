import React, { useEffect } from "react";
import { GeoJSON, useMap } from "react-leaflet";
import {
  calculateCentroid,
  calculateZoom,
} from "./helpers/helperFunctions";
import { toast } from 'react-toastify';

function Boundary(props) {
  const map = useMap();

  useEffect(() => {
    if (!props.data) return;

    try {
      map.invalidateSize();

      // --- STEP 1: Normalize Data Structure ---
      // Handle both FeatureCollection (props.data.features[0]) 
      // and single Feature (returned by convertToTurfGeoJSON)
      const feature = props.data.type === "FeatureCollection" 
        ? props.data.features[0] 
        : props.data;

      const geometry = feature?.geometry;
      const properties = feature?.properties;

      if (!geometry) return;

      let arrayOfCords = null;

      // --- STEP 2: Extract Coordinates based on Type ---
      if (geometry.type === 'Polygon') {
        // Polygons are [[lng, lat], ...]
        arrayOfCords = geometry.coordinates[0];
      } 
      else if (geometry.type === 'MultiPolygon') {
        // MultiPolygons are [[[lng, lat], ...]]
        // We take the first ring of the first polygon part
        arrayOfCords = geometry.coordinates[0][0];
      }

      // --- STEP 3: Execute Zoom ---
      if (arrayOfCords) {
        const centroid = calculateCentroid(arrayOfCords);
        
        // Custom Diu logic preserved
        if (properties?.COUNTY === 'Diu') {
          map.flyTo(centroid, 12);
        } else {
          const zoom = calculateZoom(arrayOfCords);
          map.flyTo(centroid, zoom || 7);
        }
      }
    } catch (err) {
      console.error("Boundary Zoom Error:", err);
    }
  }, [props.data, map]);

  if (!props.data) return null;

  const blueStyle = props.isStateData
    ? { color: '#00000000', weight: 2, opacity: 1.0 }
    : { weight: 2, opacity: 1.0 };

  return (
    <GeoJSON
      // Key is essential to force Leaflet to redraw when the state changes
      key={JSON.stringify(props.data.id || props.data.properties?.STATE || 'boundary')}
      data={props.data}
      style={blueStyle}
    />
  );
}

export default Boundary;

// import React from "react";
// import { GeoJSON, useMap } from "react-leaflet";
// import {
//   calculateCentroid,
//   calculateZoom,
//   getPolygonCenter
// } from "./helpers/helperFunctions";
// import { toast } from 'react-toastify';


// function Boundary(props) {

//   try {
//     const map = useMap();

//     map.invalidateSize();
//     try {
//       if(props.data.features[0].geometry.coordinates.length==1)
//       {
//         const arrayOfCords = props.data.features[0].geometry.coordinates[0];
//         const centroid = calculateCentroid(arrayOfCords);
//         const zoom = calculateZoom(arrayOfCords);
//         map.flyTo(centroid, zoom);

//       }else if(props.data.features[0].geometry.coordinates[0] && props.data.features[0].geometry.type === 'Polygon'){

//         const arrayOfCords = props.data.features[0].geometry.coordinates[0];
//         const centroid = calculateCentroid(arrayOfCords);
//         const zoom = calculateZoom(arrayOfCords);
//         map.flyTo(centroid, zoom);
//       }
//       else if(props.data.features[0].geometry.coordinates[0][0]){
//         const arrayOfCords = props.data.features[0].geometry.coordinates[0][0];
//         const centroid = calculateCentroid(arrayOfCords);
      
//         const zoomTrue = props.data.features[0].properties.COUNTY == 'Diu';
//         map.flyTo(centroid, zoomTrue ? 12 : 7);
//       }

//     }
//     catch(err){
//       // console.log('errrorBoundary', err);
//       console.error("Can't zoom", err)
//       props.setData(null)
//     }
//     // console.log("props.isStateData",props.isStateData)
//     const blueStyle = props.isStateData
//   ? {
//       color: '#00000000', 
//       weight: 2, 
//       opacity: 1.0,
//     }
//   : {
//       weight: 2, 
//       opacity: 1.0,
//     };
//     return (
//       <GeoJSON
//         data={props.data}
//         style={ blueStyle}
//       />
//     );
//   } catch (error) {
//     // console.log(error)
//     props.setData(null)
//     toast.error("format Not Supported");
//   }
// }

// export default Boundary;
