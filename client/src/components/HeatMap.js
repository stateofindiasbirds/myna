// import React, { useEffect,useState } from 'react';
// import { Map, Polygon, GoogleApiWrapper } from 'google-maps-react';
// import { useSelector } from 'react-redux';
// import api from '../redux/api';

// const center = { lat: 21.1458, lng: 79.0882 };


// const HeatMap = (props) => {
//   const [speciesList, setSpeciesList] = useState([]);
//   const [groupIdentifierCount, setGroupIdentifierCount] = useState({}); // Use state for groupIdentifierCount

//    console.log('props.paths',props.paths)

//    const completeListOfSpeciesGi = useSelector(state => state?.UserReducer?.completeListOfSpeciesGi);

// useEffect(() => {
//   if (completeListOfSpeciesGi.length > 0) {
//     const identifierCount = {};

//     completeListOfSpeciesGi.forEach((item) => {
//       const groupId = item.groupIdentifier;
//       if (identifierCount[groupId]) {
//         identifierCount[groupId] += 1;
//       } else {
//         identifierCount[groupId] = 1;
//       }
//     });

//     setGroupIdentifierCount(identifierCount);
//   }
// }, [completeListOfSpeciesGi]);


// const gridStepSize = 10;


// console.log(groupIdentifierCount); 

// console.log('speciesList',speciesList);
//     const generateGrid = () => {
//         const polygons = [];
//         const latStart = 8.4;
//         const latEnd = 37.6;
//         const lngStart = 68.7;
//         const lngEnd = 97.25;

//         const latStep = gridStepSize / 111;
//         const lngStep = gridStepSize / (111 * Math.cos((latStart + latEnd) / 2 * (Math.PI / 180)));

//         for (let lat = latStart; lat <= latEnd; lat += latStep) {
//             for (let lng = lngStart; lng <= lngEnd; lng += lngStep) {
//                 const hotspot = Math.floor(Math.random() * 11); // Generate a random hotspot number from 0 to 10

//                 const polygonCoords = [
//                     { lat, lng },
//                     { lat: lat - latStep, lng },
//                     { lat: lat - latStep, lng: lng - lngStep },
//                     { lat, lng: lng - lngStep },
//                     { lat, lng }
//                 ];

//                 const { color, fillOpacity } = getColorAndOpacity(hotspot);

//                 const polygon = (
//                     <Polygon
//                         key={`${lat}-${lng}`}
//                         paths={polygonCoords}
//                         strokeWeight={0}
//                         fillColor={color}
//                         fillOpacity={fillOpacity}
//                     />
//                 );

//                 polygons.push(polygon);
//             }
//         }

//         console.log(polygons);

//         return polygons;
//     };

//     const getColorAndOpacity = (hotspot) => {
//         let color, fillOpacity;

//         if (hotspot >= 1 && hotspot <= 4) {
//             color = 'red';
//             fillOpacity = 0.4;
//         } else if (hotspot >= 5 && hotspot <= 7) {
//             color = 'yellow';
//             fillOpacity = 0.4;
//         } else if (hotspot >= 8) {
//             color = 'blue';
//             fillOpacity = 0.4;
//         } else {
//             color = 'transparent';
//             fillOpacity = 0.7;
//         }

//         return { color, fillOpacity };
//     };

//     return (
//         <div className='w-screen h-screen'>
//             <Map
//                 google={props.google}
//                 className="h-[95vh] md:h-[100vh] relative w-[100%]"
//                 initialCenter={center}
//                 zoom={5}
//                 scrollwheel
//             >
//                 {generateGrid()}
//             </Map>
//         </div>
//     );
// };

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyDhVAmY9KJ7SggfZqNrDrD_S3i6t7Nz1ig'
// })(HeatMap);


// import React, { useEffect, useState } from 'react';
// import { Map, Polygon, GoogleApiWrapper } from 'google-maps-react';
// import { useSelector } from 'react-redux';

// const center = { lat: 21.1458, lng: 79.0882 };

// // Define bounding box for a specific state (e.g., Himachal Pradesh)
// const stateBoundaries = {
//   latMin: 30.0,
//   latMax: 33.0,
//   lngMin: 76.0,
//   lngMax: 79.0
// };

