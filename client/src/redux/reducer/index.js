const initState = {
  getListOfStates: [],
  getListOfDistrict: [],
  getListOfCounty: [],
  getCountByScientificName: {},
  getDataForIucnRedListTable: [],
  getDataForEndemicSpeciesTable: [],
  getSeasonalChartData: [],
  getHotspotAreas: [],
  completeListOfSpecies: [],
  getDataForWaterbirdCongregation: [],
  getEffortDetails: {},
  completeListOfSpeciesFetchSuccess: false,
  // getDataForIucnRedListTableThroughJsonFile: [],
  // getDataForEndemicSpeciesTableThroughJsonFile: [],
  // getMostCommonSpeciesDataThroughJsonFile: [],
  // getSeasonalChartDataThroughJsonFile: [],
};
export const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_STATES_DATA":
      return { ...state, getListOfStates: action?.payload };
    case "GET_DISTRICT_DATA":
      return { ...state, getListOfDistrict: action?.payload };
    case "GET_COUNTY_DATA":
      return { ...state, getListOfCounty: action?.payload };
    case "GET_COUNT_BY_SCIENTIFIC_NAME":
      return { ...state, getCountByScientificName: action?.payload };
    case "GET_DATA_FOR_IUCN_REDLIST_TABLE":
      return { ...state, getDataForIucnRedListTable: action?.payload };
    case "GET_DATA_FOR_ENDEMIC_SPECIES_TABLE":
      return { ...state, getDataForEndemicSpeciesTable: action?.payload };
    case "GET_MOST_COMMON_SPECIES_DATA":
      return { ...state, getMostCommonSpeciesData: action?.payload };
    case "GET_SEASONAL_CHAT_DATA":
      return { ...state, getSeasonalChartData: action?.payload };
    case "GET_HOTSPOT_AREAS":
      return { ...state, getHotspotAreas: action?.payload };
    case "GET_COMPLETE_LIST_OF_SPECIES":
      return {
        ...state,
        completeListOfSpecies: action?.payload,
        completeListOfSpeciesFetchSuccess: true,
      };
    case "GET_WATERBIRD_CONGREGATION_DATA":
      return { ...state, getDataForWaterbirdCongregation: action?.payload };
    case "GET_ALL_EFFORT_DETAILS":
      return { ...state, getEffortDetails: action?.payload };
    case "RESET_DATA":
      return {
        ...state,
        getCountByScientificName: {},
        getDataForIucnRedListTable: [],
        getDataForEndemicSpeciesTable: [],
        getSeasonalChartData: [],
        getHotspotAreas: [],
        completeListOfSpecies: [],
        getDataForWaterbirdCongregation: [],
        getEffortDetails: [],
        completeListOfSpeciesFetchSuccess: false,
      };
    default:
      return state;
  }
};
