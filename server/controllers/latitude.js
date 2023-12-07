const { stat } = require("fs");
const Kinnaur = require("../models/birdsData");
const Sequelize = require("sequelize");
const { count } = require("console");
const fs = require("fs");
const { Op } = require("sequelize");
const DOMParser = require("xmldom").DOMParser;
const tj = require("@mapbox/togeojson");
const { toKml } = require("tokml");
const path = require("path");
const { getCipherInfo } = require("crypto");
const { constrainedMemory } = require("process");

function readFileAsync(filePath, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function getMonthlyData(birds, scientificName, frequency, getMonth) {
  const frequencyCount = birds.reduce((acc, bird) => {
    const month = getMonth(bird.observationDate);
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyData = months.map((month) => {
    const count = frequencyCount[month] || 0;
    const percentage = ((count / frequency) * 100).toFixed(0) + "%";
    return { month, count, percentage };
  });

  return monthlyData;
}

const UserController = {
  async count(req, res) {
    const filePath = req.file.buffer;
    const fileData = filePath.toString("utf-8");
    try {
      const geojson = JSON.parse(fileData);
      const polygonCoords = geojson.features[0].geometry.coordinates[0];
      const firstPoint = polygonCoords[0];
      const lastPoint = polygonCoords[polygonCoords.length - 1];
      if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
        polygonCoords.push(firstPoint); // Add the first point to close the loop
      }
      const polygonText = `POLYGON((${polygonCoords
        .map((point) => point.join(" "))
        .join(", ")}))`;
      const categories = [
        "Vulnerable",
        "Critically Endangered",
        "Near Threatened",
        "Endangered",
      ];
      const start = req.query.start || false;
      const end = req.query.end || false;
      const arr1 = [
        Sequelize.where(
          Sequelize.fn(
            "ST_Within",
            Sequelize.fn(
              "ST_SetSRID",
              Sequelize.fn(
                "ST_MakePoint",
                Sequelize.col("longitude"),
                Sequelize.col("latitude")
              ),
              4326
            ),
            Sequelize.fn("ST_GeomFromText", polygonText, 4326)
          ),
          true
        ),
      ];
      if (start && end) {
        arr1.push(
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          )
        );
      }
      const counts = {};
      const obj = {};
      const count = await Kinnaur.count({
        distinct: true,
        col: "eBirdScientificName",
        where: {
          category: ["species", "issf", "domestic"],
          [Sequelize.Op.and]: arr1,
        },
      });
      const soib = await Kinnaur.count({
        distinct: true,
        col: "eBirdScientificName",
        where: {
          soibConcernStatus: "High",
          [Sequelize.Op.and]: arr1,
        },
      });
      const scheduleI = await Kinnaur.count({
        distinct: true,
        col: "eBirdScientificName",
        where: {
          wpaSchedule: "Schedule-I",
          [Sequelize.Op.and]: arr1,
        },
      });
      const indiaEndemic = await Kinnaur.count({
        distinct: true,
        col: "eBirdScientificName",
        where: {
          indiaEndemic: "Yes",
          [Sequelize.Op.and]: arr1,
        },
      });
      const highConcern = await Kinnaur.count({
        distinct: true,
        col: "eBirdScientificName",
        where: {
          soibConcernStatus: "High",
          [Sequelize.Op.and]: arr1,
        },
      });
      const moderateConcern = await Kinnaur.count({
        distinct: true,
        col: "eBirdScientificName",
        where: {
          soibConcernStatus: "Moderate",
          [Sequelize.Op.and]: arr1,
        },
      });
      const citesAppendixI = await Kinnaur.count({
        distinct: true,
        col: "eBirdScientificName",
        where: {
          citesAppendix: "Appendix I",
          [Sequelize.Op.and]: arr1,
        },
      });
      const citesAppendixII = await Kinnaur.count({
        distinct: true,
        col: "eBirdScientificName",
        where: {
          citesAppendix: "Appendix II",
          [Sequelize.Op.and]: arr1,
        },
      });
      const cmsAppendixI = await Kinnaur.count({
        distinct: true,
        col: "eBirdScientificName",
        where: {
          cmsAppendix: "Appendix I",
          [Sequelize.Op.and]: arr1,
        },
      });
      const cmsAppendixII = await Kinnaur.count({
        distinct: true,
        col: "eBirdScientificName",
        where: {
          cmsAppendix: "Appendix II",
          [Sequelize.Op.and]: arr1,
        },
      });
      const migrate = await Kinnaur.findAll({
        attributes: [
          [
            Sequelize.fn("DISTINCT", Sequelize.col("eBirdScientificName")),
            "eBirdScientificName",
          ],
          "migratoryStatusWithinIndia",
        ],
        where: {
          [Sequelize.Op.and]: arr1,
        },
        raw: true,
      });
      const migrateCount = migrate.filter((ele) => {
        const pattern = /^(?!.*(Resident|Uncertain)).*$/;
        return pattern.test(ele.migratoryStatusWithinIndia);
      });
      for (const category of categories) {
        const count = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {  
            iucnCategory: category,
            [Sequelize.Op.and]: arr1,
            eBirdScientificName: Sequelize.where(
              Sequelize.fn(
                "regexp_replace",
                Sequelize.col("eBirdScientificName"),
                "\\d+",
                "",
                "g"
              ),
              "=",
              Sequelize.col("eBirdScientificName")
            ),
          },
        });
        counts[category] = count;
      }
      const cms1 = {};
      const cms2 = {};
      cms1["species"] = "Appendix I";
      cms1["count"] = cmsAppendixI;
      cms2["species"] = "Appendix II";
      cms2["count"] = cmsAppendixII;
      const cities1 = {};
      const cities2 = {};
      cities1["species"] = "Appendix I";
      cities1["count"] = citesAppendixI;
      cities2["species"] = "Appendix II";
      cities2["count"] = citesAppendixII;
      const soibConcern1 = {};
      const soibConcern2 = {};
      soibConcern1["species"] = "Moderate Priority";
      soibConcern1["count"] = moderateConcern;
      soibConcern2["species"] = "High Priority";
      soibConcern2["count"] = highConcern;
      obj["iucnRedListCategoriesCount"] = counts;
      obj["total"] = count;
      obj["migrate"] = migrateCount.length;
      obj["iucnRedList"] =
        counts["Vulnerable"] +
        counts["Critically Endangered"] +
        counts["Endangered"];
      obj["soibHighPriority"] = soib;
      obj["scheduleI"] = scheduleI;
      obj["indiaEndemic"] = indiaEndemic;
      obj["soibConservationConcernSpecies"] = [];
      obj["soibConservationConcernSpecies"].push(soibConcern1, soibConcern2);
      obj["citesAppendixSpecies"] = [];
      obj["citesAppendixSpecies"].push(cities1, cities2);
      obj["cmsAppendixSpecies"] = [];
      obj["cmsAppendixSpecies"].push(cms1, cms2);
      res.json(obj);
    } catch (error) {
      res.status(500).send({ error: error });
    }
  },
  async iucnRedListSpeicies(req, res) {
    const filePath = req.file.buffer;
    try {
      const fileData = filePath.toString("utf-8");
      // Parse the GeoJSON data
      const geojson = JSON.parse(fileData);
      const polygonCoords = geojson.features[0].geometry.coordinates[0];
      const firstPoint = polygonCoords[0];
      const lastPoint = polygonCoords[polygonCoords.length - 1];
      if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
        polygonCoords.push(firstPoint); // Add the first point to close the loop
      }
      const polygonText = `POLYGON((${polygonCoords
        .map((point) => point.join(" "))
        .join(", ")}))`;
      const iucnOrder = {
        "Critically Endangered": 0,
        Endangered: 1,
        Vulnerable: 2,
        "Near Threatened": 3,
      };
      const start = req.query.start || false;
      const end = req.query.end || false;
      const arr1 = [
        Sequelize.where(
          Sequelize.fn(
            "ST_Within",  
            Sequelize.fn(
              "ST_SetSRID",
              Sequelize.fn(
                "ST_MakePoint",
                Sequelize.col("longitude"),
                Sequelize.col("latitude")
              ),
              4326
            ),
            Sequelize.fn("ST_GeomFromText", polygonText, 4326)
          ),
          true
        ),
      ];
      if (start && end) {
        arr1.push(
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          )
        );
      }
      const groupIdentifier = await Kinnaur.findAll({
        attributes: [
          "allSpeciesReported",
          [
            Sequelize.fn(
              "count",
              Sequelize.col("indiaChecklistScientificName")
            ),
            "count",
          ],
          "groupIdentifier",
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.fn("DISTINCT", Sequelize.col("groupIdentifier"))
            ),
            "uniqueGroupCount",
          ],
        ],
        where: {
          [Op.and]: arr1,
        },
        group: ["groupIdentifier", "allSpeciesReported"],
        raw: true,
      });

      const results = await Kinnaur.findAll({
        attributes: [
          "iucnCategory",
          "indiaChecklistScientificName",
          "indiaChecklistCommonName",
          "allSpeciesReported",
          "uniqueValue",
          [
            Sequelize.fn(
              "count",
              Sequelize.col("indiaChecklistScientificName")
            ),
            "count",
          ],
          "groupIdentifier",
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.fn("DISTINCT", Sequelize.col("groupIdentifier"))
            ),
            "uniqueGroupCount",
          ],
        ],
        where: {
          iucnCategory: {
            [Sequelize.Op.in]: [
              "Vulnerable",
              "Critically Endangered",
              "Near Threatened",
              "Endangered",
            ],
          },
          [Op.and]: arr1,
        },
        group: [
          "iucnCategory",
          "indiaChecklistScientificName",
          "indiaChecklistCommonName",
          "groupIdentifier",
          "allSpeciesReported",
          "uniqueValue",
        ],
        raw: true,
      });
      const scientificNameCounts = {};
      const arr = [];
      const uniqueMap = new Map();
      groupIdentifier.map((result) => {
        if (
          !arr.includes(result.groupIdentifier) &&
          result.allSpeciesReported == "1"
        ) {
          arr.push(result.groupIdentifier);
        }
      });
      results.forEach((result) => {
        const birdScientificName = result.indiaChecklistScientificName;
        if (
          scientificNameCounts.hasOwnProperty(birdScientificName) &&
          result.allSpeciesReported == "1"
        ) {
          scientificNameCounts[birdScientificName]++;
        } else if (result.allSpeciesReported == "1") {
          scientificNameCounts[birdScientificName] = 1;
        }
        const key = result.uniqueValue;
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, result);
        }
      });
      const uniqueArray = [...uniqueMap.values()];
      const newArray = uniqueArray.map((ele) => {
        let bird = ele.indiaChecklistScientificName;
        return {
          region: ele.iucnCategory,
          indiaChecklistScientificName: ele.indiaChecklistScientificName,
          indiaChecklistCommonName: ele.indiaChecklistCommonName,
          uniqueValue: ele.uniqueValue,
          percentage: isNaN(
            Math.round((scientificNameCounts[bird] / arr.length) * 100)
          )
            ? "0%"
            : Math.round((scientificNameCounts[bird] / arr.length) * 100) + "%",
        };
      });
      const sortedArray = newArray.sort((a, b) => {
        const iucnComparison = iucnOrder[a.region] - iucnOrder[b.region];

        if (iucnComparison !== 0) {
          return iucnComparison;
        }
        return parseInt(a.uniqueValue, 10) - parseInt(b.uniqueValue, 10);
      });
      res.send(sortedArray);
    } catch (error) {
      res.send({ error: error.message });
    }
  },
  async endemincSpecies(req, res) {
    try {
      const filePath = req.file.buffer;
      // Read the contents of the file
      const fileData = filePath.toString("utf-8");
      const data = JSON.parse(fileData);
      const polygonCoords = data.features[0].geometry.coordinates[0];
      const firstPoint = polygonCoords[0];
      const lastPoint = polygonCoords[polygonCoords.length - 1];
      if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
        polygonCoords.push(firstPoint); // Add the first point to close the loop
      }
      const polygonText = `POLYGON((${polygonCoords
        .map((point) => point.join(" "))
        .join(", ")}))`;

      const allowedRegions = [
        "Himalayas",
        "Western Himalayas",
        "Assam Plains",
        "Andaman and Nicobar Islands",
        "Central India",
        "Eastern Himalayas",
        "Indus Plains",
        "Mainland India",
        "Western Ghats & Sri Lanka",
        "Western Ghats",
        "Southern Deccan Plateau",
        "Nicobar Islands",
        "Northern Myanmar Lowlands",
        "Indian Subcontinent",
        "Andaman Islands",
      ];

      const start = req.query.start || false;
      const end = req.query.end || false;
      const arr1 = [
        Sequelize.where(
          Sequelize.fn(
            "ST_Within",
            Sequelize.fn(
              "ST_SetSRID",
              Sequelize.fn(
                "ST_MakePoint",
                Sequelize.col("longitude"),
                Sequelize.col("latitude")
              ),
              4326
            ),
            Sequelize.fn("ST_GeomFromText", polygonText, 4326)
          ),
          true
        ),
      ];
      if (start && end) {
        arr1.push(
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          )
        );
      }
      const groupIdentifier = await Kinnaur.findAll({
        attributes: [
          "allSpeciesReported",
          [
            Sequelize.fn(
              "count",
              Sequelize.col("indiaChecklistScientificName")
            ),
            "count",
          ],
          "groupIdentifier",
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.fn("DISTINCT", Sequelize.col("groupIdentifier"))
            ),
            "uniqueGroupCount",
          ],
        ],
        where: {
          [Sequelize.Op.and]: arr1,
        },
        group: ["groupIdentifier", "allSpeciesReported"],
        raw: true,
      });
      const results = await Kinnaur.findAll({
        attributes: [
          "endemicRegion",
          "indiaChecklistScientificName",
          "indiaChecklistCommonName",
          "allSpeciesReported",
          "uniqueValue",
          [
            Sequelize.fn(
              "count",
              Sequelize.col("indiaChecklistScientificName")
            ),
            "count",
          ],
          "groupIdentifier",
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.fn("DISTINCT", Sequelize.col("groupIdentifier"))
            ),
            "uniqueGroupCount",
          ],
        ],
        where: {
          endemicRegion: {
            [Sequelize.Op.in]: allowedRegions,
          },
          [Sequelize.Op.and]: arr1,
        },
        group: [
          "endemicRegion",
          "indiaChecklistScientificName",
          "indiaChecklistCommonName",
          "groupIdentifier",
          "allSpeciesReported",
          "uniqueValue",
        ],
        raw: true,
      });
      const eBirdScientificNameCounts = {};
      const arr = [];
      const uniqueMap = new Map();

      groupIdentifier.map((result) => {
        if (
          !arr.includes(result.groupIdentifier) &&
          result.allSpeciesReported == "1"
        ) {
          arr.push(result.groupIdentifier);
        }
      });

      results.forEach((result) => {
        const birdScientificName = result.indiaChecklistScientificName;
        if (
          eBirdScientificNameCounts.hasOwnProperty(birdScientificName) &&
          result.allSpeciesReported == "1"
        ) {
          eBirdScientificNameCounts[birdScientificName]++;
        } else if (result.allSpeciesReported == "1") {
          eBirdScientificNameCounts[birdScientificName] = 1;
        }
        const key = result.uniqueValue;
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, result);
        }
      });
      const uniqueArray = [...uniqueMap.values()];
      const newArray = uniqueArray.map((ele) => {
        let bird = ele.indiaChecklistScientificName;
        return {
          region: ele.endemicRegion,
          indiaChecklistScientificName: ele.indiaChecklistScientificName,
          indiaChecklistCommonName: ele.indiaChecklistCommonName,
          uniqueValue: ele.uniqueValue,
          percentage: isNaN(
            Math.round((eBirdScientificNameCounts[bird] / arr.length) * 100)
          )
            ? "0%"
            : Math.round((eBirdScientificNameCounts[bird] / arr.length) * 100) +
              "%",
        };
      });
      const sortedArray = newArray.sort((a, b) => {
        const uniqueValueA = parseInt(a.uniqueValue, 10);
        const uniqueValueB = parseInt(b.uniqueValue, 10);

        if (uniqueValueA < uniqueValueB) {
          return -1;
        }
        if (uniqueValueA > uniqueValueB) {
          return 1;
        }
        return 0;
      });
      res.send(sortedArray);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while processing the data");
    }
  },
  async mostCommonSpecies(req, res) {
    try {
      const filePath = req.file.buffer;
      // Read the contents of the file
      const fileData = filePath.toString("utf-8");
      const data = JSON.parse(fileData);
      const polygonCoords = data.features[0].geometry.coordinates[0];
      const firstPoint = polygonCoords[0];
      const lastPoint = polygonCoords[polygonCoords.length - 1];
      if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
        polygonCoords.push(firstPoint); // Add the first point to close the loop
      }
      const polygonText = `POLYGON((${polygonCoords
        .map((point) => point.join(" "))
        .join(", ")}))`;
      const start = req.query.start || false;
      const end = req.query.end || false;
      const arr1 = [
        Sequelize.where(
          Sequelize.fn(
            "ST_Within",
            Sequelize.fn(
              "ST_SetSRID",
              Sequelize.fn(
                "ST_MakePoint",
                Sequelize.col("longitude"),
                Sequelize.col("latitude")
              ),
              4326
            ),
            Sequelize.fn("ST_GeomFromText", polygonText, 4326)
          ),
          true
        ),
      ];
      if (start && end) {
        arr1.push(
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          )
        );
      }
      const groupIdentifier = await Kinnaur.findAll({
        attributes: [
          "allSpeciesReported",
          [
            Sequelize.fn(
              "count",
              Sequelize.col("indiaChecklistScientificName")
            ),
            "count",
          ],
          "groupIdentifier",
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.fn("DISTINCT", Sequelize.col("groupIdentifier"))
            ),
            "uniqueGroupCount",
          ],
        ],
        where: {
          [Sequelize.Op.and]: arr1,
        },
        group: ["groupIdentifier", "allSpeciesReported"],
        raw: true,
      });
      const results = await Kinnaur.findAll({
        attributes: [
          "indiaChecklistScientificName",
          "indiaChecklistCommonName",
          "uniqueValue",
          "allSpeciesReported",
          "category",
          [
            Sequelize.fn(
              "count",
              Sequelize.col("indiaChecklistScientificName")
            ),
            "count",
          ],
          "groupIdentifier",
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.fn("DISTINCT", Sequelize.col("groupIdentifier"))
            ),
            "uniqueGroupCount",
          ],
        ],
        where: {
          category: ["species", "issf", "domestic"],
          [Sequelize.Op.and]: arr1,
        },
        group: [
          "indiaChecklistScientificName",
          "indiaChecklistCommonName",
          "groupIdentifier",
          "uniqueValue",
          "allSpeciesReported",
          "category",
        ],
        raw: true,
      });
      console.log(results);
      const scientificNameCounts = {};
      const arr = [];
      const uniqueMap = new Map();
      groupIdentifier.map((result) => {
        if (
          !arr.includes(result.groupIdentifier) &&
          result.allSpeciesReported == "1"
        ) {
          arr.push(result.groupIdentifier);
        }
      });
      results.forEach((result) => {
        const birdScientificName = result.indiaChecklistScientificName;
        if (
          scientificNameCounts.hasOwnProperty(birdScientificName) &&
          result.allSpeciesReported == "1"
        ) {
          scientificNameCounts[birdScientificName]++;
        } else if (result.allSpeciesReported == "1") {
          scientificNameCounts[birdScientificName] = 1;
        }
        const key = result.uniqueValue;
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, result);
        }
      });
      const uniqueArray = [...uniqueMap.values()];
      const newArray = uniqueArray.map((ele) => {
        let bird = ele.indiaChecklistScientificName;
        return {
          indiaChecklistScientificName: ele.indiaChecklistScientificName,
          indiaChecklistCommonName: ele.indiaChecklistCommonName,
          count: scientificNameCounts[bird],
          percentage: isNaN(
            Math.round((scientificNameCounts[bird] / arr.length) * 100)
          )
            ? "0"
            : Math.round((scientificNameCounts[bird] / arr.length) * 100),
        };
      });
      newArray.sort((a, b) => {
        const percentageA = parseInt(a.percentage); // Convert percentage to a number
        const percentageB = parseInt(b.percentage);
        return percentageB - percentageA;
      });
      const top10 = newArray.slice(0, 10);
      res.send(top10);
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("An error occurred while processing the data");
    }
  },
  async seasonalChart(req, res) {
    try {
      function getMonth(dateStr) {
        const date = new Date(dateStr);
        const month = date.toLocaleString("default", {
          month: "short",
        });
        return month;
      }
      const filePath = req.file.buffer;
      // Read the contents of the file
      const fileData = filePath.toString("utf-8");
      const data = JSON.parse(fileData);
      const polygonCoords = data.features[0].geometry.coordinates[0];
      const firstPoint = polygonCoords[0];
      const lastPoint = polygonCoords[polygonCoords.length - 1];
      if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
        polygonCoords.push(firstPoint); // Add the first point to close the loop
      }
      const polygonText = `POLYGON((${polygonCoords
        .map((point) => point.join(" "))
        .join(", ")}))`;
      const start = req.query.start || false;
      const end = req.query.end || false;
      const arr1 = [
        Sequelize.where(
          Sequelize.fn(
            "ST_Within",
            Sequelize.fn(
              "ST_SetSRID",
              Sequelize.fn(
                "ST_MakePoint",
                Sequelize.col("longitude"),
                Sequelize.col("latitude")
              ),
              4326
            ),
            Sequelize.fn("ST_GeomFromText", polygonText, 4326)
          ),
          true
        ),
      ];
      if (start && end) {
        arr1.push(
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          )
        );
      }
      const groupIdentifier = await Kinnaur.findAll({
        attributes: [
          "allSpeciesReported",
          "observationDate",
          [
            Sequelize.fn(
              "count",
              Sequelize.col("indiaChecklistScientificName")
            ),
            "count",
          ],
          "groupIdentifier",
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.fn("DISTINCT", Sequelize.col("groupIdentifier"))
            ),
            "uniqueGroupCount",
          ],
        ],
        where: {
          [Op.and]: arr1,
        },
        group: ["groupIdentifier", "allSpeciesReported", "observationDate"],
        raw: true,
      });
      const results1 = await Kinnaur.findAll({
        attributes: [
          "indiaChecklistScientificName",
          "indiaChecklistCommonName",
          "uniqueValue",
          "allSpeciesReported",
          "observationDate",
          "migratoryStatusWithinIndia",
          [
            Sequelize.fn(
              "count",
              Sequelize.col("indiaChecklistScientificName")
            ),
            "count",
          ],
          "groupIdentifier",
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.fn("DISTINCT", Sequelize.col("groupIdentifier"))
            ),
            "uniqueGroupCount",
          ],
        ],
        where: {
          [Sequelize.Op.and]: arr1,
          category: ["species", "domestic", "issf"],
        },
        group: [
          "indiaChecklistScientificName",
          "indiaChecklistCommonName",
          "groupIdentifier",
          "uniqueValue",
          "allSpeciesReported",
          "observationDate",
          "migratoryStatusWithinIndia",
        ],
        raw: true,
      });
      const results = results1.filter((ele) => {
        const pattern = /^(?!.*(Resident|Uncertain)).*$/;
        return pattern.test(ele.migratoryStatusWithinIndia);
      });
      const scientificNameCounts = {};
      results.forEach((result) => {
        const birdScientificName = result.indiaChecklistCommonName;
        if (
          scientificNameCounts.hasOwnProperty(birdScientificName) &&
          result.allSpeciesReported == "1"
        ) {
          scientificNameCounts[birdScientificName]++;
        } else if (
          result.allSpeciesReported == "1" &&
          result.indiaChecklistCommonName != null
        ) {
          scientificNameCounts[birdScientificName] = 1;
        }
      });
      // console.log(scientificNameCounts);
      const scientificNameArray = Object.entries(scientificNameCounts);
      // Sort the array in descending order based on the counts
      scientificNameArray.sort((a, b) => b[1] - a[1]);

      // Get the top 10 bird species
      const top10Birds = scientificNameArray.slice(0, 10);
      // If you want just the names of the top 10 birds
      // const top10BirdNames = top10Birds.map(([scientificName]) => scientificName);
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const birdData = {};

      // const birdData = {};

      results.forEach((result) => {
        const birdName = result.indiaChecklistCommonName;
        const scientificName = result.indiaChecklistScientificName;
        const resultMonth =
          months[parseInt(result.observationDate.slice(3, 5)) - 1];

        if (!birdData[birdName]) {
          birdData[birdName] = {
            indiaChecklistCommonName: birdName,
            indiaChecklistScientificName: scientificName,
            monthlyData: {},
          };
        }

        if (result.allSpeciesReported === "1") {
          if (!birdData[birdName].monthlyData[resultMonth]) {
            birdData[birdName].monthlyData[resultMonth] = 1;
          } else {
            birdData[birdName].monthlyData[resultMonth]++;
          }
        }
      });
      const sortedBirdData = {};

      // // Sort birdData by bird name
      const sortedBirdNames = Object.keys(birdData).sort();
      sortedBirdNames.forEach((birdName) => {
        sortedBirdData[birdName] = {};

        // Sort months chronologically
        months.forEach((month) => {
          sortedBirdData[birdName][month] =
            birdData[birdName]["monthlyData"][month] || 0;
        });
      });

      const top10BirdData = {};
      // Get the top 10 bird names from the previous calculation
      const top10BirdNames1 = top10Birds.map(
        ([scientificName]) => scientificName
      );
      // Filter the sortedBirdData for the top 10 bird species
      for (const birdName of top10BirdNames1) {
        top10BirdData[birdName] = sortedBirdData[birdName];
      }

      const monthGroupCountMap = {};
      months.forEach((month) => {
        monthGroupCountMap[month] = 0;
      });

      // Iterate through your data and count occurrences for each month
      groupIdentifier.forEach((item) => {
        const observationDate = new Date(item.observationDate);
        const month = item.observationDate.slice(3, 5);
        const year = observationDate.getFullYear();
        const allSpeciesReported = item.allSpeciesReported;

        // Check if allSpeciesReported is "1" to include it in the count
        if (allSpeciesReported === "1") {
          const monthName = months[parseInt(month) - 1];
          monthGroupCountMap[monthName]++;
        }
      });
      const anyZero = Object.values(monthGroupCountMap).some(
        (value) => value === 0
      );
      if (!anyZero) {
        const birdDataWithPercentage = {};
        const totalMonthlyCounts = {};
        months.forEach((month) => {
          totalMonthlyCounts[month] = 0;
        });
        // Calculate total counts for each bird and each month
        top10BirdNames1.forEach((birdName) => {
          birdDataWithPercentage[birdName] = {
            indiaChecklistScientificName:
              birdData[birdName].indiaChecklistScientificName, // Use result.indiaChecklistScientificName
            indiaChecklistCommonName: birdName,
            monthlyData: [],
          };

          months.forEach((month) => {
            const count = sortedBirdData[birdName][month] || 0;
            birdDataWithPercentage[birdName].monthlyData.push({
              month,
              count,
              percentage: "0%", // Initialize percentage to 0%
            });
            totalMonthlyCounts[month] += count;
          });
        });

        // // Calculate percentages
        top10BirdNames1.forEach((birdName) => {
          birdDataWithPercentage[birdName].monthlyData.forEach((data) => {
            const percentage =
              totalMonthlyCounts[data.month] === 0
                ? "0%"
                : ((data.count / monthGroupCountMap[data.month]) * 100).toFixed(
                    1
                  ) + "%";
            data.percentage = percentage;
          });
        });
        const arr = [];
        for (let i in birdDataWithPercentage) {
          arr.push(birdDataWithPercentage[i]);
        }
        return res.send(arr);
      } else {
        return res.send({ msg: "denominator is zero" });
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("An error occurred while processing the data");
    }
  },
  async hotspotArea(req, res) {
    const filePath = req.file.buffer;
    const fileData = filePath.toString("utf-8");
    // Parse the GeoJSON data
    try {
      const geojson = JSON.parse(fileData);
      const polygonCoords = geojson.features[0].geometry.coordinates[0];
      const firstPoint = polygonCoords[0];
      const lastPoint = polygonCoords[polygonCoords.length - 1];
      if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
        polygonCoords.push(firstPoint); // Add the first point to close the loop
      }
      const polygonText = `POLYGON((${polygonCoords
        .map((point) => point.join(" "))
        .join(", ")}))`;
      const start = req.query.start || false;
      const end = req.query.end || false;
      const arr1 = [
        Sequelize.where(
          Sequelize.fn(
            "ST_Within",
            Sequelize.fn(
              "ST_SetSRID",
              Sequelize.fn(
                "ST_MakePoint",
                Sequelize.col("longitude"),
                Sequelize.col("latitude")
              ),
              4326
            ),
            Sequelize.fn("ST_GeomFromText", polygonText, 4326)
          ),
          true
        ),
      ];
      if (start && end) {
        arr1.push(
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          )
        );
      }
      const occurrences = await Kinnaur.findAll({
        attributes: [
          "locality",
          "localityId",
          "latitude",
          "longitude",
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.fn("DISTINCT", Sequelize.col("eBirdScientificName"))
            ),
            "count",
          ],
        ],
        where: {
          localityType: "H",
          category: ["species", "issf", "domestic"],
          [Sequelize.Op.and]: arr1,
        },
        group: ["locality", "localityId", "latitude", "longitude"],
        order: [[Sequelize.literal("count"), "DESC"]],
        limit: 5,
        raw: true,
      });
      res.send(occurrences);
    } catch (error) {
      res.send({ error: error });
    }
  },
  async completeListOfSpecies(req, res) {
    const filePath = req.file.buffer;
    // Read the contents of the file
    try {
      const fileData = filePath.toString("utf-8");
      // Parse the GeoJSON data
      const geojson = JSON.parse(fileData);
      const polygonCoords = geojson.features[0].geometry.coordinates[0];
      const firstPoint = polygonCoords[0];
      const lastPoint = polygonCoords[polygonCoords.length - 1];
      if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
        polygonCoords.push(firstPoint); // Add the first point to close the loop
      }
      const polygonText = `POLYGON((${polygonCoords
        .map((point) => point.join(" "))
        .join(", ")}))`;
      const start = req.query.start || false;
      const end = req.query.end || false;
      const arr1 = [
        Sequelize.where(
          Sequelize.fn(
            "ST_Within",
            Sequelize.fn(
              "ST_SetSRID",
              Sequelize.fn(
                "ST_MakePoint",
                Sequelize.col("longitude"),
                Sequelize.col("latitude")
              ),
              4326
            ),
            Sequelize.fn("ST_GeomFromText", polygonText, 4326)
          ),
          true
        ),
      ];
      if (start && end) {
        arr1.push(
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          )
        );
      }
      const list = await Kinnaur.findAll({
        attributes: [
          [
            Sequelize.fn(
              "DISTINCT",
              Sequelize.col("indiaChecklistScientificName")
            ),
            "indiaChecklistScientificName",
          ],
          "migratoryStatusWithinIndia",
          "indiaChecklistCommonName",
          "uniqueValue",
          "endemicRegion",
          "soibConcernStatus",
          "wpaSchedule",
          "iucnCategory",
        ],
        where: {
          indiaChecklistScientificName: {
            [Op.not]: null,
          },
          [Sequelize.Op.and]: arr1,
        },
        raw: true,
      });
      list.sort((a, b) => a.uniqueValue - b.uniqueValue);
      res.send(list);
    } catch (err) {
      res.send({ error: err });
    }
  },
  async waterBirdCongregations(req, res) {
    try {
      const filePath = req.file.buffer;
      const fileData = filePath.toString("utf-8");
      const data = JSON.parse(fileData);
      const polygonCoords = data.features[0].geometry.coordinates[0];
      const firstPoint = polygonCoords[0];
      const lastPoint = polygonCoords[polygonCoords.length - 1];
      if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
        polygonCoords.push(firstPoint);
      }
      const polygonText = `POLYGON((${polygonCoords
        .map((point) => point.join(" "))
        .join(", ")}))`;
      const start = req.query.start || false;
      const end = req.query.end || false;
      const arr1 = [
        Sequelize.where(
          Sequelize.fn(
            "ST_Within",
            Sequelize.fn(
              "ST_SetSRID",
              Sequelize.fn(
                "ST_MakePoint",
                Sequelize.col("longitude"),
                Sequelize.col("latitude")
              ),
              4326
            ),
            Sequelize.fn("ST_GeomFromText", polygonText, 4326)
          ),
          true
        ),
      ];
      if (start && end) {
        arr1.push(
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          )
        );
      }
      const highestObservations = await Kinnaur.findAll({
        attributes: [
          "indiaChecklistScientificName",
          "onePercentEstimates",
          "indiaChecklistCommonName",
          [
            Sequelize.literal('MAX("observationCount"::numeric)'), // Cast to numeric
            "observationCount",
          ],
          "uniqueValue",
        ],
        where: {
          onePercentEstimates: {
            [Op.and]: [{ [Op.ne]: null }, { [Op.ne]: "" }],
          },
          observationCount: {
            [Op.ne]: "X",
          },
          [Sequelize.Op.and]: arr1,
        },
        group: [
          "indiaChecklistScientificName",
          "onePercentEstimates",
          "indiaChecklistCommonName",
          "uniqueValue",
        ],
        order: [[Sequelize.col("uniqueValue"), "ASC"]],
        raw: true,
      });
      const filteredData = highestObservations.map((item) => {
        const observationCount = parseInt(item.observationCount, 10); // Convert to integer
        const onePercentEstimates = parseInt(item.onePercentEstimates, 10); // Convert to integer
        if (observationCount > onePercentEstimates) {
          const onePercentBiographicPopulation = Math.round(
            observationCount / onePercentEstimates
          );
          return {
            indiaChecklistCommonName: item.indiaChecklistCommonName,
            indiaChecklistScientificName: item.indiaChecklistScientificName,
            highestCongregation: item.observationCount,
            maxObservationCount: onePercentBiographicPopulation,
            onePercentBiographicPopulation: item.onePercentEstimates,
            uniqueValue: item.uniqueValue,
          };
        }
      });
      // onePercentEstimates;
      const filteredDataWithoutNull = filteredData.filter((item) => {
        if (item != null) {
          return item;
        }
      });

      res.send({ data: filteredDataWithoutNull, success: true });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("An error occurred while processing the data");
    }
  },
  async effortsDetails(req, res) {
    const filePath = req.file.buffer;
    // Read the contents of the file
    try {
      const fileData = filePath.toString("utf-8");
      // Parse the GeoJSON data
      const geojson = JSON.parse(fileData);
      const polygonCoords = geojson.features[0].geometry.coordinates[0];
      const firstPoint = polygonCoords[0];
      const lastPoint = polygonCoords[polygonCoords.length - 1];
      if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
        polygonCoords.push(firstPoint); // Add the first point to close the loop
      }
      const polygonText = `POLYGON((${polygonCoords
        .map((point) => point.join(" "))
        .join(", ")}))`;
      const start = req.query.start || false;
      const end = req.query.end || false;
      const arr1 = [
        Sequelize.where(
          Sequelize.fn(
            "ST_Within",
            Sequelize.fn(
              "ST_SetSRID",
              Sequelize.fn(
                "ST_MakePoint",
                Sequelize.col("longitude"),
                Sequelize.col("latitude")
              ),
              4326
            ),
            Sequelize.fn("ST_GeomFromText", polygonText, 4326)
          ),
          true
        ),
      ];
      if (start && end) {
        arr1.push(
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          )
        );
      }
      const obj = {};
      const data = await Kinnaur.findAll({
        attributes: ["eBirdEnglishName"],
        where: {
          [Sequelize.Op.and]: arr1,
        },
        raw: true,
      });
      obj.numberOfObservations = data.length;
      const observers = await Kinnaur.findAll({
        attributes: [
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.fn("DISTINCT", Sequelize.col("samplingEventIdentifier"))
            ),
            "count",
          ],
        ],
        where: {
          [Sequelize.Op.and]: arr1,
        },
        raw: true,
      });
      obj.numberOfList = observers[0].count;
      const observation = await Kinnaur.findAll({
        attributes: [
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.fn("DISTINCT", Sequelize.col("groupIdentifier"))
            ),
            "count",
          ],
        ],
        where: {
          [Sequelize.Op.and]: arr1,
        },
        raw: true,
      });
      obj.numberOfUniqueLists = observation[0].count;

      const sample = await Kinnaur.findAll({
        attributes: [
          [
            Sequelize.fn("DISTINCT", Sequelize.col("groupIdentifier")),
            "uniqueGroupIdentifier",
          ],
          "durationMinutes",
        ],
        where: {
          [Sequelize.Op.and]: arr1,
        },
        raw: true,
      });
      const sampleCount = sample.reduce((acc, obj) => {
        const durationMinutes = parseInt(obj.durationMinutes);
        return isNaN(durationMinutes) ? acc : acc + durationMinutes;
      }, 0);
      obj.totalNumberOfHours = Math.floor(sampleCount / 60);

      const group = await Kinnaur.findAll({
        attributes: [
          [
            Sequelize.fn("DISTINCT", Sequelize.col("observerId")),
            "uniqueObserverId",
          ],
        ],
        where: {
          [Sequelize.Op.and]: arr1,
        },
        raw: true,
      });
      obj.totalNumberOfObservers = group.length;
      return res.send({ data: obj });
    } catch (err) {
      res.send({ error: err });
    }
  },
};

module.exports = UserController;
