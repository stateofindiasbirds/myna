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
  async count1(req, res) {
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
      // console.log("entered72");
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
      // console.log("entered84");

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
      // console.log("entered104");

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
      console.log("entered105");
      const counts = {};
      const obj = {};

      const count = await Kinnaur.count({
        distinct: true,
        col: "eBirdScientificName",
        where: {
          category: ["species", "issf", "domestic"],
          eBirdScientificName: {
            [Op.not]: null,
          },
          [Sequelize.Op.and]: arr1,
        },
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
      obj["iucnRedListCategoriesCount"] = counts;
      res.json(obj);
    } catch (error) {
      res.status(500).send({ error: error });
    }
  },

  async count2(req, res) {
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

  async count3(req, res) {
    // const filePath = req.file.buffer;
    // // console.log(req,"filePath")
    // const fileData = filePath.toString("utf-8");
    // try {
    //   const geojson = JSON.parse(fileData);
    //   const polygonCoords = geojson.features[0].geometry.coordinates[0];
    //   const firstPoint = polygonCoords[0];
    //   const lastPoint = polygonCoords[polygonCoords.length - 1];
    //   if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
    //     polygonCoords.push(firstPoint); // Add the first point to close the loop
    //   }
    //   console.log("entered72");
    //   const polygonText = `POLYGON((${polygonCoords
    //     .map((point) => point.join(" "))
    //     .join(", ")}))`;
    //   const categories = [
    //     "Vulnerable",
    //     "Critically Endangered",
    //     "Near Threatened",
    //     "Endangered",
    //   ];
    //   const start = req.query.start || false;
    //   const end = req.query.end || false;
    //   console.log("entered84");

    //   const arr1 = [
    //     Sequelize.where(
    //       Sequelize.fn(
    //         "ST_Within",
    //         Sequelize.fn(
    //           "ST_SetSRID",
    //           Sequelize.fn(
    //             "ST_MakePoint",
    //             Sequelize.col("longitude"),
    //             Sequelize.col("latitude")
    //           ),
    //           4326
    //         ),
    //         Sequelize.fn("ST_GeomFromText", polygonText, 4326)
    //       ),
    //       true
    //     ),
    //   ];
    //   console.log("entered104");

    //   if (start && end) {
    //     arr1.push(
    //       Sequelize.where(
    //         Sequelize.fn(
    //           "TO_DATE",
    //           Sequelize.col("observationDate"),
    //           "DD-MM-YYYY"
    //         ),
    //         {
    //           [Op.between]: [start, end], // Filter by date range
    //         }
    //       )
    //     );
    //   }
    //   const counts = {};
    //   const obj = {};

    //   const count = await Kinnaur.count({
    //     distinct: true,
    //     col: "eBirdScientificName",
    //     where: {
    //       category: ["species", "issf", "domestic"],
    //       [Sequelize.Op.and]: arr1,
    //     },
    //   });

    //   const migrate = await Kinnaur.findAll({
    //     attributes: [
    //       [
    //         Sequelize.fn("DISTINCT", Sequelize.col("eBirdScientificName")),
    //         "eBirdScientificName",
    //       ],
    //       "migratoryStatusWithinIndia",
    //     ],
    //     where: {
    //       [Sequelize.Op.and]: arr1,
    //     },
    //     raw: true,
    //   });

    //   const migrateCount = migrate.filter((ele) => {
    //     const pattern = /^(?!.*(Resident|Uncertain)).*$/;
    //     return pattern.test(ele.migratoryStatusWithinIndia);
    //   });

    //   const soib = await Kinnaur.count({
    //     distinct: true,
    //     col: "eBirdScientificName",
    //     where: {
    //       soibConcernStatus: "High",
    //       [Sequelize.Op.and]: arr1,
    //     },
    //   });

    //   const scheduleI = await Kinnaur.count({
    //     distinct: true,
    //     col: "eBirdScientificName",
    //     where: {
    //       wpaSchedule: "Schedule-I",
    //       [Sequelize.Op.and]: arr1,
    //     },
    //   });

    //   const indiaEndemic = await Kinnaur.count({
    //     distinct: true,
    //     col: "eBirdScientificName",
    //     where: {
    //       indiaEndemic: "Yes",
    //       [Sequelize.Op.and]: arr1,
    //     },
    //   });

    //   for (const category of categories) {
    //     const count = await Kinnaur.count({
    //       distinct: true,
    //       col: "eBirdScientificName",
    //       where: {
    //         iucnCategory: category,
    //         [Sequelize.Op.and]: arr1,
    //         eBirdScientificName: Sequelize.where(
    //           Sequelize.fn(
    //             "regexp_replace",
    //             Sequelize.col("eBirdScientificName"),
    //             "\\d+",
    //             "",
    //             "g"
    //           ),
    //           "=",
    //           Sequelize.col("eBirdScientificName")
    //         ),
    //       },
    //     });
    //     counts[category] = count;
    //   }

    //   obj["total"] = count;
    //   obj["migrate"] = migrateCount.length;

    //   obj["iucnRedList"] =
    //     counts["Vulnerable"] +
    //     counts["Critically Endangered"] +
    //     counts["Endangered"];
    //   obj["soibHighPriority"] = soib;
    //   obj["scheduleI"] = scheduleI;
    //   obj["indiaEndemic"] = indiaEndemic;
    //   res.json(obj);
    // } catch (error) {
    //   res.status(500).send({ error: error });
    // }
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

      // Create conditions for geographic filter
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

      // Add date filter if `start` and `end` are provided
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

      // Perform queries sequentially and build the response
      const [total, migrate, soib, scheduleI, indiaEndemic, iucnCounts] = await Promise.all([
        // Total count of distinct eBirdScientificName
        Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            category: ["species", "issf", "domestic"],
            [Sequelize.Op.and]: arr1,
            // eBirdScientificName: {
            //   [Op.not]: null,
            // },
          },
        }),

        // Count of migratory species excluding Resident and Uncertain
        Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            migratoryStatusWithinIndia: {
              [Op.notRegexp]: "(Resident|Uncertain)",
            },
            category: ["species", "issf", "domestic"],
            eBirdScientificName: {
              [Op.not]: null,
            },
            [Sequelize.Op.and]: arr1,
          },
        }),

        // Count of species with soibConcernStatus as 'High'
        Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            soibConcernStatus: "High",
            [Sequelize.Op.and]: arr1,
            category: ["species", "issf", "domestic"],
            eBirdScientificName: {
              [Op.not]: null,
            },
          },
        }),

        // Count of species listed in Schedule-I
        Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            wpaSchedule: "Schedule-I",
            [Sequelize.Op.and]: arr1,
          },
        }),

        // Count of species endemic to India
        Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            indiaEndemic: "Yes",
            [Sequelize.Op.and]: arr1,
            category: ["species", "issf", "domestic"],
            eBirdScientificName: {
              [Op.not]: null,
            },
          },
        }),

        // Count of species based on IUCN categories
        Promise.all(
          categories.map((category) =>
            Kinnaur.count({
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
            })
          )
        ),
      ]);

      // Sum of counts for IUCN categories
      const iucnRedList =
        // iucnCounts[0] + iucnCounts[1] + iucnCounts[2] + iucnCounts[3];
        iucnCounts[0] + iucnCounts[1] + iucnCounts[3];


      // Build the response object
      const response = {
        total,
        migrate,
        soibHighPriority: soib,
        scheduleI,
        indiaEndemic,
        iucnRedList,
      };

      res.json(response);
    } catch (error) {
      console.error("Error processing the file", error);
      res.status(500).send("Error processing the file");
    }

  },

  // async count(req, res) {
  //   const filePath = req.file.buffer;
  //   // console.log(req,"filePath")
  //   const fileData = filePath.toString("utf-8");
  //   // console.log(fileData,"fileData")
  //   try {
  //     const geojson = JSON.parse(fileData);
  //     const polygonCoords = geojson.features[0].geometry.coordinates[0];
  //     const firstPoint = polygonCoords[0];
  //     const lastPoint = polygonCoords[polygonCoords.length - 1];
  //     if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
  //       polygonCoords.push(firstPoint); // Add the first point to close the loop
  //     }
  //     console.log("entered72")
  //     const polygonText = `POLYGON((${polygonCoords
  //       .map((point) => point.join(" "))
  //       .join(", ")}))`;
  //     const categories = [
  //       "Vulnerable",
  //       "Critically Endangered",
  //       "Near Threatened",
  //       "Endangered",
  //     ];
  //     const start = req.query.start || false;
  //     const end = req.query.end || false;
  //     console.log("entered84")

  //     const arr1 = [
  //       Sequelize.where(
  //         Sequelize.fn(
  //           "ST_Within",
  //           Sequelize.fn(
  //             "ST_SetSRID",
  //             Sequelize.fn(
  //               "ST_MakePoint",
  //               Sequelize.col("longitude"),
  //               Sequelize.col("latitude")
  //             ),
  //             4326
  //           ),
  //           Sequelize.fn("ST_GeomFromText", polygonText, 4326)
  //         ),
  //         true
  //       ),
  //     ];
  //     console.log("entered104")

  //     if (start && end) {
  //       arr1.push(
  //         Sequelize.where(
  //           Sequelize.fn(
  //             "TO_DATE",
  //             Sequelize.col("observationDate"),
  //             "DD-MM-YYYY"
  //           ),
  //           {
  //             [Op.between]: [start, end], // Filter by date range
  //           }
  //         )
  //       );
  //     }
  //     const counts = {};
  //     const obj = {};

  //     const count = await Kinnaur.count({
  //       distinct: true,
  //       col: "eBirdScientificName",
  //       where: {
  //         category: ["species", "issf", "domestic"],
  //         [Sequelize.Op.and]: arr1,
  //       },
  //     });

  //     const soib = await Kinnaur.count({
  //       distinct: true,
  //       col: "eBirdScientificName",
  //       where: {
  //         soibConcernStatus: "High",
  //         [Sequelize.Op.and]: arr1,
  //       },
  //     });

  //     const scheduleI = await Kinnaur.count({
  //       distinct: true,
  //       col: "eBirdScientificName",
  //       where: {
  //         wpaSchedule: "Schedule-I",
  //         [Sequelize.Op.and]: arr1,
  //       },
  //     });

  //     const indiaEndemic = await Kinnaur.count({
  //       distinct: true,
  //       col: "eBirdScientificName",
  //       where: {
  //         indiaEndemic: "Yes",
  //         [Sequelize.Op.and]: arr1,
  //       },
  //     });

  //     const highConcern = await Kinnaur.count({
  //       distinct: true,
  //       col: "eBirdScientificName",
  //       where: {
  //         soibConcernStatus: "High",
  //         [Sequelize.Op.and]: arr1,
  //       },
  //     });

  //     const moderateConcern = await Kinnaur.count({
  //       distinct: true,
  //       col: "eBirdScientificName",
  //       where: {
  //         soibConcernStatus: "Moderate",
  //         [Sequelize.Op.and]: arr1,
  //       },
  //     });

  //     const citesAppendixI = await Kinnaur.count({
  //       distinct: true,
  //       col: "eBirdScientificName",
  //       where: {
  //         citesAppendix: "Appendix I",
  //         [Sequelize.Op.and]: arr1,
  //       },
  //     });

  //     const citesAppendixII = await Kinnaur.count({
  //       distinct: true,
  //       col: "eBirdScientificName",
  //       where: {
  //         citesAppendix: "Appendix II",
  //         [Sequelize.Op.and]: arr1,
  //       },
  //     });

  //     const cmsAppendixI = await Kinnaur.count({
  //       distinct: true,
  //       col: "eBirdScientificName",
  //       where: {
  //         cmsAppendix: "Appendix I",
  //         [Sequelize.Op.and]: arr1,
  //       },
  //     });

  //     const cmsAppendixII = await Kinnaur.count({
  //       distinct: true,
  //       col: "eBirdScientificName",
  //       where: {
  //         cmsAppendix: "Appendix II",
  //         [Sequelize.Op.and]: arr1,
  //       },
  //     });

  //     const migrate = await Kinnaur.findAll({
  //       attributes: [
  //         [
  //           Sequelize.fn("DISTINCT", Sequelize.col("eBirdScientificName")),
  //           "eBirdScientificName",
  //         ],
  //         "migratoryStatusWithinIndia",
  //       ],
  //       where: {
  //         [Sequelize.Op.and]: arr1,
  //       },
  //       raw: true,
  //     });

  //     const migrateCount = migrate.filter((ele) => {
  //       const pattern = /^(?!.*(Resident|Uncertain)).*$/;
  //       return pattern.test(ele.migratoryStatusWithinIndia);
  //     });

  //     for (const category of categories) {
  //       const count = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           iucnCategory: category,
  //           [Sequelize.Op.and]: arr1,
  //           eBirdScientificName: Sequelize.where(
  //             Sequelize.fn(
  //               "regexp_replace",
  //               Sequelize.col("eBirdScientificName"),
  //               "\\d+",
  //               "",
  //               "g"
  //             ),
  //             "=",
  //             Sequelize.col("eBirdScientificName")
  //           ),
  //         },
  //       });
  //       counts[category] = count;
  //     }
  //     console.log("entered267")

  //     const cms1 = {};
  //     const cms2 = {};
  //     cms1["species"] = "Appendix I";
  //     cms1["count"] = cmsAppendixI;
  //     cms2["species"] = "Appendix II";
  //     cms2["count"] = cmsAppendixII;
  //     const cities1 = {};
  //     const cities2 = {};
  //     cities1["species"] = "Appendix I";
  //     cities1["count"] = citesAppendixI;
  //     cities2["species"] = "Appendix II";
  //     cities2["count"] = citesAppendixII;
  //     const soibConcern1 = {};
  //     const soibConcern2 = {};
  //     soibConcern1["species"] = "Moderate Priority";
  //     soibConcern1["count"] = moderateConcern;
  //     soibConcern2["species"] = "High Priority";
  //     soibConcern2["count"] = highConcern;
  //     obj["iucnRedListCategoriesCount"] = counts;
  //     obj["total"] = count;
  //     obj["migrate"] = migrateCount.length;
  //     obj["iucnRedList"] =
  //       counts["Vulnerable"] +
  //       counts["Critically Endangered"] +
  //       counts["Endangered"];
  //     obj["soibHighPriority"] = soib;
  //     obj["scheduleI"] = scheduleI;
  //     obj["indiaEndemic"] = indiaEndemic;
  //     obj["soibConservationConcernSpecies"] = [];
  //     obj["soibConservationConcernSpecies"].push(soibConcern1, soibConcern2);
  //     obj["citesAppendixSpecies"] = [];
  //     obj["citesAppendixSpecies"].push(cities1, cities2);
  //     obj["cmsAppendixSpecies"] = [];
  //     obj["cmsAppendixSpecies"].push(cms1, cms2);
  //     res.json(obj);
  //   } catch (error) {
  //     console.log(error)
  //     res.status(500).send({ error: error });
  //   }
  // },

  async soibConcernStatus(req, res) {
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
          "soibConcernStatus",
          "allSpeciesReported",

          [
            Sequelize.fn(
              "count",
              Sequelize.col("indiaChecklistScientificName")
            ),
            "count",
          ],
          [
            Sequelize.literal(`
              CASE
                WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                THEN "samplingEventIdentifier"
                ELSE "groupIdentifier"
              END
            `),
            "groupIdentifier", 
          ],
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
        group: [
          Sequelize.literal(`
            CASE
              WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
              THEN "samplingEventIdentifier"
              ELSE "groupIdentifier"
            END
          `),
          "soibConcernStatus",
          "allSpeciesReported"],
        raw: true,
      });

      const results = await Kinnaur.findAll({
        attributes: [
          "indiaChecklistScientificName",
          "indiaChecklistCommonName",
          "soibConcernStatus",
          "uniqueValue",
          "samplingEventIdentifier",
          "observationDate",
          "allSpeciesReported",
          [
            Sequelize.fn(
              "count",
              Sequelize.col("indiaChecklistScientificName")
            ),
            "count",
          ],
          [
            Sequelize.literal(`
              CASE
                WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                THEN "samplingEventIdentifier"
                ELSE "groupIdentifier"
              END
            `),
            "groupIdentifier",
          ],
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
              "Least Concern",
            ],
          },
          [Op.and]: arr1,          
          soibConcernStatus: "High",
        },
        group: [
          "indiaChecklistScientificName",
          "indiaChecklistCommonName",
          Sequelize.literal(`
            CASE
                WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                THEN "samplingEventIdentifier"
                ELSE "groupIdentifier"
            END
          `),
          "soibConcernStatus",
          "uniqueValue",
          "samplingEventIdentifier",
          "observationDate",
          "allSpeciesReported"

        ],
        raw: true,
      });
      const scientificNameCounts = {};
      const maxObservationMap = new Map();
      const latestObservationsMap = new Map();
      const uniqueMap = new Map();
      const arr = [];
      function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
      
      // Populate the arr with unique groupIdentifiers where allSpeciesReported == "1"
      groupIdentifier.forEach((result) => {
        if (!arr.includes(result.groupIdentifier) && result.allSpeciesReported == "1") {
          arr.push(result.groupIdentifier);
        }
      });
      
      // Helper function to convert date strings to Date objects
      function convertDateString(dateStr) {
        const [day, month, year] = dateStr.split("-");
        return new Date(`${year}-${month}-${day}`);
      }
      
      // First pass: Find the maximum observation date for each scientific name
      results.forEach((entry) => {
        const currentDate = convertDateString(entry.observationDate);
        const scientificName = entry.indiaChecklistScientificName;
      
        if (!maxObservationMap.has(scientificName) || currentDate > maxObservationMap.get(scientificName).date) {
          maxObservationMap.set(scientificName, {
            date: currentDate,
            samplingEventIdentifier: entry.samplingEventIdentifier,
            entry: { ...entry, date: currentDate },
          });
        }
      });
      
      // Second pass: Process entries and populate uniqueMap
      results.forEach((entry) => {
        const currentDate = convertDateString(entry.observationDate);
        const key = `${entry.groupIdentifier}-${entry.indiaChecklistScientificName}`;
      
        if (
          !latestObservationsMap.has(key) ||
          (latestObservationsMap.has(key) && currentDate > latestObservationsMap.get(key).date)
        ) {
          latestObservationsMap.set(key, {
            date: currentDate,
            entry: { ...entry, date: currentDate },
          });
        }
      });
      
      // Filter the array to keep only entries with the latest observation date and allSpeciesReported equal to 1
      const filteredData = Array.from(latestObservationsMap.values()).map((obj) => obj.entry);
      
      filteredData.forEach((result) => {
        const birdScientificName = result.indiaChecklistScientificName;
      
        // Count the scientific name only if allSpeciesReported is 1
        if (result.allSpeciesReported == "1") {
          if (scientificNameCounts.hasOwnProperty(birdScientificName)) {
            scientificNameCounts[birdScientificName]++;
          } else {
            scientificNameCounts[birdScientificName] = 1;
          }
        }
      
        // Add the entry to uniqueMap
        const key = result.uniqueValue;
        if (!uniqueMap.has(key)) {
          const latestObservationDate = maxObservationMap.get(birdScientificName).date;
          uniqueMap.set(key, { ...result, latestObservationDate });
        }
      });
      
      // Prepare the output array
      const uniqueArray = Array.from(uniqueMap.values());
      const newArray = uniqueArray.map((ele) => {
        const bird = ele.indiaChecklistScientificName;
        const latestObservationDate = formatDate(maxObservationMap.get(bird).date);
        const samplingEventIdentifier = maxObservationMap.get(bird).samplingEventIdentifier;

      
        return {
          region: ele.iucnCategory,
          indiaChecklistScientificName: ele.indiaChecklistScientificName,
          indiaChecklistCommonName: ele.indiaChecklistCommonName,
          uniqueValue: ele.uniqueValue,
          percentage: isNaN(Math.round((scientificNameCounts[bird] / arr.length) * 100))
            ? "0%"
            : Math.round((scientificNameCounts[bird] / arr.length) * 100) + "%",
          samplingEventIdentifier: samplingEventIdentifier,
          observationDate: latestObservationDate,
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
      console.log(error);
      res.send({ error: error.message });
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
           [
            Sequelize.literal(`
              CASE
                WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                THEN "samplingEventIdentifier"
                ELSE "groupIdentifier"
              END
            `),
            "groupIdentifier", 
          ],
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
        group: [
          Sequelize.literal(`
            CASE
              WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
              THEN "samplingEventIdentifier"
              ELSE "groupIdentifier"
            END
          `),
          "allSpeciesReported"],
        raw: true,
      });

      const results = await Kinnaur.findAll({
        attributes: [
          "iucnCategory",
          "indiaChecklistScientificName",
          "indiaChecklistCommonName",
          "allSpeciesReported",
          "uniqueValue",
          "samplingEventIdentifier",
          "observationDate",
          [
            Sequelize.fn(
              "count",
              Sequelize.col("indiaChecklistScientificName")
            ),
            "count",
          ],
           [
            Sequelize.literal(`
              CASE
                WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                THEN "samplingEventIdentifier"
                ELSE "groupIdentifier"
              END
            `),
            "groupIdentifier",
          ],
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
           Sequelize.literal(`
            CASE
                WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                THEN "samplingEventIdentifier"
                ELSE "groupIdentifier"
            END
          `),
          "allSpeciesReported",
          "uniqueValue",
          "samplingEventIdentifier",
          "observationDate",
        ],
        raw: true,
      });
      const scientificNameCounts = {};
        const maxObservationMap = new Map();
        const latestObservationsMap = new Map();
        const uniqueMap = new Map();
        const arr = [];
        function formatDate(date) {
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          return `${day}-${month}-${year}`;
        }
        
        // Populate the arr with unique groupIdentifiers where allSpeciesReported == "1"
        groupIdentifier.forEach((result) => {
          if (!arr.includes(result.groupIdentifier) && result.allSpeciesReported == "1") {
            arr.push(result.groupIdentifier);
          }
        });
        
        // Helper function to convert date strings to Date objects
        function convertDateString(dateStr) {
          const [day, month, year] = dateStr.split("-");
          return new Date(`${year}-${month}-${day}`);
        }
        
        // First pass: Find the maximum observation date for each scientific name
        results.forEach((entry) => {
          const currentDate = convertDateString(entry.observationDate);
          const scientificName = entry.indiaChecklistScientificName;
        
          if (!maxObservationMap.has(scientificName) || currentDate > maxObservationMap.get(scientificName).date) {
            maxObservationMap.set(scientificName, {
              date: currentDate,
              samplingEventIdentifier: entry.samplingEventIdentifier,
              entry: { ...entry, date: currentDate },
            });
          }
        });
        
        // Second pass: Process entries and populate uniqueMap
        results.forEach((entry) => {
          const currentDate = convertDateString(entry.observationDate);
          const key = `${entry.groupIdentifier}-${entry.indiaChecklistScientificName}`;
        
          if (
            !latestObservationsMap.has(key) ||
            (latestObservationsMap.has(key) && currentDate > latestObservationsMap.get(key).date)
          ) {
            latestObservationsMap.set(key, {
              date: currentDate,
              entry: { ...entry, date: currentDate },
            });
          }
        });
        
        // Filter the array to keep only entries with the latest observation date and allSpeciesReported equal to 1
        const filteredData = Array.from(latestObservationsMap.values()).map((obj) => obj.entry);
        
        filteredData.forEach((result) => {
          const birdScientificName = result.indiaChecklistScientificName;
        
          // Count the scientific name only if allSpeciesReported is 1
          if (result.allSpeciesReported == "1") {
            if (scientificNameCounts.hasOwnProperty(birdScientificName)) {
              scientificNameCounts[birdScientificName]++;
            } else {
              scientificNameCounts[birdScientificName] = 1;
            }
          }
        
          // Add the entry to uniqueMap
          const key = result.uniqueValue;
          if (!uniqueMap.has(key)) {
            const latestObservationDate = maxObservationMap.get(birdScientificName).date;
            uniqueMap.set(key, { ...result, latestObservationDate });
          }
        });
        
        // Prepare the output array
        const uniqueArray = Array.from(uniqueMap.values());
        const newArray = uniqueArray.map((ele) => {
          const bird = ele.indiaChecklistScientificName;
          const latestObservationDate = formatDate(maxObservationMap.get(bird).date);
          const samplingEventIdentifier = maxObservationMap.get(bird).samplingEventIdentifier;

        
          return {
            region: ele.iucnCategory,
            indiaChecklistScientificName: ele.indiaChecklistScientificName,
            indiaChecklistCommonName: ele.indiaChecklistCommonName,
            uniqueValue: ele.uniqueValue,
            percentage: isNaN(Math.round((scientificNameCounts[bird] / arr.length) * 100))
              ? "0%"
              : Math.round((scientificNameCounts[bird] / arr.length) * 100) + "%",
            samplingEventIdentifier: samplingEventIdentifier,
            observationDate: latestObservationDate,
          };
        });
        
        // Sort the array based on IUCN category and uniqueValue
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
      // console.log('datadata',data);
      const polygonCoords = data.features[0].geometry.coordinates[0];
      const firstPoint = polygonCoords[0];
      const lastPoint = polygonCoords[polygonCoords.length - 1];
      if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
        polygonCoords.push(firstPoint); 
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
          [
            Sequelize.literal(`
              CASE
                WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                THEN "samplingEventIdentifier"
                ELSE "groupIdentifier"
              END
            `),
            "groupIdentifier", 
          ],
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
        group: [
          Sequelize.literal(`
            CASE
              WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
              THEN "samplingEventIdentifier"
              ELSE "groupIdentifier"
            END
          `),
          "allSpeciesReported"],
        raw: true,
      });
      const results = await Kinnaur.findAll({
        attributes: [
          "endemicRegion",
          "indiaChecklistScientificName",
          "indiaChecklistCommonName",
          "allSpeciesReported",
          "uniqueValue",
          "samplingEventIdentifier",
          "observationDate",
          [
            Sequelize.fn(
              "count",
              Sequelize.col("indiaChecklistScientificName")
            ),
            "count",
          ],
          [
            Sequelize.literal(`
              CASE
                WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                THEN "samplingEventIdentifier"
                ELSE "groupIdentifier"
              END
            `),
            "groupIdentifier",
          ],
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
           Sequelize.literal(`
            CASE
                WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                THEN "samplingEventIdentifier"
                ELSE "groupIdentifier"
            END
          `),
          "allSpeciesReported",
          "uniqueValue",
          "samplingEventIdentifier",
          "observationDate",
        ],
        raw: true,
      });
      const scientificNameCounts = {};
      const maxObservationMap = new Map();
      const latestObservationsMap = new Map();
      const uniqueMap = new Map();
      const arr = [];
      function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
      
      // Populate the arr with unique groupIdentifiers where allSpeciesReported == "1"
      groupIdentifier.forEach((result) => {
        if (!arr.includes(result.groupIdentifier) && result.allSpeciesReported == "1") {
          arr.push(result.groupIdentifier);
        }
      });
      
      // Helper function to convert date strings to Date objects
      function convertDateString(dateStr) {
        const [day, month, year] = dateStr.split("-");
        return new Date(`${year}-${month}-${day}`);
      }
      
      // First pass: Find the maximum observation date for each scientific name
      results.forEach((entry) => {
        const currentDate = convertDateString(entry.observationDate);
        const scientificName = entry.indiaChecklistScientificName;
      
        if (!maxObservationMap.has(scientificName) || currentDate > maxObservationMap.get(scientificName).date) {
          maxObservationMap.set(scientificName, {
            date: currentDate,
            samplingEventIdentifier: entry.samplingEventIdentifier,
            entry: { ...entry, date: currentDate },
          });
        }
      });
      
      // Second pass: Process entries and populate uniqueMap
      results.forEach((entry) => {
        const currentDate = convertDateString(entry.observationDate);
        const key = `${entry.groupIdentifier}-${entry.indiaChecklistScientificName}`;
      
        if (
          !latestObservationsMap.has(key) ||
          (latestObservationsMap.has(key) && currentDate > latestObservationsMap.get(key).date)
        ) {
          latestObservationsMap.set(key, {
            date: currentDate,
            entry: { ...entry, date: currentDate },
          });
        }
      });
      
      // Filter the array to keep only entries with the latest observation date and allSpeciesReported equal to 1
      const filteredData = Array.from(latestObservationsMap.values()).map((obj) => obj.entry);
      
      filteredData.forEach((result) => {
        const birdScientificName = result.indiaChecklistScientificName;
      
        // Count the scientific name only if allSpeciesReported is 1
        if (result.allSpeciesReported == "1") {
          if (scientificNameCounts.hasOwnProperty(birdScientificName)) {
            scientificNameCounts[birdScientificName]++;
          } else {
            scientificNameCounts[birdScientificName] = 1;
          }
        }
      
        // Add the entry to uniqueMap
        const key = result.uniqueValue;
        if (!uniqueMap.has(key)) {
          const latestObservationDate = maxObservationMap.get(birdScientificName).date;
          uniqueMap.set(key, { ...result, latestObservationDate });
        }
      });
      
      // Prepare the output array
      const uniqueArray = Array.from(uniqueMap.values());
      const newArray = uniqueArray.map((ele) => {
        const bird = ele.indiaChecklistScientificName;
        const latestObservationDate = formatDate(maxObservationMap.get(bird).date);
        const samplingEventIdentifier = maxObservationMap.get(bird).samplingEventIdentifier;

      
        return {
          region: ele.endemicRegion,
          indiaChecklistScientificName: ele.indiaChecklistScientificName,
          indiaChecklistCommonName: ele.indiaChecklistCommonName,
          uniqueValue: ele.uniqueValue,
          percentage: isNaN(Math.round((scientificNameCounts[bird] / arr.length) * 100))
            ? "0%"
            : Math.round((scientificNameCounts[bird] / arr.length) * 100) + "%",
          samplingEventIdentifier: samplingEventIdentifier,
          observationDate: latestObservationDate,
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
      })
      
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
           [
            Sequelize.literal(`
              CASE
                WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                THEN "samplingEventIdentifier"
                ELSE "groupIdentifier"
              END
            `),
            "groupIdentifier", 
          ],
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
        group: [
          Sequelize.literal(`
            CASE
              WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
              THEN "samplingEventIdentifier"
              ELSE "groupIdentifier"
            END
          `),
          "allSpeciesReported"],
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
          [
            Sequelize.literal(`
              CASE
                WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                THEN "samplingEventIdentifier"
                ELSE "groupIdentifier"
              END
            `),
            "groupIdentifier",
          ],
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
           Sequelize.literal(`
            CASE
                WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                THEN "samplingEventIdentifier"
                ELSE "groupIdentifier"
            END
          `),
          "uniqueValue",
          "allSpeciesReported",
          "category",
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
          [
            Sequelize.literal(`
                CASE
                  WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                  THEN "samplingEventIdentifier"
                  ELSE "groupIdentifier"
                END
              `),
              "groupIdentifier", 
            ],
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
        group: [
            Sequelize.literal(`
            CASE
              WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
              THEN "samplingEventIdentifier"
              ELSE "groupIdentifier"
            END
          `),
           "allSpeciesReported", 
           "observationDate"],
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
          [
            Sequelize.literal(`
              CASE
                WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                THEN "samplingEventIdentifier"
                ELSE "groupIdentifier"
              END
            `),
            "groupIdentifier",
          ],
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
          Sequelize.literal(`
            CASE
                WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                THEN "samplingEventIdentifier"
                ELSE "groupIdentifier"
            END
          `),
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
     
      // const occurrences = await Kinnaur.findAll({
      //   attributes: [
      //     "locality",
      //     "localityId",
      //     "latitude",
      //     "longitude",
      //     [
      //       Sequelize.fn(
      //         "COUNT",
      //         Sequelize.fn("DISTINCT", Sequelize.col("eBirdScientificName"))
      //       ),
      //       "count",
      //     ],
      //   ],
      //   where: {
      //     localityType: "H",
      //     category: ["species", "issf", "domestic"],
      //     [Sequelize.Op.and]: arr1,
      //   },
      //   group: ["locality", "localityId", "latitude", "longitude"],
      //   order: [[Sequelize.literal("count"), "DESC"]],
      //   limit: 5,
      //   raw: true,
      // });
      // res.send(occurrences);
      const occurrences = await Kinnaur.findAll({
        attributes: [
            "localityId",
            [Sequelize.fn("MIN", Sequelize.col("latitude")), "latitude"],
            [Sequelize.fn("MIN", Sequelize.col("longitude")), "longitude"],
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
        group: ["localityId"], 
        order: [[Sequelize.literal("count"), "DESC"]],
        limit: 5,
        raw: true,
    });

    const results = [];
    for (const o of occurrences) {
      const localityData = await Kinnaur.findOne({
        attributes: ["locality"], 
        where: {
          localityId: o.localityId,
        },
        raw: true,
      });

      results.push({
        ...o, 
        locality: localityData?.locality || "Unknown", 
      });
    }

    res.send(results);
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
          [Sequelize.literal('DISTINCT ON ("indiaChecklistScientificName") "indiaChecklistScientificName"'), 'indiaChecklistScientificName'],
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
        order: [
          ["indiaChecklistScientificName", "ASC"],
          ["uniqueValue", "ASC"],
        ],
        raw: true,
      });
      
      list.sort((a, b) => a.uniqueValue - b.uniqueValue);
      res.send(list);
      
    } catch (err) {
      res.send({ error: err });
    }
  },


  async completeListOfSpeciesGi(req, res) {
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
          "groupIdentifier"
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
  // async waterBirdCongregations(req, res) {
  //   try {
  //     const filePath = req.file.buffer;
  //     const fileData = filePath.toString("utf-8");
  //     const data = JSON.parse(fileData);
  //     const polygonCoords = data.features[0].geometry.coordinates[0];
  //     const firstPoint = polygonCoords[0];
  //     const lastPoint = polygonCoords[polygonCoords.length - 1];
  //     if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
  //       polygonCoords.push(firstPoint);
  //     }
  //     const polygonText = `POLYGON((${polygonCoords
  //       .map((point) => point.join(" "))
  //       .join(", ")}))`;
  //     const start = req.query.start || false;
  //     const end = req.query.end || false;
  //     const arr1 = [
  //       Sequelize.where(
  //         Sequelize.fn(
  //           "ST_Within",
  //           Sequelize.fn(
  //             "ST_SetSRID",
  //             Sequelize.fn(
  //               "ST_MakePoint",
  //               Sequelize.col("longitude"),
  //               Sequelize.col("latitude")
  //             ),
  //             4326
  //           ),
  //           Sequelize.fn("ST_GeomFromText", polygonText, 4326)
  //         ),
  //         true
  //       ),
  //     ];
  //     if (start && end) {
  //       arr1.push(
  //         Sequelize.where(
  //           Sequelize.fn(
  //             "TO_DATE",
  //             Sequelize.col("observationDate"),
  //             "DD-MM-YYYY"
  //           ),
  //           {
  //             [Op.between]: [start, end], // Filter by date range
  //           }
  //         )
  //       );
  //     }
  //     const highestObservations = await Kinnaur.findAll({
  //       attributes: [
  //         "indiaChecklistScientificName",
  //         "onePercentEstimates",
  //         "indiaChecklistCommonName",
  //         [
  //           Sequelize.literal('MAX("observationCount"::numeric)'), // Cast to numeric
  //           "observationCount",
  //         ],
  //         "uniqueValue",
  //         "samplingEventIdentifier",
  //         "observationDate",
  //       ],
  //       where: {
  //         onePercentEstimates: {
  //           [Op.and]: [{ [Op.ne]: null }, { [Op.ne]: "" }],
  //         },
  //         observationCount: {
  //           [Op.ne]: "X",
  //         },
  //         [Sequelize.Op.and]: arr1,
  //       },
  //       group: [
  //         "indiaChecklistScientificName",
  //         "onePercentEstimates",
  //         "indiaChecklistCommonName",
  //         "uniqueValue",
  //         "samplingEventIdentifier",
  //         "observationDate",
  //       ],
  //       order: [[Sequelize.col("uniqueValue"), "ASC"]],
  //       raw: true,
  //     });
  //     const filteredData = highestObservations.map((item) => {
  //       const observationCount = parseInt(item.observationCount, 10); // Convert to integer
  //       const onePercentEstimates = parseInt(item.onePercentEstimates, 10); // Convert to integer
  //       if (observationCount > onePercentEstimates) {
  //         const onePercentBiographicPopulation = Math.round(
  //           observationCount / onePercentEstimates
  //         );
  //         return {
  //           indiaChecklistCommonName: item.indiaChecklistCommonName,
  //           indiaChecklistScientificName: item.indiaChecklistScientificName,
  //           highestCongregation: item.observationCount,
  //           maxObservationCount: onePercentBiographicPopulation,
  //           onePercentBiographicPopulation: item.onePercentEstimates,
  //           uniqueValue: item.uniqueValue,
  //           samplingEventIdentifier:item.samplingEventIdentifier,
  //           observationDate:item.observationDate,
  //         };
  //       }
  //     });
  //     // onePercentEstimates;
  //     const filteredDataWithoutNull = filteredData.filter((item) => 
  //       if (item != null) {
  //         return item;
  //       }
  //     });

  //     res.send({ data: filteredDataWithoutNull, success: true });
  //   } catch (error) {
  //     console.error("Error:", error);
  //     res.status(500).send("An error occurred while processing the data");
  //   }
  // },
  async waterBirdCongregations(req, res) {
    try {
      const filePath = req.file.buffer;
      const fileData = filePath.toString("utf-8");
      const data = JSON.parse(fileData);
      const polygonCoords = data.features[0].geometry.coordinates[0];
      const firstPoint = polygonCoords[0];
      const lastPoint = polygonCoords[polygonCoords.length - 1];
      if (firstPoint[0] !== lastPoint[0]) {
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
              [Op.between]: [start, end],
            }
          )
        );
      }

      const observations = await Kinnaur.findAll({
        attributes: [
          "indiaChecklistScientificName",
          "onePercentEstimates",
          "indiaChecklistCommonName",
          [
            Sequelize.fn(
              "MAX",
              Sequelize.cast(Sequelize.col("observationCount"), "numeric")
            ),
            "highestCongregation",
          ],
          "uniqueValue",
          "samplingEventIdentifier",
          "observationDate",
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
          "samplingEventIdentifier",
          "observationDate",
        ],
        order: [[Sequelize.col("uniqueValue"), "ASC"]],
        raw: true,
      });

      const aggregatedData = {};

      observations.forEach((item) => {
        const observationCount = parseInt(item.highestCongregation, 10);
        const onePercentEstimates = parseInt(item.onePercentEstimates, 10);
        if (observationCount > onePercentEstimates) {
          const onePercentBiographicPopulation = Math.round(
            observationCount / onePercentEstimates
          );

          if (
            !aggregatedData[item.indiaChecklistScientificName] ||
            aggregatedData[item.indiaChecklistScientificName]
              .highestCongregation < observationCount
          ) {
            aggregatedData[item.indiaChecklistScientificName] = {
              indiaChecklistCommonName: item.indiaChecklistCommonName,
              indiaChecklistScientificName: item.indiaChecklistScientificName,
              highestCongregation: item.highestCongregation,
              maxObservationCount: onePercentBiographicPopulation,
              onePercentBiographicPopulation: item.onePercentEstimates,
              uniqueValue: item.uniqueValue,
              samplingEventIdentifier: item.samplingEventIdentifier,
              observationDate: item.observationDate,
            };
          }
        }
      });

      const resultData = Object.values(aggregatedData);

      res.send({ data: resultData, success: true });
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
          // category: ["species", "domestic", "issf"],
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
          // category: ["species", "domestic", "issf"],
        },
        raw: true,
      });
      obj.numberOfList = observers[0].count;
      const observation = await Kinnaur.findAll({
         attributes: [
                    [
                      Sequelize.fn(
                        "COUNT",
                        Sequelize.fn(
                          "DISTINCT",
                          Sequelize.literal(`
                            CASE
                              WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' THEN "samplingEventIdentifier"
                              ELSE "groupIdentifier"
                            END
                          `)
                        )
                      ),
                      "count",
                    ],
                  ],
        where: {
          [Sequelize.Op.and]: arr1,
          // category: ["species", "domestic", "issf"],
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
          // category: ["species", "domestic", "issf"],
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
          // category: ["species", "domestic", "issf"],
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
