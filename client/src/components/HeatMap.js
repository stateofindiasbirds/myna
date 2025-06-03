 //workingggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
/* global google */
 import React, { useEffect, useState, useMemo } from 'react';
 import { Map, Marker,Polygon, GoogleApiWrapper,InfoWindow } from 'google-maps-react';
 import { useSelector } from 'react-redux';
 import * as turf from '@turf/turf';
 
 const center = { lat: 21.1458, lng: 79.0882 };
 
 // const HeatMap = (props) => {
   const HeatMap = (data) => {
   const [gridBounds, setGridBounds] = useState({ latMin: 0, latMax: 0, lngMin: 0, lngMax: 0 });
   const [groupIdentifierCount, setGroupIdentifierCount] = useState({}); 
   const completeListOfSpeciesGi = useSelector(state => state?.UserReducer?.completeListOfSpeciesGi);
   const [values,setValues] = useState([]);
   const [maxValue,setMaxValue] = useState(null);
   const [hoveredCoords, setHoveredCoords] = useState(null); 
   const [uniqueIdentifiersCount, setUniqueIdentifiersCount] = useState({});
   const [props, setProps] = useState({ paths: [] });
   const [polyCount, setPolyCount] = useState(null);
   const [newBufferdata,setNewBufferdata] = useState(null);
   const roundToTwoDecimals = (num) => Math.round(num * 1000) / 1000;

   const calculateRoundedValue = (value) => {
     const result = Math.round(value / 0.045) * 0.045;
     return parseFloat(result.toFixed(3));
   };

//  console.log("hoveredCoords",hoveredCoords);
  
  // console.log("data.paths",data.paths);
  // console.log("bufferDatahmap",data.bufferData)
   useEffect(()=>{
     data.setPolygonsCount(polyCount);
    //  console.log("polyCount",polyCount);
   },[polyCount])

  //  console.log("uniqueIdentifiersCount",uniqueIdentifiersCount)

 useEffect(() => {
   const locationMap = {};
   const locationMap2 = [];
 
   completeListOfSpeciesGi.forEach(entry => {
    if (typeof entry.latitude === 'number' && typeof entry.longitude === 'number') { 
     const lat = calculateRoundedValue(entry.latitude);
     const long = calculateRoundedValue(entry.longitude);
     locationMap2.push({ lat, lng: long });
 
     const latLongKey = `${lat}X${long}`;
     if (!locationMap[latLongKey]) {
       locationMap[latLongKey] = new Set();
     }
     locationMap[latLongKey].add(entry.groupIdentifier);
    } 
   });
 
   if (JSON.stringify(props.paths) !== JSON.stringify(locationMap2)) {
     setProps({ paths: locationMap2 });
   }
 
   const result = {};
   for (const [latLong, groupIds] of Object.entries(locationMap)) {
     result[latLong] = groupIds.size;
   }
 
   if (JSON.stringify(uniqueIdentifiersCount) !== JSON.stringify(result)) {
     setUniqueIdentifiersCount(result);
   }
 }, [completeListOfSpeciesGi]);
 
 
 useEffect(() => {
   const values = Object.values(uniqueIdentifiersCount);
 
   if (values.length > 0) { 
     const maxValue = Math.max(...values);
 
     if (maxValue > 0) { 
       setMaxValue(maxValue);
       data.sethighestNumber(maxValue);
     }
     setValues(values);
   }
 }, [uniqueIdentifiersCount]);
 

useEffect(() => {
 let minLat = Infinity, maxLat = -Infinity;
 let minLng = Infinity, maxLng = -Infinity;

 if (data.paths && Array.isArray(data.paths)) {
   data.paths.flat().forEach(({ lat, lng }) => {
     if (lat < minLat) minLat = lat;
     if (lat > maxLat) maxLat = lat;
     if (lng < minLng) minLng = lng;
     if (lng > maxLng) maxLng = lng;
   });
 }

}, [data.paths, gridBounds]);


 useEffect(() => {    
 
  if (!Array.isArray(data.paths) || data.paths.length === 0) return;

   const flattenArray = (arr) => 
       arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val), []);
 
   const flattenedPaths = flattenArray(data.paths);

   if (flattenedPaths.length === 0) return; // Prevent empty array errors

  //  const latitudes = flattenedPaths.map(p => p.lat).filter(Boolean);
  //  const longitudes = flattenedPaths.map(p => p.lng).filter(Boolean);

  const latitudes = flattenedPaths.map(p => p.lat).filter(x => typeof x === 'number' && !isNaN(x));
const longitudes = flattenedPaths.map(p => p.lng).filter(x => typeof x === 'number' && !isNaN(x));


  if (latitudes.length === 0 || longitudes.length === 0) return;

  const latMin = Math.min(...latitudes);
  const latMax = Math.max(...latitudes);
  const lngMin = Math.min(...longitudes);
  const lngMax = Math.max(...longitudes);

  setGridBounds({ latMin, latMax, lngMin, lngMax });
}, [data.paths]);

 
 
   
   let dynamicStepSize = 5; 

    if(data.area <= 100){
      dynamicStepSize = Math.max(
        (gridBounds.latMax - gridBounds.latMin) / 10,
        (gridBounds.lngMax - gridBounds.lngMin) / 10
      );
    }
   
    // console.log("data.isPolygon",data.isPolygon);

   const getColorAndOpacity = (hotspot) => {
    let color, fillOpacity;
  // console.log("hotspot",hotspot);


    if (hotspot >= 70) {
      color = '#562377'; // Deep Purple-Blue
      fillOpacity = 0.8;
    } else if (hotspot >= 30 && hotspot < 70) {
      color = '#3949ab'; // Medium Blue
      fillOpacity = 0.8;
    } else if (hotspot >= 10 && hotspot < 30) {
      color = '#5c6bc0'; // Soft Blue 
      fillOpacity = 0.8;
    } else if (hotspot >= 1 && hotspot < 10) {
      color = '#7986cb'; // Light Blue
      fillOpacity = 0.8;
    } else if (hotspot <= 0)  {
      color = 'transparent'; // Fully transparent
      fillOpacity = 0;
    }
  
    return { color, fillOpacity };
  };
  
 
 


