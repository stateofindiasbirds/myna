const shapefile = require('shapefile');
const fs = require('fs');

// Replace 'your_shapefile.shp' with the actual path to your SHP file
shapefile.open('dists_sf_admin_mapped/dists_sf_admin_mapped.shp')
  .then(source => {
    const geojsonFeatures = [];

    const readNext = () => {
      return source.read().then(function(result) {
        if (result.done) {
          // All features have been read, we can return the GeoJSON object
          const geojson = {
            type: "FeatureCollection",
            features: geojsonFeatures
          };

          // Save GeoJSON to a file (optional)
          fs.writeFileSync('your_geojson.geojson', JSON.stringify(geojson, null, 2));
          console.log('GeoJSON conversion successful!');
          return;
        }

        geojsonFeatures.push(result.value);
        return readNext();
      });
    };

    return readNext();
  })
  .catch(error => {
    console.error('Error:', error);
  });
