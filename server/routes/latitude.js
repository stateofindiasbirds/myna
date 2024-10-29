const express = require("express");
const bodyParser = require("body-parser");
const UserController = require("../controllers/latitude");
const multer = require("multer");
const uploadToS3 = require("../upload");
const cacheMiddleware = require("../middlewares/cacheMiddleware");
const { MobileAnalytics } = require("aws-sdk");

const router = express.Router();
router.use(bodyParser.json());
const upload = multer();

const cacheKeyGenerator = (req) => {
  console.log(req);
  const { start, end } = req.query;
  const pathname = req.originalUrl; 
  const fileBuffer = req.file.buffer;
  const parsedContent = JSON.parse(fileBuffer.toString());
  const state = parsedContent.features[0].properties.stname;
  const county = parsedContent.features[0].properties.dtname;

  if (req.file && req.file.buffer) {
    const fileBuffer = req.file.buffer;
    const parsedContent = JSON.parse(fileBuffer.toString());
    console.log(parsedContent.features[0].properties);
  }

  if(state && county){
    return `${state}:${county}:${pathname}:${start}:${end}`;
  }else if (start && end){
    return `cache_key_for_${req.url}`
  }else{
    return
  }
};


router.post(
  "/percentage_iucn_redList_species",
  upload.single("file"),
  cacheMiddleware(cacheKeyGenerator),
  uploadToS3,
  UserController.iucnRedListSpeicies
);
router.post(
  "/percentage_endemic_species",
  upload.single("file"),
  cacheMiddleware(cacheKeyGenerator),
  uploadToS3,
  UserController.endemincSpecies
);
router.post(
  "/pertcentage_most_common_species",
  upload.single("file"),
  cacheMiddleware(cacheKeyGenerator),
  uploadToS3,
  UserController.mostCommonSpecies
);
router.post(
  "/seasonal_chart_for_species",
  upload.single("file"),
  cacheMiddleware(cacheKeyGenerator),
  uploadToS3,
  UserController.seasonalChart
);
router.post("/hotspot_area", upload.single("file"), cacheMiddleware(cacheKeyGenerator), UserController.hotspotArea);

router.post(
  "/complete_List_Of_Species",
  upload.single("file"),
  cacheMiddleware(cacheKeyGenerator),
  uploadToS3,
  UserController.completeListOfSpecies
);

router.post(
  "/complete_List_Of_Species_Gi",
  upload.single("file"),
  uploadToS3,
  UserController.completeListOfSpeciesGi
);

router.post(
  "/water_bird_congregation",
  upload.single("file"),
  cacheMiddleware(cacheKeyGenerator),
  uploadToS3,
  UserController.waterBirdCongregations
);
router.post(
  "/effortsDetails",
  upload.single("file"),
  cacheMiddleware(cacheKeyGenerator),
  uploadToS3,
  UserController.effortsDetails
);

router.post(
  "/soibConcernStatus",
  upload.single("file"),
  cacheMiddleware(cacheKeyGenerator),
  uploadToS3,
  UserController.soibConcernStatus
);

router.post(
  "/count_iucn_species",
  upload.single("file"),
  cacheMiddleware(cacheKeyGenerator),
  uploadToS3,
  UserController.count1);


  router.post("/count_appendix_species",
    upload.single("file"),
    cacheMiddleware(cacheKeyGenerator),
    uploadToS3,
  UserController.count2);

  router.post("/count_number_species",
    upload.single("file"),
    cacheMiddleware(cacheKeyGenerator),
    uploadToS3,
  UserController.count3);

module.exports = router;
