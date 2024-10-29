const shapefile = require("shapefile");
const unzipper = require("unzipper");
const fs = require("fs-extra");
const path = require("path");

// Function to unzip the file
async function unzipShapefile(zipFilePath, extractTo) {
    try {
        // Ensure the output directory exists
        await fs.ensureDir(extractTo);

        // Unzip the file
        await fs.createReadStream(zipFilePath)
            .pipe(unzipper.Extract({ path: extractTo }))
            .promise();
        console.log("Unzip completed.");
    } catch (error) {
        console.error("Error during unzipping:", error);
    }
}

// Recursively find .shp files in the directory
function findShpFile(directory) {
    let shpFilePath = null;

    function recursiveSearch(dir) {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stats = fs.statSync(fullPath);

            if (stats.isDirectory()) {
                // If it's a directory, search recursively
                recursiveSearch(fullPath);
            } else if (path.extname(fullPath) === '.shp') {
                shpFilePath = fullPath;
                break;  // Break as soon as the .shp file is found
            }
        }
    }

    recursiveSearch(directory);
    return shpFilePath;
}

// Function to convert Shapefile to GeoJSON, ensuring both geometry and properties are included
async function convertShpToGeoJson(shpFilePath, outputFilePath) {
    try {
        const geojson = {
            type: "FeatureCollection",
            features: []
        };

        // Open shapefile and read geometry + properties (attributes from .dbf)
        const source = await shapefile.open(shpFilePath);

        let result;
        while (!(result = await source.read()).done) {
            const { geometry, properties } = result.value;

            // Include both geometry and properties in the GeoJSON feature
            const feature = {
                type: "Feature",
                geometry,  // Geometry from .shp
                properties // Attributes from .dbf (e.g., state names)
            };

            geojson.features.push(feature);
        }

        // Write the GeoJSON to the output file
        await fs.writeFile(outputFilePath, JSON.stringify(geojson, null, 2));
        console.log(`GeoJSON successfully created at: ${outputFilePath}`);
    } catch (error) {
        console.error("Error converting shapefile to GeoJSON:", error);
    }
}

// Main function to process .zip Shapefile and output GeoJSON
async function processZipToGeoJson(zipFilePath, outputDirectory, outputGeoJsonPath) {
    try {
        // Step 1: Unzip the shapefile
        const extractedFolder = path.join(outputDirectory, 'extracted');
        await unzipShapefile(zipFilePath, extractedFolder);

        // Step 2: Find .shp file in the extracted folder (and subfolders)
        const shpFilePath = findShpFile(extractedFolder);

        if (!shpFilePath) {
            throw new Error("No .shp file found in the provided zip file.");
        }

        console.log("Shapefile path:", shpFilePath);  // Log the .shp file path

        // Step 3: Convert to GeoJSON, including geometry and properties
        await convertShpToGeoJson(shpFilePath, outputGeoJsonPath);

        // Optional: Cleanup extracted folder after conversion
        await fs.remove(extractedFolder);
        console.log("Cleanup completed.");
    } catch (error) {
        console.error("Error during processing:", error);
    }
}

// Example Usage:
const zipFilePath = path.resolve(__dirname, "./dists_sf_admin_mapped_new.zip"); // Path to input zip file
const outputDirectory = path.resolve(__dirname, "output");         // Directory for extraction and temp files
const outputGeoJsonPath = path.resolve(outputDirectory, "district_new.geojson"); // Output GeoJSON path

processZipToGeoJson(zipFilePath, outputDirectory, outputGeoJsonPath);


















// const shapefile = require("shapefile");
// const fs = require("fs");
// const path = require("path");


// async function convertShpToGeoJson(shpFilePath, outputFilePath) {
//     try {
//         const geojson = {
//             type: "FeatureCollection",
//             features: []
//         };

//         // Open the shapefile
//         const source = await shapefile.open(shpFilePath);

//         // Iterate through each record and convert to GeoJSON format
//         let result;
//         while (!(result = await source.read()).done) {
//             const { geometry, properties } = result.value;

//             const feature = {
//                 type: "Feature",
//                 geometry,
//                 properties
//             };

//             geojson.features.push(feature);
//         }

//         // Write the resulting GeoJSON to a file
//         fs.writeFileSync(outputFilePath, JSON.stringify(geojson, null, 2));
//         console.log(`GeoJSON successfully created at: ${outputFilePath}`);
//     } catch (error) {
//         console.error("Error converting shapefile to GeoJSON:", error);
//     }
// }

// // Input .shp file and output .geojson file
// const shpFilePath = path.resolve(__dirname, "./dists_sf_admin_mapped_stripped.shp"); // Provide your .shp file here
// const outputFilePath = path.resolve(__dirname, "output-file-district.geojson");

// convertShpToGeoJson(shpFilePath, outputFilePath);



// const shapefile = require('shapefile');
// const fs = require('fs');

// // Replace 'your_shapefile.shp' with the actual path to your SHP file
// shapefile.open('./states_sf_admin_mapped.shp')
//   .then(source => {
//     const geojsonFeatures = [];

//     const readNext = () => {
//       return source.read().then(function(result) {
//         if (result.done) {
//           // All features have been read, we can return the GeoJSON object
//           const geojson = {
//             type: "FeatureCollection",
//             features: geojsonFeatures
//           };

//           // Save GeoJSON to a file (optional)
//           fs.writeFileSync('states_test.geojson', JSON.stringify(geojson, null, 2));
//           console.log('GeoJSON conversion successful!');
//           return;
//         }

//         geojsonFeatures.push(result.value);
//         return readNext();
//       });
//     };

//     return readNext();
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
