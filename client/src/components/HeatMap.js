/* global google */
import React, { useEffect, useState, useMemo } from 'react';
import { Map, Polygon, GoogleApiWrapper, InfoWindow, Polyline} from 'google-maps-react';
import { useSelector } from 'react-redux';

const HeatMap = (data) => {
  const [gridBounds, setGridBounds] = useState({ latMin: 0, latMax: 0, lngMin: 0, lngMax: 0 });
  const completeListOfSpeciesGi = useSelector(state => state?.UserReducer?.completeListOfSpeciesGi);
  const [maxValue, setMaxValue] = useState(null);
  const [hoveredCoords, setHoveredCoords] = useState(null);
  const [uniqueIdentifiersCount, setUniqueIdentifiersCount] = useState({});
  const [polyCount, setPolyCount] = useState(null);
  const [newBufferdata, setNewBufferdata] = useState(null);

  // Consistency constant for the grid resolution
  const STEP_SIZE = 0.045;

  const calculateRoundedValue = (value) => {
    const result = Math.round(value / STEP_SIZE) * STEP_SIZE;
    return parseFloat(result.toFixed(3));
  };

  // 1. DATA PROCESSING - Map species counts to grid keys
  useEffect(() => {
    const locationMap = {};
    if (!completeListOfSpeciesGi) return;

    completeListOfSpeciesGi.forEach(entry => {
      if (typeof entry.latitude === 'number' && typeof entry.longitude === 'number') {
        const lat = calculateRoundedValue(entry.latitude);
        const long = calculateRoundedValue(entry.longitude);
        const latLongKey = `${lat}X${long}`;
        if (!locationMap[latLongKey]) { locationMap[latLongKey] = new Set(); }
        locationMap[latLongKey].add(entry.groupIdentifier);
      }
    });

    const result = {};
    for (const [latLong, groupIds] of Object.entries(locationMap)) {
      result[latLong] = groupIds.size;
    }
    setUniqueIdentifiersCount(result);
  }, [completeListOfSpeciesGi]);

  useEffect(() => {
    const values = Object.values(uniqueIdentifiersCount);
    if (values.length > 0) {
      const maxV = Math.max(...values);
      if (maxV > 0) {
        setMaxValue(maxV);
        if (data.sethighestNumber) data.sethighestNumber(maxV);
      }
    }
  }, [uniqueIdentifiersCount]);

  // 2. BUFFER DATA PARSING
  useEffect(() => {
    if (!data.bufferData) return;
    let coords;
    if (data.bufferData.type === 'FeatureCollection') {
      coords = data.bufferData?.features?.[0]?.geometry?.coordinates?.[0];
    } else if (data.bufferData.type === 'Feature') {
      coords = data.bufferData?.geometry?.coordinates?.[0];
    }
    if (coords) {
      setNewBufferdata(coords.map(c => ({ lng: c[0], lat: c[1] })));
    }
  }, [data.bufferData]);

  // 3. GRID BOUNDS - Use Buffer area to determine grid size
  useEffect(() => {
    const pathsToMeasure = (newBufferdata && newBufferdata.length > 0) ? newBufferdata : data.paths;
    if (!pathsToMeasure || !Array.isArray(pathsToMeasure)) return;

    const flattenArray = (arr) => arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val), []);
    const flattened = flattenArray(pathsToMeasure);
    
    const latitudes = flattened.map(p => p.lat).filter(x => typeof x === 'number' && !isNaN(x));
    const longitudes = flattened.map(p => p.lng).filter(x => typeof x === 'number' && !isNaN(x));

    if (latitudes.length > 0) {
      setGridBounds({
        latMin: Math.min(...latitudes),
        latMax: Math.max(...latitudes),
        lngMin: Math.min(...longitudes),
        lngMax: Math.max(...longitudes)
      });
    }
  }, [data.paths, newBufferdata]);

  const getColorAndOpacity = (hotspot) => {
    let color, fillOpacity;
    if (hotspot >= 70) {
      color = '#562377'; // Deep Purple-Blue
      fillOpacity = 0.9;
    } else if (hotspot >= 30) {
      color = '#3949ab'; // Medium Blue
      fillOpacity = 0.9;
    } else if (hotspot >= 10) {
      color = '#5c6bc0'; // Soft Blue 
      fillOpacity = 0.9;
    } else if (hotspot >= 1) {
      color = '#7986cb'; // Light Blue
      fillOpacity = 0.9;
    } else {
      color = 'transparent'; 
      fillOpacity = 0;
    }
    return { color, fillOpacity };
  };

  // 5. CLIPPING HELPERS
  const isPointInPolygon = (point, polygon) => {
    if (!polygon || polygon.length === 0) return false;
    const x = point.lng, y = point.lat;
    let isInside = false;
    const poly = Array.isArray(polygon[0]) && !polygon[0].lat ? polygon[0] : polygon;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i].lng, yi = poly[i].lat;
      const xj = poly[j].lng, yj = poly[j].lat;
      const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) isInside = !isInside;
    }
    return isInside;
  };

  const lineIntersection = (A, B, C, D) => {
    const den = (A.lng - B.lng) * (C.lat - D.lat) - (A.lat - B.lat) * (C.lng - D.lng);
    if (den === 0) return null;
    const t = ((A.lng - C.lng) * (C.lat - D.lat) - (A.lat - C.lat) * (C.lng - D.lng)) / den;
    const u = ((A.lng - C.lng) * (A.lat - B.lat) - (A.lat - C.lat) * (A.lng - B.lng)) / den;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return { lat: A.lat + t * (B.lat - A.lat), lng: A.lng + t * (B.lng - A.lng) };
    }
    return null;
  };

  const clipPolygon = (square, boundary) => {
    const clipped = [];
    const polyBoundary = Array.isArray(boundary[0]) && !boundary[0].lat ? boundary[0] : boundary;
    for (let i = 0; i < square.length; i++) {
      const p1 = square[i], p2 = square[(i + 1) % square.length];
      const in1 = isPointInPolygon(p1, polyBoundary), in2 = isPointInPolygon(p2, polyBoundary);
      if (in1) clipped.push(p1);
      if (in1 !== in2) {
        for (let j = 0; j < polyBoundary.length; j++) {
          const intersect = lineIntersection(p1, p2, polyBoundary[j], polyBoundary[(j + 1) % polyBoundary.length]);
          if (intersect) { clipped.push(intersect); break; }
        }
      }
    }
    return clipped;
  };

  // 6. GRID GENERATION - Fixed Keys and Hover Data
  const generateGrid = useMemo(() => {
    const polygons = [];
    const { latMin, latMax, lngMin, lngMax } = gridBounds;
    if (latMin === 0 || !maxValue) return [];

    const boundary = (newBufferdata && newBufferdata.length > 0) ? newBufferdata : data.paths;
    
    // Ensure loop starts exactly on rounded steps
    const startLat = calculateRoundedValue(latMin) - STEP_SIZE;
    const startLng = calculateRoundedValue(lngMin) - STEP_SIZE;

    let count = 0;
    for (let lat = startLat; lat <= latMax + STEP_SIZE; lat += STEP_SIZE) {
      for (let lng = startLng; lng <= lngMax + STEP_SIZE; lng += STEP_SIZE) {
        const rLat = calculateRoundedValue(lat);
        const rLng = calculateRoundedValue(lng);
        
        const square = [
          { lat: rLat, lng: rLng }, 
          { lat: calculateRoundedValue(rLat + STEP_SIZE), lng: rLng },
          { lat: calculateRoundedValue(rLat + STEP_SIZE), lng: calculateRoundedValue(rLng + STEP_SIZE) }, 
          { lat: rLat, lng: calculateRoundedValue(rLng + STEP_SIZE) },
          { lat: rLat, lng: rLng }
        ];

        const cornersInside = square.filter(p => isPointInPolygon(p, boundary));
        if (cornersInside.length === 0) continue;

        let finalPaths = (cornersInside.length < square.length) ? clipPolygon(square, boundary) : square;
        if (finalPaths.length < 3) continue;

        const latLngKey = `${rLat}X${rLng}`;
        const hotspot = uniqueIdentifiersCount[latLngKey] || 0;
        const normalized = Math.ceil((hotspot * 100) / maxValue);
        const { color, fillOpacity } = getColorAndOpacity(normalized);

        polygons.push(
          <Polygon
            key={`cell-${rLat}-${rLng}-${count}`}
            paths={finalPaths}
            strokeColor="#000000"
            strokeWeight={0.2}
            fillColor={color}
            fillOpacity={fillOpacity}
            onMouseover={() => setHoveredCoords({ 
                lat: rLat, 
                lng: rLng, 
                latLngString: `${rLat} X ${rLng} & ${normalized}%` 
            })}
            onMouseout={() => setHoveredCoords(null)}
            zIndex={100}
          />
        );
        count++;
      }
    }
    if (data.setPolygonsCount) data.setPolygonsCount(count);
    return polygons;
  }, [gridBounds, maxValue, uniqueIdentifiersCount, newBufferdata, data.paths]);

  return (
    <div className="map-container flex justify-between items-start h-[70vh] w-[91vw] md:w-[70vw]">
      {gridBounds.latMin !== 0 && (
        <Map
          google={data.google}
          initialCenter={{ lat: (gridBounds.latMin + gridBounds.latMax) / 2, lng: (gridBounds.lngMin + gridBounds.lngMax) / 2 }}
          onReady={(mapProps, map) => {
            if (data.onMapReady && !data.mapZoomOut) data.onMapReady(mapProps, map);
          }}
          zoom={7}
          style={{ height: "70vh", width: window.innerWidth > 758 ? '70vw' : '91vw' }}
          mapTypeControl={false}
          streetViewControl={false}
        >
          {generateGrid}
          
          {data.mapBoundary && (
  data.isLine ? (
    <Polyline
      key="heatmap-boundary-line"
      path={data.mapBoundary} // Singular 'path' for Polyline
      strokeColor="#0000FF"
      strokeWeight={2.5}
      strokeOpacity={1.0}
      zIndex={150}
    />
  ) : (
    <Polygon
      key="heatmap-boundary-poly"
      paths={data.mapBoundary} // Plural 'paths' for Polygon
      strokeColor="#0000FF"
      strokeWeight={2}
      fillOpacity={0}
      zIndex={150}
    />
  )
)}

          {newBufferdata && (
            <Polygon
              paths={newBufferdata}
              strokeColor="#4F9BC0"
              strokeWeight={1.5}
              fillOpacity={0}
              zIndex={151}
            />
          )}
          
          <InfoWindow 
            visible={!!hoveredCoords?.latLngString} 
            position={{ lat: Number(hoveredCoords?.lat), lng: Number(hoveredCoords?.lng) }}
          >
            <div style={{ zIndex: '1000', color: '#000' }}>
              <p>{hoveredCoords?.latLngString}</p>
            </div>
          </InfoWindow>
        </Map>
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDhVAmY9KJ7SggfZqNrDrD_S3i6t7Nz1ig',
})(HeatMap);