// const HeatMap = (props) => {
//   const [speciesList, setSpeciesList] = useState([]);
//   const [groupIdentifierCount, setGroupIdentifierCount] = useState({});

//   const completeListOfSpeciesGi = useSelector(state => state?.UserReducer?.completeListOfSpeciesGi);

//   useEffect(() => {
//     if (completeListOfSpeciesGi.length > 0) {
//       const identifierCount = {};

//       completeListOfSpeciesGi.forEach((item) => {
//         const groupId = item.groupIdentifier;
//         if (identifierCount[groupId]) {
//           identifierCount[groupId] += 1;
//         } else {
//           identifierCount[groupId] = 1;
//         }
//       });

//       setGroupIdentifierCount(identifierCount);
//     }
//   }, [completeListOfSpeciesGi]);

//   const gridStepSize = 10;

//   const filterPointsByState = (paths) => {
//     return paths.filter(point => 
//       point.lat >= stateBoundaries.latMin &&
//       point.lat <= stateBoundaries.latMax &&
//       point.lng >= stateBoundaries.lngMin &&
//       point.lng <= stateBoundaries.lngMax
//     );
//   };

//   const generateGrid = () => {
//     const polygons = [];
//     const latStart = 8.4;
//     const latEnd = 37.6;
//     const lngStart = 68.7;
//     const lngEnd = 97.25;

//     const latStep = gridStepSize / 111;
//     const lngStep = gridStepSize / (111 * Math.cos((latStart + latEnd) / 2 * (Math.PI / 180)));

//     for (let lat = latStart; lat <= latEnd; lat += latStep) {
//       for (let lng = lngStart; lng <= lngEnd; lng += lngStep) {
//         const hotspot = Math.floor(Math.random() * 11); // Random hotspot number from 0 to 10

//         const polygonCoords = [
//           { lat, lng },
//           { lat: lat - latStep, lng },
//           { lat: lat - latStep, lng: lng - lngStep },
//           { lat, lng: lng - lngStep },
//           { lat, lng }
//         ];

//         const { color, fillOpacity } = getColorAndOpacity(hotspot);

//         const polygon = (
//           <Polygon
//             key={`${lat}-${lng}`}
//             paths={polygonCoords}
//             strokeWeight={0}
//             fillColor={color}
//             fillOpacity={fillOpacity}
//           />
//         );

//         polygons.push(polygon);
//       }
//     }

//     return polygons;
//   };

//   const getColorAndOpacity = (hotspot) => {
//     let color, fillOpacity;

//     if (hotspot >= 1 && hotspot <= 4) {
//       color = 'red';
//       fillOpacity = 0.4;
//     } else if (hotspot >= 5 && hotspot <= 7) {
//       color = 'yellow';
//       fillOpacity = 0.4;
//     } else if (hotspot >= 8) {
//       color = 'blue';
//       fillOpacity = 0.4;
//     } else {
//       color = 'transparent';
//       fillOpacity = 0.7;
//     }

//     return { color, fillOpacity };
//   };

//   // Filter paths to only include points within the selected state's boundaries
//   const filteredPaths = filterPointsByState(props.paths);

//   return (
//     <div className='w-screen h-screen'>
//       <Map
//         google={props.google}
//         className="h-[95vh] md:h-[100vh] relative w-[100%]"
//         initialCenter={center}
//         zoom={5}
//         scrollwheel
//       >
//         {generateGrid()}
//         {/* Render the filtered paths */}
//         {filteredPaths.map((path, index) => (
//           <Polygon
//             key={index}
//             paths={[{ lat: path.lat, lng: path.lng }]}
//             strokeColor="#0000FF"
//             strokeOpacity={0.8}
//             strokeWeight={2}
//             fillColor="#FF0000"
//             fillOpacity={0.35}
//           />
//         ))}
//       </Map>
//     </div>
//   );
// };

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyDhVAmY9KJ7SggfZqNrDrD_S3i6t7Nz1ig'
// })(HeatMap);


// import React, { useEffect, useState } from 'react';
// import { Map, Polygon, GoogleApiWrapper } from 'google-maps-react';

// const center = { lat: 21.1458, lng: 79.0882 };

