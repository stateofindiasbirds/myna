// import React from 'react'
// import { FeatureGroup,useMap } from 'react-leaflet'
// import { GeomanControls, } from 'react-leaflet-geoman-v2'
// import { getAreaOfPolygon } from 'geolib';
// import {toast} from 'react-toastify'
// function MyControls({_onCreate,_onDeleted,data,newPolygon,setArea,uploadedgeojson}) {
//     const map = useMap();
//     const createShapeEvent=(e)=>{
//       const coordinates = e.layer._latlngs;
//       const coordinatesForFile = [
//         coordinates[0].map((point) => [point.lng, point.lat]),
//       ];
//       const area = getAreaOfPolygon(coordinatesForFile[0]) / 1000000;
//       setArea(area)
//       if (area > 50000) {
//         toast.error("Selected Area should be less than 50,000 Square Kilometers")
//         map.eachLayer((layer) => {
//           if (layer._layers===undefined&&layer.options.pane==="overlayPane") {
//             map.removeLayer(layer);
//           }
//         });
//         return
//       }
//       _onCreate(e);

//     }
//     const clearAllLayers=(e)=>
//     {
//      if(e.enabled)
//      {
//       map.eachLayer((layer) => {
//         if (layer._layers===undefined&&layer.options.pane==="overlayPane") {
//           map.removeLayer(layer);
//         }
//       });
//       _onDeleted()
//      }
//     }

//   return (
//     <FeatureGroup>
//     <GeomanControls
//       options={{
//         position: "topleft",
//         drawText: false,
//         drawCircle:false,
//         drawPolygon:uploadedgeojson?false:true,
//         drawMarker:false,
//         drawRectangle:false,
//         drawPolyline:false,
//         drawCircleMarker:false,
//         dragMode:false,
//         rotateMode:false,
//         cutPolygon:false,
//         removalMode:true,
//         drawControls:!data||!newPolygon,        
//       }}
//       globalOptions={{
//         continueDrawing: false,
//         limitMarkersToCount:20,
//         editable: true,
//         allowRemoval:true,
//         allowSelfIntersection:false,
        
//       }}
//       onCreate={createShapeEvent}
//       onLayerRemove={_onDeleted}
//       onGlobalRemovalModeToggled={clearAllLayers}
//     />


//     {/* <Circle center={[51.51, -0.06]} radius={200} /> */}
//   </FeatureGroup>
//   )
// }

// export default MyControls



import React, { useEffect,useRef } from 'react';
import { FeatureGroup, useMap } from 'react-leaflet';
import { GeomanControls } from 'react-leaflet-geoman-v2';
import { getAreaOfPolygon } from 'geolib';
import { toast } from 'react-toastify';
import * as turf from "@turf/turf";
import indiaBoundary from "./files/india-composite.json";
import L from "leaflet";

function MyControls({_onCreate, _onDeleted, data, newPolygon, setArea, uploadedgeojson, bufferData}) {
    const map = useMap();


    const createShapeEvent = (e) => {
       
      
      const coordinates = e.layer._latlngs;
      const coordinatesForFile = [
          coordinates[0].map((point) => [point.lng, point.lat]),
      ];
  
      // Close the polygon if not closed
      const first = coordinatesForFile[0][0];
      const last = coordinatesForFile[0][coordinatesForFile[0].length - 1];
      if (first[0] !== last[0] || first[1] !== last[1]) {
          coordinatesForFile[0].push(first);
      }
  
      // Validate area
      const area = getAreaOfPolygon(coordinatesForFile[0]) / 1000000;
      setArea(area);
      if (area > 50000) {
        toast.error("Selected Area should be less than 50,000 Square Kilometers")
        map.eachLayer((layer) => {
          if (layer._layers===undefined&&layer.options.pane==="overlayPane") {
            map.removeLayer(layer);
          }
        });
        return
      }
  
    //   // Validate inside India
      const drawnPolygon = turf.polygon([coordinatesForFile[0]]);
    //   const indiaPolygon = turf.feature(indiaBoundary.features[0].geometry);
      const indiaPolygon = turf.feature(indiaBoundary.features[0].geometry, {});

      const isInside = turf.booleanWithin(drawnPolygon, indiaPolygon);
    // Commented by Praveen J on 04 01 2026 to fix the boundary polygon issue. Alphanzo to fix it in prod and github 
      if (!isInside) {
      //    map.removeLayer(e.layer);
      //    toast.error("Polygon must be inside India!");
      //    return;
      }
      _onCreate(e);
  };
  

    const clearAllLayers = (e) => {
        if (e.enabled) {
            map.eachLayer((layer) => {
                // Ensure only the editable layers are removed
                if (layer._layers===undefined&&layer.options.pane==="overlayPane") {
                  map.removeLayer(layer);
                }
            });
            _onDeleted();
        }
    };

    return (
        <FeatureGroup>
            <GeomanControls
                options={{
                    position: "topleft",
                    drawText: false,
                    drawCircle: false,
                    drawPolygon:uploadedgeojson?false:true,
                    drawMarker: false,
                    drawRectangle: false,
                    drawPolyline: false,
                    drawCircleMarker: false,
                    dragMode: false,
                    rotateMode: false,
                    cutPolygon: false,
                    removalMode: true,
                    drawControls: !data || !newPolygon,
                }}
                globalOptions={{
                    continueDrawing: false,
                    limitMarkersToCount: 20,
                    editable: true,
                    allowRemoval: true,
                    allowSelfIntersection: false,
                }}
                onCreate={createShapeEvent}
                onLayerRemove={_onDeleted}
                onGlobalRemovalModeToggled={clearAllLayers}
            />
        </FeatureGroup>
    );
}

export default MyControls;
