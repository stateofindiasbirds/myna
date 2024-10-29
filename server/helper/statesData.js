const fs = require('fs');
const path = require('path');

// Function to read the states.json and fetch data for a particular location
const getLocationData = (locationName) => {
    const statesFilePath = path.join(__dirname, '..', 'files', 'states.json');
    const statesData = JSON.parse(fs.readFileSync(statesFilePath, 'utf-8'));

    if (!locationName) {
      console.error('No location name provided');
      return;
    }

    // Find the state by matching location name, using STATE_NAME property
    const statesJsonData = statesData.features.find(item => {
        return item.properties && item.properties.STATE_NAME &&
               item.properties.STATE_NAME.trim().toLowerCase() === locationName.trim().toLowerCase();
    });

    if (!statesJsonData) {
      console.error(`No data found for location: ${locationName}`);
    } else {
      console.log('statesJsonData:', statesJsonData);
    }

    return statesJsonData;
};

module.exports = getLocationData;
