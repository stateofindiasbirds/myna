
//working
// const fs = require('fs');
// const path = require('path');

// class CustomReporter {
//   constructor(globalConfig, options) {
//     this._globalConfig = globalConfig;
//     this._options = options;

//     this._csvFilePath = path.join(__dirname, 'test-report', 'test-results.csv');
    
//     console.log(`Creating directories for: ${path.dirname(this._csvFilePath)}`);
//     fs.mkdirSync(path.dirname(this._csvFilePath), { recursive: true });

//     if (!fs.existsSync(this._csvFilePath)) {
//       console.log(`Creating new CSV file at: ${this._csvFilePath}`);
//       fs.writeFileSync(this._csvFilePath, 'Title,Test Suite,Test Case,Status,Duration (s),Date\n', 'utf8');
//     } else {
//       const fileContent = fs.readFileSync(this._csvFilePath, 'utf8');
//       if (!fileContent.trim()) {
//         console.log(`Adding header to the empty CSV file at: ${this._csvFilePath}`);
//         fs.writeFileSync(this._csvFilePath, 'Title,Test Suite,Test Case,Status,Duration (s),Date\n', 'utf8');
//       }
//     }
//   }

//   onTestResult(test, testResult, aggregatedResult) {
//     const currentDate = new Date().toISOString().split('T')[0];
//     const testSuite = path.basename(testResult.testFilePath);

//     console.log(`Processing test results for suite: ${testSuite} on date: ${currentDate}`);

//     let existingData;
//     try {
//       existingData = fs.readFileSync(this._csvFilePath, 'utf8');
//     } catch (err) {
//       console.error(`Error reading CSV file: ${err.message}`);
//       return;
//     }

//     let rows = existingData.trim().split('\n');
//     console.log(`Existing data rows count: ${rows.length}`);

//     let filteredRows = rows.filter(row => {
//       const columns = row.split(',');
//       const date = columns[columns.length - 1];
//       const suite = columns[1];
//       return !(date === currentDate && suite === testSuite);
//     });

//     console.log(`Filtered data rows count: ${filteredRows.length}`);

//     let newRows = [];

//     testResult.testResults.forEach(result => {
//       const ancestorTitle = this._escapeCSV(result.ancestorTitles.join(' > '));
//       const testCase = this._escapeCSV(result.title);
//       const status = result.status;
//       const durationInSeconds = result.duration != null ? (result.duration / 1000).toFixed(3) : 'N/A';
//       const newRow = `${ancestorTitle},${testSuite},${testCase},${status},${durationInSeconds},${currentDate}`;
//       newRows.push(newRow);
//     });

//     console.log(`New data rows count: ${newRows.length}`);

//     let updatedData = [...filteredRows, ...newRows].join('\n') + '\n';

//     try {
//       fs.writeFileSync(this._csvFilePath, updatedData, 'utf8');
//       console.log(`CSV file updated successfully at: ${this._csvFilePath}`);
//     } catch (err) {
//       console.error(`Error writing CSV file: ${err.message}`);
//     }
//   }

//   _escapeCSV(value) {
//     if (value.includes(',')) {
//       return `"${value.replace(/"/g, '""')}"`;  
//     }
//     return value;
//   }
// }

// module.exports = CustomReporter;



// const fs = require('fs');
// const path = require('path');

// class CustomReporter {
//   constructor(globalConfig, options) {
//     this._globalConfig = globalConfig;
//     this._options = options;
//   }

//   _getCsvFilePath(date) {
//     return path.join(__dirname, 'test-report', `custom-file-${date}.csv`);
//   }

//   _getCsvFilePathCurrent(date) {
//     return path.join(__dirname, 'test-report', `test-report-${date}.csv`);
//   }

//   _setupCSVFile(filePath) {
//     fs.mkdirSync(path.dirname(filePath), { recursive: true });
//     if (!fs.existsSync(filePath)) {
//       fs.writeFileSync(filePath, 'Title,Test Suite,Test Case,Status,Duration (s),Date,Duration Comparison\n', 'utf8');
//     }
//   }

//   _compareDurations(currentDuration, previousDuration) {
//     console.log("current and previous duration", currentDuration, previousDuration);
//     if (previousDuration === 'N/A' || currentDuration === 'N/A') {
//       return 'N/A';
//     }

//     const current = parseFloat(currentDuration);
//     const previous = parseFloat(previousDuration);

//     if (current > previous) {
//       return 'Higher';
//     } else if (current < previous) {
//       return 'Lower';
//     } else {
//       return 'Same';
//     }
//   }

