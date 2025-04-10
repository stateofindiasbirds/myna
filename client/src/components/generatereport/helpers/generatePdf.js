import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import Logo from "../../../assets/images/logo.png";
import Myna from "../../../assets/images/myna.png";
import dayjs from "dayjs";
import "../../../assets/fonts/GandhiFont-bold.js";
import "../../../assets/fonts/GandhiSans-Regular-normal orig.js";

import {
  removeSpace,
  generateCompleteListOfSpeciesData,
  generateEndemicData,
  generateIUCNData,
  generateSOIBData,
  generateWaterBirdCongregationData,
  addPageIfLessSpaceLeft,
  generateHotspotData,
  isHeadingRequired,
  generateCustomFirstCellWithScientificName,
  generateObservationList,
  createHyperlinkForYear,
  createHyperlinkForYearSoib
  // genrateSoibConcernStatus
} from "./generateReportTableData";
// import { data } from "autoprefixer";
import { generateFirstPage } from "./generateFirstPage";
export const handleDownloadPdf = async (
  PrintScreen,
  otherScreen,
  chartRef,
  heatmapRef,
  mostCommonSpeciesDiv,
  seasonalChartDiv,
  header,
  footer,
  getDataForIucnRedListTable,
  getDataForEndemicSpeciesTable,
  getDataForWaterbirdCongregation,
  completeListOfSpecies,
  selectedState,
  selectedCounty,
  getHotspotAreas,
  setPdfDownloadStatus,
  setChangeLayoutForReport,
  reportName,
  formattedDate,
  Group86,
  Group_26,
  Layer_1,
  Layer_2,
  whiteLogo,
  India,
  NT_Logo,
  EN_Logo,
  CR_Logo,
  VU_Logo,
  indiaEndemicCount,
  scheduleICount,
  soibHighPriorityCount,
  iucnRedListCount,
  migrateCount,
  totalCount,
  cmsAppendixSpecies,
  citesAppendixSpecies,
  soibConservationConcernSpecies,
  NT_Count,
  VU_Count,
  EN_Count,
  CR_Count,
  effortDetails,
  getSoibConcernStatus,
  startDate,
  endDate,
  getSeasonalChartData,

) => {
  const shouldDrawTable = (data) => {
    return data.length > 0 ? true : false;
  };
  let tableStartPage = 0;
  let tableEndPage = 0;
  let backgroundColorForHeading = [];
  let headerRequiredOnPageNumber = [];
  const rowColors = ["#F3EDE8", "#C8D8DC"];
  setPdfDownloadStatus("Creating Layout..");
  const pdf = new jsPDF({ format: "a4" });
  // capturing multiple images
  const captureCanvas = async (ref) => {
    if (!ref?.current) {
      console.warn("Skipping capture: Element not found.");
      return null;
    }
    return await html2canvas(ref.current, {
      windowWidth: 1600,
      useCORS: true,
    });
  };
  setPdfDownloadStatus("Gathering Data...");
const canvas2 = await captureCanvas(otherScreen);
const canvas5 = await captureCanvas(chartRef);
const canvas7 = await captureCanvas(heatmapRef);

  // setPdfDownloadStatus("Gathering Data...");
  // const canvas2 = await html2canvas(otherScreen?.current, {
  //   windowWidth: 1600,
  //   useCORS: true,
  //   // proxy: "server.js",
  // });
  
  // setPdfDownloadStatus("Gathering Data...");
  // const canvas5 = await html2canvas(chartRef?.current, {
  //   windowWidth: 1600,
  //   useCORS: true,
  //   // proxy: "server.js",
  // });

  // setPdfDownloadStatus("Gathering Data...");
  // const canvas7 = await html2canvas(heatmapRef?.current, {
  //   windowWidth: 1600,
  //   useCORS: true,
  //   // proxy: "server.js",
  // });
 


  setPdfDownloadStatus("Creating Tables...");
  const canvas3 = await html2canvas(mostCommonSpeciesDiv.current, {
    windowWidth: 2000,
    useCORS: true,
  });
  setPdfDownloadStatus("Writing Images...");
  const canvas4 = await html2canvas(seasonalChartDiv.current, {
    windowWidth: 2000,
    useCORS: true,
  });
  setPdfDownloadStatus("Almost Done...");
  setPdfDownloadStatus("Please wait...");
  const canvas6 = await html2canvas(footer.current, {
    windowWidth: 1300,
    useCORS: true,
  });
  // Generating data for various tables
  const iucnData = generateIUCNData(getDataForIucnRedListTable);

  const soibData = generateSOIBData(getSoibConcernStatus);
  // const soibConcernData = genrateSoibConcernStatus(getSoibConcernStatus);
  const endemicData = generateEndemicData(getDataForEndemicSpeciesTable);
  const waterBirdCongregationsData = generateWaterBirdCongregationData(
    getDataForWaterbirdCongregation
  );
  const completeListOfSpeciesData = generateCompleteListOfSpeciesData(
    completeListOfSpecies
  );

  const hotspotList = generateHotspotData(getHotspotAreas);
  const observationsList = generateObservationList(effortDetails);
  //writing first page with basic details to pdf in image format
  const pdfWidth = pdf.internal.pageSize.getWidth();
  generateFirstPage(
    pdf,
    Group86,
    Group_26,
    Layer_1,
    Layer_2,
    whiteLogo,
    India,
    NT_Logo,
    EN_Logo,
    CR_Logo,
    VU_Logo,
    indiaEndemicCount,
    scheduleICount,
    soibHighPriorityCount,
    iucnRedListCount,
    migrateCount,
    totalCount,
    cmsAppendixSpecies,
    citesAppendixSpecies,
    soibConservationConcernSpecies,
    NT_Count,
    VU_Count,
    EN_Count,
    CR_Count,
  );
  //working on next page which has IUCN RED... table
  const footerImg = canvas6.toDataURL("image/png");
  const footerImgProperty = pdf.getImageProperties(footerImg);

  const footerImgHeight =
    (footerImgProperty.height * pdfWidth) / footerImgProperty.width;
  (soibData.length > 0 ||
    endemicData.length > 0 ||
    waterBirdCongregationsData > 0 || iucnData.length > 0) &&
    pdf.addPage();
  if (shouldDrawTable(soibData)) {
    pdf.autoTable({
      headStyles: {
      fillColor: [154, 114, 105],
      cellPadding: 5,
      halign: "center",
      font: "GandhiFont",
      fontStyle: "bold",
      },
      head: [["SOIB HIGH CONSERVATION PRIORITY SPECIES"]],
      margin: { top: 30 },
      body: [],
      startY: 40,
      font: "GandhiSans-Regular",
      fontStyle: "normal",
      rowPageBreak: "avoid",
    });
    // defining header image data
    //second table
    //tableStartPage and tableEndPage is repeated at start and end of table to know pagenumber on which repeater table title is required
    tableStartPage = pdf.internal.getNumberOfPages();
    pdf.autoTable({
      margin: { top: 0 },
      body: soibData,
      headStyles: {
        fillColor: [232, 232, 232],
        textColor: [54, 54, 54],
        font: "GandhiFont",
        fontStyle: "bold",
      },
      head: [["Species",  "Frequency of Reporting", "Year of Latest Report"]],
      styles: {
        cellPadding: 4, // Set padding for all cells
        font: "GandhiSans-Regular",
        fontStyle: "normal",
      },
      rowPageBreak: "avoid",
      startY: removeSpace(pdf.previousAutoTable.finalY),
      didParseCell: function (data) {
        data.cell.styles.fontStyle = "bold";
        const { row } = data;
        const fillColor = rowColors[row.index % 2];
        if (fillColor && row.section !== "head") {
          data.cell.styles.fillColor = fillColor;
        }
        const doesExist = backgroundColorForHeading.find(
          (item) => item.pageNo === data.doc.internal.getNumberOfPages()
        );
        if (doesExist) {
          const foundIndex = backgroundColorForHeading.indexOf(doesExist);
          backgroundColorForHeading.splice(foundIndex, 1, {
            color: fillColor,
            pageNo: data.doc.internal.getNumberOfPages(),
          });
          return;
        }
        backgroundColorForHeading.push({
          color: fillColor,
          pageNo: data.doc.internal.getNumberOfPages(),
        });
      },
      didDrawCell: (data) => {
        generateCustomFirstCellWithScientificName(data, pdf, rowColors);
        createHyperlinkForYearSoib(pdf,data,rowColors)
      },
      didDrawPage: function (data) {
        data.settings.margin.top = 54;
      },
    });
    tableEndPage = pdf.internal.getNumberOfPages();
    isHeadingRequired(
      tableStartPage,
      tableEndPage,
      backgroundColorForHeading,
      ["SOIB HIGH CONSERVATION PRIORITY SPECIES"],
      ["Species", "Frequency of Reporting", "Year of Latest Report"],
      headerRequiredOnPageNumber
    );
    addPageIfLessSpaceLeft(pdf.previousAutoTable.finalY) && pdf.addPage();
  }

  if (shouldDrawTable(iucnData)) {
    pdf.autoTable({
      headStyles: {
        fillColor: [154, 114, 105],
        cellPadding: 5,
        halign: "center",
        font: "GandhiFont",
        fontStyle: "bold",
      },
      head: [["IUCN RED LIST SPECIES"]],
      body: [],
      startY: addPageIfLessSpaceLeft(
        pdf.previousAutoTable.finalY,
        "createMargin"
      ),
      font: "GandhiSans-Regular",
      fontStyle: "normal",
      rowPageBreak: "avoid",
    });
   
    tableStartPage = pdf.internal.getNumberOfPages();
    pdf.autoTable({
      body: iucnData,
      headStyles: {
        fillColor: [232, 232, 232],
        textColor: [54, 54, 54],
        font: "GandhiFont",
        fontStyle: "bold",
      },
      head: [["Species", "IUCN Status", "Frequency of Reporting", "Year of Latest Report"]],
      styles: {
        cellPadding: 4, // Set padding for all cells
        font: "GandhiSans-Regular",
        fontStyle: "normal",
      },
      rowPageBreak: "avoid",
      startY: removeSpace(pdf.previousAutoTable.finalY),
      didParseCell: function (data) {
        data.cell.styles.fontStyle = "bold";
        const { row } = data;
        const fillColor = rowColors[row.index % 2];
        if (fillColor && row.section !== "head") {
          data.cell.styles.fillColor = fillColor;
        }
        const doesExist = backgroundColorForHeading.find(
          (item) => item.pageNo === data.doc.internal.getNumberOfPages()
        );
        if (doesExist) {
          const foundIndex = backgroundColorForHeading.indexOf(doesExist);
          backgroundColorForHeading.splice(foundIndex, 1, {
            color: fillColor,
            pageNo: data.doc.internal.getNumberOfPages(),
          });
          return;
        }
        backgroundColorForHeading.push({
          color: fillColor,
          pageNo: data.doc.internal.getNumberOfPages(),
        });
      },
      // didDrawCell: (data) => {
      //   generateCustomFirstCellWithScientificName(data, pdf, rowColors);
      // },
      didDrawCell: (data) => {
        generateCustomFirstCellWithScientificName(data, pdf, rowColors);
        createHyperlinkForYear(pdf,data,rowColors)
      },
     
      didDrawPage: function (data) {
        data.settings.margin.top = 54;
      },
    });
    tableEndPage = pdf.internal.getNumberOfPages();
    isHeadingRequired(
      tableStartPage,
      tableEndPage,
      backgroundColorForHeading,
      ["IUCN RED LIST SPECIES"],
      ["Species", "IUCN Status", "Frequency of Reporting", "Year of Latest Report"],
      headerRequiredOnPageNumber
    );
    addPageIfLessSpaceLeft(pdf.previousAutoTable.finalY) && pdf.addPage();
  }
  if (shouldDrawTable(endemicData)) {
    pdf.autoTable({
      headStyles: {
        fillColor: [154, 114, 105],
        cellpadding: 4,
        halign: "center",
        cellPadding: 5,
        font: "GandhiFont",
        fontStyle: "bold",
      },
      head: [["ENDEMIC SPECIES"]],
      body: [],
      font: "GandhiSans-Regular",
      fontStyle: "normal",
      rowPageBreak: "avoid",
      startY: addPageIfLessSpaceLeft(
        pdf.previousAutoTable.finalY,
        "createMargin"
      ),
    });
    tableStartPage = pdf.internal.getNumberOfPages();
    pdf.autoTable({
      body: endemicData,
      headStyles: {
        fillColor: [232, 232, 232],
        textColor: [54, 54, 54],
        font: "GandhiFont",
        fontStyle: "bold",
      },
      head: [["Species", "Endemic Region", "Frequency of Reporting", "Year of Latest Report"]],
      styles: {
        cellPadding: 4, // Set padding for all cells
        font: "GandhiSans-Regular",
        fontStyle: "normal",
      },
      rowPageBreak: "avoid",
      startY: removeSpace(pdf.previousAutoTable.finalY),
      didParseCell: function (data) {
        const { row } = data;
        const fillColor = rowColors[row.index % 2];
        if (fillColor && row.section !== "head") {
          data.cell.styles.fillColor = fillColor;
        }
        const doesExist = backgroundColorForHeading.find(
          (item) => item.pageNo === data.doc.internal.getNumberOfPages()
        );
        if (doesExist) {
          const foundIndex = backgroundColorForHeading.indexOf(doesExist);
          backgroundColorForHeading.splice(foundIndex, 1, {
            color: fillColor,
            pageNo: data.doc.internal.getNumberOfPages(),
          });
          return;
        }
        backgroundColorForHeading.push({
          color: fillColor,
          pageNo: data.doc.internal.getNumberOfPages(),
        });
      },
      alternateRowStyles: {
        fillColor: [200, 216, 220], // Light gray
      },
      didDrawPage: function (data) {
        data.settings.margin.top = 54;
      },
      didDrawCell: (data) => {
        generateCustomFirstCellWithScientificName(data, pdf, rowColors);
        createHyperlinkForYear(pdf,data,rowColors)
      },
    });
    tableEndPage = pdf.internal.getNumberOfPages();
    isHeadingRequired(
      tableStartPage,
      tableEndPage,
      backgroundColorForHeading,
      ["ENDEMIC SPECIES"],
      ["Species", "Endemic Region", "Frequency of Reporting", "Year of Latest Report"],
      headerRequiredOnPageNumber
    );
    addPageIfLessSpaceLeft(pdf.previousAutoTable.finalY) && pdf.addPage();
  }
  if (shouldDrawTable(waterBirdCongregationsData)) {
    pdf.autoTable({
      headStyles: {
        fillColor: [154, 114, 105],
        cellpadding: 4,
        halign: "center",
        cellPadding: 5,
        font: "GandhiFont",
        fontStyle: "bold",
      },
      head: [["WATERBIRD CONGREGATIONS"]],
      body: [],
      font: "GandhiSans-Regular",
      fontStyle: "normal",
      rowPageBreak: "avoid",
      startY: addPageIfLessSpaceLeft(
        pdf.previousAutoTable.finalY,
        "createMargin"
      ),
    });
    tableStartPage = pdf.internal.getNumberOfPages();
    pdf.autoTable({
      headStyles: {
        fillColor: [232, 232, 232],
        textColor: [54, 54, 54],
        font: "GandhiFont",
        fontStyle: "bold",
      },
      head: [["Species", "Highest Count", "1% of Biogeographic Population","Year of Report"]],
      body: waterBirdCongregationsData,
      rowPageBreak: "avoid",
      startY: removeSpace(pdf.previousAutoTable.finalY),
      styles: {
        cellPadding: 4, // Set padding for all cells
        font: "GandhiSans-Regular",
        fontStyle: "normal",
      },
      didParseCell: function (data) {
        const { row } = data;
        const fillColor = rowColors[row.index % 2];
        if (fillColor && row.section !== "head") {
          data.cell.styles.fillColor = fillColor;
        }
        const doesExist = backgroundColorForHeading.find(
          (item) => item.pageNo === data.doc.internal.getNumberOfPages()
        );
        if (doesExist) {
          const foundIndex = backgroundColorForHeading.indexOf(doesExist);
          backgroundColorForHeading.splice(foundIndex, 1, {
            color: fillColor,
            pageNo: data.doc.internal.getNumberOfPages(),
          });
          return;
        }
        backgroundColorForHeading.push({
          color: fillColor,
          pageNo: data.doc.internal.getNumberOfPages(),
        });
      },

      didDrawPage: function (data) {
        data.settings.margin.top = 54;
      },
      didDrawCell: (data) => {
        generateCustomFirstCellWithScientificName(data, pdf, rowColors);
        createHyperlinkForYear(pdf,data,rowColors)
      },
    });
    tableEndPage = pdf.internal.getNumberOfPages();
    isHeadingRequired(
      tableStartPage,
      tableEndPage,
      backgroundColorForHeading,
      ["WATERBIRD CONGREGATIONS"],
      ["Species", "Highest Count", "1% of Biogeographic Population"],
      headerRequiredOnPageNumber
    );
  }
  (!shouldDrawTable(waterBirdCongregationsData) && !addPageIfLessSpaceLeft(pdf.previousAutoTable.finalY)) && pdf.addPage();
  shouldDrawTable(waterBirdCongregationsData) && pdf.addPage();

  const mostCommonSpeciesImg = canvas3.toDataURL("image/png");
  const mostCommonSpeciesImgProperty =
    pdf.getImageProperties(mostCommonSpeciesImg);
  const mostCommonSpeciesHeight =
    (mostCommonSpeciesImgProperty.height * pdfWidth) /
    mostCommonSpeciesImgProperty.width;
  pdf.addImage(
    mostCommonSpeciesImg,
    "PNG",
    0,
    40,
    pdfWidth,
    mostCommonSpeciesHeight,
    "one",
    "fast"
  );

  pdf.addPage()

  const sesonalChartImg = canvas4.toDataURL("image/png");
  const seasonalChartImgProperties = pdf.getImageProperties(sesonalChartImg);
  const seasonalChartHeight =
    (seasonalChartImgProperties.height * pdfWidth) /
    seasonalChartImgProperties.width;
  pdf.addImage(
    sesonalChartImg,
    "PNG",
    0,
    40,
    pdfWidth,
    seasonalChartHeight,
    "two",
    "fast"
  );
  { canvas2 && getSeasonalChartData?.length && pdf.addPage(); }
    const secondImg = canvas2.toDataURL("image/png");
    const hotspotImageProperties = pdf.getImageProperties(secondImg);
    const hotspotImageHeight =
      (hotspotImageProperties.height * 100) / hotspotImageProperties.width;
     pdf.addImage(
      secondImg,
      "PNG",
      15,
      40,
      100,
      hotspotImageHeight,
      "three",
      "fast"
    );
    let isShiftingRequiredafterHotspot = false;
    if (hotspotList?.length > 3) {
      isShiftingRequiredafterHotspot = true;
    }
    pdf.setFillColor("#000000");
  
     pdf.autoTable({
      body: hotspotList,
      headStyles: {
        fillColor: [154, 114, 105],
        cellpadding: 4,
        textColor: [255, 255, 255],
        font: "GandhiFont",
        fontStyle: "bold",
      },
      head: [["Top Hotspots", "No of Species"]],
      styles: {
        cellPadding: 3, // Set padding for all cells
        font: "GandhiSans-Regular",
        fontStyle: "normal",
      },
      rowPageBreak: "avoid",
      startY: 40,
      // startY: 60,
      margin: { left: 116 },
      didParseCell: function (data) {
        const { row } = data;
        if (row.section !== "head") {
          const fillColor = rowColors[row.index % 2];
          if (fillColor && row.section !== "head") {
            data.cell.styles.fillColor = fillColor;
          }
        }
      },
    });
  


    pdf.addPage();
    // console.log("canvas5",canvas5)
    const seventhImg = canvas7.toDataURL("image/png");
    const fifthImage = canvas5?.toDataURL("image/png");
    // console.log("fifthImage",fifthImage);

    if(seventhImg && seventhImg.startsWith("data:image/png")){ 
      // console.log("seventhImg",seventhImg)
      const heatmapImageProperties = pdf.getImageProperties(seventhImg);
      const pageWidthHmap = pdf.internal.pageSize.getWidth();
      const imgWidthHmap = 280; // Fixed width (you can modify this)
      const xPosHmap = (pageWidthHmap - imgWidthHmap) / 2; // Center horizontally
      const mapYPosition = fifthImage?.startsWith("data:image/png") ?  185 : 40; // Starting position of the heatmap image
      // const nextStartPosition = 40 + hotspotImageHeight + 20; 

      const heatmapImageHeight =
        (heatmapImageProperties.height * imgWidthHmap) / heatmapImageProperties.width;
        const heatmapEndY = mapYPosition + heatmapImageHeight;
        const marginBelowSeventhImg = 10; // Adjust this value as needed
        const yPos = heatmapEndY + marginBelowSeventhImg; // Place secondImg2 after seventhImg with margin
        
        pdf.addImage(
          seventhImg,
          "PNG",
          xPosHmap,
          mapYPosition,
          imgWidthHmap,
          heatmapImageHeight,
          "seven",
          "fast"
        );
      }
      
      
      if(canvas5){
        const secondImg2 = canvas5.toDataURL("image/png");
          // console.log(secondImg2,"secondImg2")
          if (secondImg2 && secondImg2.startsWith("data:image/png")) {
            const hotspotImageProp = pdf.getImageProperties(secondImg2);
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const imgAspectRatio = hotspotImageProp.width / hotspotImageProp.height;
            let imgWidth = pageWidth + 60 ;
            let imgHeight = imgWidth / imgAspectRatio;

            if (imgHeight > pageHeight - 80) {
              imgHeight = pageHeight - 80;
              imgWidth = imgHeight * imgAspectRatio;
            }

            const xPos = (pageWidth - imgWidth) / 2;
            const yPos = 33;

            pdf.addImage(
              secondImg2,
              "PNG",
              xPos,
              yPos,
              imgWidth,
              imgHeight,
              "five",
              "fast"
            );
        }
      }
      // pdf.addPage();


  pdf.addPage();
  if (shouldDrawTable(completeListOfSpeciesData)) {
    pdf.autoTable({
      headStyles: {
        fillColor: [154, 114, 105],
        cellpadding: 4,
        halign: "center",
        cellPadding: 5,
        font: "GandhiFont",
        fontStyle: "bold",
      },
      head: [["COMPLETE LIST OF SPECIES"]],
      body: [],
      font: "GandhiSans-Regular",
      margin: { top: 0},
      fontStyle: "normal",
      rowPageBreak: "avoid",
      startY:40,
    });
      tableStartPage = pdf.internal.getNumberOfPages();
      pdf.autoTable({
        body: completeListOfSpeciesData,
        headStyles: {
          fillColor: [232, 232, 232],
          textColor: [54, 54, 54],
          font: "GandhiFont",
          fontStyle: "bold",
        },
        head: [["Species", "SoIB Priority", "IUCN", "Endemic Region", "WLPA"]],
        styles: {
          cellPadding: 3, // Set padding for all cells
          font: "GandhiSans-Regular",
          fontStyle: "normal",
        },
        rowPageBreak: "avoid",
        startY: removeSpace(pdf.previousAutoTable.finalY),
        alternateRowStyles: {
          fillColor: [200, 216, 220], // Light gray
        },
        didParseCell: function (data) {
          const { row } = data;
          const fillColor = rowColors[row.index % 2];
          if (fillColor && row.section !== "head") {
            data.cell.styles.fillColor = fillColor;
          }
        const doesExist = backgroundColorForHeading.find(
          (item) => item.pageNo === data.doc.internal.getNumberOfPages()
        );
        if (doesExist) {
          const foundIndex = backgroundColorForHeading.indexOf(doesExist);
          backgroundColorForHeading.splice(foundIndex, 1, {
            color: fillColor,
            pageNo: data.doc.internal.getNumberOfPages(),
          });
          return;
        }
        backgroundColorForHeading.push({
          color: fillColor,
          pageNo: data.doc.internal.getNumberOfPages(),
        });
      },
      didDrawPage: function (data) {
        data.settings.margin.top = 54;
      },
      didDrawCell: (data) => {
        generateCustomFirstCellWithScientificName(data, pdf, rowColors);
      },
    });
    tableEndPage = pdf.internal.getNumberOfPages();
    isHeadingRequired(
      tableStartPage,
      tableEndPage,
      backgroundColorForHeading,
      ["COMPLETE LIST OF SPECIES"],
      ["Species", "SoIB Priority", "IUCN", "Endemic Region", "WLPA"],
      headerRequiredOnPageNumber
    );
    addPageIfLessSpaceLeft(pdf.previousAutoTable.finalY) && pdf.addPage();
  }

  if (true) {
    pdf.autoTable({
      headStyles: {
        fillColor: [154, 114, 105],
        cellpadding: 4,
        halign: "center",
        cellPadding: 5,
        font: "GandhiFont",
        fontStyle: "bold",
      },
      head: [["DATA CONTRIBUTIONS"]],
      body: [],
      font: "GandhiSans-Regular",
      fontStyle: "normal",
      rowPageBreak: "avoid",
      startY:
        completeListOfSpeciesData.length > 0
          ? addPageIfLessSpaceLeft(pdf.previousAutoTable.finalY, "createMargin")
          : 120,
      margin: { right: 40, left: 40 },
    });
    tableStartPage = pdf.internal.getNumberOfPages();
    pdf.autoTable({
      body: observationsList,
      styles: {
        cellPadding: 3,
      },
      rowPageBreak: "avoid",
      startY: removeSpace(pdf.previousAutoTable.finalY),
      alternateRowStyles: {
        fillColor: [200, 216, 220], // Light gray
        font: "GandhiSans-Regular",
        fontStyle: "normal",
      },
      margin: { left: 40, right: 40 },
      didParseCell: function (data) {
        const { row } = data;
        const fillColor = rowColors[row.index % 2];
        if (fillColor && row.section !== "head") {
          data.cell.styles.fillColor = fillColor;
        }
        const doesExist = backgroundColorForHeading.find(
          (item) => item.pageNo === data.doc.internal.getNumberOfPages()
        );
        if (doesExist) {
          const foundIndex = backgroundColorForHeading.indexOf(doesExist);
          backgroundColorForHeading.splice(foundIndex, 1, {
            color: fillColor,
            pageNo: data.doc.internal.getNumberOfPages(),
          });
          return;
        }
        backgroundColorForHeading.push({
          color: fillColor,
          pageNo: data.doc.internal.getNumberOfPages(),
          font: "GandhiSans-Regular",
          fontStyle: "normal",
        });
      },
      didDrawPage: function (data) {
        data.settings.margin.top = 54;
      },
    });
    tableEndPage = pdf.internal.getNumberOfPages();
    isHeadingRequired(
      tableStartPage,
      tableEndPage,
      backgroundColorForHeading,
      ["DATA CONTRIBUTIONS"],
      ["Species", "SoIB Priority", "IUCN", "Endemic Region", "WLPA"],
      headerRequiredOnPageNumber
    );
  }
  // drawing anything on every page
  const pageCount = pdf.internal.getNumberOfPages(); //Total Page Number
  for (let i = 0; i < pageCount; i++) {
    pdf.setPage(i);
    let pageCurrent = pdf.internal.getCurrentPageInfo().pageNumber; //Current Page
    pdf.setFillColor(218, 184, 48);
    pdf.rect(0, 0, 210, 38, "F");
    pdf.addImage(Logo, "PNG", 3, 3, 20, 16, "hederlogo", "FAST");
    pdf.setFontSize(18);
    pdf.addImage(Myna, "PNG", 3, 20, 18, 5, "myna", "fast");
    // console.log(pdf.getFontList())
    pdf.setFont('GandhiSans-Regular', 'normal')
    pdf.setFontSize(18);
    // Set the font as the default font
    pdf.setFont("GandhiFont", "bold");
    pdf.setTextColor("#ffffff");
    const pdfReportName = reportName.toUpperCase();
    pdf.text("BIRDS OF " + pdfReportName, 105, 18, "center");
    pdf.setFontSize(12);
    if (selectedState !== "") {
      pdf.text("State: " + selectedState, 70, 27, "center");
      pdf.text("District: " + selectedCounty, 140, 27, "center");
    }
    pdf.setFontSize(10);
    pdf.text("Dates: " + dayjs(startDate).format("DD/MM/YYYY") + " " + "–" + " " + dayjs(endDate).format("DD/MM/YYYY"), 183, 35, "center");
    pdf.setFontSize(12);

    pdf.setFont('GandhiSans-Regular', 'normal')
    pdf.addImage(
      footerImg,
      "PNG",
      0,
      284,
      pdfWidth,
      footerImgHeight,
      "footer",
      "fast"
    );
    pdf.setFontSize(12);
    pdf.setTextColor(255, 255, 255);
    pdf.setFillColor(218, 184, 48);
    pdf.circle(196, 291, 3, "F");
    pageCurrent < 10
      ? pdf.text(pageCurrent.toString(), 195, 292.3)
      : pdf.text(pageCurrent.toString(), 193.8, 292.3);
  }
  headerRequiredOnPageNumber.map((item) => {
    pdf.setPage(item.page);
    item.header !== "DATA CONTRIBUTIONS"
      ? pdf.autoTable({
        headStyles: {
          fillColor: [154, 114, 105],
          cellPadding: 5,
          halign: "center",
          font: "GandhiFont",
          fontStyle: "bold",
        },
        head: [item.header],
        font: "GandhiFont",
        fontStyle: "bold",
        rowPageBreak: "avoid",
        margin: { top: 30 },
        body: [],
        startY: 40,
      })
      : pdf.autoTable({
        headStyles: {
          fillColor: [154, 114, 105],
          cellPadding: 5,
          halign: "center",
          font: "GandhiFont",
          fontStyle: "bold",
        },
        head: [item.header],
        font: "GandhiFont",
        fontStyle: "bold",
        rowPageBreak: "avoid",
        margin: { top: 30, right: 40, left: 40 },
        body: [],
        startY: 40,
      });
  });
  const pdfName =
    (reportName === "" ? "MYNA Himalyan Birds" : reportName) +
    " " +
    formattedDate;
  pdf.save(pdfName);
  setPdfDownloadStatus("Completed");
  const handleClick = () => {
    setTimeout(() => {
      setPdfDownloadStatus("Download Pdf");
      setChangeLayoutForReport(false);
    }, 2000);
  };

  handleClick();
};