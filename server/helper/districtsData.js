const fs = require('fs');
const path = require('path');

const getDistrictLocationData = (locationName) => {
    const districtsFilePath = path.join(__dirname, '..', 'files', 'districtdata.json');
    const districtData = JSON.parse(fs.readFileSync(districtsFilePath, 'utf-8'));

    if (!locationName) {
      console.error('No location name provided');
      return;
    }

    let districtJsonData;
     districtJsonData = districtData.features.find(item => {
        console.log('hit1')
        return item.properties && item.properties.DISTRIC &&
               item.properties.DISTRIC.trim().toLowerCase() === locationName.trim().toLowerCase();
    });

    if(!districtJsonData){
      districtJsonData = districtData.features.find(item => {
        console.log('hit2')
        return item.properties && item.properties.COUNTY &&
               item.properties.COUNTY.trim().toLowerCase() === locationName.trim().toLowerCase();
    });
    }


    if (!districtJsonData) {
      console.error(`No data found for location: ${locationName}`);
    } else {
      console.log('statesJsonData:', districtJsonData);
    }

    return districtJsonData;
};

module.exports = getDistrictLocationData;
