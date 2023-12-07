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

const UserController = {
  async count(req, res) {
    const filePath = req.file.path;
    fs.readFile(filePath, "utf-8", async (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("An error occurred while reading the file");
      } else {
        // Parse the GeoJSON data
        const kml = new DOMParser().parseFromString(data);
        const geojson = tj.kml(kml);
        const polygonCoords = geojson.features[0].geometry.coordinates[0];
        const polygonText = `POLYGON((${polygonCoords
          .map((point) => point.join(" "))
          .join(", ")}))`;
        const categories = [
          "Vulnerable",
          "Critically Endangered",
          "Near Threatened",
          "Endangered",
        ];
        const counts = {};
        const obj = {};
        const count = await Kinnaur.count({
          distinct: "eBirdScientificName",
          where: {
            category: "species",
            [Sequelize.Op.and]: Sequelize.where(
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
          },
        });
        const soib = await Kinnaur.count({
          distinct: "eBirdScientificName",
          where: {
            soibConcernStatus: "High",
            [Sequelize.Op.and]: Sequelize.where(
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
          },
        });
        const scheduleI = await Kinnaur.count({
          distinct: "eBirdScientificName",
          where: {
            wpaSchedule: "Schedule-I",
            [Sequelize.Op.and]: Sequelize.where(
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
          },
        });
        const indiaEndemic = await Kinnaur.count({
          distinct: "eBirdScientificName",
          where: {
            indiaEndemic: "Yes",
            [Sequelize.Op.and]: Sequelize.where(
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
          },
        });
        const highConcern = await Kinnaur.count({
          distinct: "eBirdScientificName",
          where: {
            soibConcernStatus: "High",
            [Sequelize.Op.and]: Sequelize.where(
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
          },
        });
        const moderateConcern = await Kinnaur.count({
          distinct: "eBirdScientificName",
          where: {
            soibConcernStatus: "Moderate",
            [Sequelize.Op.and]: Sequelize.where(
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
          },
        });
        const citesAppendixI = await Kinnaur.count({
          distinct: "eBirdScientificName",
          where: {
            citesAppendix: "Appendix I",
            [Sequelize.Op.and]: Sequelize.where(
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
          },
        });
        const citesAppendixII = await Kinnaur.count({
          distinct: "eBirdScientificName",
          where: {
            citesAppendix: "Appendix II",
            [Sequelize.Op.and]: Sequelize.where(
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
          },
        });
        const cmsAppendixI = await Kinnaur.count({
          distinct: "eBirdScientificName",
          where: {
            cmsAppendix: "Appendix I",
            [Sequelize.Op.and]: Sequelize.where(
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
          },
        });
        const cmsAppendixII = await Kinnaur.count({
          distinct: "eBirdScientificName",
          where: {
            cmsAppendix: "Appendix II",
            [Sequelize.Op.and]: Sequelize.where(
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
          },
        });
        const migrate = await Kinnaur.count({
          distinct: "eBirdScientificName",
          where: {
            migratoryStatusWithinIndia: {
              [Op.notIn]: ["Resident", "Uncertain"],
            },
            [Sequelize.Op.and]: Sequelize.where(
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
          },
        });
        for (const category of categories) {
          const count = await Kinnaur.count({
            distinct: true,
            col: "eBirdScientificName",
            where: {
              iucnCategory: category,
              [Sequelize.Op.and]: Sequelize.where(
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
        cms1["species"] = "cmsAppendixI";
        cms1["count"] = cmsAppendixI;
        cms2["species"] = "cmsAppendixII";
        cms2["count"] = cmsAppendixII;
        const cities1 = {};
        const cities2 = {};
        cities1["species"] = "citesAppendixI";
        cities1["count"] = citesAppendixI;
        cities2["species"] = "citesAppendixII";
        cities2["count"] = citesAppendixII;
        const soibConcern1 = {};
        const soibConcern2 = {};
        soibConcern1["species"] = "moderateConcern";
        soibConcern1["count"] = moderateConcern;
        soibConcern2["species"] = "highConcern";
        soibConcern2["count"] = highConcern;
        obj["iucnRedListCategoriesCount"] = counts;
        obj["total"] = count;
        obj["migrate"] = migrate;
        obj["iucnRedList"] =
          counts["Vulnerable"] +
          counts["Critically Endangered"] +
          counts["Near Threatened"] +
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
      }
    });
  },
  async iucnRedListSpeicies(req, res) {
    const filePath = req.file.path;
    // Read the contents of the file
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("An error occurred while reading the file");
      } else {
        // Parse the GeoJSON data
        const kml = new DOMParser().parseFromString(data);
        const geojson = tj.kml(kml);
        const polygonCoords = geojson.features[0].geometry.coordinates[0];
        const polygonText = `POLYGON((${polygonCoords
          .map((point) => point.join(" "))
          .join(", ")}))`;
        Kinnaur.findAll({
          attributes: [
            "iucnCategory",
            "eBirdScientificName",
            [
              Sequelize.fn("count", Sequelize.col("eBirdScientificName")),
              "count",
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
            [Sequelize.Op.and]: Sequelize.where(
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
          },
          group: ["iucnCategory", "eBirdScientificName"],
          raw: true,
        })
          .then((results) => {
            const counts = {
              Vulnerable: { total: 0 },
              "Critically Endangered": { total: 0 },
              "Near Threatened": { total: 0 },
              Endangered: { total: 0 },
            };

            results.forEach((row) => {
              const iucnCategory = row.iucnCategory;
              const name = row.eBirdScientificName;
              const count = row.count;

              counts[iucnCategory][name] = count;
              counts[iucnCategory].total += parseInt(count);
            });

            // Calculate percentages
            const percentages = {};
            Object.keys(counts).forEach((category) => {
              percentages[category] = {};
              const total = counts[category].total;
              Object.keys(counts[category]).forEach((name) => {
                if (name !== "total") {
                  const count = counts[category][name];
                  percentages[category][name] =
                    ((count / total) * 100).toFixed(2) + "%";
                }
              });
            });
            const data = Object.entries(percentages).map(([region, birds]) => {
              return Object.entries(birds).map(([name, percentage]) => ({
                name,
                percentage,
                region,
              }));
            });
            const flattenedData = data.flat();
            res.send(flattenedData);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  },
  async endemincSpecies(req, res) {
    const filePath = req.file.path;
    // Read the contents of the file
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("An error occurred while reading the file");
      } else {
        // Parse the GeoJSON data
        const kml = new DOMParser().parseFromString(data);
        const geojson = tj.kml(kml);
        const polygonCoords = geojson.features[0].geometry.coordinates[0];
        const polygonText = `POLYGON((${polygonCoords
          .map((point) => point.join(" "))
          .join(", ")}))`;
        Kinnaur.findAll({
          attributes: [
            "endemicRegion",
            "eBirdScientificName",
            [
              Sequelize.fn("count", Sequelize.col("eBirdScientificName")),
              "count",
            ],
          ],
          where: {
            endemicRegion: {
              [Sequelize.Op.in]: [
                "Himalayas",
                "None",
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
              ],
            },
            [Sequelize.Op.and]: Sequelize.where(
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
          },
          group: ["endemicRegion", "eBirdScientificName"],
          raw: true,
        })
          .then((results) => {
            const counts = {
              Himalayas: { total: 0 },
              None: { total: 0 },
              "Western Himalayas": { total: 0 },
              "Assam Plains": { total: 0 },
              "Andaman and Nicobar Islands": { total: 0 },
              "Central India": { total: 0 },
              "Eastern Himalayas": { total: 0 },
              "Indus Plains": { total: 0 },
              "Mainland India": { total: 0 },
              "Western Ghats & Sri Lanka": { total: 0 },
              "Western Ghats": { total: 0 },
              "Southern Deccan Plateau": { total: 0 },
              "Nicobar Islands": { total: 0 },
              "Northern Myanmar Lowlands": { total: 0 },
              "Indian Subcontinent": { total: 0 },
              "Andaman Islands": { total: 0 },
            };

            results.forEach((row) => {
              const region = row.endemicRegion;
              const name = row.eBirdScientificName;
              const count = row.count;

              counts[region][name] = count;
              counts[region].total += parseInt(count);
            });

            // Calculate percentages
            const percentages = {};
            Object.keys(counts).forEach((region) => {
              percentages[region] = {};
              const total = counts[region].total;
              Object.keys(counts[region]).forEach((name) => {
                if (name !== "total") {
                  const count = counts[region][name];
                  percentages[region][name] =
                    ((count / total) * 100).toFixed(2) + "%";
                }
              });
            });

            const data = Object.entries(percentages).map(([region, birds]) => {
              return Object.entries(birds).map(([name, percentage]) => ({
                name,
                percentage,
                region,
              }));
            });
            const flattenedData = data.flat();
            res.send(flattenedData);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  },
  async mostCommonSpecies(req, res) {
    const filePath = req.file.path;
    // Read the contents of the file
    fs.readFile(filePath, "utf-8", async (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("An error occurred while reading the file");
      } else {
        // Parse the GeoJSON data
        const kml = new DOMParser().parseFromString(data);
        const geojson = tj.kml(kml);
        const polygonCoords = geojson.features[0].geometry.coordinates[0];
        const polygonText = `POLYGON((${polygonCoords
          .map((point) => point.join(" "))
          .join(", ")}))`;
        try {
          const totalCount = await Kinnaur.count("eBirdScientificName");

          const results = await Kinnaur.findAll({
            attributes: [
              "eBirdScientificName",
              "eBirdEnglishName",
              [
                Sequelize.fn("count", Sequelize.col("eBirdScientificName")),
                "count",
              ],
            ],
            where: {
              [Sequelize.Op.and]: Sequelize.where(
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
            },
            group: ["eBirdScientificName", "eBirdEnglishName"],
            order: [[Sequelize.literal("count DESC")]],
            limit: 10,
          });

          const rows = results.map((row) => {
            const scientificName = row.eBirdScientificName;
            const englishName = row.eBirdEnglishName;
            const count = row.get("count");
            const percentage = ((count / totalCount) * 100).toFixed(2) + "%";
            return {
              eBirdScientificName: scientificName,
              eBirdEnglishName: englishName,
              count,
              percentage,
            };
          });

          res.send(rows);
        } catch (err) {
          console.error(err);
        }
      }
    });
  },
  async seasonalChart(req, res) {
    const filePath = req.file.path;
    // Read the contents of the file
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("An error occurred while reading the file");
      } else {
        // Parse the GeoJSON data
        const kml = new DOMParser().parseFromString(data);
        const geojson = tj.kml(kml);
        const polygonCoords = geojson.features[0].geometry.coordinates[0];
        const polygonText = `POLYGON((${polygonCoords
          .map((point) => point.join(" "))
          .join(", ")}))`;
        Kinnaur.count("eBirdScientificName")
          .then((count) => {
            totalCount = count;
            // Get the top 10 eBirdScientificName values with the highest counts
            return Kinnaur.findAll({
              attributes: [
                "eBirdScientificName",
                "eBirdEnglishName",
                "lastEditedDate",
              ],
              where: {
                migratoryStatusWithinIndia: {
                  [Op.notIn]: ["Resident", "Uncertain"],
                },
                [Sequelize.Op.and]: Sequelize.where(
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
              },
              raw: true,
            }).then((birds) => {
              // Step 1: Create frequency count object
              const frequencyCount = {};
              birds.forEach((bird) => {
                const scientificName = bird.eBirdScientificName;
                frequencyCount[scientificName] = frequencyCount[scientificName]
                  ? frequencyCount[scientificName] + 1
                  : 1;
              });

              // Step 2: Convert frequency count object to array of objects
              const frequencyArray = Object.entries(frequencyCount).map(
                ([scientificName, frequency]) => ({ scientificName, frequency })
              );

              // Step 3: Sort frequency array in descending order based on frequency
              frequencyArray.sort((a, b) => b.frequency - a.frequency);

              // Step 4: Slice to keep only top 10 frequency objects
              const top10FrequencyArray = frequencyArray.slice(0, 10);

              // Step 5: Map top 10 frequency objects to array of objects with matching birds
              const top10BirdArrays = top10FrequencyArray.map(
                ({ scientificName, frequency }) => ({
                  frequency,
                  total: totalCount,
                  birds: birds.filter(
                    (bird) => bird.eBirdScientificName === scientificName
                  ),
                })
              );
              // Step 6: Log the top 10 bird arrays
              // console.log(top10BirdArrays)
              const arr = [];
              const top10Birds = top10BirdArrays.map((ele) => {
                const data = ele.birds;
                const scientificName = data[0].eBirdScientificName; // Get scientific name
                const eBirdEnglishName = data[0].eBirdEnglishName;
                const monthlyData = [];
                const getMonth = (dateStr) => {
                  const date = new Date(dateStr);
                  const month = date.toLocaleString("default", {
                    month: "short",
                  });
                  return month;
                };
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
                months.forEach((month) => {
                  const filteredData = data.filter(
                    (item) => getMonth(item.lastEditedDate) === month
                  );
                  const countBySpecies = filteredData.reduce((acc, item) => {
                    const key = item.eBirdScientificName;
                    const englishName = item.eBirdEnglishName;
                    const speciesFrequency = frequencyCount[key];
                    const percentage =
                      ((acc[key] ? acc[key].count : 0) / speciesFrequency) *
                      100;
                    acc[key] = acc[key]
                      ? {
                          count: acc[key].count + 1,
                          englishName,
                          percentage,
                        }
                      : { count: 1, englishName, percentage };
                    return acc;
                  }, {});
                  monthlyData.push({
                    month,
                    count: countBySpecies[scientificName]
                      ? countBySpecies[scientificName].count
                      : 0,
                    percentage: countBySpecies[scientificName]
                      ? countBySpecies[scientificName].percentage.toFixed(2) +
                        "%"
                      : "0.00%",
                  });
                });
                arr.push({ scientificName, eBirdEnglishName, monthlyData });
                return { scientificName, eBirdEnglishName, monthlyData };
              });

              res.send(arr);
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  },
  async hotspotArea(req, res) {
    const filePath = req.file.path;
    fs.readFile(filePath, "utf-8", async (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("An error occurred while reading the file");
      } else {
        // Parse the GeoJSON data
        const kml = new DOMParser().parseFromString(data);
        const geojson = tj.kml(kml);
        const polygonCoords = geojson.features[0].geometry.coordinates[0];
        const polygonText = `POLYGON((${polygonCoords
          .map((point) => point.join(" "))
          .join(", ")}))`;
        try {
          const occurrences = await Kinnaur.findAll({
            attributes: [
              "localityId",
              "latitude",
              "longitude",
              [
                Sequelize.fn(
                  "COUNT",
                  Sequelize.fn("DISTINCT", Sequelize.col("category"))
                ),
                "count",
              ],
            ],
            where: {
              localityType: "H",
              category: "species",
              [Sequelize.Op.and]: Sequelize.where(
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
            },
            group: ["localityId", "latitude", "longitude"],
            order: [[Sequelize.literal("count"), "DESC"]],
            limit: 5,
          });

          const arr = [];
          occurrences.forEach((item) => {
            arr.push(item);
          });
          res.send(arr);
        } catch (error) {
          console.error("Error counting occurrences:", error);
        }
      }
    });
  },
};

module.exports = UserController;
