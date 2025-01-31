const express = require("express");
const bodyParser = require("body-parser");
const UserController = require("../controllers/controller");
const cacheMiddleware = require("../middlewares/cacheMiddleware")
const router = express.Router();
const axios = require('axios');
const getLocationData = require("../helper/statesData");
const getDistrictLocationData = require("../helper/districtsData");
router.use(bodyParser.json());

const cacheKeyGenerator = (req) => {
  const { state, county,locality, start, end } = req.query;
  const pathname = req.originalUrl.split('?')[0]; 
  if(state & county & locality){
    return `${encodeURIComponent(state)}:${encodeURIComponent(county)}:${encodeURIComponent(locality)}:${encodeURIComponent(pathname)}:${start}:${end}`;
  }
  else if(state && county){
    return `${state}:${county}:${pathname}:${start}:${end}`;
  }else{
    return
  }
};

const geoJSONCacheKeyGenerator = (req) => {
  const pathname = req.originalUrl.split('?')[0]; 
  const state = encodeURIComponent(req.query.state);
  const cacheKey = `${pathname}/${state}`; 
  return cacheKey;
};
const geoJSONCacheKeyGeneratorDistrict = (req) => {
  const pathname = req.originalUrl.split('?')[0]; 
  const state = encodeURIComponent(req.query.state);
  const county = encodeURIComponent(req.query.county);
  const cacheKey = `${pathname}/${state}/${county}`; 
  return cacheKey;
};
const oneYearInSeconds = 365 * 24 * 60 * 60;

// router.get('/geojson/states', async (req, res) => {

router.get('/geojson/states',  cacheMiddleware(geoJSONCacheKeyGenerator, oneYearInSeconds), async (req, res) => {
  const state = req.query.state;
  try {
    const statesData = await getLocationData(state);

    if (!statesData) {
      return res.status(404).send({ message: 'State data not found' });
    }

    res.send(statesData);
  } catch (error) {
    console.error('Error fetching state data:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }

});

router.get('/geojson/districts', cacheMiddleware(geoJSONCacheKeyGeneratorDistrict, oneYearInSeconds), async (req, res) => {
  // router.get('/geojson/districts',  async (req, res) => {

  const county = req.query.county;

  try {
    const districtData = getDistrictLocationData(county);

    if (!districtData) {
      return res.status(404).send({ message: 'District data not found' });
    }

    res.send(districtData);
  } catch (error) {
    console.error('Error fetching district data:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

router.get("/location_listing", UserController.locationName);

router.get("/location_listing",cacheMiddleware(cacheKeyGenerator), UserController.locationName);
// router.get("/count_by_scientificName", UserController.count);
router.get(
  "/percentage_iucn_redList_species",
  // cacheMiddleware(cacheKeyGenerator),
  UserController.iucnRedListSpeicies
);
router.get("/percentage_endemic_species", 
  // cacheMiddleware(cacheKeyGenerator),
   UserController.endemincSpecies);
router.get(
  "/pertcentage_most_common_species",
  // cacheMiddleware(cacheKeyGenerator),
  UserController.mostCommonSpecies
);
router.get("/seasonal_chart_for_species", 
  // cacheMiddleware(cacheKeyGenerator), 
  UserController.seasonalChart);
router.get("/hotspot_area", 
  // cacheMiddleware(cacheKeyGenerator), 
  UserController.hotspotArea);
// router.get("/complete_List_Of_Species", cacheMiddleware(cacheKeyGenerator), UserController.completeListOfSpecies);
router.get("/complete_List_Of_Species", UserController.completeListOfSpecies);

router.get("/complete_List_Of_Species_gi", UserController.completeListOfSpeciesGi);
router.get("/water_bird_congregation",
  //  cacheMiddleware(cacheKeyGenerator),
    UserController.waterBirdCongregations);
// router.get("/effortsDetails", cacheMiddleware(cacheKeyGenerator), UserController.effortsDetails);
router.get("/effortsDetails",UserController.effortsDetails);

// router.get("/soibConcernStatus", cacheMiddleware(cacheKeyGenerator), UserController.soibConcernStatus);
router.get("/soibConcernStatus", UserController.soibConcernStatus);

// router.get("/count_iucn_species", cacheMiddleware(cacheKeyGenerator), UserController.count1);
router.get("/count_iucn_species", UserController.count1);
// router.get("/count_appendix_species", cacheMiddleware(cacheKeyGenerator), UserController.count2);
router.get("/count_appendix_species",UserController.count2);
// router.get("/count_number_species", cacheMiddleware(cacheKeyGenerator), UserController.count3);
router.get("/count_number_species", UserController.count3);
router.get("/all_years_count", UserController.count4);

module.exports = router;
