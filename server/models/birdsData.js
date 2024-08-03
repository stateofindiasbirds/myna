const Sequelize = require("sequelize");
const db = require("../config/db");

const merge = db.define(
  "merge",
  {
    taxonomicOrder: Sequelize.INTEGER,
    category: Sequelize.STRING,
    commonName: Sequelize.STRING,
    scientificName: Sequelize.STRING,
    exoticCode: Sequelize.STRING,
    observationCount: Sequelize.STRING,
    state: Sequelize.STRING,
    stateCode: Sequelize.STRING,
    county: Sequelize.STRING,
    countyCode: Sequelize.STRING,
    locality: Sequelize.STRING,
    localityId: Sequelize.STRING,
    localityType: Sequelize.STRING,
    latitude: Sequelize.DOUBLE,
    longitude: Sequelize.DOUBLE,
    observationDate: Sequelize.STRING,
    samplingEventIdentifier: Sequelize.STRING,
    protocolType: Sequelize.STRING,
    protocolCode: Sequelize.STRING,
    durationMinutes: Sequelize.STRING,
    effortDistanceKm: Sequelize.STRING,
    numberObservers: Sequelize.STRING,
    allSpeciesReported: Sequelize.STRING,
    groupIdentifier: Sequelize.STRING,
    observerId: Sequelize.STRING,
    eBirdEnglishName: Sequelize.STRING,
    eBirdScientificName: Sequelize.STRING,
    eBirdCode: Sequelize.STRING,
    order: Sequelize.STRING,
    family: Sequelize.STRING,
    soibConcernStatus: Sequelize.STRING,
    soibLongTermStatus: Sequelize.STRING,
    soibCurrentStatus: Sequelize.STRING,
    soibRangeStatus: Sequelize.STRING,
    breedingActivityPeriod: Sequelize.STRING,
    nonBreedingActivityPeriod: Sequelize.STRING,
    dietGuild: Sequelize.STRING,
    indiaEndemic: Sequelize.STRING,
    subcontinentEndemic: Sequelize.STRING,
    himalayasEndemic: Sequelize.STRING,
    endemicRegion: Sequelize.STRING,
    habitatSpecialization: Sequelize.STRING,
    migratoryStatusWithinIndia: Sequelize.STRING,
    essential: Sequelize.STRING,
    discard: Sequelize.STRING,
    restrictedIslands: Sequelize.STRING,
    indiaChecklistCommonName: Sequelize.STRING,
    indiaChecklistScientificName: Sequelize.STRING,
    bliCommonName: Sequelize.STRING,
    bliScientificName: Sequelize.STRING,
    iucnCategory: Sequelize.STRING,
    wpaSchedule: Sequelize.STRING,
    citesAppendix: Sequelize.STRING,
    cmsAppendix: Sequelize.STRING,
    onePercentEstimates: Sequelize.STRING,
    uniqueValue: Sequelize.INTEGER,
  },
  {
    // Specify the primary key column (if it's not 'id')
    primaryKey: "scientificName", // Replace 'yourPrimaryKeyColumn' with the actual primary key column name
  }
);



module.exports = merge;