// const HeatMap = (props) => {
//   const [gridBounds, setGridBounds] = useState({ latMin: 0, latMax: 0, lngMin: 0, lngMax: 0 });

//   // Calculate boundaries based on props.paths
//   useEffect(() => {
//     if (props.paths && props.paths.length > 0) {
//       const latitudes = props.paths.map(p => p.lat);
//       const longitudes = props.paths.map(p => p.lng);

//       const latMin = Math.min(...latitudes);
//       const latMax = Math.max(...latitudes);
//       const lngMin = Math.min(...longitudes);
//       const lngMax = Math.max(...longitudes);

//       setGridBounds({ latMin, latMax, lngMin, lngMax });
//     }
//   }, [props.paths]);

//   const gridStepSize = 0.01; 

//   const generateGrid = () => {
//     const polygons = [];
//     const latStart = gridBounds.latMin;
//     const latEnd = gridBounds.latMax;
//     const lngStart = gridBounds.lngMin;
//     const lngEnd = gridBounds.lngMax;

//     const latStep = gridStepSize / 111; // 111 km per degree latitude
//     const lngStep = gridStepSize / (111 * Math.cos((latStart + latEnd) / 2 * (Math.PI / 180)));

//     for (let lat = latStart; lat <= latEnd; lat += latStep) {
//       for (let lng = lngStart; lng <= lngEnd; lng += lngStep) {
//         const hotspot = Math.floor(Math.random() * 11); // Generate a random hotspot number from 0 to 10

//         const polygonCoords = [
//           { lat, lng },
//           { lat: lat - latStep, lng },
//           { lat: lat - latStep, lng: lng - lngStep },
//           { lat, lng: lng - lngStep },
//           { lat, lng }
//         ];

//         const { color, fillOpacity } = getColorAndOpacity(hotspot);

//         const polygon = (
//           <Polygon
//             key={`${lat}-${lng}`}
//             paths={polygonCoords}
//             strokeWeight={0}
//             fillColor={color}
//             fillOpacity={fillOpacity}
//           />
//         );

//         polygons.push(polygon);
//       }
//     }

//     return polygons;
//   };

//   const getColorAndOpacity = (hotspot) => {
//     let color, fillOpacity;

//     if (hotspot >= 1 && hotspot <= 4) {
//       color = 'red';
//       fillOpacity = 0.4;
//     } else if (hotspot >= 5 && hotspot <= 7) {
//       color = 'yellow';
//       fillOpacity = 0.4;
//     } else if (hotspot >= 8) {
//       color = 'blue';
//       fillOpacity = 0.4;
//     } else {
//       color = 'transparent';
//       fillOpacity = 0.7;
//     }

//     return { color, fillOpacity };
//   };

//   return (
//     <div className='w-screen h-screen'>
//       <Map
//         google={props.google}
//         className="h-[95vh] md:h-[100vh] relative w-[100%]"
//         initialCenter={center}
//         zoom={5}
//         scrollwheel
//       >
//         {generateGrid()}
//       </Map>
//     </div>
//   );
// };

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyDhVAmY9KJ7SggfZqNrDrD_S3i6t7Nz1ig'
// })(HeatMap);



// import React, { useEffect, useState, useMemo } from 'react';
// import { Map, Polygon, GoogleApiWrapper } from 'google-maps-react';

// const center = { lat: 21.1458, lng: 79.0882 };

// const HeatMap = (props) => {
//   const [gridBounds, setGridBounds] = useState({ latMin: 0, latMax: 0, lngMin: 0, lngMax: 0 });
//  console.log('props.paths',props.paths);
//   // Calculate boundaries based on props.paths
//   useEffect(() => {
//     if (props.paths && props.paths.length > 0) {
//       const latitudes = props.paths.map(p => p.lat);
//       const longitudes = props.paths.map(p => p.lng);
      
//       const latMin = Math.min(...latitudes);
//       const latMax = Math.max(...latitudes);
//       const lngMin = Math.min(...longitudes);
//       const lngMax = Math.max(...longitudes);
//       setGridBounds({ latMin, latMax, lngMin, lngMax });
//     }
//   }, [props.paths]);
//   console.log('gridBoundsgridBounds',gridBounds)
//   const gridStepSize = 0.1; // Increase step size to reduce the number of polygons

