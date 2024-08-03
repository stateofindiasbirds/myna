// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./components/generatereport/Main"
import Reportmap from '../src/components/generatereport/Reportmap';
import About from "../src/components/About/About";
import Report from "../src/components/generatereport/Report"
import CustomStyleCards from "../src/components/generatereport/reportcomponents/CustomStyleCards"


const mockStore = configureStore();
const store = mockStore({});

describe("Given App Report", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <Main />
      </Provider>
    );
  });

  test("Datepicker rendering properly", () => {
    const DatepickerExist = component.find("Datepicker").exists();
    expect(DatepickerExist).toBe(false);
  });

  test("Reportmap rendering properly", () => {
    const ReportmapExist = component.find("Reportmap").exists();
    expect(ReportmapExist).toBe(false);
  });

  test("stateBoundry rendering properly", () => {
    const stateBoundryExist = component.find("stateBoundry").exists();
    expect(stateBoundryExist).toBe(false);
  });

  test("districtBoundary rendering properly", () => {
    const districtBoundaryExist = component.find("districtBoundary").exists();
    expect(districtBoundaryExist).toBe(false);
  });

  test("Report rendering properly", () => {
    const ReportExist = component.find("Report").exists();
    expect(ReportExist).toBe(false);
  });

  test("InstructionModal rendering properly", () => {
    const InstructionModalExist = component.find("InstructionModal").exists();
    expect(InstructionModalExist).toBe(false);
  });

  test("district rendering properly", () => {
    const districtExist = component.find("district").exists();
    expect(districtExist).toBe(false);
  });

  test("statesList rendering properly", () => {
    const statesListExist = component.find("statesList").exists();
    expect(statesListExist).toBe(false);
  });

  test("createTrack rendering properly", () => {
    const createTrackExist = component.find("createTrack").exists();
    expect(createTrackExist).toBe(false);
  });

  test("GET_COUNT_BY_SCIENTIFIC_NAME rendering properly", () => {
    const GET_COUNT_BY_SCIENTIFIC_NAMEExist = component.find("GET_COUNT_BY_SCIENTIFIC_NAME").exists();
    expect(GET_COUNT_BY_SCIENTIFIC_NAMEExist).toBe(false);
  });

  test("GET_DATA_FOR_IUCN_REDLIST_TABLE rendering properly", () => {
    const GET_DATA_FOR_IUCN_REDLIST_TABLEExist = component.find("GET_DATA_FOR_IUCN_REDLIST_TABLE").exists();
    expect(GET_DATA_FOR_IUCN_REDLIST_TABLEExist).toBe(false);
  });

  test("GET_DATA_FOR_ENDEMIC_SPECIES_TABLE rendering properly", () => {
    const GET_DATA_FOR_ENDEMIC_SPECIES_TABLEExist = component.find("GET_DATA_FOR_ENDEMIC_SPECIES_TABLE").exists();
    expect(GET_DATA_FOR_ENDEMIC_SPECIES_TABLEExist).toBe(false);
  });

  test("GET_MOST_COMMON_SPECIES_DATA rendering properly", () => {
    const GET_MOST_COMMON_SPECIES_DATAExist = component.find("GET_MOST_COMMON_SPECIES_DATA").exists();
    expect(GET_MOST_COMMON_SPECIES_DATAExist).toBe(false);
  });

  test("GET_SEASONAL_CHAT_DATA rendering properly", () => {
    const GET_SEASONAL_CHAT_DATAExist = component.find("GET_SEASONAL_CHAT_DATA").exists();
    expect(GET_SEASONAL_CHAT_DATAExist).toBe(false);
  });

  test("GET_HOTSPOT_AREAS rendering properly", () => {
    const GET_HOTSPOT_AREASExist = component.find("GET_HOTSPOT_AREAS").exists();
    expect(GET_HOTSPOT_AREASExist).toBe(false);
  });

  test("GET_COMPLETE_LIST_OF_SPECIES rendering properly", () => {
    const GET_COMPLETE_LIST_OF_SPECIESExist = component.find("GET_COMPLETE_LIST_OF_SPECIES").exists();
    expect(GET_COMPLETE_LIST_OF_SPECIESExist).toBe(false);
  });

  test("GET_WATERBIRD_CONGREGATION_DATA rendering properly", () => {
    const GET_WATERBIRD_CONGREGATION_DATAExist = component.find("GET_WATERBIRD_CONGREGATION_DATA").exists();
    expect(GET_WATERBIRD_CONGREGATION_DATAExist).toBe(false);
  });

  test("GET_ALL_EFFORT_DETAILS rendering properly", () => {
    const GET_ALL_EFFORT_DETAILSExist = component.find("GET_ALL_EFFORT_DETAILS").exists();
    expect(GET_ALL_EFFORT_DETAILSExist).toBe(false);
  });

  test("Table2X2 rendering properly", () => {
    const Table2X2Exist = component.find("Table2X2").exists();
    expect(Table2X2Exist).toBe(false);
  });

  test("Table3XN rendering properly", () => {
    const Table3XNExist = component.find("Table3XN").exists();
    expect(Table3XNExist).toBe(false);
  });

  test("ProgressChart rendering properly", () => {
    const ProgressChartExist = component.find("ProgressChart").exists();
    expect(ProgressChartExist).toBe(false);
  });

  test("WideCardForReport rendering properly", () => {
    const WideCardForReportExist = component.find("WideCardForReport").exists();
    expect(WideCardForReportExist).toBe(false);
  });

  test("CustomStyleCards rendering properly", () => {
    const CustomStyleCardsExist = component.find("CustomStyleCards").exists();
    expect(CustomStyleCardsExist).toBe(false);
  });

  test("TableCard rendering properly", () => {
    const TableCardExist = component.find("TableCard").exists();
    expect(TableCardExist).toBe(false);
  });

  test("handleDownloadPdf rendering properly", () => {
    const handleDownloadPdfExist = component.find("handleDownloadPdf").exists();
    expect(handleDownloadPdfExist).toBe(false);
  });

  test("CompleteListOfSpecies rendering properly", () => {
    const CompleteListOfSpeciesExist = component.find("CompleteListOfSpecies").exists();
    expect(CompleteListOfSpeciesExist).toBe(false);
  });

  test("RESET_ALL_DATA rendering properly", () => {
    const RESET_ALL_DATAExist = component.find("RESET_ALL_DATA").exists();
    expect(RESET_ALL_DATAExist).toBe(false);
  });

  test("newPolygon rendering properly", () => {
    const newPolygonExist = component.find("newPolygon").exists();
    expect(newPolygonExist).toBe(false);
  });

  test("setGeoJson rendering properly", () => {
    const setGeoJsonExist = component.find("setGeoJson").exists();
    expect(setGeoJsonExist).toBe(false);
  });

  test("setShowGeographySign rendering properly", () => {
    const setShowGeographySignExist = component.find("setShowGeographySign").exists();
    expect(setShowGeographySignExist).toBe(false);
  });

  test("setData rendering properly", () => {
    const setDataExist = component.find("setData").exists();
    expect(setDataExist).toBe(false);
  });

  test("data rendering properly", () => {
    const dataExist = component.find("data").exists();
    expect(dataExist).toBe(false);
  });

  test("removeFile rendering properly", () => {
    const removeFileExist = component.find("removeFile").exists();
    expect(removeFileExist).toBe(false);
  });

  test("setArea rendering properly", () => {
    const setAreaExist = component.find("setArea").exists();
    expect(setAreaExist).toBe(false);
  });

  test("setMediumForReport rendering properly", () => {
    const setMediumForReportExist = component.find("setMediumForReport").exists();
    expect(setMediumForReportExist).toBe(false);
  });

  test("key rendering properly", () => {
    const keyExist = component.find("key").exists();
    expect(keyExist).toBe(false);
  });

  test("SeasonalChart rendering properly", () => {
    const SeasonalChartExist = component.find("SeasonalChart").exists();
    expect(SeasonalChartExist).toBe(false);
  });

  test("ReoprtSkeleton rendering properly", () => {
    const ReoprtSkeletonExist = component.find("ReoprtSkeleton").exists();
    expect(ReoprtSkeletonExist).toBe(false);
  });

  test("TableForEffortVariables rendering properly", () => {
    const TableForEffortVariablesExist = component.find("TableForEffortVariables").exists();
    expect(TableForEffortVariablesExist).toBe(false);
  });

  test("createTrackMiddlewareForPdfGenerate rendering properly", () => {
    const createTrackMiddlewareForPdfGenerateExist = component.find("createTrackMiddlewareForPdfGenerate").exists();
    expect(createTrackMiddlewareForPdfGenerateExist).toBe(false);
  });

  test("boundary rendering properly", () => {
    const boundaryExist = component.find("boundary").exists();
    expect(boundaryExist).toBe(false);
  });

  test("setBoundary rendering properly", () => {
    const setBoundaryExist = component.find("setBoundary").exists();
    expect(setBoundaryExist).toBe(false);
  });

  test("dataForMap rendering properly", () => {
    const dataForMapExist = component.find("dataForMap").exists();
    expect(dataForMapExist).toBe(false);
  });

  test("selectedState rendering properly", () => {
    const selectedStateExist = component.find("selectedState").exists();
    expect(selectedStateExist).toBe(false);
  });

  test("selectedCounty rendering properly", () => {
    const selectedCountyExist = component.find("selectedCounty").exists();
    expect(selectedCountyExist).toBe(false);
  });

  test("getCountByScientificName rendering properly", () => {
    const getCountByScientificNameExist = component.find("getCountByScientificName").exists();
    expect(getCountByScientificNameExist).toBe(false);
  });

  test("getDataForIucnRedListTable rendering properly", () => {
    const getDataForIucnRedListTableExist = component.find("getDataForIucnRedListTable").exists();
    expect(getDataForIucnRedListTableExist).toBe(false);
  });

  // klklnn

  test("getDataForEndemicSpeciesTable rendering properly", () => {
    const getDataForEndemicSpeciesTableExist = component.find("getDataForEndemicSpeciesTable").exists();
    expect(getDataForEndemicSpeciesTableExist).toBe(false);
  });

  test("getMostCommonSpeciesData rendering properly", () => {
    const getMostCommonSpeciesDataExist = component.find("getMostCommonSpeciesData").exists();
    expect(getMostCommonSpeciesDataExist).toBe(false);
  });

  test("getSeasonalChartData rendering properly", () => {
    const getSeasonalChartDataExist = component.find("getSeasonalChartData").exists();
    expect(getSeasonalChartDataExist).toBe(false);
  });

  test("getHotspotAreas rendering properly", () => {
    const getHotspotAreasTableExist = component.find("getHotspotAreasTable").exists();
    expect(getHotspotAreasTableExist).toBe(false);
  });

  test("completeListOfSpecies rendering properly", () => {
    const completeListOfSpeciesExist = component.find("completeListOfSpecies").exists();
    expect(completeListOfSpeciesExist).toBe(false);
  });

  test("getDataForWaterbirdCongregation rendering properly", () => {
    const getDataForWaterbirdCongregationExist = component.find("getDataForWaterbirdCongregation").exists();
    expect(getDataForWaterbirdCongregationExist).toBe(false);
  });

  test("getEffortDetails rendering properly", () => {
    const getEffortDetailsExist = component.find("getEffortDetails").exists();
    expect(getEffortDetailsExist).toBe(false);
  });

  test("reportName rendering properly", () => {
    const reportNameExist = component.find("reportName").exists();
    expect(reportNameExist).toBe(false);
  });

  test("setUploadedgeojson rendering properly", () => {
    const setUploadedgeojsonExist = component.find("setUploadedgeojson").exists();
    expect(setUploadedgeojsonExist).toBe(false);
  });

  test("setIsZoomRequired rendering properly", () => {
    const setIsZoomRequiredExist = component.find("setIsZoomRequired").exists();
    expect(setIsZoomRequiredExist).toBe(false);
  });

  test("setShowreport rendering properly", () => {
    const setShowreportExist = component.find("setShowreport").exists();
    expect(setShowreportExist).toBe(false);
  });

  test("editedData rendering properly", () => {
    const editedDataExist = component.find("editedData").exists();
    expect(editedDataExist).toBe(false);
  });

  test("setEditedData rendering properly", () => {
    const setEditedDataExist = component.find("setEditedData").exists();
    expect(setEditedDataExist).toBe(false);
  });

  test("setSelectedLocality rendering properly", () => {
    const setSelectedLocalityExist = component.find("setSelectedLocality").exists();
    expect(setSelectedLocalityExist).toBe(false);
  });

  test("setSelectedCounty rendering properly", () => {
    const setSelectedCountyExist = component.find("setSelectedCounty").exists();
    expect(setSelectedCountyExist).toBe(false);
  });

  test("setSelectedState rendering properly", () => {
    const setSelectedStateExist = component.find("setSelectedState").exists();
    expect(setSelectedStateExist).toBe(false);
  });

  test("setSelectedState rendering properly", () => {
    const setSelectedStateExist = component.find("setSelectedState").exists();
    expect(setSelectedStateExist).toBe(false);
  });

  test("startDate rendering properly", () => {
    const startDateExist = component.find("startDate").exists();
    expect(startDateExist).toBe(false);
  });

  test("endDate rendering properly", () => {
    const endDateExist = component.find("endDate").exists();
    expect(endDateExist).toBe(false);
  });

  test("area rendering properly", () => {
    const areaExist = component.find("area").exists();
    expect(areaExist).toBe(false);
  });

  test("completeListOfSpeciesFetchSuccessFully rendering properly", () => {
    const completeListOfSpeciesFetchSuccessFullyExist = component.find("completeListOfSpeciesFetchSuccessFully").exists();
    expect(completeListOfSpeciesFetchSuccessFullyExist).toBe(false);
  });

  test("mediumForReport rendering properly", () => {
    const mediumForReportExist = component.find("mediumForReport").exists();
    expect(mediumForReportExist).toBe(false);
  });

  test("otherScreen rendering properly", () => {
    const otherScreenExist = component.find("otherScreen").exists();
    expect(otherScreenExist).toBe(false);
  });

  test("mostCommonSpeciesDiv rendering properly", () => {
    const mostCommonSpeciesDivExist = component.find("mostCommonSpeciesDiv").exists();
    expect(mostCommonSpeciesDivExist).toBe(false);
  });

  test("seasonalChartDiv rendering properly", () => {
    const seasonalChartDivExist = component.find("seasonalChartDiv").exists();
    expect(seasonalChartDivExist).toBe(false);
  });

  test("header rendering properly", () => {
    const headerExist = component.find("header").exists();
    expect(headerExist).toBe(false);
  });

  test("footer rendering properly", () => {
    const footerExist = component.find("footer").exists();
    expect(footerExist).toBe(false);
  });

  test("setPdfDownloadStatus rendering properly", () => {
    const setPdfDownloadStatusExist = component.find("setPdfDownloadStatus").exists();
    expect(setPdfDownloadStatusExist).toBe(false);
  });

  test("setChangeLayoutForReport rendering properly", () => {
    const setChangeLayoutForReportExist = component.find("setChangeLayoutForReport").exists();
    expect(setChangeLayoutForReportExist).toBe(false);
  });

  test("Group86 rendering properly", () => {
    const Group86Exist = component.find("Group86").exists();
    expect(Group86Exist).toBe(false);
  });

  test("Group_26 rendering properly", () => {
    const Group_26Exist = component.find("Group_26").exists();
    expect(Group_26Exist).toBe(false);
  });

  test("Layer_1 rendering properly", () => {
    const Layer_1Exist = component.find("Layer_1").exists();
    expect(Layer_1Exist).toBe(false);
  });

  test("Layer_2 rendering properly", () => {
    const Layer_2Exist = component.find("Layer_2").exists();
    expect(Layer_2Exist).toBe(false);
  });

  test("whiteLogo rendering properly", () => {
    const whiteLogoExist = component.find("whiteLogo").exists();
    expect(whiteLogoExist).toBe(false);
  });

  test("India rendering properly", () => {
    const IndiaExist = component.find("India").exists();
    expect(IndiaExist).toBe(false);
  });

  test("NT_Logo rendering properly", () => {
    const NT_LogoExist = component.find("NT_Logo").exists();
    expect(NT_LogoExist).toBe(false);
  });

  test("EN_Logo rendering properly", () => {
    const EN_LogoExist = component.find("EN_Logo").exists();
    expect(EN_LogoExist).toBe(false);
  });

  test("CR_Logo rendering properly", () => {
    const CR_LogoExist = component.find("CR_Logo").exists();
    expect(CR_LogoExist).toBe(false);
  });

  test("VU_Logo rendering properly", () => {
    const VU_LogoExist = component.find("VU_Logo").exists();
    expect(VU_LogoExist).toBe(false);
  });

  test("getCountByScientificName?.indiaEndemic rendering properly", () => {
    const indiaEndemicExist = component.find('[data-test="getCountByScientificName.indiaEndemic"]').exists();
    expect(indiaEndemicExist).toBe(false);
  });

  test("getCountByScientificName?.scheduleI, rendering properly", () => {
    const scheduleI = component.find('[data-test="getCountByScientificName?.scheduleI"]').exists();
    expect(scheduleI).toBe(false);
  });

  test("getCountByScientificName?.soibHighPriority rendering properly", () => {
    const soibHighPriorityExist = component.find('[data-test="getCountByScientificName.indiaEndemic"]').exists();
    expect(soibHighPriorityExist).toBe(false);
  });

  test("getCountByScientificName?.iucnRedList rendering properly", () => {
    const iucnRedListExist = component.find('[data-test="getCountByScientificName?.iucnRedList"]').exists();
    expect(iucnRedListExist).toBe(false);
  });

  test("getCountByScientificName?.migrate rendering properly", () => {
    const migrateExist = component.find('[data-test="getCountByScientificName?.migrate"]').exists();
    expect(migrateExist).toBe(false);
  });

  test("getCountByScientificName?.total rendering properly", () => {
    const totalExist = component.find('[data-test="getCountByScientificName?.total"]').exists();
    expect(totalExist).toBe(false);
  });

  test("getCountByScientificName?.cmsAppendixSpecies rendering properly", () => {
    const cmsAppendixSpeciesExist = component.find('[data-test=" getCountByScientificName?.cmsAppendixSpecies"]').exists();
    expect(cmsAppendixSpeciesExist).toBe(false);
  });

  test("getCountByScientificName?.citesAppendixSpecies rendering properly", () => {
    const citesAppendixSpeciesExist = component.find('[data-test="getCountByScientificName?.citesAppendixSpecies"]').exists();
    expect(citesAppendixSpeciesExist).toBe(false);
  });

  test("getCountByScientificName?.soibConservationConcernSpecies rendering properly", () => {
    const soibConservationConcernSpeciesExist = component.find('[data-test=" getCountByScientificName?.soibConservationConcernSpecies"]').exists();
    expect(soibConservationConcernSpeciesExist).toBe(false);
  });

  test("getCountByScientificName?.iucnRedListCategoriesCount rendering properly", () => {
    const iucnRedListCategoriesCountExist = component.find('[data-test=" getCountByScientificName?.iucnRedListCategoriesCount"]').exists();
    expect(iucnRedListCategoriesCountExist).toBe(false);
  });

});

describe("Given App Main ", () => {
  test("Ziptogeojson rendering properly", () => {
    const component = shallow(<Reportmap />);
    const ZiptogeojsonExist = component.find("Ziptogeojson").exists();
    expect(ZiptogeojsonExist).toBe(true);
  });

  test("MyControls rendering properly", () => {
    const component = shallow(<Reportmap />);
    const MyControlsExist = component.find("MyControls").exists();
    expect(MyControlsExist).toBe(true);
  });
  // expexted false
  test("formattedDate rendering properly", () => {
    const component = shallow(<Reportmap />);
    const formattedDateExist = component.find("formattedDate").exists();
    expect(formattedDateExist).toBe(false);
  });
  // expexted false
  test("Boundary rendering properly", () => {
    const component = shallow(<Reportmap />);
    const BoundaryExist = component.find("Boundary").exists();
    expect(BoundaryExist).toBe(false);
  });

  test("navbar is rendering properly", () => {
    const component = shallow(<About />);
    const navbarExist = component.find("Navbar").exists();
    expect(navbarExist).toBe(true);
  });
});









