
const generateCorrectPerentage=(value)=>
{
  const percentageValue=parseInt(value.slice(0,1))
  if (percentageValue<1) {
    return "<1%"
  }
  return value
}
export const generateIUCNData = (data) => {
  try {
    let array = [];
    data.map((item) => {
      return array.push([
        item.indiaChecklistCommonName +
          "\n" +
          item.indiaChecklistScientificName,
        item.region,
        generateCorrectPerentage(item.percentage),
      ]);
    });
    return array;
  } catch {
    return [["Some Error Occured"]];
  }
};
export const generateEndemicData = (data) => {
  try {
    let array = [];
    data.map((item) => {
      return array.push([
        item.indiaChecklistCommonName +
          "\n" +
          item.indiaChecklistScientificName,
        item.region,
        generateCorrectPerentage(item.percentage),
      ]);
    });
    return array;
  } catch {
    return [["Some Error Occured"]];
  }
};
export const generateWaterBirdCongregationData = (data) => {
  try {
    let array = [];
    data.map((item) => {
      return array.push([
        item.indiaChecklistCommonName +
          "\n" +
          item.indiaChecklistScientificName,
        item.highestCongregation+" ("+item.maxObservationCount+"%)",
        item.onePercentBiographicPopulation,
      ]);
    });
    return array;
  } catch {
    return [["Some Error Occured"]];
  }
};

export const generateObservationList=(data)=>{
  try {
    let array = [];
    data?.numberOfObservations&& array.push(["Number of Observations",data.numberOfObservations])
    data?.numberOfList&& array.push(["Number of Lists",data.numberOfList])
    data?.numberOfUniqueLists&& array.push(["Number of Unique Lists",data.numberOfUniqueLists])
    data?.totalNumberOfHours&& array.push(["Number of Hours of Birding",data.totalNumberOfHours])
    data?.totalNumberOfObservers&&  array.push(["Number of Observers",data.totalNumberOfObservers])
    return array;
  } catch {
    return [["Some Error Occured"]];
  }
}
export const generateCompleteListOfSpeciesData = (data) => {
  try {
    let array = [];
    data.map((item) => {
      return array.push([
        item.indiaChecklistCommonName +
          "\n" +
          item.indiaChecklistScientificName,
        item.soibConcernStatus,
        item.iucnCategory,
        item.endemicRegion,
        item.wpaSchedule,
      ]);
    });
    return array;
  } catch {
    return [["Some Error Occured"]];
  }
};
export const removeSpace = (previousTableYAxis) => {
  return previousTableYAxis;
};
export const addPageIfLessSpaceLeft = (previousTableYAxis, useCase) => {
  if ((useCase = "createMargin")) {
    if (previousTableYAxis > 225) {
      return 40;
    } else {
      return null;
    }
  }
  if (previousTableYAxis > 225) {
    return true;
  }
  return false;
};
export const generateHotspotData = (data) => {
  try {
    let array = [];
    if (data.length < 1) {
      array.push(["No Data Available"]);
    }
    data.map((item, index) => {
      return array.push([item.locality, item.count]);
    });
    return array;
  } catch {
    return [["Some Error Occured"]];
  }
};

export const isHeadingRequired = (
  start,
  end,
  color,
  header,
  headings,
  headerRequiredOnPageNumber
) => {
  if (start === end) {
    return [];
  } else {
    for (let i = start + 1; i <= end; i++) {
      headerRequiredOnPageNumber.push({
        page: i,
        header: header,
        headings: headings,
        color: color,
      });
    }
  }
};
const monthNames = [
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
export const formattedDate = () => {
  const today = new Date();
  return (
    today.getDate() +
    " " +
    monthNames[today.getMonth()] +
    " " +
    today.getFullYear()
  );
};
export const generateCustomFirstCellWithScientificName = (
  data,
  pdf,
  rowColors
) => {
  if (
    data.section === "body" &&
    data.column.index === 0 &&
    data.cell.text.length > 1
  ) {
    const { row } = data;
    const fillColor = rowColors[row.index % 2];
    if (fillColor && row.section !== "head") {
      pdf.setFillColor(fillColor);
    }
    pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, "F");
    pdf.text(data.cell.text[0], data.cell.x + 3, data.cell.y + 7);

    pdf.setFont("helvetica", "italic");
    pdf.text(data.cell.text[1], data.cell.x + 3, data.cell.y + 11);
    pdf.setFont("helvetica", "normal");
  }
};