//   // Function to get color and opacity based on the hotspot value
//   const getColorAndOpacity = (hotspot) => {
//     let color, fillOpacity;

//     if (hotspot >= 1 && hotspot <= 4) {
//       color = 'red';
//       fillOpacity = 0.4;
//     } else if (hotspot >= 5 && hotspot <= 7) {
//       color = 'yellow';
//       fillOpacity = 0.4;
//     } else if (hotspot >= 8) {
//       color = 'blue';
//       fillOpacity = 0.4;
//     } else {
//       color = 'green';
//       fillOpacity = 0.7;
//     }

//     return { color, fillOpacity };
//   };

//   // Memoize grid generation to avoid unnecessary re-renders
//   const generateGrid = useMemo(() => {
//     const polygons = [];
//     const latStart = gridBounds.latMin;
//     const latEnd = gridBounds.latMax;
//     const lngStart = gridBounds.lngMin;
//     const lngEnd = gridBounds.lngMax;

//     if (latStart === 0 && latEnd === 0 && lngStart === 0 && lngEnd === 0) {
//       return []; // Prevent generating grid if bounds are not set
//     }

//     const latStep = gridStepSize / 111; // 111 km per degree latitude
//     const lngStep = gridStepSize / (111 * Math.cos((latStart + latEnd) / 2 * (Math.PI / 180)));

//     let polygonCount = 0; // Track number of polygons

//     for (let lat = latStart; lat <= latEnd; lat += latStep) {
//       for (let lng = lngStart; lng <= lngEnd; lng += lngStep) {
//         if (polygonCount > 1000) break; // Limit number of polygons to 1000 to avoid memory issues
//         const hotspot = Math.floor(Math.random() * 11); // Random hotspot number from 0 to 10

//         const polygonCoords = [
//           { lat, lng },
//           { lat: lat - latStep, lng },
//           { lat: lat - latStep, lng: lng - lngStep },
//           { lat, lng: lng - lngStep },
//           { lat, lng }
//         ];
//         console.log('Polygon coordinates:', polygonCoords);
//         const { color, fillOpacity } = getColorAndOpacity(hotspot);

//         const polygon = (
//           <Polygon
//             key={`${lat}-${lng}`}
//             paths={polygonCoords}
//             strokeWeight={0}
//             fillColor={color}
//             fillOpacity={fillOpacity}
//           />
//         );

//         polygons.push(polygon);
//         polygonCount++; 
//       }
//       if (polygonCount > 1000) break; 
//     }

//     return polygons;
//   }, [gridBounds, gridStepSize]);

//   return (
//     <div className='w-screen h-screen'>
//       <Map
//         google={props.google}
//         className="h-[95vh] md:h-[100vh] relative w-[100%]"
//         initialCenter={center}
//         center={{
//             lat: (gridBounds.latMin + gridBounds.latMax) / 2,
//             lng: (gridBounds.lngMin + gridBounds.lngMax) / 2
//           }}
//         zoom={5}
//         scrollwheel
//       >
//         {generateGrid}
//       </Map>
//     </div>
//   );
// };

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyDhVAmY9KJ7SggfZqNrDrD_S3i6t7Nz1ig'
// })(HeatMap);


 //workingggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg

import React, { useEffect, useState, useMemo } from 'react';
import { Map, Polygon, GoogleApiWrapper } from 'google-maps-react';
import { useSelector } from 'react-redux';

const center = { lat: 21.1458, lng: 79.0882 };

