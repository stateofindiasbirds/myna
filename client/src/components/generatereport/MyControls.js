import React from 'react'
import { FeatureGroup,useMap } from 'react-leaflet'
import { GeomanControls, } from 'react-leaflet-geoman-v2'
import { getAreaOfPolygon } from 'geolib';
import {toast} from 'react-toastify'
function MyControls({_onCreate,_onDeleted,data,newPolygon,setArea,uploadedgeojson}) {
    const map = useMap();
    const createShapeEvent=(e)=>{
      const coordinates = e.layer._latlngs;
      const coordinatesForFile = [
        coordinates[0].map((point) => [point.lng, point.lat]),
      ];
      const area = getAreaOfPolygon(coordinatesForFile[0]) / 1000000;
      console.log(area)
      setArea(area)
      if (area > 50000) {
        toast.error("Selected Area should be less than 50,000 Square Kilometers")
        map.eachLayer((layer) => {
          if (layer._layers===undefined&&layer.options.pane==="overlayPane") {
            map.removeLayer(layer);
          }
        });
        return
      }
      _onCreate(e);

    }
    const clearAllLayers=(e)=>
    {
     if(e.enabled)
     {
      map.eachLayer((layer) => {
        if (layer._layers===undefined&&layer.options.pane==="overlayPane") {
          map.removeLayer(layer);
        }
      });
      _onDeleted()
     }
    }

  return (
    <FeatureGroup>
    <GeomanControls
      options={{
        position: "topleft",
        drawText: false,
        drawCircle:false,
        drawPolygon:uploadedgeojson?false:true,
        drawMarker:false,
        drawRectangle:false,
        drawPolyline:false,
        drawCircleMarker:false,
        dragMode:false,
        rotateMode:false,
        cutPolygon:false,
        removalMode:true,
        drawControls:!data||!newPolygon,        
      }}
      globalOptions={{
        continueDrawing: false,
        limitMarkersToCount:20,
        editable: true,
        allowRemoval:true,
        allowSelfIntersection:false,
        
      }}
      onCreate={createShapeEvent}
      onLayerRemove={_onDeleted}
      onGlobalRemovalModeToggled={clearAllLayers}
    />


    {/* <Circle center={[51.51, -0.06]} radius={200} /> */}
  </FeatureGroup>
  )
}

export default MyControls