const isPointInPolygon = (point, polygon) => {
  if (!polygon || polygon.length === 0) return false;

  const x = point.lng, y = point.lat;

  // Ensure polygon is fully flattened
  const isInsideSinglePolygon = (singlePolygon) => {
    let isInside = false;
    for (let i = 0, j = singlePolygon.length - 1; i < singlePolygon.length; j = i++) {
      const xi = singlePolygon[i].lng, yi = singlePolygon[i].lat;
      const xj = singlePolygon[j].lng, yj = singlePolygon[j].lat;

      const intersect = ((yi > y) !== (yj > y)) &&
        (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) isInside = !isInside;
    }
    return isInside;
  };

  if (Array.isArray(polygon[0])) {
    return polygon.some(subPolygon => isInsideSinglePolygon(subPolygon));
  }

  return isInsideSinglePolygon(polygon);
};
const LoadingContainer = (props) => <div>Fancy loading container!</div>;


const clipPolygonToBoundary = (square, polygonBoundary) => {
  const clippedPolygon = [];

  for (let i = 0; i < square.length; i++) {
    const currentPoint = square[i];
    const nextPoint = square[(i + 1) % square.length];

    const isCurrentInside = isPointInPolygon(currentPoint, polygonBoundary);
    const isNextInside = isPointInPolygon(nextPoint, polygonBoundary);

    if (isCurrentInside) {
      clippedPolygon.push(currentPoint);
    }

    if (isCurrentInside !== isNextInside) {
      const intersection = getIntersectionPoint(currentPoint, nextPoint, polygonBoundary);
      if (intersection) clippedPolygon.push(intersection);
    }
  }

  return clippedPolygon;
};




const getIntersectionPoint = (p1, p2, polygon) => {
  for (let i = 0; i < polygon.length; i++) {
    const pA = polygon[i];
    const pB = polygon[(i + 1) % polygon.length];

    const intersection = lineIntersection(p1, p2, pA, pB);
    if (intersection) return intersection;
  }
  return null;
};