const HeatMap = (props) => {
  const [gridBounds, setGridBounds] = useState({ latMin: 0, latMax: 0, lngMin: 0, lngMax: 0 });
  const [groupIdentifierCount, setGroupIdentifierCount] = useState({}); 
  const completeListOfSpeciesGi = useSelector(state => state?.UserReducer?.completeListOfSpeciesGi);
  const [values,setValues] = useState([]);
  const [maxValue,setMaxValue] = useState(null);
  const [hoveredCoords, setHoveredCoords] = useState(null); 
  const [uniqueIdentifiersCount, setUniqueIdentifiersCount] = useState({});
  

  const roundToTwoDecimals = (num) => Math.round(num * 100) / 100;
  useEffect(() => {

    const locationMap = {};

    completeListOfSpeciesGi.forEach(entry => {
        
        const lat = roundToTwoDecimals(entry.latitude);
        const long = roundToTwoDecimals(entry.longitude);

        const latLongKey = `${lat}X${long}`;

        if (!locationMap[latLongKey]) {
            locationMap[latLongKey] = new Set();
        }
        locationMap[latLongKey].add(entry.groupIdentifier);
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
    const maxValue = Math.max(...values);

    if (maxValue > 0) { 
      setMaxValue(maxValue);
    }
    setValues(values);
  }
}, [uniqueIdentifiersCount]);



// console.log('maxValue',maxValue)

// console.log('uniqueIdentifiersCount',uniqueIdentifiersCount)

  // useEffect(()=>{
  //   if (values.length > 0) {
  //     // console.log('valuesMaxVAlue',values);
  //     setMaxValue(Math.max(...values));
  //   } 
  // },[values]);
  

  // console.log('completeListOfSpeciesGi',completeListOfSpeciesGi);

//   useEffect(() => {
//   if (completeListOfSpeciesGi.length > 0) {
//     const identifierCount = {};

//     completeListOfSpeciesGi.forEach((item) => {
//       const groupId = item.groupIdentifier;
//       if (identifierCount[groupId]) {
//         identifierCount[groupId] += 1;
//       } else {
//         identifierCount[groupId] = 1;
//       }
//     });

//     setGroupIdentifierCount(identifierCount);
//   }
// }, [completeListOfSpeciesGi]);

// useEffect(() => {
//   const allValues = Object.values(groupIdentifierCount);
//   setValues(allValues); 
// }, [groupIdentifierCount]); 


// console.log('groupIdentifierCount',groupIdentifierCount);
// Get unique counts
// const uniqueValues = new Set(Object.values(groupIdentifierCount));
// const uniqueCount = uniqueValues.size;

// console.log(uniqueCount); // This will log the count of unique values
  // console.log('props.paths', props.paths);
  // console.log('props.dataone',props.dataone)
  // Calculate boundaries based on props.paths
  useEffect(() => {
    if (props.paths && props.paths.length > 0) {
      const latitudes = props.paths.map(p => p.lat);
      const longitudes = props.paths.map(p => p.lng);
      
      const latMin = Math.min(...latitudes);
      const latMax = Math.max(...latitudes);
      const lngMin = Math.min(...longitudes);
      const lngMax = Math.max(...longitudes);
      setGridBounds({ latMin, latMax, lngMin, lngMax });
    }
  }, [props.paths]);

  // console.log('gridBounds', gridBounds);
  
  const gridStepSize = 5; // Larger step size for visible grid

  // Function to get color and opacity based on the hotspot value
  const getColorAndOpacity = (hotspot) => {
    // console.log('hotspot',hotspot)
    let color, fillOpacity;

    if (hotspot >= 70) {
      color = '#ad8a00';
      fillOpacity = 0.8;
    } else if (hotspot >= 30 && hotspot < 70) {
      color = '#ffcc00';
      fillOpacity = 0.8;
    } else if (hotspot >= 10 && hotspot < 30) {
      color = '#ffdd56';
      fillOpacity =0.8;
    } else if (hotspot >= 2 && hotspot < 10) {
      color = '#ffeca0';
      fillOpacity = 0.8;
    }  
    else {
      color = '#fff2c1';
      fillOpacity = 0.7;
    }

    return { color, fillOpacity };
  };

 
const isPointInPolygon = (point, polygon) => {
    let isInside = false;
    const x = point.lng, y = point.lat;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].lng, yi = polygon[i].lat;
      const xj = polygon[j].lng, yj = polygon[j].lat;
      
      const intersect = ((yi > y) !== (yj > y)) && 
        (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) isInside = !isInside;
    }
    return isInside;
  };

  
  const generateGrid = useMemo(() => {
    const polygons = [];
    const latStart = gridBounds.latMin;
    const latEnd = gridBounds.latMax;
    const lngStart = gridBounds.lngMin;
    const lngEnd = gridBounds.lngMax;
  
    if (latStart === 0 && latEnd === 0 && lngStart === 0 && lngEnd === 0) {
      return []; 
    }
  
    const latStep = gridStepSize / 111; 
    const lngStep = gridStepSize / (111 * Math.cos((latStart + latEnd) / 2 * (Math.PI / 180)));
  
    let polygonCount = 0; // Track number of polygons
  
    for (let lat = latStart; lat <= latEnd; lat += latStep) {
      for (let lng = lngStart; lng <= lngEnd; lng += lngStep) {
        if (polygonCount > 1000) break; 
  
      
        const point = { lat, lng };
        if (!isPointInPolygon(point, props.paths)) {
          continue; // Skip grid cell if outside the polygon
        }
        // console.log(lat, lng);
        const roundedLat = Math.round(lat * 100) / 100; // Round to 5 decimal places
        const roundedLng = Math.round(lng * 100) / 100; 
        const latLngKey = `${roundedLat}X${roundedLng}`;
        // console.log('latLngKey',latLngKey)
        // const hotspot = Math.floor(Math.random() * 11); 
        // const hotspot = (values[polygonCount] / maxValue) * 100;
        // const hotspot = Math.ceil((values[polygonCount] * 100) / maxValue);
        const hotspot = uniqueIdentifiersCount[latLngKey] || 0; // Get the count or 0 if not found
        const normalizedHotspot = Math.ceil((hotspot * 100) / (maxValue || 1)); 
        // console.log('normalizedHotspot',normalizedHotspot);
        // const hotspot = uniqueIdentifiersCount[latLngKey] 
        // ? (uniqueIdentifiersCount[latLngKey] / maxValue) * 100
        // : 0;

        // console.log('valuesvaluesvalues',values);
        // console.log('polygonCountpolygonCountpolygonCount',polygonCount);
        const polygonCoords = [
          { lat: roundedLat, lng: roundedLng },
          { lat: roundedLat - latStep, lng: roundedLng },
          { lat: roundedLat - latStep, lng: roundedLng - lngStep },
          { lat: roundedLat, lng: roundedLng - lngStep },
          { lat: roundedLat, lng: roundedLng }
        ];

  
        const { color, fillOpacity } = getColorAndOpacity(normalizedHotspot);
    //  console.log('color, fillOpacitycolor, fillOpacity',color, fillOpacity);
        const polygon = (
          <Polygon
            key={`${lat}-${lng}`}
            paths={polygonCoords}
            strokeWeight={0}
            fillColor={color}
            fillOpacity={fillOpacity}
            onMouseover={() => {
              setHoveredCoords({ lat: roundedLat, lng: roundedLng, latLngString: `${latLngKey} & ${hotspot}` });
            }}
            onMouseout={() => {
              setHoveredCoords(null);
            }}
          />
        );
  
        polygons.push(polygon);
        polygonCount++; 
      }
      if (polygonCount > 1000) break; 
    }
  
    return polygons;
  }, [gridBounds, gridStepSize, props.paths,values,maxValue]);
// }, [values]);
  //  console.log('hoveredCoordshoveredCoordshoveredCoords',hoveredCoords);

  return (
    <div className='w-screen h-screen'>

      {hoveredCoords && (
        <div
          style={{
            // position: 'absolute',
            // top: 20,
            left: '50%',
            backgroundColor: 'white',
            padding: '5px',
            border: '1px solid black',
            borderRadius: '4px',
            zIndex: 1000,
          }}
        >
          <p>{hoveredCoords.latLngString}</p>
        </div>
      )}
       
      { gridBounds.latMin && gridBounds.lngMax && gridBounds.latMax && gridBounds.lngMin && maxValue &&
      <Map
        google={props.google}
        // className="h-[95vh] md:h-[100vh] relative w-[100%]"
        initialCenter={{
          lat: (gridBounds.latMin + gridBounds.latMax) / 2,
          lng: (gridBounds.lngMin + gridBounds.lngMax) / 2
        }}
        // center={}
        zoom={10}
        scrollwheel
        style={{
          height: "100vh",
          width: '90vw',
        }}
      >
        {generateGrid}
      </Map>
      }
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDhVAmY9KJ7SggfZqNrDrD_S3i6t7Nz1ig'
})(HeatMap);


