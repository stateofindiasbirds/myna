const express = require("express");
const bodyParser = require("body-parser");
const UserController = require("../controllers/controller");

const router = express.Router();
router.use(bodyParser.json());

router.get("/location_listing", UserController.locationName);
// router.get("/count_by_scientificName", UserController.count);
router.get(
  "/percentage_iucn_redList_species",
  UserController.iucnRedListSpeicies
);
router.get("/percentage_endemic_species", UserController.endemincSpecies);
router.get(
  "/pertcentage_most_common_species",
  UserController.mostCommonSpecies
);
router.get("/seasonal_chart_for_species", UserController.seasonalChart);
router.get("/hotspot_area", UserController.hotspotArea);
router.get("/complete_List_Of_Species", UserController.completeListOfSpecies);
router.get("/water_bird_congregation", UserController.waterBirdCongregations);
router.get("/effortsDetails",UserController.effortsDetails);
router.get("/soibConcernStatus",UserController.soibConcernStatus);

router.get("/count_iucn_species", UserController.count1);
router.get("/count_appendix_species", UserController.count2);
router.get("/count_number_species", UserController.count3);

module.exports = router;
