const express = require("express");
const bodyParser = require("body-parser");
const UserController = require("../controllers/shape");
const multer = require("multer");
const router = express.Router();
router.use(bodyParser.json());
const upload = multer({ dest: "uploads/" });

router.post(
    "/count_by_scientificName",
    upload.single("file"),
    UserController.count
);
router.post(
    "/percentage_iucn_redList_species",
    upload.single("file"),
    UserController.iucnRedListSpeicies
);
router.post(
    "/percentage_endemic_species",
    upload.single("file"),
    UserController.endemincSpecies
);
router.post(
    "/pertcentage_most_common_species",
    upload.single("file"),
    UserController.mostCommonSpecies
);
router.post(
    "/seasonal_chart_for_species",
    upload.single("file"),
    UserController.seasonalChart
);

module.exports = router;