//   _parseCSVContent(csvContent) {
//     console.log("Parsing CSV Content: \n", csvContent);
//     const rows = csvContent.trim().split('\n');
//     const data = {};
//     rows.forEach((row, index) => {
//       if (index === 0) return; 
//       const cols = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
//       if (cols && cols.length > 5) {
//         const testCase = this.normalizeKey(cols[2].replace(/(^"|"$)/g, '')); 
//         const duration = cols[4].replace(/(^"|"$)/g, ''); 
//         data[testCase] = duration;
//       }
//     });
//     console.log("Parsed Data: ", data);
//     return data;
//   }

//   normalizeKey(key) {
//     return key.trim().toLowerCase().replace(/"/g, '');
//   }

//   onTestResult(test, testResult, aggregatedResult) {

//     const currentDate = new Date().toISOString().split('T')[0];
//     const currentCsvFilePath = this._getCsvFilePathCurrent(currentDate);

//     this._setupCSVFile(currentCsvFilePath);

//     let previousData = {};
//     let foundPrevious = false;
//     const maxDaysBack = 7; 

//     for (let i = 1; i <= maxDaysBack; i++) {
//         const previousDate = new Date(Date.now() - i * 864e5).toISOString().split('T')[0]; 
//         const previousCsvFilePath = this._getCsvFilePath(previousDate);

//         if (fs.existsSync(previousCsvFilePath)) {
//             const previousContent = fs.readFileSync(previousCsvFilePath, 'utf8');
//             previousData = this._parseCSVContent(previousContent);
//             foundPrevious = true;
//             console.log(`Found previous CSV file at: ${previousCsvFilePath}`);
//             break;
//         }
//     }

//     if (!foundPrevious) {
//         console.log('No previous CSV file found within the last 7 days.');
//     }





//     const testSuite = path.basename(testResult.testFilePath);
//     let newRows = [];

//     testResult.testResults.forEach(result => {
//       const ancestorTitle = this._escapeCSV(result.ancestorTitles.join(' > '));
//       const testCase = this._escapeCSV(result.title).replace(/"/g, '');
//       const status = result.status;
//       const durationInSeconds = result.duration != null ? (result.duration / 1000).toFixed(3) : 'N/A';
//       let durationComparison = 'N/A';
//       const normalizedKey = this.normalizeKey(testCase);
//       console.log(`Checking if ${normalizedKey} exists in previous data: `, previousData.hasOwnProperty(normalizedKey));

//       if (previousData.hasOwnProperty(normalizedKey)) {
//         const previousDuration = previousData[normalizedKey];
//         durationComparison = this._compareDurations(durationInSeconds, previousDuration);
//       } else {
//         console.log(`No previous data found for ${normalizedKey}`);
//       }

//       const newRow = `${ancestorTitle},${testSuite},${testCase},${status},${durationInSeconds},${currentDate},${durationComparison}`;
//       newRows.push(newRow);
//     });

//     if (fs.existsSync(currentCsvFilePath)) {
//       const currentContent = fs.readFileSync(currentCsvFilePath, 'utf8');
//       const existingRows = currentContent.split('\n').slice(1); 
//       const existingData = existingRows.map(row => row.split(',')[2]); 

//       newRows = newRows.filter(newRow => {
//         const testCase = newRow.split(',')[2];
//         return !existingData.includes(testCase);
//       });

//       fs.appendFileSync(currentCsvFilePath, newRows.join('\n') + '\n', 'utf8');
//     } else {
//       fs.writeFileSync(currentCsvFilePath, 'Title,Test Suite,Test Case,Status,Duration (s),Date,Duration Comparison\n' + newRows.join('\n') + '\n', 'utf8');
//     }

//     console.log(`CSV file updated successfully at: ${currentCsvFilePath}`);
//   }

//   _escapeCSV(value) {
//     if (value.includes(',')) {
//       return `"${value.replace(/"/g, '""')}"`;
//     }
//     return value;
//   }
// }

// module.exports = CustomReporter;









const fs = require('fs');
const path = require('path');

class CustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }
  _getCsvFilePathCurrent(date) {
    return path.join(__dirname, 'test-report', `test-report-${date}.csv`);
  }

  _getCsvFilePath() {  
    return path.join(__dirname, 'test-report', `custom-file.csv`);
  }

  _setupCSVFile(filePath) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, 'Title,Test Suite,Test Case,Status,Duration (s),Date,Duration Comparison\n', 'utf8');
    }
  }

  _compareDurations(currentDuration, previousDuration) {
    console.log("current and previous duration", currentDuration, previousDuration);
    if (previousDuration === 'N/A' || currentDuration === 'N/A') {
      return 'N/A';
    }

    const current = parseFloat(currentDuration);
    const previous = parseFloat(previousDuration);

    if (current > previous) {
      return 'Higher';
    } else if (current < previous) {
      return 'Lower';
    } else {
      return 'Same';
    }
  }

  _parseCSVContent(csvContent) {
    console.log("Parsing CSV Content: \n", csvContent);
    const rows = csvContent.trim().split('\n');
    const data = {};
    rows.forEach((row, index) => {
      if (index === 0) return; // Skip the header row
      const cols = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
      if (cols && cols.length > 5) {
        const testCase = this.normalizeKey(cols[2].replace(/(^"|"$)/g, '')); // Remove quotes from the test case name
        const duration = cols[4].replace(/(^"|"$)/g, ''); // Remove quotes from the duration
        data[testCase] = duration;
      }
    });
    console.log("Parsed Data: ", data);
    return data;
  }

  normalizeKey(key) {
    return key.trim().toLowerCase().replace(/"/g, '');
  }

  onTestResult(test, testResult, aggregatedResult) {
    // const currentDate = new Date().toISOString().split('T')[0];
    // const previousDate = new Date(Date.now() - 864e5).toISOString().split('T')[0]; // Previous day
    // const currentCsvFilePath = this._getCsvFilePath(currentDate);
    // const previousCsvFilePath = this._getCsvFilePath(previousDate);

    // this._setupCSVFile(currentCsvFilePath);

    // let previousData = {};
    // if (fs.existsSync(previousCsvFilePath)) {
    //   const previousContent = fs.readFileSync(previousCsvFilePath, 'utf8');
    //   previousData = this._parseCSVContent(previousContent);
    // } else {
    //   console.log(`Previous CSV file not found at: ${previousCsvFilePath}`);
    // }


    const currentDate = new Date().toISOString().split('T')[0];
    const currentCsvFilePath = this._getCsvFilePathCurrent(currentDate);

    this._setupCSVFile(currentCsvFilePath);

    let previousData = {};
    let foundPrevious = false;
    const maxDaysBack = 7; // Define how many days back you want to search

    // for (let i = 1; i <= maxDaysBack; i++) {
        // const previousDate = new Date(Date.now() - i * 864e5).toISOString().split('T')[0]; // Calculate previous date
        const previousCsvFilePath = this._getCsvFilePath();

        if (fs.existsSync(previousCsvFilePath)) {
            const previousContent = fs.readFileSync(previousCsvFilePath, 'utf8');
            previousData = this._parseCSVContent(previousContent);
            foundPrevious = true;
            console.log(`Found previous CSV file at: ${previousCsvFilePath}`);
            // break;
        }
    // }

    if (!foundPrevious) {
        console.log('No previous CSV file found within the last 7 days.');
    }





    const testSuite = path.basename(testResult.testFilePath);
    let newRows = [];

    testResult.testResults.forEach(result => {
      const ancestorTitle = this._escapeCSV(result.ancestorTitles.join(' > '));
      const testCase = this._escapeCSV(result.title).replace(/"/g, '');
      const status = result.status;
      const durationInSeconds = result.duration != null ? (result.duration / 1000).toFixed(3) : 'N/A';
      let durationComparison = 'N/A';
      const normalizedKey = this.normalizeKey(testCase);
      console.log(`Checking if ${normalizedKey} exists in previous data: `, previousData.hasOwnProperty(normalizedKey));

      if (previousData.hasOwnProperty(normalizedKey)) {
        const previousDuration = previousData[normalizedKey];
        durationComparison = this._compareDurations(durationInSeconds, previousDuration);
      } else {
        console.log(`No previous data found for ${normalizedKey}`);
      }

      const newRow = `${ancestorTitle},${testSuite},${testCase},${status},${durationInSeconds},${currentDate},${durationComparison}`;
      newRows.push(newRow);
    });

    if (fs.existsSync(currentCsvFilePath)) {
      const currentContent = fs.readFileSync(currentCsvFilePath, 'utf8');
      const existingRows = currentContent.split('\n').slice(1); // Exclude the header row
      const existingData = existingRows.map(row => row.split(',')[2]); // Extract test case names

      newRows = newRows.filter(newRow => {
        const testCase = newRow.split(',')[2];
        return !existingData.includes(testCase);
      });

      fs.appendFileSync(currentCsvFilePath, newRows.join('\n') + '\n', 'utf8');
    } else {
      fs.writeFileSync(currentCsvFilePath, 'Title,Test Suite,Test Case,Status,Duration (s),Date,Duration Comparison\n' + newRows.join('\n') + '\n', 'utf8');
    }

    console.log(`CSV file updated successfully at: ${currentCsvFilePath}`);
  }

  _escapeCSV(value) {
    if (value.includes(',')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }
}

module.exports = CustomReporter;


