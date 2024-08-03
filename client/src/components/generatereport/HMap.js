import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Polygon } from 'google-maps-react';
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";

const HMap = (props) => {
  const { dataForMap, editedData, onClose, boundary, google } = props;

  const [initialCenter, setInitialCenter] = useState({ lat: 25.21, lng: 79.32 });
  const [zoom, setZoom] = useState(9);
  const [gridPolygonsDataForMap, setGridPolygonsDataForMap] = useState([]);
  const convertedData = dataForMap?.features[0]?.geometry?.coordinates[0]?.map(([lng, lat]) => ({ lat, lng }));
  const boundaryData = boundary?.features[0]?.geometry?.coordinates[0]?.map(([lng, lat]) => ({ lat, lng }));


  const getPolygonCenter = (polygon) => {
    const totalPoints = polygon.length;
    const center = polygon.reduce((sum, point) => ({ lat: sum.lat + point.lat, lng: sum.lng + point.lng }), { lat: 0, lng: 0 });
    return { lat: center.lat / totalPoints, lng: center.lng / totalPoints };
  };

  const generateGrid = (boundingBox) => {
    const grid = [];
    const gridSize = 0.045;

    for (let lat = boundingBox.minLat; lat <= boundingBox.maxLat; lat += gridSize) {
      for (let lng = boundingBox.minLng; lng <= boundingBox.maxLng; lng += gridSize) {
        const cellPolygon = [
          { lat, lng },
          { lat: lat + gridSize, lng },
          { lat: lat + gridSize, lng: lng + gridSize },
          { lat, lng: lng + gridSize },
        ];

        grid.push(cellPolygon);
      }
    }

    return grid;
  };

  const getBoundingBox = (coordinates) => {
    if (!Array.isArray(coordinates)) {
      console.error("Invalid coordinates:", coordinates);
      return { minLat: 0, maxLat: 0, minLng: 0, maxLng: 0 };
    }

    const lats = coordinates.map(point => point[1]);
    const lngs = coordinates.map(point => point[0]);

    return {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs),
    };
  };

  const formatEditedData = (editedData) => {
    if (Array.isArray(editedData) && editedData.length > 0) {
      if (editedData[0] && editedData[0].lat !== undefined && editedData[0].lng !== undefined) {
        return {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [editedData.map(point => [point.lng, point.lat])]
              },
              properties: {
                stroke: "#ff0000",
                "stroke-opacity": 1,
                "fill-opacity": 0
              }
            }
          ]
        };
      }
    }

    return { type: "FeatureCollection", features: [] };
  };

  useEffect(() => {
    if (editedData) {
      const convertedEditedData = formatEditedData(editedData);
      const boundingBox = getBoundingBox(convertedEditedData.features[0].geometry.coordinates[0]);
      const grid = generateGrid(boundingBox);
      setGridPolygonsDataForMap(grid);
    }
  }, [editedData]);

  useEffect(() => {
    if (boundary) {
      const boundaryBoundingBox = getBoundingBox(boundary.features[0].geometry.coordinates[0]);
      const boundaryGrid = generateGrid(boundaryBoundingBox);
      setGridPolygonsDataForMap(boundaryGrid);
    }
  }, [boundary]);

  useEffect(() => {
    if (dataForMap && dataForMap.features && dataForMap.features.length > 0) {
      const polygonBoundary = dataForMap.features[0].geometry.coordinates[0].map(point => ({ lat: point[1], lng: point[0] }));
      const center = polygonBoundary.reduce((sum, point) => ({ lat: sum.lat + point.lat, lng: sum.lng + point.lng }), { lat: 0, lng: 0 });
      const zoom = 9.5;
      setInitialCenter({ lat: center.lat / polygonBoundary.length, lng: center.lng / polygonBoundary.length });
      setZoom(zoom);
      const coordinates = dataForMap.features[0].geometry.coordinates[0];
      const boundingBox = getBoundingBox(coordinates);
      const grid = generateGrid(boundingBox);
      setGridPolygonsDataForMap(grid);
    }
  }, [dataForMap]);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "blue", zIndex: 1000, overflowY: 'none', justifyContent: "center", alignItems: "center" }}>
      <div>
        <div >
          <div >
            <Map
              style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center" }}
              google={google}
              zoom={(editedData ? 9 : 9.5)}
              initialCenter={(convertedData && getPolygonCenter(convertedData)) || (editedData && getPolygonCenter(editedData)) || (boundaryData && getPolygonCenter(boundaryData)) || { lat: 25.21, lng: 79.32 }}
            >
              {props.data && props.data.features && props.data.features.length > 0 && (
                <Polygon
                  paths={[props.data.features[0].geometry.coordinates[0]]}
                  strokeColor="#0000FF"
                  strokeOpacity={0.8}
                  strokeWeight={2.5}
                  fillOpacity={0}
                />
              )}

              {editedData && (
                <Polygon
                  paths={formatEditedData(editedData)}
                  strokeColor="#0000FF"
                  strokeOpacity={0.8}
                  strokeWeight={2.5}
                  fillOpacity={0}
                />
              )}

              {convertedData && (
                <Polygon
                  paths={convertedData}
                  strokeColor="#0000FF"
                  strokeOpacity={0.8}
                  strokeWeight={2.5}
                  fillOpacity={0}
                />
              )}

              {editedData && (
                <Polygon
                  paths={editedData}
                  strokeColor="#0000FF"
                  strokeOpacity={0.8}
                  strokeWeight={2.5}
                  fillOpacity={0}
                />
              )}

              {boundaryData && (
                <Polygon
                  paths={boundaryData}
                  strokeColor="#0000FF"
                  strokeOpacity={0.8}
                  strokeWeight={2.5}
                  fillOpacity={0}
                />
              )}

              {gridPolygonsDataForMap.map((gridPolygon, index) => (
                <Polygon
                  key={`gridPolygonDataForMap_${index}`}
                  paths={gridPolygon}
                  strokeColor="#FF0000"
                  strokeOpacity={0.8}
                  strokeWeight={1}
                  fillOpacity={0}
                />
              ))}

              <span className="top-0 right-0 absolute">
                <Tooltip
                  title="Close"
                >
                  <CloseIcon
                    onClick={onClose}
                    style={{ cursor: 'pointer' }}
                  />
                </Tooltip>
              </span>
            </Map>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(HMap);
