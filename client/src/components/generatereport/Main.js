import * as React from "react";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import togeojson from "togeojson";
import { Stack } from "@mui/system";
import Datepicker from "../datepicker/Datepicker";
import shp from "shpjs";
import Reportmap from "./Reportmap";
import logo from "../../assets/images/blackLog.png";
import {
  Button,
  IconButton,
  MenuItem,
  Menu,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Drawer,
  CssBaseline,
  Box,
  TextField,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import AttachFile from "@mui/icons-material/AttachFile";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { useState } from "react";
import Report from "./Report";
import { AiOutlineFileText } from "react-icons/ai";
import kmlFileIcon from "../../../src/assets/images/kml.png";
import { VscJson } from "react-icons/vsc";
import "react-toastify/dist/ReactToastify.css";
import {
  GET_COUNT_BY_SCIENTIFIC_NAME,
  GET_DATA_FOR_ENDEMIC_SPECIES_TABLE,
  GET_DATA_FOR_IUCN_REDLIST_TABLE,
  GET_LOCATION_BY_STATE_AND_COUNTY,
  GET_WATERBIRD_CONGREGATION_DATA,
  GET_MOST_COMMON_SPECIES_DATA,
  GET_SEASONAL_CHAT_DATA,
  GET_HOTSPOT_AREAS,
  GET_COMPLETE_LIST_OF_SPECIES,
  GET_ALL_EFFORT_DETAILS,
} from "../../redux/action";
import { connect } from "react-redux";
import { useEffect } from "react";
import "./style.css";
import InstructionModal from "./InstructionModal";
import { Link } from "react-router-dom";
import { CloseOutlined } from "@mui/icons-material";
import { district, statesList } from "./staticLists/staticLists";
import { createTrack } from "./helpers/helperFunctions";
import dayjs from 'dayjs';

const drawerWidth = 360;
const windowWidth = window.innerWidth;
function Generatereportlayout(props) {
  const {
    GET_COUNT_BY_SCIENTIFIC_NAME,
    GET_DATA_FOR_IUCN_REDLIST_TABLE,
    GET_DATA_FOR_ENDEMIC_SPECIES_TABLE,
    GET_MOST_COMMON_SPECIES_DATA,
    GET_SEASONAL_CHAT_DATA,
    GET_HOTSPOT_AREAS,
    GET_COMPLETE_LIST_OF_SPECIES,
    GET_WATERBIRD_CONGREGATION_DATA,
    GET_ALL_EFFORT_DETAILS,
  } = props;
  const generateFileName = (name) => {
    const alias = name.split(".");
    if (name.length > 17) {
      const formattedName =
        alias[0].slice(0, 12) + "..." + alias[alias.length - 1];
      return formattedName;
    }
    return name;
  };

  const formatDateToMMDDYYYY = (date) => {
    return dayjs(date).format('MM-DD-YYYY');
  };

  const removeFile = () => {
    setUploadedgeojson(null);
    setUploadedFileName(null);
    hiddenGeojsonInput.current.value = "";
    hiddenShapefileInput.current.value = "";
    handleKmlFileInput.current.value = "";
  };
  const [reportName, setReportName] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [mediumForReport, setMediumForReport] = useState(null);
  const [geoJson, setGeoJson] = useState(null);
  const [Finaldata, setFinaldata] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("");
  const [showGeographySign, setShowGeographySign] = useState(false);
  const [showUploadFileComponent, setShowUploadFileComponent] = useState(false);
  const [newPolygon, setNewPolygon] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showInstructionModal, setShowInstructionModal] = useState(false);
  const [isZoomRequired, setIsZoomRequired] = useState(true);
  const [districtList, setDistrictList] = useState([]);
  const [localitiesList, setLocalitiesList] = useState([]);
  const [editedData, setEditedData] = useState(null);
  const [value, setValue] = useState("01/01/1900");
  const [value2, setValue2] = useState(dayjs('2023-05-31'));
  const [showdate, setShowdate] = useState(true);
  const [area, setArea] = useState(null)
  const handleMouseLeave = () => {
    setAnchorEl(null);
  };
  const handleShowUploadFileComponent = (payload) => {
    handleGeographyClick("Upload Button");
    setShowUploadFileComponent(payload);
  };

  const [showreport, setShowreport] = useState(false);
  const handleSelectState = (e) => {
    setSelectedState(e.target.value);
    setSelectedCounty("");
    setSelectedLocality("");
    const filteredState = district.find(
      (item) => item.state === e.target.value
    );
    setDistrictList(filteredState.districts);
  };
  const handleSelectCounty = (e) => {
    setMediumForReport("districtR")
    const district = districtList.find(
      (item) => item.district === e.target.value
    );
    const localities = district.localities;
    setLocalitiesList(localities);
    setSelectedCounty(e.target.value);
  };

  const handleLocalitySelect = (e) => {
    setMediumForReport("localityR")
    setSelectedLocality(e.target.value);
  };
  const sortAlphabetically = (array, origin) => {
    try {
      if (origin === "district") {
        array.sort((a, b) => a.district.localeCompare(b.district));
        return array;
      }
      return array.sort();
    } catch {
      return array;
    }
  };

  const hiddenGeojsonInput = React.useRef();
  const hiddenShapefileInput = React.useRef();
  const handleKmlFileInput = React.useRef();

  const [uploadedgeojson, setUploadedgeojson] = React.useState(null);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const formattedStartDate = formatDateToMMDDYYYY(value);
  const formattedEndDate = formatDateToMMDDYYYY(value2);

  const handleSubmit = (event) => {
    event.preventDefault();
    createTrack(mediumForReport)
    if (uploadedgeojson === null && selectedState === "" && !newPolygon) {
      toast.error(
        "Please Upload Area or Select Geography to Generate the Report"
      );
      return;
    }
    if (selectedState !== "") {
      if (selectedCounty === "") {
        toast.error("District is required");
        return;
      }
    }
    if (!reportName || reportName.length > 35) {
      if (reportName.length > 35) {
        toast.error(
          "Report Name Should be less than 35 characters including spaces"
        );
        return;
      }
      toast.error("Report Name is required to Generate the Report");
      return;
    }
    let formData = new FormData();
    formData.append("file", geoJson);
    formData.append("start", value);
    formData.append("end", value2);

    setShowreport(true);
    GET_COUNT_BY_SCIENTIFIC_NAME(
      uploadedgeojson || newPolygon
        ? formData
        : {
          state: selectedState,
          county: selectedCounty,
          locality: selectedLocality,
          start: value,
          end: value2,
        },
      uploadedgeojson || newPolygon ? true : false,
      formattedStartDate,
      formattedEndDate
    );
    GET_DATA_FOR_IUCN_REDLIST_TABLE(
      uploadedgeojson || newPolygon
        ? formData
        : {
          state: selectedState,
          county: selectedCounty,
          locality: selectedLocality,
          start: value,
          end: value2,
        },
      uploadedgeojson || newPolygon ? true : false,
      formattedStartDate,
      formattedEndDate
    );
    GET_DATA_FOR_ENDEMIC_SPECIES_TABLE(
      uploadedgeojson || newPolygon
        ? formData
        : {
          state: selectedState,
          county: selectedCounty,
          locality: selectedLocality,
          start: value,
          end: value2,
        },
      uploadedgeojson || newPolygon ? true : false,
      formattedStartDate,
      formattedEndDate
    );
    GET_MOST_COMMON_SPECIES_DATA(
      uploadedgeojson || newPolygon
        ? formData
        : {
          state: selectedState,
          county: selectedCounty,
          locality: selectedLocality,
          start: value,
          end: value2,
        },
      uploadedgeojson || newPolygon ? true : false,
      formattedStartDate,
      formattedEndDate
    );
    GET_WATERBIRD_CONGREGATION_DATA(
      uploadedgeojson || newPolygon
        ? formData
        : {
          state: selectedState,
          county: selectedCounty,
          locality: selectedLocality,
          start: value,
          end: value2,
        },
      uploadedgeojson || newPolygon ? true : false,
      formattedStartDate,
      formattedEndDate
    );
    GET_SEASONAL_CHAT_DATA(
      uploadedgeojson || newPolygon
        ? formData
        : {
          state: selectedState,
          county: selectedCounty,
          locality: selectedLocality,
          start: value,
          end: value2,
        },
      uploadedgeojson || newPolygon ? true : false,
      formattedStartDate,
      formattedEndDate
    );
    GET_HOTSPOT_AREAS(
      uploadedgeojson || newPolygon
        ? formData
        : {
          state: selectedState,
          county: selectedCounty,
          locality: selectedLocality,
          start: value,
          end: value2,
        },
      uploadedgeojson || newPolygon ? true : false,
      formattedStartDate,
      formattedEndDate
    );
    GET_COMPLETE_LIST_OF_SPECIES(
      uploadedgeojson || newPolygon
        ? formData
        : {
          state: selectedState,
          county: selectedCounty,
          locality: selectedLocality,
          start: value,
          end: value2,
        },
      uploadedgeojson || newPolygon ? true : false,
      formattedStartDate,
      formattedEndDate
    );
    GET_ALL_EFFORT_DETAILS(
      uploadedgeojson || newPolygon
        ? formData
        : {
          state: selectedState,
          county: selectedCounty,
          locality: selectedLocality,
          start: value,
          end: value2,
        },
      uploadedgeojson || newPolygon ? true : false,
      formattedStartDate,
      formattedEndDate
    );
  };

  const handleZipFile = (e) => {
    try {
      handleMouseLeave();
      setMediumForReport("zipR")
      setEditedData(null)
      setShowGeographySign(false);
      setUploadedgeojson(null);
      const reader = new FileReader();
      const file = e.target.files[0];
      const compactFileName = generateFileName(file?.name);
      if (file?.name.slice(-3) === "zip") {
        reader.readAsArrayBuffer(file);
        reader.onload = function (buffer) {
          shp(buffer.target.result).then(function (data) {
            if (data) {
              setUploadedgeojson(data);
            } else {
              toast.error("No data in file");
              return;
            }
            setIsZoomRequired(true);
            setUploadedFileName(compactFileName);
            setMobileOpen(false);
            const blob = new Blob([JSON.stringify(data)], {
              type: "application/json",
            });
            setGeoJson(blob);
          });
        };
      } else {
        toast("Please Select Shape file in zip format only");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleKmlFile = async (e) => {
    setMediumForReport("kmlR")
    setEditedData(null)
    setShowGeographySign(false);
    handleMouseLeave();
    setUploadedgeojson(null);
    const file = e.target.files[0];
    const compactFileName = generateFileName(file?.name);
    if (file?.name.slice(-3) === "kml") {
      const text = await file.text();
      const kml = new DOMParser().parseFromString(text, "text/xml");
      const geojson = togeojson.kml(kml);
      if (geojson) {
        setUploadedgeojson(geojson);
      } else {
        toast.error("No data in file");
        return;
      }
      setIsZoomRequired(true);
      setUploadedFileName(compactFileName);
      setMobileOpen(false);
      const blob = new Blob([JSON.stringify(geojson)], {
        type: "application/json",
      });
      setGeoJson(blob);
    } else {
      toast("Please Select KML format only");
    }
  };
  const handleGeographyClick = (emitter) => {
    setArea(null)
    setUploadedFileName(null);
    if (showGeographySign) {
      setSelectedState("");
      setSelectedCounty("");
      setSelectedLocality("");
    }
    if (emitter === "Geography Button") {
      setShowUploadFileComponent(false);
      setShowGeographySign(!showGeographySign);
    } else {
      setShowGeographySign(false);
    }
  };
  const handleGeoFile = (e) => {
    setMediumForReport("jsonR")
    setShowGeographySign(false);
    handleMouseLeave();
    setUploadedgeojson(null);
    setEditedData(null)
    setGeoJson(e.target.files[0]);
    const reader = new FileReader();
    const file = e.target.files[0];
    const compactFileName = generateFileName(file?.name);

    if (file?.name.slice(-4) === "json") {
      reader.readAsText(e.target.files[0], "UTF-8");
      reader.onload = (e) => {
        const result = JSON.parse(e.target.result);
        if (result) {
          setUploadedgeojson(result);
        } else {
          toast.error("No Data in file");
          return;
        }
        setIsZoomRequired(true);
        setUploadedFileName(compactFileName);
        setMobileOpen(false);
      };
    } else {
      toast("Please Select Geojson file only");
    }
  };
  useEffect(() => {
    const isUserNew = localStorage.getItem("isUserNew");
    if (isUserNew && windowWidth > 500) {
      return;
    } else {
      setShowInstructionModal(true);
    }
  }, []);

  const drawer = (
    <>
      <InstructionModal
        open={showInstructionModal}
        setOpen={setShowInstructionModal}
        isMobile={windowWidth < 500}
      />
      <div className="p-2 bg-[#DAB830] flex justify-between font  ">
        <div>
          <img className="w-3/12" src={logo} />
        </div>
        <div className="font-[Geo] text-3xl my-auto">MYNA</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-4">
          <Stack spacing={3}>
            <div
              onClick={() =>
                newPolygon
                  ? toast.error(
                    "Please clear polygon before using this feature"
                  )
                  : handleShowUploadFileComponent(!showUploadFileComponent)
              }
              className={`text-white text-center  ${newPolygon
                ? "bg-[#948c8a] cursor-not-allowed"
                : "bg-[#9A7269] hover:bg-[#955c4f] cursor-pointer"
                } transition ease-linear hover: w-2/3 p-2 rounded`}
            >
              UPLOAD FILE
            </div>
            {showUploadFileComponent && (
              <FormControl fullWidth>
                {uploadedgeojson ? (
                  <div
                    onClick={removeFile}
                    className="cursor-pointer border-2 p-3 rounded border-green-400 flex justify-between text-xs ms-1 mt-2 text-red-600"
                  >
                    <div className="my-auto">
                      {uploadedFileName || "REMOVE FILE"}
                    </div>
                    <div classname="my-auto">
                      <CloseOutlined size={12} />
                    </div>
                  </div>
                ) : (
                  <div
                    onMouseEnter={(e) =>
                      selectedState || newPolygon
                        ? ""
                        : setAnchorEl(e.currentTarget)
                    }
                    className=" text-md  text-gray-500 mt-2 border py-2 border-gray-300  rounded-md hover:border-gray-600 hover:text-gray-800 flex gap-2"
                  >
                    <div>
                      <IconButton
                        id="basic-button"
                        disabled={selectedState || newPolygon ? true : false}
                        aria-controls={
                          Boolean(anchorEl) ? "basic-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                        onClick={(e) =>
                          selectedState || newPolygon
                            ? ""
                            : setAnchorEl(e.currentTarget)
                        }
                      >
                        <AttachFile className="cursor-pointer" />
                        <div className="text-base">
                          {uploadedFileName || "Upload file"}
                        </div>
                      </IconButton>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMouseLeave}
                        onClick={handleMouseLeave}
                        disabled={selectedState || newPolygon ? false : true}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem
                          onClick={() => handleKmlFileInput.current.click()}
                          sx={{ cursor: "pointer" }}
                        >
                          {" "}
                          <img
                            src={kmlFileIcon}
                            alt="img"
                            height="20"
                            width={20}
                          />{" "}
                          <span className="ml-1"> .Kml</span>{" "}
                        </MenuItem>
                        <MenuItem
                          onClick={() => hiddenGeojsonInput.current.click()}
                        >
                          {" "}
                          <VscJson size="25" />{" "}
                          <span className="ml-1"> .geojson</span>{" "}
                        </MenuItem>
                        <MenuItem
                          onClick={() => hiddenShapefileInput.current.click()}
                          sx={{ cursor: "pointer" }}
                        >
                          <AiOutlineFileText size="25" />
                          <span className="ml-1">shapefile.zip </span>
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                )}
              </FormControl>
            )}
            <FormControl>
              <TextField
                id="standard-basic"
                label="Name of Report *"
                variant="outlined"
                value={reportName ? reportName : ""}
                onChange={(e) => setReportName(e.target.value)}
              />
            </FormControl>
            <ToastContainer />
            <Typography variant="h6" component="h2">
              Date
            </Typography>
            <Datepicker
              value={value}
              value2={value2}
              setValue={setValue}
              setValue2={setValue2}
              showdate={showdate}
              setShowdate={setShowdate}
            ></Datepicker>
            <div
              onClick={() =>
                uploadedgeojson || newPolygon
                  ? toast.error(
                    "Please clear polygon before using this feature"
                  )
                  : handleGeographyClick("Geography Button")
              }
              className={`text-white text-center break-keep  ${uploadedgeojson || newPolygon
                ? "bg-[#948c8a] cursor-not-allowed"
                : "bg-[#9A7269] hover:bg-[#955c4f] cursor-pointer"
                } transition ease-linear hover: w-2/3 p-2 rounded`}
            >
              CHOOSE GEOGRAPHY
            </div>
            {showGeographySign ? (
              <>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">State</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleSelectState}
                    label="State"
                    name="state"
                    value={selectedState}
                  >
                    {statesList.length > 0
                      ? sortAlphabetically(statesList).map((item, i) => {
                        return (
                          <MenuItem key={i} value={item}>
                            {item}
                          </MenuItem>
                        );
                      })
                      : ""}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    District
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleSelectCounty}
                    label="district"
                    required
                    name="district"
                    disabled={selectedState ? false : true}
                    value={selectedCounty}
                  >
                    {districtList.length > 0
                      ? sortAlphabetically(districtList, "district").map(
                        (item, i) => {
                          return (
                            <MenuItem key={i} value={item.district}>
                              {item.district}
                            </MenuItem>
                          );
                        }
                      )
                      : ""}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Locality
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleLocalitySelect}
                    label="Locality"
                    name="locality"
                    disabled={selectedCounty ? false : true}
                    value={selectedLocality}
                  >
                    {localitiesList?.length > 0
                      ? sortAlphabetically(localitiesList).map((item, i) => {
                        return (
                          <MenuItem key={i} value={item}>
                            {item}
                          </MenuItem>
                        );
                      })
                      : ""}
                  </Select>
                </FormControl>
              </>
            ) : null}

            <input
              type="file"
              accept=".zip"
              ref={hiddenShapefileInput}
              disabled={selectedState || newPolygon ? true : false}
              onChange={handleZipFile}
              style={{ display: "none" }}
            />
            <input
              type="file"
              accept=".kml"
              ref={handleKmlFileInput}
              disabled={selectedState || newPolygon ? true : false}
              onChange={handleKmlFile}
              style={{ display: "none" }}
            />
            <input
              type="file"
              accept=".geojson"
              ref={hiddenGeojsonInput}
              disabled={selectedState || newPolygon ? true : false}
              onChange={handleGeoFile}
              style={{ display: "none" }}
            />
            <Tooltip title="Click to Generate Report">
              <Button
                type="submit"
                style={{ backgroundColor: "#DAB830", color: "white" }}
                variant="contained"
              >
                Generate Report
              </Button>
            </Tooltip>
            <span className="text-xs text-red-400">
              {windowWidth < 500 ? "*This Website looks good in Desktop" : ""}
            </span>
          </Stack>
        </div>
        <div className="mt-10 p-4 text-sm text-gray-500 ">
          <Stack spacing={1}>
            <Link to="/about">About Myna</Link>
            <Link to="/instructions">Usage Instructions</Link>
          </Stack>
        </div>
      </form>
    </>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      {/* <ThemeProvider theme={themeOne}> */}
      {showreport ? (
        <Report
          selectedState={selectedState}
          reportName={reportName}
          setSelectedState={setSelectedState}
          selectedCounty={selectedCounty}
          setSelectedCounty={setSelectedCounty}
          selectedLocality={selectedLocality}
          setSelectedLocality={setSelectedLocality}
          data={Finaldata}
          setShowGeographySign={setShowGeographySign}
          dataForMap={uploadedgeojson}
          setFinaldata={setFinaldata}
          setShowreport={setShowreport}
          setReportName={setReportName}
          setUploadedgeojson={setUploadedgeojson}
          setNewPolygon={setNewPolygon}
          setUploadedFileName={setUploadedFileName}
          newPolygon={newPolygon}
          editedData={editedData}
          setEditedData={setEditedData}
          setIsZoomRequired={setIsZoomRequired}
          startDate={value}
          endDate={value2}
          area={area}
          mediumForReport={mediumForReport}
        ></Report>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              display: { sm: "none" },
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              backgroundColor: "#DAB830",
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                <span className="font-[geo]"> myna</span>
              </Typography>
            </Toolbar>
          </AppBar>

          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth - 50,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              // ModalProps={{
              //   keepMounted: false,
              // }}
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 0,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Reportmap
              key={uploadedgeojson}
              selectedState={selectedState}
              newPolygon={newPolygon}
              setNewPolygon={setNewPolygon}
              setGeoJson={setGeoJson}
              setShowGeographySign={setShowGeographySign}
              setData={setUploadedgeojson}
              data={uploadedgeojson}
              toast={toast}
              reportName={reportName}
              isZoomRequired={isZoomRequired}
              setIsZoomRequired={setIsZoomRequired}
              removeFile={removeFile}
              editedData={editedData}
              setEditedData={setEditedData}
              setArea={setArea}
              setMediumForReport={setMediumForReport}
              uploadedgeojson={uploadedgeojson}
            />
          </Box>
        </Box>
      )}
      {/* </ThemeProvider> */}
    </>
  );
}

Generatereportlayout.propTypes = {
  window: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    getListOfStates: state?.UserReducer?.getListOfStates,
    getListOfDistrict: state?.UserReducer?.getListOfDistrict,
  };
};

export default connect(mapStateToProps, {
  GET_COUNT_BY_SCIENTIFIC_NAME,
  GET_DATA_FOR_IUCN_REDLIST_TABLE,
  GET_WATERBIRD_CONGREGATION_DATA,
  GET_DATA_FOR_ENDEMIC_SPECIES_TABLE,
  GET_MOST_COMMON_SPECIES_DATA,
  GET_SEASONAL_CHAT_DATA,
  GET_HOTSPOT_AREAS,
  GET_COMPLETE_LIST_OF_SPECIES,
  GET_ALL_EFFORT_DETAILS,
})(Generatereportlayout);