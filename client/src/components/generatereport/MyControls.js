/* global google */
import React, { useRef } from 'react';
import { FeatureGroup, useMap } from 'react-leaflet';
import { GeomanControls } from 'react-leaflet-geoman-v2';
import { getAreaOfPolygon } from 'geolib';
import { toast } from 'react-toastify';
import * as turf from "@turf/turf";
// import indiaBoundary from "./files/india-composite.json"; 

const DBLCLICK_THRESHOLD = 300; 

function MyControls({ _onCreate, _onDeleted, data, newPolygon, setArea, uploadedgeojson }) {
    const map = useMap();
    const activeDrawingLayerRef = useRef(null); 
    const lastClickTimeRef = useRef(0);

    // const createShapeEvent = (e) => {
    //     const layerType = e.layer.options.pmType; 
    //     const rawLatLngs = e.layer.getLatLngs();
        
    //     // 1. Normalize Coordinates
    //     let flatLatLngs = Array.isArray(rawLatLngs[0]) ? rawLatLngs[0] : rawLatLngs;
        
    //     // Guard: Minimum 2 points required for any shape
    //     if (!flatLatLngs || flatLatLngs.length < 2) {
    //         map.removeLayer(e.layer);
    //         return;
    //     }

    //     const turfCoords = flatLatLngs.map(p => [p.lng, p.lat]);
    //     let geojsonFeature;
        
    //     if (layerType === 'Line' || e.shape === 'Polyline') {
    //         geojsonFeature = turf.lineString(turfCoords);
    //         setArea(0); 
    //     } else {
    //         // Polygon Validation: Needs at least 2 unique points to start
    //         if (turfCoords.length < 2) {
    //             toast.error("Polygon requires at least 2 points.");
    //             map.removeLayer(e.layer);
    //             return;
    //         }

    //         const validationCoords = [...turfCoords];
    //         const first = validationCoords[0];
    //         const last = validationCoords[validationCoords.length - 1];
            
    //         // Close ring for validation only if it's a Polygon
    //         if (first[0] !== last[0] || first[1] !== last[1]) {
    //             validationCoords.push(first);
    //         }

    //         // Final GeoJSON LinearRing check (must have 4 positions)
    //         if (validationCoords.length < 4) {
    //             map.removeLayer(e.layer);
    //             return;
    //         }

    //         const areaKm = getAreaOfPolygon(validationCoords.map(c => ({ lng: c[0], lat: c[1] }))) / 1000000;
    //         setArea(areaKm);

    //         if (areaKm > 50000) {
    //             toast.error("Selected area is too large (> 50,000 Sq. Km)");
    //             map.removeLayer(e.layer); 
    //             return;
    //         }
    //         geojsonFeature = turf.polygon([validationCoords]);
    //     }

    //     // 2. India Boundary Check
    //     try {
    //         const indiaPolygon = turf.feature(indiaBoundary.features[0].geometry);
    //         const isInside = turf.booleanWithin(geojsonFeature, indiaPolygon);
    //         if (!isInside) {
    //             toast.error("Shape must be inside India boundary!");
    //             map.removeLayer(e.layer);
    //             return;
    //         }
    //     } catch (err) {
    //         console.error("Boundary validation error", err);
    //     }

    //     // 3. Success: Inject and pass to parent
    //     e.layer.options.customCoordinates = turfCoords;
    //     _onCreate(e); 
    // };

    const createShapeEvent = (e) => {
        // Geoman types can vary, so we check both 'Line' and 'Polyline'
        const layerType = e.layer.options.pmType || e.shape; 
        const isLine = layerType === 'Line' || layerType === 'Polyline';
        
        const rawLatLngs = e.layer.getLatLngs();
        
        // 1. Normalize Coordinates
        // Polylines usually have a flat array, Polygons often have nested arrays
        let flatLatLngs = Array.isArray(rawLatLngs[0]) ? rawLatLngs[0] : rawLatLngs;
        
        // Guard: Minimum 2 points required for any shape
        if (!flatLatLngs || flatLatLngs.length < 2) {
            map.removeLayer(e.layer);
            return;
        }

        const turfCoords = flatLatLngs.map(p => [p.lng, p.lat]);
        let geojsonFeature;
        let finalCoordsForReport = [...turfCoords];
        
        if (isLine) {
            // --- POLYLINE LOGIC ---
            // Create a LineString: Do NOT push the first coordinate to the end
            geojsonFeature = turf.lineString(turfCoords);
            setArea(0); 
        } else {
            // --- POLYGON LOGIC ---
            if (turfCoords.length < 2) {
                toast.error("Polygon requires at least 2 points.");
                map.removeLayer(e.layer);
                return;
            }

            const validationCoords = [...turfCoords];
            const first = validationCoords[0];
            const last = validationCoords[validationCoords.length - 1];
            
            // Close ring ONLY for Polygons to satisfy GeoJSON/Turf requirements
            if (first[0] !== last[0] || first[1] !== last[1]) {
                validationCoords.push(first);
            }

            // A valid GeoJSON Polygon LinearRing must have at least 4 positions (1st and 4th being same)
            if (validationCoords.length < 4) {
                toast.error("Invalid Polygon shape.");
                map.removeLayer(e.layer);
                return;
            }

            const areaKm = getAreaOfPolygon(validationCoords.map(c => ({ lng: c[0], lat: c[1] }))) / 1000000;
            setArea(areaKm);

            if (areaKm > 50000) {
                toast.error("Selected area is too large (> 50,000 Sq. Km)");
                map.removeLayer(e.layer); 
                return;
            }
            
            geojsonFeature = turf.polygon([validationCoords]);
            finalCoordsForReport = validationCoords; // Use the closed loop for polygons
        }

        // 2. India Boundary Check
        // try {
        //     const indiaPolygon = turf.feature(indiaBoundary.features[0].geometry);
        //     const isInside = turf.booleanWithin(geojsonFeature, indiaPolygon);
        //     if (!isInside) {
        //         toast.error("Shape must be inside India boundary!");
        //         map.removeLayer(e.layer);
        //         return;
        //     }
        // } catch (err) {
        //     console.error("Boundary validation error", err);
        // }

        // 3. Success: Inject properties so Report.js knows how to handle it
        // We store the specific type so Report.js doesn't assume everything is a Polygon
        e.layer.options.customCoordinates = finalCoordsForReport;
        e.layer.options.geometryType = isLine ? "LineString" : "Polygon"; 
        
        _onCreate(e); 
    };

    const handleMapClick = (e) => {
        const layer = activeDrawingLayerRef.current;
        const now = Date.now();
        
        if (layer) {
            const latlngs = layer.getLatLngs();
            const isDoubleClick = now - lastClickTimeRef.current < DBLCLICK_THRESHOLD;

            if (isDoubleClick && latlngs.length >= 2) {
                lastClickTimeRef.current = 0;
                map.pm.disableDraw(); // Clean finish
                return; 
            }
            lastClickTimeRef.current = now; 
        }
    };
    
    const onDrawStart = (e) => {
        activeDrawingLayerRef.current = e.workingLayer;
        map.doubleClickZoom.disable(); 
        map.on('click', handleMapClick); 
    };
    
    const onDrawEnd = () => {
        map.doubleClickZoom.enable(); 
        map.off('click', handleMapClick);
        activeDrawingLayerRef.current = null;
    };

    const clearAllLayers = (e) => {
        if (e.enabled) {
            map.eachLayer((layer) => {
                if (!layer._layers && layer.options.pane === "overlayPane") {
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
        drawPolygon: !uploadedgeojson,
        drawPolyline: !uploadedgeojson, 
        removalMode: true,
        drawControls: !data || !newPolygon,
        drawMarker: false, 
        drawCircle: false, 
        drawCircleMarker: false, 
        drawText: false,
        drawText: false,
        cutPolygon: false, 
        rotateMode: false, 
        dragMode: false,
        rotateMode: false,
        cutPolygon: false,
        removalMode: true,
        drawRectangle: false
    }}
                globalOptions={{
                    continueDrawing: false,
                    editable: true,
                    finishOn: 'dblclick',
                }}
                onCreate={createShapeEvent}
                onLayerRemove={_onDeleted}
                onGlobalRemovalModeToggled={clearAllLayers}
                onDrawStart={onDrawStart} 
                onDrawEnd={onDrawEnd}   
            />
        </FeatureGroup>
    );
}

export default MyControls;
