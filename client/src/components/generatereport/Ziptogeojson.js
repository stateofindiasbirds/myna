import React from "react";
import { GeoJSON, useMap } from "react-leaflet";
import { toast } from "react-toastify";
import {
  calculateCentroid,
  calculateZoom,
} from "./helpers/helperFunctions";
import { getAreaOfPolygon } from "geolib";

function Ziptogeojson(props) {
  let featureCollection = null;
  const map = useMap();
let currentData = props.data;

  if (currentData && currentData.type === "Feature") {
    // If it's a single Feature (File 1), wrap it so the code below doesn't break
    currentData = {
      type: "FeatureCollection",
      features: [currentData]
    };
  }


  try {
    if (!currentData) {
      return null;
    }

    if (props.isZoomRequired && currentData.features && currentData.features.length > 0) {
      map.invalidateSize();
      const geometry = currentData.features[0].geometry;
      const geoType = geometry.type;

      let arrayOfCords;
      if (geoType === 'Polygon') {
        // For Polygon, use coordinates[0]
        arrayOfCords = geometry.coordinates[0];
      } else if (geoType === 'MultiPolygon') {
        // For MultiPolygon, use coordinates[0][0]
        arrayOfCords = geometry.coordinates[0][0];
      } else if (geoType === 'LineString') {
        // === ADDED: Handle LineString coordinates ===
        arrayOfCords = geometry.coordinates;
      } else if (geoType === 'Point') {
        // For a Point, we can't calculate area or bounds easily, so just center on it
        const centroid = [geometry.coordinates[1], geometry.coordinates[0]]; // [lat, lng]
        map.flyTo(centroid, 10); // A default zoom level for a point
        props.setArea(0);
        props.setIsZoomRequired(false);
        return null;
      } else {
        console.error("Unsupported GeoJSON type for zoom/area calculation:", geoType);
        props.setIsZoomRequired(false);
        return null;
      } 
      
      // Calculate Centroid and Zoom (assuming helperFunctions handle [lng, lat] format)
      const centroid = calculateCentroid(arrayOfCords);
      const zoom = calculateZoom(arrayOfCords);
      
      // Transform GeoJSON [lng, lat] to geolib {latitude: lat, longitude: lng} for area calculation
      // LineString area will correctly be 0.
      const geolibCords = arrayOfCords.map(c => ({ latitude: c[1], longitude: c[0] }));
      const area = getAreaOfPolygon(geolibCords) / 1000000;
      
      console.log(">>>> Area:", area);

      props.setArea(area);
      if (area > 50000) {
        toast.error("Selected Area should be less than 50,000 Square Kilometers")
      }
      map.flyTo(centroid, zoom);
      props.setIsZoomRequired(false);
    }

    // Existing logic for handling editedData
    if (props.editedData) {
      // Handle edited data coordinates
      let editedCoordinates;

      if (props.editedData[0].type === 'Polygon') {
        editedCoordinates = [props.editedData.map((point) => [point.lng, point.lat])];
      } else if (props.editedData[0].type === 'MultiPolygon') {
        editedCoordinates = [props.editedData[0][0].map((point) => [point.lng, point.lat])];
      } else {
         // Default to treating edited data as a set of points for a new Polygon
         editedCoordinates = [props.editedData.map((point) => [point.lng, point.lat])];
      }

      const feature = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon", // Assuming it's a Polygon type after edit
          coordinates: editedCoordinates,
        },
      };

      featureCollection = {
        type: "FeatureCollection",
        features: [feature],
      };
    }


    return (
      <GeoJSON
        data={featureCollection || currentData}
        // Applying the style from the KML file's LineStyle (ff2dc0fb -> #2dc0fb)
        style={{ color: '#2dc0fb', weight: 4 }} 
        editable={!props.onReport}
        onEachFeature={(feature, layer) => {
          layer.pm.enable({
            allowSelfIntersection: false,
          });
          layer.on("pm:remove", props.onDelete);
          layer.on("pm:edit", (e) => {
            props.handleEdit(e);
          });
        }}
      />
    );
  } catch (error) {
    props.toast.error("format Not Supported or Rendering Error.");
    return props.setData(null);
  }
}

export default Ziptogeojson;






// import React from "react";
// import { GeoJSON, useMap } from "react-leaflet";
// import { toast } from "react-toastify";
// import {
//   calculateCentroid,
//   calculateZoom,
// } from "./helpers/helperFunctions";
// import {  getAreaOfPolygon } from "geolib";

// function  Ziptogeojson(props) {
//   let featureCollection=null
//   try {
//     const map = useMap();
//     if (props.isZoomRequired) {
//       map.invalidateSize();
//       const geometry = props.data.features[0].geometry;
//       const geoType = geometry.type;

//       let arrayOfCords;
//       if (geoType === 'Polygon') {
//         // For Polygon, use coordinates[0]
//         arrayOfCords = geometry.coordinates[0];
//       } else if (geoType === 'MultiPolygon') {
//         // For MultiPolygon, use coordinates[0][0]
//         arrayOfCords = geometry.coordinates[0][0];
//       } else {
//         console.error("Unsupported GeoJSON type:", geoType);
//       } 
//       const centroid = calculateCentroid(arrayOfCords);
//       const zoom = calculateZoom(arrayOfCords);
//       const area =getAreaOfPolygon(arrayOfCords)/1000000
//       console.log(">>>>",area)

//       props.setArea(area)
//       if(area>50000)
//       {
//         return toast.error("Selected Area should be less than 50,000 Square Kilometers")
//       }
//       map.flyTo(centroid, zoom);
//       props.setIsZoomRequired(false);
//     }

//     // if (props.editedData) {
//     //   const coordinates = [props.editedData.map((point) => [point.lng, point.lat])];

//     //   const feature = {
//     //     type: "Feature",
//     //     properties: {},
//     //     geometry: {
//     //       type: "Polygon",
//     //       coordinates: coordinates,
//     //     },
//     //   };

//     //    featureCollection = {
//     //     type: "FeatureCollection",
//     //     features: [feature],
//     //   }
//     // } 
//     if (props.editedData) {
//       // Handle edited data coordinates
//       let editedCoordinates;

//       if (props.editedData[0].type === 'Polygon') {
//         editedCoordinates = [props.editedData.map((point) => [point.lng, point.lat])];
//       } else if (props.editedData[0].type === 'MultiPolygon') {
//         editedCoordinates = [props.editedData[0][0].map((point) => [point.lng, point.lat])];
//       }

//       const feature = {
//         type: "Feature",
//         properties: {},
//         geometry: {
//           type: "Polygon", // Assuming it's a Polygon type after edit
//           coordinates: editedCoordinates,
//         },
//       };

//       featureCollection = {
//         type: "FeatureCollection",
//         features: [feature],
//       };
//     }


//     return (
//       <GeoJSON
//         data={featureCollection || props.data}
//         editable={!props.onReport}
//         onEachFeature={(feature, layer) => {
//           layer.pm.enable({
//             allowSelfIntersection: false,
//           });
//           layer.on("pm:remove", props.onDelete);
//           layer.on("pm:edit", (e) => {
//             props.handleEdit(e);
//           });
//         }}
//       />
//     );
//   } catch (error) {
//     props.toast.error("format Not Supported ??????????????/");
//     return props.setData(null);
//   }
// }

// export default Ziptogeojson;
