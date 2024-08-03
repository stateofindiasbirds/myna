import React from "react";
import { GeoJSON, useMap } from "react-leaflet";
import {
  calculateCentroid,
  calculateZoom,
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

      }
      else{
        const arrayOfCords = props.data.features[0].geometry.coordinates[0][0];
        const centroid = calculateCentroid(arrayOfCords);
        const zoom = 7;
        map.flyTo(centroid, zoom);

      }

    }
    catch {
      console.error("Can't zoom")
      props.setData(null)
    }

    return (
      <GeoJSON
        data={props.data}
      />
    );
  } catch (error) {
    props.setData(null)
    toast.error("format Not Supported");
  }
}

export default Boundary;
