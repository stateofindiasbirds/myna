const express = require("express");
const bodyParser = require("body-parser");
const UserController = require("../controllers/latitude");
const multer = require("multer");
const uploadToS3 = require("../upload");

const router = express.Router();
router.use(bodyParser.json());
// const upload = multer();
const upload = multer();

router.post(
  "/count_by_scientificName",
  upload.single("file"),
  uploadToS3,
  UserController.count
);
router.post(
  "/percentage_iucn_redList_species",
  upload.single("file"),
  uploadToS3,
  UserController.iucnRedListSpeicies
);
router.post(
  "/percentage_endemic_species",
  upload.single("file"),
  uploadToS3,

  UserController.endemincSpecies
);
router.post(
  "/pertcentage_most_common_species",
  upload.single("file"),
  uploadToS3,
  UserController.mostCommonSpecies
);
router.post(
  "/seasonal_chart_for_species",
  upload.single("file"),
  uploadToS3,
  UserController.seasonalChart
);
router.post("/hotspot_area", upload.single("file"), UserController.hotspotArea);
router.post(
  "/complete_List_Of_Species",
  upload.single("file"),
  uploadToS3,
  UserController.completeListOfSpecies
);
router.post(
  "/water_bird_congregation",
  upload.single("file"),
  uploadToS3,
  UserController.waterBirdCongregations
);
router.post(
  "/effortsDetails",
  upload.single("file"),
  uploadToS3,
  UserController.effortsDetails
);

module.exports = router;
