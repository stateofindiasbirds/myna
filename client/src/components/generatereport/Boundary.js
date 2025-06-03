import React from "react";
import { GeoJSON, useMap } from "react-leaflet";
import {
  calculateCentroid,
  calculateZoom,
  getPolygonCenter
} from "./helpers/helperFunctions";
import { toast } from 'react-toastify';


function Boundary(props) {

  try {
    const map = useMap();

    map.invalidateSize();
    try {
      if(props.data.features[0].geometry.coordinates.length==1)
      {
        const arrayOfCords = props.data.features[0].geometry.coordinates[0];
        const centroid = calculateCentroid(arrayOfCords);
        const zoom = calculateZoom(arrayOfCords);
        map.flyTo(centroid, zoom);

      }else if(props.data.features[0].geometry.coordinates[0] && props.data.features[0].geometry.type === 'Polygon'){

        const arrayOfCords = props.data.features[0].geometry.coordinates[0];
        const centroid = calculateCentroid(arrayOfCords);
        const zoom = calculateZoom(arrayOfCords);
        map.flyTo(centroid, zoom);
      }
      else if(props.data.features[0].geometry.coordinates[0][0]){
        const arrayOfCords = props.data.features[0].geometry.coordinates[0][0];
        const centroid = calculateCentroid(arrayOfCords);
      
        const zoomTrue = props.data.features[0].properties.COUNTY == 'Diu';
        map.flyTo(centroid, zoomTrue ? 12 : 7);
      }

    }
    catch(err){
      // console.log('errrorBoundary', err);
      console.error("Can't zoom")
      props.setData(null)
    }
    // console.log("props.isStateData",props.isStateData)
    const blueStyle = props.isStateData
  ? {
      color: '#00000000', 
      weight: 2, 
      opacity: 1.0,
    }
  : {
      weight: 2, 
      opacity: 1.0,
    };
    return (
      <GeoJSON
        data={props.data}
        style={ blueStyle}
      />
    );
  } catch (error) {
    // console.log(error)
    props.setData(null)
    toast.error("format Not Supported");
  }
}

export default Boundary;
