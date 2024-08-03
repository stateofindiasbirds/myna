// import React from 'react';
// import { Map, Polygon, GoogleApiWrapper } from 'google-maps-react';

// const center = { lat: 21.1458, lng: 79.0882 };

// const HeatMap = (props) => {
//     const gridStepSize = 10;

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
