const { stat } = require("fs");
const Kinnaur = require("../models/birdsData");
const Sequelize = require("sequelize");
const { count } = require("console");
const { Op, fn, col, literal } = require("sequelize");
const { QueryTypes } = require("sequelize");
const fs = require("fs");
const db = require("../config/db");

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
  async locationName(req, res) {
    try {
      const { state, county } = req.query;
      if (state && county) {
        const localities = await Kinnaur.findAll({
          attributes: [
            [Sequelize.fn("DISTINCT", Sequelize.col("locality")), "locality"],
          ],
          where: {
            state: state,
            county: county,
            localityType: "H",
          },
        });
        const localitiesNames = localities.map(
          (locality) => locality.dataValues.locality
        );
        res.json({ localities: localitiesNames });
      } else if (state) {
        const districts = await Kinnaur.findAll({
          attributes: [
            [Sequelize.fn("DISTINCT", Sequelize.col("county")), "district"],
          ],
          where: {
            state: state,
          },
        });
        const districtNames = districts.map(
          (district) => district.dataValues.district
        );
        res.json({ districts: districtNames });
      } else {
        const states = await Kinnaur.findAll({
          attributes: [
            [Sequelize.fn("DISTINCT", Sequelize.col("state")), "state"],
          ],
          limit: 100,
        });
        const stateNames = states.map((state) => state.dataValues.state);
        res.json({ states: stateNames });
      }
    } catch (error) {
      res.status(500).send("Server Error");
    }
  },
  // async count(req, res) {
  //   const categories = [
  //     "Vulnerable",
  //     "Critically Endangered",
  //     "Near Threatened",
  //     "Endangered",
  //   ];
  //   const { state, county, locality } = req.query;

  //   const start = req.query.start || false;
  //   const end = req.query.end || false;
  //   if (start && end && state && county && locality) {
  //     var obj1 = {
  //       state: state,
  //       county: county,
  //       locality: locality,
  //       [Op.and]: [
  //         Sequelize.where(
  //           Sequelize.fn(
  //             "TO_DATE",
  //             Sequelize.col("observationDate"),
  //             "DD-MM-YYYY"
  //           ),
  //           {
  //             [Op.between]: [start, end], // Filter by date range
  //           }
  //         ),
  //       ],
  //     };
  //   } else if (start && end && state && county) {
  //     var obj1 = {
  //       state: state,
  //       county: county,
  //       [Op.and]: [
  //         Sequelize.where(
  //           Sequelize.fn(
  //             "TO_DATE",
  //             Sequelize.col("observationDate"),
  //             "DD-MM-YYYY"
  //           ),
  //           {
  //             [Op.between]: [start, end], // Filter by date range
  //           }
  //         ),
  //       ],
  //     };
  //   } else if (start && end && state) {
  //     var obj1 = {
  //       state: state,
  //       [Op.and]: [
  //         Sequelize.where(
  //           Sequelize.fn(
  //             "TO_DATE",
  //             Sequelize.col("observationDate"),
  //             "DD-MM-YYYY"
  //           ),
  //           {
  //             [Op.between]: [start, end], // Filter by date range
  //           }
  //         ),
  //       ],
  //     };
  //   } else if (state && county && locality) {
  //     var obj1 = {
  //       state: state,
  //       county: county,
  //       locality: locality,
  //     };
  //   } else if (state && county) {
  //     var obj1 = {
  //       state: state,
  //       county: county,
  //     };
  //   } else if (state) {
  //     var obj1 = {
  //       state: state,
  //     };
  //   }

  //   try {
  //     if (state && county && locality) {
  //       const counts = {};
  //       const obj = {};
  //       const count = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           category: ["species", "issf", "domestic"],
  //           ...obj1,
  //         },
  //       });
  //       const soib = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           soibConcernStatus: "High",
  //           ...obj1,
  //         },
  //       });
  //       const scheduleI = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           wpaSchedule: "Schedule-I",
  //           ...obj1,
  //         },
  //       });
  //       const indiaEndemic = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           indiaEndemic: "Yes",
  //           ...obj1,
  //         },
  //       });
  //       const highConcern = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           soibConcernStatus: "High",
  //           ...obj1,
  //         },
  //       });
  //       const moderateConcern = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           soibConcernStatus: "Moderate",
  //           ...obj1,
  //         },
  //       });
  //       const citesAppendixI = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           citesAppendix: "Appendix I",
  //           ...obj1,
  //         },
  //       });
  //       const citesAppendixII = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           citesAppendix: "Appendix II",
  //           ...obj1,
  //         },
  //       });
  //       const cmsAppendixI = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           cmsAppendix: "Appendix I",
  //           ...obj1,
  //         },
  //       });
  //       const cmsAppendixII = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           cmsAppendix: "Appendix II",
  //           ...obj1,
  //         },
  //       });
  //       const migrate = await Kinnaur.findAll({
  //         attributes: [
  //           [
  //             Sequelize.fn("DISTINCT", Sequelize.col("eBirdScientificName")),
  //             "eBirdScientificName",
  //           ],
  //           "migratoryStatusWithinIndia",
  //         ],
  //         where: {
  //           ...obj1,
  //         },
  //         raw: true,
  //       });
  //       const migrateCount = migrate.filter((ele) => {
  //         const pattern = /^(?!.*(Resident|Uncertain)).*$/;
  //         return pattern.test(ele.migratoryStatusWithinIndia);
  //       });
  //       for (const category of categories) {
  //         const count = await Kinnaur.count({
  //           distinct: true,
  //           col: "eBirdScientificName",
  //           where: {
  //             iucnCategory: category,
  //             ...obj1,
  //             eBirdScientificName: Sequelize.where(
  //               Sequelize.fn(
  //                 "regexp_replace",
  //                 Sequelize.col("eBirdScientificName"),
  //                 "\\d+",
  //                 "",
  //                 "g"
  //               ),
  //               "=",
  //               Sequelize.col("eBirdScientificName")
  //             ),
  //           },
  //         });
  //         counts[category] = count;
  //       }
  //       const cms1 = {};
  //       const cms2 = {};
  //       cms1["species"] = "Appendix I";
  //       cms1["count"] = cmsAppendixI;
  //       cms2["species"] = "Appendix II";
  //       cms2["count"] = cmsAppendixII;
  //       const cities1 = {};
  //       const cities2 = {};
  //       cities1["species"] = "Appendix I";
  //       cities1["count"] = citesAppendixI;
  //       cities2["species"] = "Appendix II";
  //       cities2["count"] = citesAppendixII;
  //       const soibConcern1 = {};
  //       const soibConcern2 = {};
  //       soibConcern1["species"] = "Moderate Priority";
  //       soibConcern1["count"] = moderateConcern;
  //       soibConcern2["species"] = "High Priority";
  //       soibConcern2["count"] = highConcern;
  //       obj["iucnRedListCategoriesCount"] = counts;
  //       obj["total"] = count;
  //       obj["migrate"] = migrateCount.length;
  //       obj["iucnRedList"] =
  //         counts["Vulnerable"] +
  //         counts["Critically Endangered"] +
  //         counts["Near Threatened"] +
  //         counts["Endangered"];
  //       obj["soibHighPriority"] = soib;
  //       obj["scheduleI"] = scheduleI;
  //       obj["indiaEndemic"] = indiaEndemic;
  //       obj["soibConservationConcernSpecies"] = [];
  //       obj["soibConservationConcernSpecies"].push(soibConcern1, soibConcern2);
  //       obj["citesAppendixSpecies"] = [];
  //       obj["citesAppendixSpecies"].push(cities1, cities2);
  //       obj["cmsAppendixSpecies"] = [];
  //       obj["cmsAppendixSpecies"].push(cms1, cms2);
  //       res.json(obj);
  //     } else if (state && county) {
  //       const counts = {};
  //       const obj = {};
  //       const count = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           category: ["species", "domestic", "issf"],
  //           eBirdScientificName: {
  //             [Op.not]: null, // Use [Op.not] to check for non-null values
  //           },
  //           ...obj1,
  //         },
  //       });
  //       const soib = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           soibConcernStatus: "High",
  //           ...obj1,
  //         },
  //       });

  //       const scheduleI = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           wpaSchedule: "Schedule-I",
  //           ...obj1,
  //         },
  //       });
  //       const indiaEndemic = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           indiaEndemic: "Yes",
  //           ...obj1,
  //         },
  //       });
  //       const highConcern = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           soibConcernStatus: "High",
  //           ...obj1,
  //         },
  //       });
  //       const moderateConcern = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           soibConcernStatus: "Moderate",
  //           ...obj1,
  //         },
  //       });
  //       const citesAppendixI = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           citesAppendix: "Appendix I",
  //           ...obj1,
  //         },
  //       });
  //       const citesAppendixII = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           citesAppendix: "Appendix II",
  //           ...obj1,
  //         },
  //       });
  //       const cmsAppendixI = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           cmsAppendix: "Appendix I",
  //           category: ["species", "issf"],
  //           state: state,
  //           county: county,
  //         },
  //       });
  //       const cmsAppendixII = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           cmsAppendix: "Appendix II",
  //           ...obj1,
  //         },
  //       });

  //       const migrate = await Kinnaur.findAll({
  //         attributes: [
  //           [
  //             Sequelize.fn("DISTINCT", Sequelize.col("eBirdScientificName")),
  //             "eBirdScientificName",
  //           ],
  //           "migratoryStatusWithinIndia",
  //         ],
  //         where: {
  //           ...obj1,
  //         },
  //         raw: true,
  //       });
  //       const migrateCount = migrate.filter((ele) => {
  //         const pattern = /^(?!.*(Resident|Uncertain)).*$/;
  //         return pattern.test(ele.migratoryStatusWithinIndia);
  //       });
  //       for (const category of categories) {
  //         const count = await Kinnaur.count({
  //           distinct: true,
  //           col: "eBirdScientificName",
  //           where: {
  //             iucnCategory: category,
  //             // category: ["species","issf"],
  //             ...obj1,
  //             eBirdScientificName: Sequelize.where(
  //               Sequelize.fn(
  //                 "regexp_replace",
  //                 Sequelize.col("eBirdScientificName"),
  //                 "\\d+",
  //                 "",
  //                 "g"
  //               ),
  //               "=",
  //               Sequelize.col("eBirdScientificName")
  //             ),
  //           },
  //         });
  //         counts[category] = count;
  //       }

  //       const cms1 = {};
  //       const cms2 = {};
  //       cms1["species"] = "Appendix I";
  //       cms1["count"] = cmsAppendixI;
  //       cms2["species"] = "Appendix II";
  //       cms2["count"] = cmsAppendixII;
  //       const cities1 = {};
  //       const cities2 = {};
  //       cities1["species"] = "Appendix I";
  //       cities1["count"] = citesAppendixI;
  //       cities2["species"] = "Appendix II";
  //       cities2["count"] = citesAppendixII;
  //       const soibConcern1 = {};
  //       const soibConcern2 = {};
  //       soibConcern1["species"] = "Moderate Priority";
  //       soibConcern1["count"] = moderateConcern;
  //       soibConcern2["species"] = "High Priority";
  //       soibConcern2["count"] = highConcern;
  //       obj["iucnRedListCategoriesCount"] = counts;
  //       obj["total"] = count;
  //       obj["migrate"] = migrateCount.length;
  //       obj["iucnRedList"] =
  //         counts["Vulnerable"] +
  //         counts["Critically Endangered"] +
  //         counts["Endangered"];
  //       obj["soibHighPriority"] = soib;
  //       obj["scheduleI"] = scheduleI;
  //       obj["indiaEndemic"] = indiaEndemic;
  //       obj["soibConservationConcernSpecies"] = [];
  //       obj["soibConservationConcernSpecies"].push(soibConcern1, soibConcern2);
  //       obj["citesAppendixSpecies"] = [];
  //       obj["citesAppendixSpecies"].push(cities1, cities2);
  //       obj["cmsAppendixSpecies"] = [];
  //       obj["cmsAppendixSpecies"].push(cms1, cms2);
  //       res.json(obj);
  //     } else if (state) {
  //       const obj = {};
  //       const count = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           category: ["species", "issf", "domestic"],
  //           ...obj1,
  //         },
  //       });
  //       const soib = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           soibConcernStatus: "High",
  //           ...obj1,
  //         },
  //       });
  //       const scheduleI = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           wpaSchedule: "Schedule-I",
  //           ...obj1,
  //         },
  //       });
  //       const indiaEndemic = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           indiaEndemic: "Yes",
  //           ...obj1,
  //         },
  //       });
  //       const highConcern = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           soibConcernStatus: "High",
  //           ...obj1,
  //         },
  //       });
  //       const moderateConcern = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           soibConcernStatus: "Moderate",
  //           ...obj1,
  //         },
  //       });
  //       const citesAppendixI = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           citesAppendix: "Appendix I",
  //           ...obj1,
  //         },
  //       });
  //       const citesAppendixII = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           citesAppendix: "Appendix II",
  //           ...obj1,
  //         },
  //       });
  //       const cmsAppendixI = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           cmsAppendix: "Appendix I",
  //           ...obj1,
  //         },
  //       });
  //       const cmsAppendixII = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           cmsAppendix: "Appendix II",
  //           ...obj1,
  //         },
  //       });
  //       const migrate = await Kinnaur.findAll({
  //         attributes: [
  //           [
  //             Sequelize.fn("DISTINCT", Sequelize.col("eBirdScientificName")),
  //             "eBirdScientificName",
  //           ],
  //           "migratoryStatusWithinIndia",
  //         ],
  //         where: {
  //           [Op.and]: [
  //             {
  //               migratoryStatusWithinIndia: {
  //                 [Op.notLike]: "%Resident%", // Exclude rows not containing "Resident"
  //               },
  //             },
  //             {
  //               migratoryStatusWithinIndia: {
  //                 [Op.notLike]: "%Uncertain%", // Exclude rows not matching "Uncertain"
  //               },
  //             },
  //           ],
  //           ...obj1,
  //         },
  //         raw: true,
  //       });
  //       const counts = {};

  //       for (const category of categories) {
  //         const count = await Kinnaur.count({
  //           distinct: true,
  //           col: "eBirdScientificName",
  //           where: {
  //             iucnCategory: category,
  //             ...obj1,
  //             eBirdScientificName: Sequelize.where(
  //               Sequelize.fn(
  //                 "regexp_replace",
  //                 Sequelize.col("eBirdScientificName"),
  //                 "\\d+",
  //                 "",
  //                 "g"
  //               ),
  //               "=",
  //               Sequelize.col("eBirdScientificName")
  //             ),
  //           },
  //         });
  //         counts[category] = count;
  //       }
  //       const cms1 = {};
  //       const cms2 = {};
  //       cms1["species"] = "Appendix I";
  //       cms1["count"] = cmsAppendixI;
  //       cms2["species"] = "Appendix II";
  //       cms2["count"] = cmsAppendixII;
  //       const cities1 = {};
  //       const cities2 = {};
  //       cities1["species"] = "Appendix I";
  //       cities1["count"] = citesAppendixI;
  //       cities2["species"] = "Appendix II";
  //       cities2["count"] = citesAppendixII;
  //       const soibConcern1 = {};
  //       const soibConcern2 = {};
  //       soibConcern1["species"] = "Moderate Priority";
  //       soibConcern1["count"] = moderateConcern;
  //       soibConcern2["species"] = "High Priority";
  //       soibConcern2["count"] = highConcern;
  //       obj["iucnRedListCategoriesCount"] = counts;
  //       obj["total"] = count;
  //       obj["migrate"] = migrate.length;
  //       obj["iucnRedList"] =
  //         counts["Vulnerable"] +
  //         counts["Critically Endangered"] +
  //         counts["Endangered"];
  //       obj["soibHighPriority"] = soib;
  //       obj["scheduleI"] = scheduleI;
  //       obj["indiaEndemic"] = indiaEndemic;
  //       obj["soibConservationConcernSpecies"] = [];
  //       obj["soibConservationConcernSpecies"].push(soibConcern1, soibConcern2);
  //       obj["citesAppendixSpecies"] = [];
  //       obj["citesAppendixSpecies"].push(cities1, cities2);
  //       obj["cmsAppendixSpecies"] = [];
  //       obj["cmsAppendixSpecies"].push(cms1, cms2);
  //       res.json(obj);
  //     }
  //   } catch (err) {
  //     res.send({ error: err });
  //   }
  // },

  async count1(req, res) {
    const categories = [
      "Vulnerable",
      "Critically Endangered",
      "Near Threatened",
      "Endangered",
    ];
    const { state, county, locality } = req.query;
    const start = req.query.start || false;
    const end = req.query.end || false;
    if (start && end && state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state && county) {
      var obj1 = {
        state: state,
        county: county,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state) {
      var obj1 = {
        state: state,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
      };
    } else if (state && county) {
      var obj1 = {
        state: state,
        county: county,
      };
    } else if (state) {
      var obj1 = {
        state: state,
      };
    }

    try {
      if (state && county && locality) {
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
            ...obj1,
          },
        });

        for (const category of categories) {
          const count = await Kinnaur.count({
            distinct: true,
            col: "eBirdScientificName",
            where: {
              iucnCategory: category,
              ...obj1,
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
      } else if (state && county) {
        const counts = {};
        const obj = {};

        const count = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            category: ["species", "domestic", "issf"],
            eBirdScientificName: {
              [Op.not]: null,
            },
            ...obj1,
          },
        });

        for (const category of categories) {
          const count = await Kinnaur.count({
            distinct: true,
            col: "eBirdScientificName",
            where: {
              iucnCategory: category,
              // category: ["species","issf"],
              ...obj1,
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
      } else if (state) {
        const obj = {};
        const count = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            category: ["species", "issf", "domestic"],
            eBirdScientificName: {
              [Op.not]: null,
            },
            ...obj1,
          },
        });
        const counts = {};

        for (const category of categories) {
          const count = await Kinnaur.count({
            distinct: true,
            col: "eBirdScientificName",
            where: {
              iucnCategory: category,
              ...obj1,
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
      }
    } catch (err) {
      console.log(err);
    }
  },

  async count2(req, res) {
    const { state, county, locality } = req.query;
    const start = req.query.start || false;
    const end = req.query.end || false;
    if (start && end && state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state && county) {
      var obj1 = {
        state: state,
        county: county,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state) {
      var obj1 = {
        state: state,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
      };
    } else if (state && county) {
      var obj1 = {
        state: state,
        county: county,
      };
    } else if (state) {
      var obj1 = {
        state: state,
      };
    }

    try {
      if (state && county && locality) {
        const obj = {};
        const cmsAppendixI = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            cmsAppendix: "Appendix I",
            ...obj1,
          },
        });

        const cmsAppendixII = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            cmsAppendix: "Appendix II",
            ...obj1,
          },
        });

        const citesAppendixI = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            citesAppendix: "Appendix I",
            ...obj1,
          },
        });
        const citesAppendixII = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            citesAppendix: "Appendix II",
            ...obj1,
          },
        });

        const highConcern = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            soibConcernStatus: "High",
            ...obj1,
          },
        });
        const moderateConcern = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            soibConcernStatus: "Moderate",
            ...obj1,
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
      } else if (state && county) {
        const counts = {};
        const obj = {};
        const highConcern = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            soibConcernStatus: "High",
            ...obj1,
          },
        });
        const moderateConcern = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            soibConcernStatus: "Moderate",
            ...obj1,
          },
        });
        const citesAppendixI = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            citesAppendix: "Appendix I",
            ...obj1,
          },
        });
        const citesAppendixII = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            citesAppendix: "Appendix II",
            ...obj1,
          },
        });
        const cmsAppendixI = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            cmsAppendix: "Appendix I",
            category: ["species", "issf"],
            state: state,
            county: county,
          },
        });
        const cmsAppendixII = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            cmsAppendix: "Appendix II",
            ...obj1,
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
      } else if (state) {
        const obj = {};
        const highConcern = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            soibConcernStatus: "High",
            ...obj1,
          },
        });
        const moderateConcern = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            soibConcernStatus: "Moderate",
            ...obj1,
          },
        });
        const citesAppendixI = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            citesAppendix: "Appendix I",
            ...obj1,
          },
        });
        const citesAppendixII = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            citesAppendix: "Appendix II",
            ...obj1,
          },
        });
        const cmsAppendixI = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            cmsAppendix: "Appendix I",
            ...obj1,
          },
        });
        const cmsAppendixII = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            cmsAppendix: "Appendix II",
            ...obj1,
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
      }
    } catch (err) {
      console.log(err);
    }
  },

  async count3(req, res) {
    const categories = [
      "Vulnerable",
      "Critically Endangered",
      "Near Threatened",
      "Endangered",
    ];
    const { state, county, locality } = req.query;

    const start = req.query.start || false;
    const end = req.query.end || false;
    if (start && end && state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], 
            }
          ),
        ],
      };
   
    }else if (start && end && state && county) {
      var obj1 = {
        state: state,
        county: county,
        observationCount: {
          [Op.not]: null,
        },
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state) {
      var obj1 = {
        state: state,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
      };
    } else if (state && county) {
      var obj1 = {
        state: state,
        county: county,
      };
    } else if (state) {
      var obj1 = {
        state: state,
      };
    }

    try {
      if (state && county && locality) {
        const counts = {};
        const obj = {};

        const count = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            category: ["species", "issf", "domestic"],
            ...obj1,
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
            ...obj1,
            category: ["species", "issf", "domestic"],
            eBirdScientificName: {
              [Op.not]: null,
            },
            migratoryStatusWithinIndia: {
              [Op.notRegexp]: '(Resident|Uncertain)',
            },
          },
          raw: true,
        });
        const migrateCount = migrate.filter((ele) => {
          const pattern = /^(?!.*(Resident|Uncertain)).*$/;
          return pattern.test(ele.migratoryStatusWithinIndia);
        });

        const soib = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            soibConcernStatus: "High",
            ...obj1,
            category: ["species", "issf", "domestic"],
            eBirdScientificName: {
              [Op.not]: null,
            },
          },
        });

        const scheduleI = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            wpaSchedule: "Schedule-I",
            ...obj1,
            category: ["species", "issf", "domestic"],
            eBirdScientificName: {
              [Op.not]: null,
            },
          },
        });

        const indiaEndemic = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            indiaEndemic: "Yes",
            ...obj1,
            category: ["species", "issf", "domestic"],
            eBirdScientificName: {
              [Op.not]: null,
            },
            observationCount: {
              [Op.not]: null,
            },
          },
         
        });

        for (const category of categories) {
          const count = await Kinnaur.count({
            distinct: true,
            col: "eBirdScientificName",
            where: {
              iucnCategory: category,
              ...obj1,
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

        obj["total"] = count;
        obj["migrate"] = migrateCount.length;

        obj["iucnRedList"] =
          counts["Vulnerable"] +
          counts["Critically Endangered"] +
          counts["Endangered"];
        obj["soibHighPriority"] = soib;
        obj["scheduleI"] = scheduleI;
        obj["indiaEndemic"] = indiaEndemic;
        res.json(obj);
      } else if (state && county) {
       
        const counts = {};
        const obj = {};
      
        // Total distinct eBirdScientificName count with specific category and non-null
        const count = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            // added
            category: ["species", "issf", "domestic"],
            eBirdScientificName: {
              [Op.not]: null,
            },
            state: state,
            county: county,
          },
        });
      
        // Migrate count using case-insensitive regex for 'Resident' and 'Uncertain'
        const migrateCount = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
             category: ["species", "issf", "domestic"],
             eBirdScientificName: {
               [Op.not]: null,
             },
            migratoryStatusWithinIndia: {
              [Op.notRegexp]: '(Resident|Uncertain)',
            },
            state: state,
            county: county,
          },
        });
      
        // SOIB High Priority count
        const soib = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            soibConcernStatus: "High",
            state: state,
            county: county,
            category: ["species", "issf", "domestic"],
            eBirdScientificName: {
              [Op.not]: null,
            },
           
          },
        });
      
        // Schedule I count
        const scheduleI = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
             category: ["species", "issf", "domestic"],
             eBirdScientificName: {
               [Op.not]: null,
             },
            wpaSchedule: "Schedule-I",
            state: state,
            county: county,
          },
        });
      
        // India Endemic count
        const indiaEndemic = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
             category: ["species", "issf", "domestic"],
             eBirdScientificName: {
               [Op.not]: null,
             },
             observationCount: {
               [Op.not]: null,
             },
            indiaEndemic: "Yes",
            state: state,
            county: county,
          },
        });
      
        // IUCN Red List categories
        for (const category of categories) {
          const count = await Kinnaur.count({
            distinct: true,
            col: "eBirdScientificName",
            where: {
               // added
            category: ["species"],
            eBirdScientificName: {
              [Op.not]: null,
            },
            // observationCount: {
            //   [Op.not]: null,
            // },
            //
              iucnCategory: category,
              state: state,
              county: county,
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
      
      
        obj["total"] = count;
        obj["migrate"] = migrateCount;
        obj["iucnRedList"] =
          counts["Vulnerable"] +
          counts["Critically Endangered"] +
          counts["Endangered"];
          // counts["Near Threatened"];
        obj["soibHighPriority"] = soib;
        obj["scheduleI"] = scheduleI;
        obj["indiaEndemic"] = indiaEndemic;
      
        res.json(obj);
      } else if (state) {
        const obj = {};
        const counts = {};
        const count = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            category: ["species", "issf", "domestic"],
            ...obj1,
            eBirdScientificName: {
              [Op.not]: null,
            },
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
            [Op.and]: [
              {
                migratoryStatusWithinIndia: {
                  [Op.notLike]: "%Resident%", // Exclude rows not containing "Resident"
                },
              },
              {
                migratoryStatusWithinIndia: {
                  [Op.notLike]: "%Uncertain%", // Exclude rows not matching "Uncertain"
                },
              },
            ],
            ...obj1,
            category: ["species", "issf", "domestic"],
            eBirdScientificName: {
              [Op.not]: null,
            },
          },
          raw: true,
        });

        const soib = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            soibConcernStatus: "High",
            ...obj1,
            category: ["species", "issf", "domestic"],
            eBirdScientificName: {
              [Op.not]: null,
            },
          },
        });
        const scheduleI = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            wpaSchedule: "Schedule-I",
            ...obj1,
            category: ["species", "issf", "domestic"],
            eBirdScientificName: {
              [Op.not]: null,
            },
          },
        });

        const indiaEndemic = await Kinnaur.count({
          distinct: true,
          col: "eBirdScientificName",
          where: {
            indiaEndemic: "Yes",
            ...obj1,
            category: ["species", "issf", "domestic"],
            eBirdScientificName: {
              [Op.not]: null,
            },
            observationCount: {
              [Op.not]: null,
            },
          },
        });

        for (const category of categories) {
          const count = await Kinnaur.count({
            distinct: true,
            col: "eBirdScientificName",
            where: {
              iucnCategory: category,
              ...obj1,
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
        obj["total"] = count;
        obj["migrate"] = migrate.length;

        obj["iucnRedList"] =
          counts["Vulnerable"] +
          counts["Critically Endangered"] +
          counts["Endangered"];
        obj["soibHighPriority"] = soib;
        obj["scheduleI"] = scheduleI;
        obj["indiaEndemic"] = indiaEndemic;
        res.json(obj);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: err });
    }
  },

  async count4(req, res) {
    const { state, county, locality } = req.query;
    const start = req.query.start || false;
    const end = req.query.end || false;
  
    const startYear = new Date(start);
    const endYear = new Date(end);
  
    let years = Array.from(
      { length: endYear.getFullYear() - startYear.getFullYear() + 1 },
      (_, i) => startYear.getFullYear() + i
    );
  
    // console.log("Initial years", years);
    const results = {};
  
    try { 
      for (let i = 0; i < years.length; i++) {
        const currentYear = years[i];
  
        const upToCurrentYear = years.slice(0, i + 1);
  
        const yearConditions = upToCurrentYear.map(year => `%${year}%`);
  
        const data = await Kinnaur.findAll({
          attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('eBirdScientificName')), 'eBirdScientificName']
          ],
          where: {
            state,
            county,
            category: ["species", "issf", "domestic"],
            eBirdScientificName: { 
              [Sequelize.Op.not]: null,
            },
            [Sequelize.Op.or]: yearConditions.map(year => ({
              observationDate: {
                [Sequelize.Op.like]: year, 
              },
            })),
          },
          raw: true,
        });
  
    
        const count = data.length;
        if (count === 0) {
  
          years = years.filter(year => year !== currentYear);
          i--; 
        } else if (count > 0) {
          const added =  Object.values(results).includes(count);
          if(added){
            years = years.filter(year => year !== currentYear);
          i--; 
          } else if(!added){
            results[currentYear] = count; 

          }
        }
      }
  
      res.json(results);
    } catch (error) {
      console.error("Error fetching species count by year:", error);
      res.status(500).send("Error fetching data.");
    }
  },
  
  
  
  
  

  // async count(req, res) {
  //   const categories = [
  //     "Vulnerable",  
  //     "Critically Endangered",
  //     "Near Threatened",
  //     "Endangered",
  //   ];
  //   const { state, county, locality } = req.query;

  //   const start = req.query.start || false;
  //   const end = req.query.end || false;
  //   if (start && end && state && county && locality) {
  //     var obj1 = {
  //       state: state,
  //       county: county,
  //       locality: locality,
  //       [Op.and]: [
  //         Sequelize.where(
  //           Sequelize.fn(
  //             "TO_DATE",
  //             Sequelize.col("observationDate"),
  //             "DD-MM-YYYY"
  //           ),
  //           {
  //             [Op.between]: [start, end], // Filter by date range
  //           }
  //         ),
  //       ],
  //     };
  //   } else if (start && end && state && county) {
  //     var obj1 = {
  //       state: state,
  //       county: county,
  //       [Op.and]: [
  //         Sequelize.where(
  //           Sequelize.fn(
  //             "TO_DATE",
  //             Sequelize.col("observationDate"),
  //             "DD-MM-YYYY"
  //           ),
  //           {
  //             [Op.between]: [start, end], // Filter by date range
  //           }
  //         ),
  //       ],
  //     };
  //   } else if (start && end && state) {
  //     var obj1 = {
  //       state: state,
  //       [Op.and]: [
  //         Sequelize.where(
  //           Sequelize.fn(
  //             "TO_DATE",
  //             Sequelize.col("observationDate"),
  //             "DD-MM-YYYY"
  //           ),
  //           {
  //             [Op.between]: [start, end], // Filter by date range
  //           }
  //         ),
  //       ],
  //     };
  //   } else if (state && county && locality) {
  //     var obj1 = {
  //       state: state,
  //       county: county,
  //       locality: locality,
  //     };
  //   } else if (state && county) {
  //     var obj1 = {
  //       state: state,
  //       county: county,
  //     };
  //   } else if (state) {
  //     var obj1 = {
  //       state: state,
  //     };
  //   }

  //   try {
  //     if (state && county && locality) {
  //       const counts = {};
  //       const obj = {};
  //       const count = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           category: ["species", "issf", "domestic"],
  //           ...obj1,
  //         },
  //       });
  //       const soib = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           soibConcernStatus: "High",
  //           ...obj1,
  //         },
  //       });
  //       const scheduleI = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           wpaSchedule: "Schedule-I",
  //           ...obj1,
  //         },
  //       });
  //       const indiaEndemic = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           indiaEndemic: "Yes",
  //           ...obj1,
  //         },
  //       });
  //       const highConcern = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           soibConcernStatus: "High",
  //           ...obj1,
  //         },
  //       });
  //       const moderateConcern = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           soibConcernStatus: "Moderate",
  //           ...obj1,
  //         },
  //       });
  //       const citesAppendixI = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           citesAppendix: "Appendix I",
  //           ...obj1,
  //         },
  //       });
  //       const citesAppendixII = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           citesAppendix: "Appendix II",
  //           ...obj1,
  //         },
  //       });
  //       const cmsAppendixI = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           cmsAppendix: "Appendix I",
  //           ...obj1,
  //         },
  //       });
  //       const cmsAppendixII = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           cmsAppendix: "Appendix II",
  //           ...obj1,
  //         },
  //       });
  //       const migrate = await Kinnaur.findAll({
  //         attributes: [
  //           [
  //             Sequelize.fn("DISTINCT", Sequelize.col("eBirdScientificName")),
  //             "eBirdScientificName",
  //           ],
  //           "migratoryStatusWithinIndia",
  //         ],
  //         where: {
  //           ...obj1,
  //         },
  //         raw: true,
  //       });
  //       const migrateCount = migrate.filter((ele) => {
  //         const pattern = /^(?!.*(Resident|Uncertain)).*$/;
  //         return pattern.test(ele.migratoryStatusWithinIndia);
  //       });
  //       for (const category of categories) {
  //         const count = await Kinnaur.count({
  //           distinct: true,
  //           col: "eBirdScientificName",
  //           where: {
  //             iucnCategory: category,
  //             ...obj1,
  //             eBirdScientificName: Sequelize.where(
  //               Sequelize.fn(
  //                 "regexp_replace",
  //                 Sequelize.col("eBirdScientificName"),
  //                 "\\d+",
  //                 "",
  //                 "g"
  //               ),
  //               "=",
  //               Sequelize.col("eBirdScientificName")
  //             ),
  //           },
  //         });
  //         counts[category] = count;
  //       }
  //       const cms1 = {};
  //       const cms2 = {};
  //       cms1["species"] = "Appendix I";
  //       cms1["count"] = cmsAppendixI;
  //       cms2["species"] = "Appendix II";
  //       cms2["count"] = cmsAppendixII;
  //       const cities1 = {};
  //       const cities2 = {};
  //       cities1["species"] = "Appendix I";
  //       cities1["count"] = citesAppendixI;
  //       cities2["species"] = "Appendix II";
  //       cities2["count"] = citesAppendixII;
  //       const soibConcern1 = {};
  //       const soibConcern2 = {};
  //       soibConcern1["species"] = "Moderate Priority";
  //       soibConcern1["count"] = moderateConcern;
  //       soibConcern2["species"] = "High Priority";
  //       soibConcern2["count"] = highConcern;
  //       obj["iucnRedListCategoriesCount"] = counts;
  //       obj["total"] = count;
  //       obj["migrate"] = migrateCount.length;
  //       obj["iucnRedList"] =
  //         counts["Vulnerable"] +
  //         counts["Critically Endangered"] +
  //         counts["Near Threatened"] +
  //         counts["Endangered"];
  //       obj["soibHighPriority"] = soib;
  //       obj["scheduleI"] = scheduleI;
  //       obj["indiaEndemic"] = indiaEndemic;
  //       obj["soibConservationConcernSpecies"] = [];
  //       obj["soibConservationConcernSpecies"].push(soibConcern1, soibConcern2);
  //       obj["citesAppendixSpecies"] = [];
  //       obj["citesAppendixSpecies"].push(cities1, cities2);
  //       obj["cmsAppendixSpecies"] = [];
  //       obj["cmsAppendixSpecies"].push(cms1, cms2);
  //       res.json(obj);
  //     } else if (state && county) {
  //       const counts = {};
  //       const obj = {};
  //       const count = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           category: ["species", "domestic", "issf"],
  //           eBirdScientificName: {
  //             [Op.not]: null, // Use [Op.not] to check for non-null values
  //           },
  //           ...obj1,
  //         },
  //       });
  //       const soib = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           soibConcernStatus: "High",
  //           ...obj1,
  //         },
  //       });

  //       const scheduleI = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           wpaSchedule: "Schedule-I",
  //           ...obj1,
  //         },
  //       });
  //       const indiaEndemic = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           indiaEndemic: "Yes",
  //           ...obj1,
  //         },
  //       });
  //       const highConcern = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           soibConcernStatus: "High",
  //           ...obj1,
  //         },
  //       });
  //       const moderateConcern = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           soibConcernStatus: "Moderate",
  //           ...obj1,
  //         },
  //       });
  //       const citesAppendixI = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           citesAppendix: "Appendix I",
  //           ...obj1,
  //         },
  //       });
  //       const citesAppendixII = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           citesAppendix: "Appendix II",
  //           ...obj1,
  //         },
  //       });
  //       const cmsAppendixI = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           cmsAppendix: "Appendix I",
  //           category: ["species", "issf"],
  //           state: state,
  //           county: county,
  //         },
  //       });
  //       const cmsAppendixII = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           cmsAppendix: "Appendix II",
  //           ...obj1,
  //         },
  //       });

  //       const migrate = await Kinnaur.findAll({
  //         attributes: [
  //           [
  //             Sequelize.fn("DISTINCT", Sequelize.col("eBirdScientificName")),
  //             "eBirdScientificName",
  //           ],
  //           "migratoryStatusWithinIndia",
  //         ],
  //         where: {
  //           ...obj1,
  //         },
  //         raw: true,
  //       });
  //       const migrateCount = migrate.filter((ele) => {
  //         const pattern = /^(?!.*(Resident|Uncertain)).*$/;
  //         return pattern.test(ele.migratoryStatusWithinIndia);
  //       });
  //       for (const category of categories) {
  //         const count = await Kinnaur.count({
  //           distinct: true,
  //           col: "eBirdScientificName",
  //           where: {
  //             iucnCategory: category,
  //             // category: ["species","issf"],
  //             ...obj1,
  //             eBirdScientificName: Sequelize.where(
  //               Sequelize.fn(
  //                 "regexp_replace",
  //                 Sequelize.col("eBirdScientificName"),
  //                 "\\d+",
  //                 "",
  //                 "g"
  //               ),
  //               "=",
  //               Sequelize.col("eBirdScientificName")
  //             ),
  //           },
  //         });
  //         counts[category] = count;
  //       }

  //       const cms1 = {};
  //       const cms2 = {};
  //       cms1["species"] = "Appendix I";
  //       cms1["count"] = cmsAppendixI;
  //       cms2["species"] = "Appendix II";
  //       cms2["count"] = cmsAppendixII;
  //       const cities1 = {};
  //       const cities2 = {};
  //       cities1["species"] = "Appendix I";
  //       cities1["count"] = citesAppendixI;
  //       cities2["species"] = "Appendix II";
  //       cities2["count"] = citesAppendixII;
  //       const soibConcern1 = {};
  //       const soibConcern2 = {};
  //       soibConcern1["species"] = "Moderate Priority";
  //       soibConcern1["count"] = moderateConcern;
  //       soibConcern2["species"] = "High Priority";
  //       soibConcern2["count"] = highConcern;
  //       obj["iucnRedListCategoriesCount"] = counts;
  //       obj["total"] = count;
  //       obj["migrate"] = migrateCount.length;
  //       obj["iucnRedList"] =
  //         counts["Vulnerable"] +
  //         counts["Critically Endangered"] +
  //         counts["Endangered"];
  //       obj["soibHighPriority"] = soib;
  //       obj["scheduleI"] = scheduleI;
  //       obj["indiaEndemic"] = indiaEndemic;
  //       obj["soibConservationConcernSpecies"] = [];
  //       obj["soibConservationConcernSpecies"].push(soibConcern1, soibConcern2);
  //       obj["citesAppendixSpecies"] = [];
  //       obj["citesAppendixSpecies"].push(cities1, cities2);
  //       obj["cmsAppendixSpecies"] = [];
  //       obj["cmsAppendixSpecies"].push(cms1, cms2);
  //       res.json(obj);
  //     } else if (state) {
  //       const obj = {};
  //       const count = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           category: ["species", "issf", "domestic"],
  //           ...obj1,
  //         },
  //       });
  //       const soib = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           soibConcernStatus: "High",
  //           ...obj1,
  //         },
  //       });
  //       const scheduleI = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           wpaSchedule: "Schedule-I",
  //           ...obj1,
  //         },
  //       });
  //       const indiaEndemic = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           indiaEndemic: "Yes",
  //           ...obj1,
  //         },
  //       });
  //       const highConcern = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           soibConcernStatus: "High",
  //           ...obj1,
  //         },
  //       });
  //       const moderateConcern = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           soibConcernStatus: "Moderate",
  //           ...obj1,
  //         },
  //       });
  //       const citesAppendixI = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           citesAppendix: "Appendix I",
  //           ...obj1,
  //         },
  //       });
  //       const citesAppendixII = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           citesAppendix: "Appendix II",
  //           ...obj1,
  //         },
  //       });
  //       const cmsAppendixI = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           cmsAppendix: "Appendix I",
  //           ...obj1,
  //         },
  //       });
  //       const cmsAppendixII = await Kinnaur.count({
  //         distinct: true,
  //         col: "eBirdScientificName",
  //         where: {
  //           cmsAppendix: "Appendix II",
  //           ...obj1,
  //         },
  //       });
  //       const migrate = await Kinnaur.findAll({
  //         attributes: [
  //           [
  //             Sequelize.fn("DISTINCT", Sequelize.col("eBirdScientificName")),
  //             "eBirdScientificName",
  //           ],
  //           "migratoryStatusWithinIndia",
  //         ],
  //         where: {
  //           [Op.and]: [
  //             {
  //               migratoryStatusWithinIndia: {
  //                 [Op.notLike]: "%Resident%", // Exclude rows not containing "Resident"
  //               },
  //             },
  //             {
  //               migratoryStatusWithinIndia: {
  //                 [Op.notLike]: "%Uncertain%", // Exclude rows not matching "Uncertain"
  //               },
  //             },
  //           ],
  //           ...obj1,
  //         },
  //         raw: true,
  //       });
  //       const counts = {};

  //       for (const category of categories) {
  //         const count = await Kinnaur.count({
  //           distinct: true,
  //           col: "eBirdScientificName",
  //           where: {
  //             iucnCategory: category,
  //             ...obj1,
  //             eBirdScientificName: Sequelize.where(
  //               Sequelize.fn(
  //                 "regexp_replace",
  //                 Sequelize.col("eBirdScientificName"),
  //                 "\\d+",
  //                 "",
  //                 "g"
  //               ),
  //               "=",
  //               Sequelize.col("eBirdScientificName")
  //             ),
  //           },
  //         });
  //         counts[category] = count;
  //       }
  //       const cms1 = {};
  //       const cms2 = {};
  //       cms1["species"] = "Appendix I";
  //       cms1["count"] = cmsAppendixI;
  //       cms2["species"] = "Appendix II";
  //       cms2["count"] = cmsAppendixII;
  //       const cities1 = {};
  //       const cities2 = {};
  //       cities1["species"] = "Appendix I";
  //       cities1["count"] = citesAppendixI;
  //       cities2["species"] = "Appendix II";
  //       cities2["count"] = citesAppendixII;
  //       const soibConcern1 = {};
  //       const soibConcern2 = {};
  //       soibConcern1["species"] = "Moderate Priority";
  //       soibConcern1["count"] = moderateConcern;
  //       soibConcern2["species"] = "High Priority";
  //       soibConcern2["count"] = highConcern;
  //       obj["iucnRedListCategoriesCount"] = counts;
  //       obj["total"] = count;
  //       obj["migrate"] = migrate.length;
  //       obj["iucnRedList"] =
  //         counts["Vulnerable"] +
  //         counts["Critically Endangered"] +
  //         counts["Endangered"];
  //       obj["soibHighPriority"] = soib;
  //       obj["scheduleI"] = scheduleI;
  //       obj["indiaEndemic"] = indiaEndemic;
  //       obj["soibConservationConcernSpecies"] = [];
  //       obj["soibConservationConcernSpecies"].push(soibConcern1, soibConcern2);
  //       obj["citesAppendixSpecies"] = [];
  //       obj["citesAppendixSpecies"].push(cities1, cities2);
  //       obj["cmsAppendixSpecies"] = [];
  //       obj["cmsAppendixSpecies"].push(cms1, cms2);
  //       res.json(obj);
  //     }
  //   } catch (err) {
  //     res.send({ error: err });
  //   }
  // },

  async soibConcernStatus(req, res) {
    const { state, county, locality } = req.query;
    const start = req.query.start || false;
    const end = req.query.end || false;
    if (start && end && state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state && county) {
      var obj1 = {
        state: state,
        county: county,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state) {
      var obj1 = {
        state: state,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
      };
    } else if (state && county) {
      var obj1 = {
        state: state,
        county: county,
      };
    } else if (state) {
      var obj1 = {
        state: state,
      };
    }

    try {
      if (state && county && locality) {
        const groupIdentifier = await Kinnaur.findAll({
          attributes: [
            "soibConcernStatus",
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
                Sequelize.literal(`
                  CASE
                    WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                    THEN "samplingEventIdentifier"
                    ELSE "groupIdentifier"
                  END
                `)
              ),
              "uniqueGroupCount",
            ],
            "allSpeciesReported",
            [
              Sequelize.fn(
                "COUNT",
                Sequelize.fn("DISTINCT", Sequelize.col("groupIdentifier"))
              ),
              "uniqueGroupCount",
            ],
          ],
          where: obj1,
          group: [
            Sequelize.literal(`
              CASE
                WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                THEN "samplingEventIdentifier"
                ELSE "groupIdentifier"
              END
            `),
            "soibConcernStatus",
            "allSpeciesReported"
          ],
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
            ...obj1,
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

      } else if (state && county) {
        const groupIdentifier = await Kinnaur.findAll({
          attributes: [
            "soibConcernStatus",
            "allSpeciesReported",
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
                Sequelize.literal(`
                  CASE
                    WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                    THEN "samplingEventIdentifier"
                    ELSE "groupIdentifier"
                  END
                `)
              ),
              "uniqueGroupCount",
            ],
          ],
          where: obj1,
          group: [
            Sequelize.literal(`
              CASE
                WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                THEN "samplingEventIdentifier"
                ELSE "groupIdentifier"
              END
            `),
            "soibConcernStatus",
            "allSpeciesReported",
          ],
          raw: true,
        });
        
        const results = await Kinnaur.findAll({
          attributes: [
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
            "samplingEventIdentifier",
            "iucnCategory",
            "indiaChecklistScientificName",
            "indiaChecklistCommonName",
            "observationDate",
            "allSpeciesReported",
            "uniqueValue",
            "soibConcernStatus",
            [
              Sequelize.fn(
                "STRING_AGG",
                Sequelize.col("samplingEventIdentifier"),
                ', '
              ),
              "samplingEventIdentifiers",
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
            ...obj1,
            // allSpeciesReported: "1",
            soibConcernStatus: "High",
          },
          group: [
            Sequelize.literal(`
              CASE
                  WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                  THEN "samplingEventIdentifier"
                  ELSE "groupIdentifier"
              END
            `),
            "samplingEventIdentifier",
            "iucnCategory",
            "indiaChecklistScientificName",
            "indiaChecklistCommonName",
            "allSpeciesReported",
            "uniqueValue",
            "observationDate",
            "soibConcernStatus"
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
            // region: ele.iucnCategory,
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
      } 
    } catch (err) {
      console.log(err);
      res.send({ error: err });

      console.error({ error: err });
    }
  },

  async iucnRedListSpeicies(req, res) {
    const { state, county, locality } = req.query;
    const start = req.query.start || false;
    const end = req.query.end || false;
    if (start && end && state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state && county) {
      var obj1 = {
        state: state,
        county: county,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state) {
      var obj1 = {
        state: state,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
      };
    } else if (state && county) {
      var obj1 = {
        state: state,
        county: county,
      };
    } else if (state) {
      var obj1 = {
        state: state,
      };
    }
    const iucnOrder = {
      "Critically Endangered": 0,
      Endangered: 1,
      Vulnerable: 2,
      "Near Threatened": 3,
    };
    try {
      if (state && county && locality) {
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
                Sequelize.literal(`
                  CASE
                    WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                    THEN "samplingEventIdentifier"
                    ELSE "groupIdentifier"
                  END
                `)
              ),
              "uniqueGroupCount",
            ],
            [
              Sequelize.fn(
                "COUNT",
                Sequelize.fn("DISTINCT", Sequelize.col("groupIdentifier"))
              ),
              "uniqueGroupCount",
            ],
          ],
          where: obj1,
          group: [
            Sequelize.literal(`
              CASE
                WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                THEN "samplingEventIdentifier"
                ELSE "groupIdentifier"
              END
            `),
            "allSpeciesReported",
            "soibConcernStatus",
          ],
            
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
                "Critically Endangered",
                "Vulnerable",
                "Near Threatened",
                "Endangered",
              ],
            },
            ...obj1,
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
          if (!arr.includes(result.groupIdentifier)) {
            arr.push(result.groupIdentifier);
          }
        });
        
        // Helper function to convert date strings to Date objects
        function convertDateString(dateStr) {
          const [day, month, year] = dateStr.split("-");
          const date = new Date(`${year}-${month}-${day}`);
          if (isNaN(date.getTime())) {
            throw new Error(`Invalid date: ${dateStr}`);
          }
          return date;
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

}   else if (state && county) {
        const groupIdentifier = await Kinnaur.findAll({
          attributes: [
              "allSpeciesReported",
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
                Sequelize.literal(`
                  CASE
                    WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                    THEN "samplingEventIdentifier"
                    ELSE "groupIdentifier"
                  END
                `)
              ),
              "uniqueGroupCount",
            ],
          ],
          where: obj1,
          group: [
            Sequelize.literal(`
              CASE
                WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                THEN "samplingEventIdentifier"
                ELSE "groupIdentifier"
              END
            `),
            "allSpeciesReported",
          ],
          raw: true,
        });
        
        const results = await Kinnaur.findAll({
          attributes: [
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
            "samplingEventIdentifier",
            "iucnCategory",
            "indiaChecklistScientificName",
            "indiaChecklistCommonName",
            "observationDate",
            "allSpeciesReported",
            "uniqueValue",
            [
              Sequelize.fn(
                "STRING_AGG",
                Sequelize.col("samplingEventIdentifier"),
                ', '
              ),
              "samplingEventIdentifiers",
            ],
          ],
          where: {
            iucnCategory: {
              [Sequelize.Op.in]: [
                "Critically Endangered",
                "Vulnerable",
                "Near Threatened",
                "Endangered",
              ],
            },
            ...obj1,
            // allSpeciesReported: "1",
          },
          group: [
            Sequelize.literal(`
              CASE
                  WHEN "groupIdentifier" IS NULL OR "groupIdentifier" = 'NA' OR "groupIdentifier" = '' 
                  THEN "samplingEventIdentifier"
                  ELSE "groupIdentifier"
              END
            `),
            "samplingEventIdentifier",
            "iucnCategory",
            "indiaChecklistScientificName",
            "indiaChecklistCommonName",
            "allSpeciesReported",
            "uniqueValue",
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
        
          if (!maxObservationMap.has(scientificName) || currentDate > maxObservationMap.get(scientificName).date ) {
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
        // const sortedArray = newArray.sort((a, b) => {
        //   const uniqueValueA = parseInt(a.uniqueValue, 10);
        //   const uniqueValueB = parseInt(b.uniqueValue, 10);

        //   if (uniqueValueA < uniqueValueB) {
        //     return -1;
        //   }
        //   if (uniqueValueA > uniqueValueB) {
        //     return 1;
        //   }
        //   return 0;
        // });

        // res.send(sortedArray);
          // Sort the array based on IUCN category and uniqueValue
          const sortedArray = newArray.sort((a, b) => {
            const iucnComparison = iucnOrder[a.region] - iucnOrder[b.region];
            if (iucnComparison !== 0) {
              return iucnComparison;
            }
            return parseInt(a.uniqueValue, 10) - parseInt(b.uniqueValue, 10);
          });
          
          res.send(sortedArray);
      }
    } catch (err) {
      console.log(err);
      res.send({ error: err });

      console.error({ error: err });
    }
  },
  async endemincSpecies(req, res) {
    const { state, county, locality } = req.query;
    const start = req.query.start || false;
    const end = req.query.end || false;
    if (start && end && state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state && county) {
      var obj1 = {
        state: state,
        county: county,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state) {
      var obj1 = {
        state: state,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
      };
    } else if (state && county) {
      var obj1 = {
        state: state,
        county: county,
      };
    } else if (state) {
      var obj1 = {
        state: state,
      };
    }
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
    try {
      if (state && county && locality) {
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
          where: obj1,
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
            ...obj1,
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
      } else if (state && county) {
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
            ...obj1,
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
            ...obj1,
            // allSpeciesReported: "1",
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
          // console.log('result',result);
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
        } 
    } catch (err) {
      res.send({ error: err });
    }
  },
  async mostCommonSpecies(req, res) {
    const { state, county, locality } = req.query;
    const start = req.query.start || false;
    const end = req.query.end || false;
    if (start && end && state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state && county) {
      var obj1 = {
        state: state,
        county: county,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state) {
      var obj1 = {
        state: state,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
      };
    } else if (state && county) {
      var obj1 = {
        state: state,
        county: county,
      };
    } else if (state) {
      var obj1 = {
        state: state,
      };
    }
    try {
      if (state && county && locality) {
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
            ...obj1,
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
            ...obj1,
          },
          group: [
            "indiaChecklistScientificName",
            "indiaChecklistCommonName",
            "groupIdentifier",
            "uniqueValue",
            "allSpeciesReported",
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
      } else if (state && county) {
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
            ],            [
              Sequelize.fn(
                "COUNT",
                Sequelize.fn("DISTINCT", Sequelize.col("groupIdentifier"))
              ),
              "uniqueGroupCount",
            ],
          ],
          where: {
            ...obj1,
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
            ...obj1,
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
      } else if (state) {
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
            category: ["species", "issf", "domestic"],
            ...obj1,
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
            ...obj1,
          },
          group: [
            "indiaChecklistScientificName",
            "indiaChecklistCommonName",
            "groupIdentifier",
            "uniqueValue",
            "allSpeciesReported",
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
      }
    } catch (err) {
      res.send({ error: err });
    }
  },
  async seasonalChart(req, res) {
    const { state, county, locality } = req.query;
    const start = req.query.start || false;
    const end = req.query.end || false;
    if (start && end && state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
          {
            [Op.and]: [
              {
                migratoryStatusWithinIndia: {
                  [Op.notLike]: "%Resident%", // Exclude rows not containing "Resident"
                },
              },
              {
                migratoryStatusWithinIndia: {
                  [Op.notLike]: "%Uncertain%", // Exclude rows not matching "Uncertain"
                },
              },
            ],
          },
        ],
      };
      var obj2 = {
        state: state,
        county: county,
        locality: locality,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state && county) {
      var obj1 = {
        state: state,
        county: county,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
          {
            [Op.and]: [
              {
                migratoryStatusWithinIndia: {
                  [Op.notLike]: "%Resident%", // Exclude rows not containing "Resident"
                },
              },
              {
                migratoryStatusWithinIndia: {
                  [Op.notLike]: "%Uncertain%", // Exclude rows not matching "Uncertain"
                },
              },
            ],
          },
        ],
      };
      var obj2 = {
        state: state,
        county: county,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state) {
      var obj1 = {
        state: state,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
          {
            [Op.and]: [
              {
                migratoryStatusWithinIndia: {
                  [Op.notLike]: "%Resident%", // Exclude rows not containing "Resident"
                },
              },
              {
                migratoryStatusWithinIndia: {
                  [Op.notLike]: "%Uncertain%", // Exclude rows not matching "Uncertain"
                },
              },
            ],
          },
        ],
      };
      var obj2 = {
        state: state,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
        [Op.and]: [
          {
            migratoryStatusWithinIndia: {
              [Op.notLike]: "%Resident%", // Exclude rows not containing "Resident"
            },
          },
          {
            migratoryStatusWithinIndia: {
              [Op.notLike]: "%Uncertain%", // Exclude rows not matching "Uncertain"
            },
          },
        ],
      };
      var obj2 = {
        state: state,
        county: county,
        locality: locality,
      };
    } else if (state && county) {
      var obj1 = {
        state: state,
        county: county,
        [Op.and]: [
          {
            migratoryStatusWithinIndia: {
              [Op.notLike]: "%Resident%", // Exclude rows not containing "Resident"
            },
          },
          {
            migratoryStatusWithinIndia: {
              [Op.notLike]: "%Uncertain%", // Exclude rows not matching "Uncertain"
            },
          },
        ],
      };
      var obj2 = {
        state: state,
        county: county,
      };
    } else if (state) {
      var obj1 = {
        state: state,
        [Op.and]: [
          {
            migratoryStatusWithinIndia: {
              [Op.notLike]: "%Resident%", // Exclude rows not containing "Resident"
            },
          },
          {
            migratoryStatusWithinIndia: {
              [Op.notLike]: "%Uncertain%", // Exclude rows not matching "Uncertain"
            },
          },
        ],
      };
      var obj2 = {
        state: state,
      };
    }
    try {
      if (state && county && locality) {
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
            ...obj1,
          },

          group: ["groupIdentifier", "allSpeciesReported", "observationDate"],
          raw: true,
        });
        const results = await Kinnaur.findAll({
          attributes: [
            "indiaChecklistScientificName",
            "indiaChecklistCommonName",
            "uniqueValue",
            "allSpeciesReported",
            "migratoryStatusWithinIndia",
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
            ...obj1,
            category: ["species", "domestic", "issf"],
          },
          group: [
            "indiaChecklistScientificName",
            "indiaChecklistCommonName",
            "groupIdentifier",
            "uniqueValue",
            "allSpeciesReported",
            "migratoryStatusWithinIndia",
            "observationDate",
          ],
          raw: true,
        });
        const scientificNameCounts = {};
        results.forEach((result) => {
          const birdScientificName = result.indiaChecklistCommonName;
          if (
            scientificNameCounts.hasOwnProperty(birdScientificName) &&
            result.allSpeciesReported == "1"
          ) {
            scientificNameCounts[birdScientificName]++;
            // scientificNameCounts[result.indiaChecklistScientificName]++;
          } else if (result.allSpeciesReported == "1") {
            scientificNameCounts[birdScientificName] = 1;
            // scientificNameCounts[result.indiaChecklistScientificName] = 1;
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
                  : (
                      (data.count / monthGroupCountMap[data.month]) *
                      100
                    ).toFixed(1) + "%";
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
      } else if (state && county) {
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
            ...obj2,
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

        const results = await Kinnaur.findAll({
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
            ...obj1,
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
        const scientificNameCounts = {};
        results.forEach((result) => {
          const birdScientificName = result.indiaChecklistCommonName;
          if (
            scientificNameCounts.hasOwnProperty(birdScientificName) &&
            result.allSpeciesReported == "1"
          ) {
            scientificNameCounts[birdScientificName]++;
            // scientificNameCounts[result.indiaChecklistScientificName]++;
          } else if (result.allSpeciesReported == "1") {
            scientificNameCounts[birdScientificName] = 1;
            // scientificNameCounts[result.indiaChecklistScientificName] = 1;
          }
        });
        const scientificNameArray = Object.entries(scientificNameCounts);
        // Sort the array in descending order based on the counts
        scientificNameArray.sort((a, b) => b[1] - a[1]);

        // Get the top 10 bird species
        const top10Birds = scientificNameArray.slice(0, 10);
        const birdNames = top10Birds.map(([birdName, _]) => birdName);
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

          if (!birdData[birdName] && birdNames.includes(birdName)) {
            birdData[birdName] = {
              indiaChecklistCommonName: birdName,
              indiaChecklistScientificName: scientificName,
              monthlyData: {},
            };
          }

          if (
            result.allSpeciesReported === "1" &&
            birdNames.includes(birdName)
          ) {
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
        // console.log(top10Birds);
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
                  : (
                      (data.count / monthGroupCountMap[data.month]) *
                      100
                    ).toFixed(1) + "%";
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
      } else if (state) {
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
            ...obj1,
            [Op.and]: [
              {
                migratoryStatusWithinIndia: {
                  [Op.notLike]: "%Resident%", // Exclude rows not containing "Resident"
                },
              },
              {
                migratoryStatusWithinIndia: {
                  [Op.notLike]: "%Uncertain%", // Exclude rows not matching "Uncertain"
                },
              },
            ],
          },

          group: ["groupIdentifier", "allSpeciesReported", "observationDate"],
          raw: true,
        });
        const results = await Kinnaur.findAll({
          attributes: [
            "indiaChecklistScientificName",
            "indiaChecklistCommonName",
            "uniqueValue",
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
            ...obj1,
          },
          group: [
            "indiaChecklistScientificName",
            "indiaChecklistCommonName",
            "groupIdentifier",
            "uniqueValue",
            "allSpeciesReported",
            "observationDate",
          ],
          raw: true,
        });
        const scientificNameCounts = {};
        results.forEach((result) => {
          const birdScientificName = result.indiaChecklistCommonName;
          if (
            scientificNameCounts.hasOwnProperty(birdScientificName) &&
            result.allSpeciesReported == "1"
          ) {
            scientificNameCounts[birdScientificName]++;
            // scientificNameCounts[result.indiaChecklistScientificName]++;
          } else if (result.allSpeciesReported == "1") {
            scientificNameCounts[birdScientificName] = 1;
            // scientificNameCounts[result.indiaChecklistScientificName] = 1;
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
        // console.log(top10Birds);
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
                  : (
                      (data.count / monthGroupCountMap[data.month]) *
                      100
                    ).toFixed(1) + "%";
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
      }
    } catch (err) {
      res.send({ error: err });
    }
  },
  async hotspotArea(req, res) {
    const { state, county, locality } = req.query;
    const start = req.query.start || false;
    const end = req.query.end || false;
    if (start && end && state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state && county) {
      var obj1 = {
        state: state,
        county: county,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state) {
      var obj1 = {
        state: state,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
      };
    } else if (state && county) {
      var obj1 = {
        state: state,
        county: county,
      };
    } else if (state) {
      var obj1 = {
        state: state,
      };
    }
    try {
      if (state && county && locality) {
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
            ...obj1,
          },
          group: ["locality", "localityId", "latitude", "longitude"],
          order: [[Sequelize.literal("count"), "DESC"]],
          limit: 5,
          raw: true,
        });
        res.send(occurrences);
      } else if (state && county) {
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
              ...obj1,
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
      
      } else if (state) {
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
            ...obj1,
          },
          group: ["locality", "localityId"],
          order: [[Sequelize.literal("count"), "DESC"]],
          limit: 5,
          raw: true,
        });
        res.send(occurrences);
      } else {
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
          },
          group: ["locality", "localityId", "latitude", "longitude"],
          order: [[Sequelize.literal("count"), "DESC"]],
          limit: 5,
          raw: true,
        });
        res.send(occurrences);
      }
    } catch (error) {
      res.send({ error: error });
    }
  },

  async completeListOfSpecies(req, res) {
    const { state, county, locality } = req.query;
    const start = req.query.start || false;
    const end = req.query.end || false;
    if (start && end && state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state && county) {
      var obj1 = {
        state: state,
        county: county,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state) {
      var obj1 = {
        state: state,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
      };
    } else if (state && county) {
      var obj1 = {
        state: state,
        county: county,
      };
    } else if (state) {
      var obj1 = {
        state: state,
      };
    }
    try {
      if (state && county && locality) {
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
            ...obj1
          },
          order: [
            ["indiaChecklistScientificName", "ASC"],
            ["uniqueValue", "ASC"],
          ],
          raw: true,
        });
        
        list.sort((a, b) => a.uniqueValue - b.uniqueValue);
        res.send(list);

      } else if (state && county) {
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
            ...obj1
          },
          order: [
            ["indiaChecklistScientificName", "ASC"],
            ["uniqueValue", "ASC"],
          ],
          raw: true,
        });
        
        list.sort((a, b) => a.uniqueValue - b.uniqueValue);
        res.send(list);
        
      } else if (state) {
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
            ...obj1
          },
          order: [
            ["indiaChecklistScientificName", "ASC"],
            ["uniqueValue", "ASC"],
          ],
          raw: true,
        });
        
        list.sort((a, b) => a.uniqueValue - b.uniqueValue);
        res.send(list);
      }
    } catch (err) {
      res.send({ error: err });
    }
  },

  async completeListOfSpeciesGi(req, res) {
    const { state, county, locality } = req.query;
    const start = req.query.start || false;
    const end = req.query.end || false;
    if (start && end && state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state && county) {
      var obj1 = {
        state: state,
        county: county,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state) {
      var obj1 = {
        state: state,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
      };
    } else if (state && county) {
      var obj1 = {
        state: state,
        county: county,
      };
    } else if (state) {
      var obj1 = {
        state: state,
      };
    }
    try {
      if (state && county && locality) {
        const list = await Kinnaur.findAll({
          attributes: [
            [
              Sequelize.fn(
                "DISTINCT",
                Sequelize.col("groupIdentifier")
              ),
              "indiaChecklistScientificName",
            ],
          ],
          where: {
            indiaChecklistScientificName: {
              [Op.not]: null,
            },
            ...obj1,
          },
          raw: true,
        });
        list.sort((a, b) => a.uniqueValue - b.uniqueValue);
        res.send(list);
      } 
      // else if (state && county) {
      //   const list = await Kinnaur.findAll({
      //     attributes: [
      //       [Sequelize.fn('DISTINCT', Sequelize.col('groupIdentifier')), 'groupIdentifier'],
      //       'latitude',
      //       'longitude'
      //     ],
      //     where: {
      //       // allSpeciesReported: '1',
      //       state: state,
      //       county: county,
      //     },
      //     order: [['latitude', 'ASC']] // Optionally sort by latitude
      //   });

      //   res.send(list);
      else if (state && county) {
        const list = await Kinnaur.findAll({
          attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('groupIdentifier')), 'groupIdentifier'],
            'latitude',
            'longitude',
            'samplingEventIdentifier' // Add samplingEventIdentifier to the query attributes
          ],
          where: {
            state: state,
            county: county,
            allSpeciesReported: "1",
          },
          order: [['latitude', 'ASC']] 
        });
      
      
        const updatedList = list.map(item => {
          const data = item.dataValues; 
          if (!data.groupIdentifier || data.groupIdentifier === 'NA' || data.groupIdentifier === 'NA' || data.groupIdentifier === '' || data.groupIdentifier === null) { // Check if groupIdentifier is empty or 'NA'
            data.groupIdentifier = data.samplingEventIdentifier; 
          }
          return data; 
        });
      
        res.send(updatedList); 

    }
     else if (state) {
        const list = await Kinnaur.findAll({
          attributes: [
            [
              Sequelize.fn(
                "DISTINCT",
                Sequelize.col("groupIdentifier")
              ),
              "groupIdentifier",
            ],
          ],
          where: {
            indiaChecklistScientificName: {
              [Op.not]: null,
            },
            ...obj1,
          },
          raw: true,
        });
        list.sort((a, b) => a.uniqueValue - b.uniqueValue);
        res.send(list);
      }
    } catch (err) {
      console.log(err)
      res.send({ error: err });
    }
  },

  // async waterBirdCongregations(req, res) {
  //   const { state, county, locality } = req.query;
  //   const start = req.query.start || false;
  //   const end = req.query.end || false;
  //   if (start && end && state && county && locality) {
  //     var obj1 = {
  //       state: state,
  //       county: county,
  //       locality: locality,
  //       [Op.and]: [
  //         Sequelize.where(
  //           Sequelize.fn(
  //             "TO_DATE",
  //             Sequelize.col("observationDate"),
  //             "DD-MM-YYYY"
  //           ),
  //           {
  //             [Op.between]: [start, end], // Filter by date range
  //           }
  //         ),
  //       ],
  //     };
  //   } else if (start && end && state && county) {
  //     var obj1 = {
  //       state: state,
  //       county: county,
  //       [Op.and]: [
  //         Sequelize.where(
  //           Sequelize.fn(
  //             "TO_DATE",
  //             Sequelize.col("observationDate"),
  //             "DD-MM-YYYY"
  //           ),
  //           {
  //             [Op.between]: [start, end], // Filter by date range
  //           }
  //         ),
  //       ],
  //     };
  //   } else if (start && end && state) {
  //     var obj1 = {
  //       state: state,
  //       [Op.and]: [
  //         Sequelize.where(
  //           Sequelize.fn(
  //             "TO_DATE",
  //             Sequelize.col("observationDate"),
  //             "DD-MM-YYYY"
  //           ),
  //           {
  //             [Op.between]: [start, end], // Filter by date range
  //           }
  //         ),
  //       ],
  //     };
  //   } else if (state && county && locality) {
  //     var obj1 = {
  //       state: state,
  //       county: county,
  //       locality: locality,
  //     };
  //   } else if (state && county) {
  //     var obj1 = {
  //       state: state,
  //       county: county,
  //     };
  //   } else if (state) {
  //     var obj1 = {
  //       state: state,
  //     };
  //   }
  //   try {
  //     if (state && county && locality) {
  //       const highestObservations = await Kinnaur.findAll({
  //         attributes: [
  //           "indiaChecklistScientificName",
  //           "onePercentEstimates",
  //           "indiaChecklistCommonName",
  //           [
  //             Sequelize.literal('MAX("observationCount"::numeric)'), // Cast to numeric
  //             "observationCount",
  //           ],
  //           "uniqueValue",
  //           "samplingEventIdentifier",
  //           "observationDate",
  //         ],
  //         where: {
  //           onePercentEstimates: {
  //             [Op.and]: [{ [Op.ne]: null }, { [Op.ne]: "" }],
  //           },
  //           observationCount: {
  //             [Op.ne]: "X",
  //           },
  //           ...obj1,
  //         },
  //         group: [
  //           "indiaChecklistScientificName",
  //           "onePercentEstimates",
  //           "indiaChecklistCommonName",
  //           "uniqueValue",
  //           "samplingEventIdentifier",
  //           "observationDate",
  //         ],
  //         order: [[Sequelize.col("uniqueValue"), "ASC"]],
  //         raw: true,
  //       });
  //       const filteredData = highestObservations.map((item) => {
  //         const observationCount = parseInt(item.observationCount, 10); // Convert to integer
  //         const onePercentEstimates = parseInt(item.onePercentEstimates, 10); // Convert to integer
  //         if (observationCount > onePercentEstimates) {
  //           const onePercentBiographicPopulation = Math.round(
  //             observationCount / onePercentEstimates
  //           );
  //           return {
  //             indiaChecklistCommonName: item.indiaChecklistCommonName,
  //             indiaChecklistScientificName: item.indiaChecklistScientificName,
  //             highestCongregation: item.observationCount,
  //             maxObservationCount: onePercentBiographicPopulation,
  //             onePercentBiographicPopulation: item.onePercentEstimates,
  //             uniqueValue: item.uniqueValue,
  //             samplingEventIdentifier:item.samplingEventIdentifier,
  //             observationDate:item.observationDate
  //           };
  //         }
  //       });
  //       const filteredDataWithoutNull = filteredData.filter((item) => {
  //         if (item != null) {
  //           return item;
  //         }
  //       });

  //       res.send({ data: filteredDataWithoutNull, success: true });
  //     } else if (state && county) {
  //       const highestObservations = await Kinnaur.findAll({
  //         attributes: [
  //           "indiaChecklistScientificName",
  //           "onePercentEstimates",
  //           "indiaChecklistCommonName",
  //           [
  //             Sequelize.literal('MAX("observationCount"::numeric)'), // Cast to numeric
  //             "observationCount",
  //           ],
  //           "uniqueValue",
  //           "samplingEventIdentifier",
  //           "observationDate",
  //         ],
  //         where: {
  //           onePercentEstimates: {
  //             [Op.and]: [{ [Op.ne]: null }, { [Op.ne]: "" }],
  //           },
  //           observationCount: {
  //             [Op.ne]: "X",
  //           },
  //           state: state,
  //           county: county,
  //           ...obj1,
  //         },
  //         group: [
  //           "indiaChecklistScientificName",
  //           "onePercentEstimates",
  //           "indiaChecklistCommonName",
  //           "uniqueValue",
  //           "samplingEventIdentifier",
  //           "observationDate",
  //         ],
  //         order: [[Sequelize.col("uniqueValue"), "ASC"]],
  //         raw: true,
  //       });
  //       const filteredData = highestObservations.map((item) => {
  //         const observationCount = parseInt(item.observationCount, 10); // Convert to integer
  //         const onePercentEstimates = parseInt(item.onePercentEstimates, 10); // Convert to integer
  //         if (observationCount > onePercentEstimates) {
  //           const onePercentBiographicPopulation = Math.round(
  //             observationCount / onePercentEstimates
  //           );
  //           return {
  //             indiaChecklistCommonName: item.indiaChecklistCommonName,
  //             indiaChecklistScientificName: item.indiaChecklistScientificName,
  //             highestCongregation: item.observationCount,
  //             maxObservationCount: onePercentBiographicPopulation,
  //             onePercentBiographicPopulation: item.onePercentEstimates,
  //             uniqueValue: item.uniqueValue,
  //             samplingEventIdentifier:item.samplingEventIdentifier,
  //             observationDate:item.observationDate,
  //           };
  //         }
  //       });
  //       const filteredDataWithoutNull = filteredData.filter((item) => {
  //         if (item != null) {
  //           return item;
  //         }
  //       });

  //       res.send({ data: filteredDataWithoutNull, success: true });
  //     } else if (state) {
  //       const highestObservations = await Kinnaur.findAll({
  //         attributes: [
  //           "indiaChecklistScientificName",
  //           "onePercentEstimates",
  //           "indiaChecklistCommonName",
  //           [
  //             Sequelize.literal('MAX("observationCount"::numeric)'), // Cast to numeric
  //             "observationCount",
  //           ],
  //           "uniqueValue",
  //           "samplingEventIdentifier",
  //           "observationDate",
  //         ],
  //         where: {
  //           onePercentEstimates: {
  //             [Op.and]: [{ [Op.ne]: null }, { [Op.ne]: "" }],
  //           },
  //           observationCount: {
  //             [Op.ne]: "X",
  //           },
  //           ...obj1,
  //         },
  //         group: [
  //           "indiaChecklistScientificName",
  //           "onePercentEstimates",
  //           "indiaChecklistCommonName",
  //           "uniqueValue",
  //           "samplingEventIdentifier",
  //           "observationDate",
  //         ],
  //         order: [[Sequelize.col("uniqueValue"), "ASC"]],
  //         raw: true,
  //       });
  //       const filteredData = highestObservations.map((item) => {
  //         const observationCount = parseInt(item.observationCount, 10); // Convert to integer
  //         const onePercentEstimates = parseInt(item.onePercentEstimates, 10); // Convert to integer
  //         if (observationCount > onePercentEstimates) {
  //           const onePercentBiographicPopulation = Math.round(
  //             observationCount / onePercentEstimates
  //           );
  //           return {
  //             indiaChecklistCommonName: item.indiaChecklistCommonName,
  //             indiaChecklistScientificName: item.indiaChecklistScientificName,
  //             highestCongregation: item.observationCount,
  //             maxObservationCount: onePercentBiographicPopulation,
  //             onePercentBiographicPopulation: item.onePercentEstimates,
  //             uniqueValue: item.uniqueValue,
  //             samplingEventIdentifier:item.samplingEventIdentifier,
  //             observationDate:item.observationDate,
  //           };
  //         }
  //       });
  //       const filteredDataWithoutNull = filteredData.filter((item) => {
  //         if (item != null) {
  //           return item;
  //         }
  //       });

  //       res.send({ data: filteredDataWithoutNull, success: true });
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // },

  async waterBirdCongregations(req, res) {
    const { state, county, locality } = req.query;
    const start = req.query.start || false;
    const end = req.query.end || false;

    let queryObj = {};
    if (start && end) {
      queryObj[Op.and] = [
        { state },
        county && { county },
        locality && { locality },
        Sequelize.where(
          Sequelize.fn(
            "TO_DATE",
            Sequelize.col("observationDate"),
            "DD-MM-YYYY"
          ),
          {
            [Op.between]: [start, end],
          }
        ),
      ].filter(Boolean);
    } else {
      if (state) queryObj.state = state;
      if (county) queryObj.county = county;
      if (locality) queryObj.locality = locality;
    }

    try {
      const highestObservations = await Kinnaur.findAll({
        attributes: [
          "indiaChecklistScientificName",
          "onePercentEstimates",
          "indiaChecklistCommonName",
          [
            Sequelize.literal('MAX("observationCount"::numeric)'),
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
          ...queryObj,
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

      highestObservations.forEach((item) => {
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
    const { state, county, locality } = req.query;
    const start = req.query.start || false;
    const end = req.query.end || false;
    if (start && end && state && county && locality) {
      var obj1 = {
        // added
        category: ["species", "domestic", "issf"],
        // eBirdScientificName: {
        //   [Op.not]: null,
        // },
        // observationCount: {
        //   [Op.not]: null,
        // },
        //
        state: state,
        county: county,
        locality: locality,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state && county) {
      var obj1 = {
          // added
          // category: ["species", "domestic", "issf"],
          // eBirdScientificName: {
          //   [Op.not]: null,
          // },
          // observationCount: {
          //   [Op.not]: null,
          // },
          //
        state: state,
        county: county,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (start && end && state) {
      var obj1 = {
          // added
          category: ["species", "domestic", "issf"],
          // eBirdScientificName: {
          //   [Op.not]: null,
          // },
          // observationCount: {
          //   [Op.not]: null,
          // },
          //
        state: state,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "TO_DATE",
              Sequelize.col("observationDate"),
              "DD-MM-YYYY"
            ),
            {
              [Op.between]: [start, end], // Filter by date range
            }
          ),
        ],
      };
    } else if (state && county && locality) {
      var obj1 = {
        state: state,
        county: county,
        locality: locality,
      };
    } else if (state && county) {
      var obj1 = {
        state: state,
        county: county,
      };
    } else if (state) {
      var obj1 = {
        state: state,
      };
    }

    try {
      if (state && county && locality) {
        const obj = {};
        const data = await Kinnaur.findAll({
          attributes: ["eBirdEnglishName"],
          where: obj1,
          raw: true,
        });
        obj.numberOfObservations = data.length;
        const observers = await Kinnaur.findAll({
          attributes: [
            [
              Sequelize.fn(
                "COUNT",
                Sequelize.fn(
                  "DISTINCT",
                  Sequelize.col("samplingEventIdentifier")
                )
              ),
              "count",
            ],
          ],
          where: obj1,
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
          where: obj1,
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
          where: obj1,
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
          where: obj1,
          raw: true,
        });

        obj.totalNumberOfObservers = group.length;
        return res.send({ data: obj });
      } else if (state && county) {
        const obj = {};
        const data = await Kinnaur.findAll({
          attributes: ["eBirdEnglishName"],
          where: obj1,
          raw: true,
        });
        obj.numberOfObservations = data.length;
        const observers = await Kinnaur.findAll({
          attributes: [
            [
              Sequelize.fn(
                "COUNT",
                Sequelize.fn(
                  "DISTINCT",
                  Sequelize.col("samplingEventIdentifier")
                )
              ),
              "count",
            ],
          ],
          where: obj1,
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
          where: obj1,
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
          where: obj1,
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
          where: obj1,
          raw: true,
        });
        obj.totalNumberOfObservers = group.length;
        return res.send({ data: obj });
      } else if (state) {
        const obj = {};
        const data = await Kinnaur.findAll({
          attributes: ["eBirdEnglishName"],
          where: obj1,
          raw: true,
        });
        obj.numberOfObservations = data.length;
        const observers = await Kinnaur.findAll({
          attributes: [
            [
              Sequelize.fn(
                "COUNT",
                Sequelize.fn(
                  "DISTINCT",
                  Sequelize.col("samplingEventIdentifier")
                )
              ),
              "count",
            ],
          ],
          where: obj1,
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
          where: obj1,
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
          where: obj1,
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
          where: obj1,
          raw: true,
        });

        obj.totalNumberOfObservers = group.length;
        return res.send({ data: obj });
      }
    } catch (err) {
      res.send({ error: err.message });
    }
  },
};

module.exports = UserController;
