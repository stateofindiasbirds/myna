import React from "react";
import { GeoJSON, useMap } from "react-leaflet";
import { toast } from "react-toastify";
import {
  calculateCentroid,
  calculateZoom,
} from "./helpers/helperFunctions";
import {  getAreaOfPolygon } from "geolib";

function Ziptogeojson(props) {
  let featureCollection=null
  try {
    const map = useMap();
    if (props.isZoomRequired) {
      map.invalidateSize();
      const arrayOfCords = props.data.features[0].geometry.coordinates[0];
      const centroid = calculateCentroid(arrayOfCords);
      const zoom = calculateZoom(arrayOfCords);
      const area =getAreaOfPolygon(arrayOfCords)/1000000
      props.setArea(area)
      if(area>50000)
      {
        return toast.error("Selected Area should be less than 50,000 Square Kilometers")
      }
      map.flyTo(centroid, zoom);
      props.setIsZoomRequired(false);
    }

    if (props.editedData) {
      const coordinates = [props.editedData.map((point) => [point.lng, point.lat])];

      const feature = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: coordinates,
        },
      };

       featureCollection = {
        type: "FeatureCollection",
        features: [feature],
      }
    } 

    return (
      <GeoJSON
        data={featureCollection || props.data}
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
    props.toast.error("format Not Supported");
    return props.setData(null);
  }
}

export default Ziptogeojson;