const lineIntersection = (A, B, C, D) => {
  const denominator = (A.lng - B.lng) * (C.lat - D.lat) - (A.lat - B.lat) * (C.lng - D.lng);

  if (denominator === 0) return null;

  const t = ((A.lng - C.lng) * (C.lat - D.lat) - (A.lat - C.lat) * (C.lng - D.lng)) / denominator;
  const u = ((A.lng - C.lng) * (A.lat - B.lat) - (A.lat - C.lat) * (A.lng - B.lng)) / denominator;

  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return { lat: A.lat + t * (B.lat - A.lat), lng: A.lng + t * (B.lng - A.lng) };
  }

  return null;
};



   
 
   const generateGrid = useMemo(() => {
    try {
      const polygons = [];
      const latStart = gridBounds.latMin ;
      const latEnd = gridBounds.latMax  ;
      const lngStart = gridBounds.lngMin  ;
      const lngEnd = gridBounds.lngMax ;
 
 
 
      if (latStart === 0 && latEnd === 0 && lngStart === 0 && lngEnd === 0) {
        return []; 
      }
    
  
      // const latStep = calculateRoundedValue(gridStepSize / 111);
      // const lngStep = calculateRoundedValue(gridStepSize / (111 * Math.cos((latStart + latEnd) / 2 * (Math.PI / 180))));
      const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

      const latStep = clamp(calculateRoundedValue(dynamicStepSize), 0.005, 0.05);
      const lngStep = clamp(calculateRoundedValue(dynamicStepSize), 0.005, 0.05);
      // const latStep = clamp(calculateRoundedValue(dynamicStepSize), 0.027, 0.05);
      // const lngStep = clamp(calculateRoundedValue(dynamicStepSize), 0.027, 0.05);
// console.log("latStep,lngStep",latStep,lngStep);
// console.log("Lat Steps:", (latEnd - latStart) / latStep);
// console.log("Lng Steps:", (lngEnd - lngStart) / lngStep);

    
      let polygonCount = 0; // Track number of polygons
      let keyCount = 0;
      let prevKey = null; // <-- track previous key here

      for (let lat = latStart; lat <= latEnd; lat += latStep) {
        for (let lng = lngStart; lng <= lngEnd; lng += lngStep) {
          keyCount = keyCount+1
          const roundedLat = calculateRoundedValue(lat);
          const roundedLng = calculateRoundedValue(lng);
      
          const nextLat = Math.min(lat + latStep, latEnd);
          const nextLng = Math.min(lng + lngStep, lngEnd);
  
          // Construct the rectangular polygon
          const polygonCoords = [
            { lat, lng },  
            { lat: nextLat, lng },  
            { lat: nextLat, lng: nextLng }, 
            { lat, lng: nextLng },  
            { lat, lng }  
          ];
  

          // console.log("polygonCoords",polygonCoords)
        
      
          
          const insideCorners = polygonCoords.filter(coord => isPointInPolygon(coord, data.paths));
      
          if (insideCorners.length === 0) {
            continue;
          }
      
          let finalPolygonCoords = polygonCoords;
          if (insideCorners.length < polygonCoords.length) {
            // If partially inside, clip the square
            finalPolygonCoords = clipPolygonToBoundary(polygonCoords, data.paths);
          }
      
          const latLngKey = `${roundedLat}X${roundedLng}`;
          // console.log("latLngKey",latLngKey)
          const hotspot = uniqueIdentifiersCount[latLngKey] || 0;
          const normalizedHotspot = Math.ceil((hotspot * 100) / (maxValue || 1));
          const { color, fillOpacity } = getColorAndOpacity(normalizedHotspot);
          const currentKey = `${roundedLat}-${roundedLng}-${normalizedHotspot}`;

          const polygon = (
            <Polygon
              key={`${roundedLat}-${roundedLng}-${polygonCount}-${normalizedHotspot}`}
              paths={finalPolygonCoords}
              strokeColor="#000000"
              strokeWeight={0.3}
              fillColor={color}
              fillOpacity={fillOpacity}
              onMouseover={() => {
                setHoveredCoords({ lat: roundedLat, lng: roundedLng, latLngString: `${roundedLat} X ${roundedLng} & ${normalizedHotspot}%`});
              }}
              onMouseout={() => {
                setHoveredCoords(null);
              }}
              zIndex={10000}
            />
          );
      
          polygons.push(polygon);
          prevKey = currentKey; // <-- update previous key here
          polygonCount++;
        }
        // if (polygonCount > 1000) break;
      }
      setPolyCount(polygonCount);
      return polygons;
    } catch (error) {
    }
    
   }, [gridBounds, dynamicStepSize, props.paths,values,maxValue,data.paths]);


 
     const [showInfoWindow, setShowInfoWindow] = useState(false);
     const [activeMarker, setActiveMarker] = useState(null);
     const handleMarkerClick = (marker) => {
      setActiveMarker(marker);
      setShowInfoWindow(true);
    };

    // console.log("data.bufferData",data.bufferData);
    // console.log("data.mapBoundary",data.mapBoundary)

     useEffect(() => {
        if (!data.bufferData) return;
      
        let coordinates;
      
        // Case 1: FeatureCollection
        if (data.bufferData.type === 'FeatureCollection') {
          coordinates = data.bufferData?.features?.[0]?.geometry?.coordinates?.[0];
        }
      
        // Case 2: Single Feature
        else if (data.bufferData.type === 'Feature') {
          coordinates = data.bufferData?.geometry?.coordinates?.[0];
        }
      
        // Only continue if coordinates are found
        if (coordinates) {
          const latLngArray = coordinates.map(coordPair => ({
            lng: coordPair[0],
            lat: coordPair[1],
          }));
          setNewBufferdata(latLngArray);
        }
      }, [props.bufferData]);
       
      // console.log("newBufferdata",newBufferdata)

      function normalizeBoundaryCoords(boundaryArray) {
        if (!Array.isArray(boundaryArray) || boundaryArray?.length === 0) return [];
      
        const isLatLngObject =
          typeof boundaryArray[0].lat === 'function' &&
          typeof boundaryArray[0].lng === 'function';
      
        return boundaryArray.map(point => {
          if (isLatLngObject) {
            return {
              lat: point.lat(),
              lng: point.lng()
            };
          }
      
          // Still check if it's already a plain object (fallback)
          return {
            lat: typeof point.lat === 'function' ? point.lat() : point.lat ?? point.latitude,
            lng: typeof point.lng === 'function' ? point.lng() : point.lng ?? point.longitude
          };
        });
      }

      function normalizeBoundaryCoords2(boundaryArray) {
        if (!Array.isArray(boundaryArray) || boundaryArray.length === 0) return [];
      
        return boundaryArray.map(point => {
          // Handle Google Maps LatLng object
          if (typeof point.lat === 'function' && typeof point.lng === 'function') {
            return {
              lat: point.lat(),
              lng: point.lng()
            };
          }
      
          // Handle object with lat/lng or latitude/longitude
          if (typeof point === 'object' && !Array.isArray(point)) {
            return {
              lat: typeof point.lat === 'function' ? point.lat() : point.lat ?? point.latitude,
              lng: typeof point.lng === 'function' ? point.lng() : point.lng ?? point.longitude
            };
          }
      
          // Handle array: [lng, lat] or [lat, lng] — assume [lng, lat] and convert to object
          if (Array.isArray(point) && point.length === 2) {
            return {
              lat: point[1],
              lng: point[0]
            };
          }
      
          // Fallback in case of invalid format
          return { lat: undefined, lng: undefined };
        });
      }
      //  console.log("data.newPolygon",data.newPolygon)



       function interpolateCoordinates(originalCoords, segmentsPerEdge = 10) {
        const interpolated = [];
      
        for (let i = 0; i < originalCoords.length - 1; i++) {
          const start = originalCoords[i];
          const end = originalCoords[i + 1];
      
          for (let j = 0; j < segmentsPerEdge; j++) {
            const lat = start.lat + ((end.lat - start.lat) * j) / segmentsPerEdge;
            const lng = start.lng + ((end.lng - start.lng) * j) / segmentsPerEdge;
            interpolated.push({ lat, lng });
          }
        }
      
        // Optional: close the loop
        interpolated.push(originalCoords[0]);
      
        return interpolated;
      }
      
      

      const convertLeafletPolygonToGeoJSON = (leafletPolygon) => {
        // console.log("leafletPolygon",leafletPolygon)
        const latlngs = leafletPolygon?.layer?._latlngs[0]; // Assuming it's a single polygon
      
        const coordinates = latlngs?.map((latlng) => [latlng.lng, latlng.lat]);
      
        // Make sure the polygon is closed (first point == last point)
        if (coordinates?.length && (coordinates[0][0] !== coordinates[coordinates.length - 1][0] ||
                                   coordinates[0][1] !== coordinates[coordinates.length - 1][1])) {
          coordinates.push(coordinates[0]);
        }
      
        return {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [coordinates],
          },
          properties: {},
        };
      };
      
       const createBuffer = (geojson, radius, units = 'kilometers') => {
        const data =  convertLeafletPolygonToGeoJSON(geojson);
          // console.log("geojson in reportmap buffer",geojson)
          // const buffered = turf.buffer(data, 0, { units }); 
          // console.log("buffered",buffered)
          // console.log("buffered.geometry.coordinates[0]",data.geometry.coordinates[0])
          const coordData = normalizeBoundaryCoords2(data.geometry.coordinates[0]);
          // console.log("coordData",coordData) 
        //  const detailedCoords = interpolateCoordinates(coordData, 200);
        //  console.log("detailedCoords",detailedCoords);
          // return detailedCoords ;
          return coordData;
        };

     

      function getArea(coords) {
        // console.log("coords",coords);
        if(coords.length>0 || coords.length != null){
          let area = 0;
          for (let i = 0, len = coords.length; i < len - 1; i++) {
            area += (coords[i].lng * coords[i + 1].lat) - (coords[i + 1].lng * coords[i].lat);
          }
          // console.log("area/2area/2",area/2)
          return area / 2;
        }
      }
      
      function ensureClockwise(coords) {
        if(coords.length>0 || coords.length != null){
        return getArea(coords) > 0 ? coords : [...coords].reverse();
        }
      }
      
      function ensureCounterClockwise(coords) {
        if(coords.length>0 || coords.length != null){
        return getArea(coords) < 0 ? coords : [...coords].reverse();
        }
      }
      

        
      
    // console.log("normalizeBoundaryCoords(data.mapBoundary)",normalizeBoundaryCoords(data.mapBoundary))
   return (
     
 <div className="map-container flex justify-between items-start h-[70vh] w-[91vw] md:w-[70vw] lg:w-[70vw] xlg:w-[70vw] md:ml-0 lg:ml-0">
 
      
        
       { gridBounds.latMin && gridBounds.lngMax && gridBounds.latMax && gridBounds.lngMin && maxValue &&
       <Map
         google={data.google}
         initialCenter={{
           lat: (gridBounds.latMin + gridBounds.latMax) / 2,
           lng: (gridBounds.lngMin + gridBounds.lngMax) / 2
         }}
          // onReady={!data.mapZoomOut &&  data.onMapReady}
          onReady={(mapProps, map) => {
            if (data.bufferData) {
              map.data.addGeoJson(data.bufferData);
              map.data.setStyle({
                // fillColor: '#4F9BC0',
                fillOpacity: 0,
                // strokeWeight: 0,
                strokeColor: '#4F9BC0'
              });
            }
        
            // if (data.orgPolyCoords) {
            //   map.data.addGeoJson(data.orgPolyCoords); // if orgPolyCoords is valid GeoJSON
            // }
        
            if (data.onMapReady && !data.mapZoomOut) {
              data.onMapReady(mapProps, map);
            }
          }}
          zoom={8.5 }
         style={{
           height: "70vh",
           width: window.innerWidth >758 ? '70vw' : '91vw',
         }}
         mapTypeControl={false}
         scaleControl={true}
         scaleControlOptions={{
          position: data.google.maps.ControlPosition.BOTTOM_LEFT
        }}
         streetViewControl={false}
         panControl={false}
         rotateControl={false}
       >

            {data.mapBoundary && (
             <Polygon
               paths={data.mapBoundary}
               strokeColor="#0000FF"
               strokeOpacity={.5}
               strokeWeight={2.5}
               fillColor="#c5cae9" 
               fillOpacity={0}
             />
           )}
          
          <Polygon
 paths={[
  Array.isArray(newBufferdata) ? ensureClockwise(newBufferdata) : [],
  ensureCounterClockwise(
    data.newPolygon
      ? createBuffer(data.newPolygon)
      : interpolateCoordinates(normalizeBoundaryCoords(data.mapBoundary))
  )
]}
  strokeColor="#4F9BC0"
  strokeOpacity={1}
  strokeWeight={1}
  fillColor="#c5cae9"  // Light blue
  fillOpacity={1}
/>

         {generateGrid}
           <InfoWindow                             
           visible={hoveredCoords?.latLngString ? true : false}

            position={{ lat: Number(hoveredCoords?.lat), lng: Number(hoveredCoords?.lng) }}
    
           >
             <div style={{zIndex:'1000'}}>
             <p>{hoveredCoords?.latLngString}</p>
             </div>
           </InfoWindow>    
       </Map>
       
       }
     </div>
   );
 }
 const LoadingContainer = (props) => <div>Fancy loading container!</div>;
 
 
 export default GoogleApiWrapper({
   apiKey: 'AIzaSyDhVAmY9KJ7SggfZqNrDrD_S3i6t7Nz1ig',
 })(HeatMap);
   
