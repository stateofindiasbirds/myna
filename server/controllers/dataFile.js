const { stat } = require("fs");
const Kinnaur = require("../models/birdsData");
const Sequelize = require("sequelize");
const { count } = require("console");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

//const Sequelize = require('sequelize');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const db = require("../config/db");

const Merge = require('../models/birdsData');

// const Merge = db.define('merge', {
//     eBirdEnglishName: Sequelize.STRING,
//     eBirdScientificName: Sequelize.STRING,
//     eBirdCode: Sequelize.STRING,
//     order: Sequelize.STRING,
//     family: Sequelize.STRING,
//     soibConcernStatus: Sequelize.STRING,
//     soibLongTermStatus: Sequelize.STRING,
//     soibCurrentStatus: Sequelize.STRING,
//     soibRangeStatus: Sequelize.STRING,
//     breedingActivityPeriod: Sequelize.STRING,
//     nonBreedingActivityPeriod: Sequelize.STRING,
//     dietGuild: Sequelize.STRING,
//     indiaEndemic: Sequelize.STRING,
//     subcontinentEndemic: Sequelize.STRING,
//     himalayasEndemic: Sequelize.STRING,
//     endemicRegion: Sequelize.STRING,
//     habitatSpecialization: Sequelize.STRING,
//     migratoryStatusWithinIndia: Sequelize.STRING,
//     essential:Sequelize.STRING,
//     discard: Sequelize.STRING,
//     indiaChecklistCommonName: Sequelize.STRING,
//     indiaChecklistScientificName: Sequelize.STRING,
//     bliCommonName: Sequelize.STRING,
//     bliScientificName: Sequelize.STRING,
//     iucnCategory: Sequelize.STRING,
//     wpaSchedule: Sequelize.STRING,
//     citesAppendix: Sequelize.STRING,
//     cmsAppendix: Sequelize.STRING,
//     onePercentEstimates: Sequelize.STRING,
//     lastEditedDate: Sequelize.STRING,
//     taxonomicOrder: Sequelize.STRING,
//     category: Sequelize.STRING,
//     taxonConceptId: Sequelize.STRING,
//     commonName: Sequelize.STRING,
//     scientificName: Sequelize.STRING,
//     subspeciesCommonName: Sequelize.STRING,
//     subspeciesScientificName: Sequelize.STRING,
//     exoticCode: Sequelize.STRING,
//     observationCount: Sequelize.STRING,
//     breedingCode: Sequelize.STRING,
//     breedingCategory: Sequelize.STRING,
//     behaviorCode: Sequelize.STRING,
//     ageSex: Sequelize.STRING,
//     country: Sequelize.STRING,
//     countryCode: Sequelize.STRING,
//     state: Sequelize.STRING,
//     stateCode: Sequelize.STRING,
//     county: Sequelize.STRING,
//     countyCode: Sequelize.STRING,
//     ibaCode: Sequelize.STRING,
//     bcrCode: Sequelize.STRING,
//     usfwsCode: Sequelize.STRING,
//     atlasBlock: Sequelize.STRING,
//     locality: Sequelize.STRING,
//     localityId: Sequelize.STRING,
//     localityType: Sequelize.STRING,
//     latitude: Sequelize.DOUBLE,
//     longitude: Sequelize.DOUBLE,
//     observationDate: Sequelize.STRING,
//     timeObservationsStarted: Sequelize.STRING,
//     observerId: Sequelize.STRING,
//     samplingEventIdentifier: Sequelize.STRING,
//     protocolType: Sequelize.STRING,
//     protocolCode: Sequelize.STRING,
//     projectCode: Sequelize.STRING,
//     durationMinutes: Sequelize.STRING,
//     effortDistanceKm: Sequelize.STRING,
//     effortAreaHa: Sequelize.STRING,
//     numberObservers: Sequelize.STRING,
//     allSpeciesReported: Sequelize.STRING,
//     groupIdentifier: Sequelize.STRING,
//   });

  (async () => {
    try {
      // Retrieve the data from the database
      const data = await Merge.findAll();
  
      console.log('Retrieved', data.length, 'rows.');
  
      // Define the CSV file path
      const csvFilePath = 'data.csv';
  
      // Define the CSV writer
      // const csvWriter = createCsvWriter({
      //   path: csvFilePath,
      //   header: Object.keys(data[0].dataValues),
      // });
  
    // const csvWriter = createCsvWriter({
    //     path: csvFilePath,
    //     header: Object.keys(Merge.rawAttributes),
    //   });

    // const header = Object.keys(Merge.rawAttributes).map((key) => ({
    //   eBirdEnglishName: key,
    //   eBirdScientificName: key,
    //   eBirdCode: key,
    //   order: key,
    //   family: key,
    //   soibConcernStatus: key,
    //   soibLongTermStatus: key,
    //   soibCurrentStatus: key,
    //   soibRangeStatus: key,
    //   breedingActivityPeriod: key,
    //   nonBreedingActivityPeriod: key,
    //   dietGuild: key,
    //   indiaEndemic: key,
    //   subcontinentEndemic: key,
    //   himalayasEndemic: key,
    //   endemicRegion: key,
    //   habitatSpecialization: key,
    //   migratoryStatusWithinIndia: key,
    //   essential:key,
    //   discard: key,
    //   indiaChecklistCommonName: key,
    //   indiaChecklistScientificName: key,
    //   bliCommonName: key,
    //   bliScientificName: key,
    //   iucnCategory: key,
    //   wpaSchedule: key,
    //   citesAppendix: key,
    //   cmsAppendix: key,
    //   onePercentEstimates: key,
    //   lastEditedDate: key,
    //   taxonomicOrder: key,
    //   category: key,
    //   taxonConceptId: key,
    //   commonName: key,
    //   scientificName: key,
    //   subspeciesCommonName: key,
    //   subspeciesScientificName: key,
    //   exoticCode: key,
    //   observationCount: key,
    //   breedingCode: key,
    //   breedingCategory: key,
    //   behaviorCode: key,
    //   ageSex: key,
    //   country: key,
    //   countryCode: key,
    //   state: key,
    //   stateCode: key,
    //   county: key,
    //   countyCode: key,
    //   ibaCode: key,
    //   bcrCode: key,
    //   usfwsCode: key,
    //   atlasBlock: key,
    //   locality: key,
    //   localityId: key,
    //   localityType: key,
    //   latitude: key,
    //   longitude: key,
    //   observationDate: key,
    //   timeObservationsStarted: key,
    //   observerId: key,
    //   samplingEventIdentifier: key,
    //   protocolType: key,
    //   protocolCode: key,
    //   projectCode: key,
    //   durationMinutes: key,
    //   effortDistanceKm: key,
    //   effortAreaHa: key,
    //   numberObservers: key,
    //   allSpeciesReported: key,
    //   groupIdentifier: key,
    // }));

    // const csvWriter = createCsvWriter({
    //   path: csvFilePath,
    //   header: header,
    // });


    // Get the column names from the Sequelize model
    const columnNames = Object.keys(Merge.rawAttributes);

    // Define the CSV writer
    const csvWriter = createCsvWriter({
      path: csvFilePath,
      header: columnNames.map((columnName) => ({ id: columnName, title: columnName })),
    });
      // Write the rows to the CSV file
      await csvWriter.writeRecords(data);
  
      console.log('CSV file written successfully:', csvFilePath);
    } catch (error) {
      console.error('Error retrieving or exporting data:', error);
    } finally {
      // Close the Sequelize connection
      db.close();
    }
  })();