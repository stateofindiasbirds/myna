import api from "../api";

export const GET_STATES_DATA = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "GET_STATES_DATA",
      payload: data,
    });
  };
};
export const GET_DISTRICT_DATA = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "GET_DISTRICT_DATA",
      payload: data,
    });
  };
};
export const GET_COUNTY_DATA = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "GET_COUNTY_DATA",
      payload: data,
    });
  };
};

export const GET_LOCATION_BY_STATE_AND_COUNTY = (params) => {
  return async (dispatch) => {
    try {
      let res = await api.get(`users/location_listing`, {
        params: params,
      });
      if (Object.keys(res.data)[0] === "districts") {
        dispatch(GET_DISTRICT_DATA(res.data));
      } else if (Object.keys(res.data)[0] === "localities") {
        dispatch(GET_COUNTY_DATA(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const GET_COUNT_BY_SCIENTIFIC_NAME = (data, isFormData, value, value2) => {
  return async (dispatch) => {
    try {
      if (isFormData) {
        let res = await api.post(`latlong/count_by_scientificName?start=${value}&end=${value2}`, data);
        if (res?.status === 200) {
          dispatch({
            type: "GET_COUNT_BY_SCIENTIFIC_NAME",
            payload: res?.data,
          });
        }
      } else {
        let res = await api.get(`users/count_by_scientificName`, {
          params: { ...data, start: value, end: value2 },
        });
        if (res?.status === 200) {
          dispatch({
            type: "GET_COUNT_BY_SCIENTIFIC_NAME",
            payload: res?.data,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const GET_DATA_FOR_IUCN_REDLIST_TABLE = (data, isFormData, value, value2) => {
  return async (dispatch) => {
    try {
      if (isFormData) {
        let res = await api.post(`latlong/percentage_iucn_redList_species?start=${value}&end=${value2}`, data);
        if (res?.status === 200) {
          dispatch({
            type: "GET_DATA_FOR_IUCN_REDLIST_TABLE",
            payload: res?.data,
          });
        }
      } else {
        let res = await api.get(`users/percentage_iucn_redList_species`, {
          params: { ...data, start: value, end: value2 },
        });
        if (res?.status === 200) {
          dispatch({
            type: "GET_DATA_FOR_IUCN_REDLIST_TABLE",
            payload: res?.data,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const GET_DATA_FOR_ENDEMIC_SPECIES_TABLE = (data, isFormData, value, value2) => {
  return async (dispatch) => {
    try {
      if (isFormData) {
        let res = await api.post(`latlong/percentage_endemic_species?start=${value}&end=${value2}`, data);
        if (res?.status === 200) {
          dispatch({
            type: "GET_DATA_FOR_ENDEMIC_SPECIES_TABLE",
            payload: res?.data,
          });
        }
      } else {
        let res = await api.get(`users/percentage_endemic_species`, {
          params: { ...data, start: value, end: value2 },
        });
        if (res?.status === 200) {
          dispatch({
            type: "GET_DATA_FOR_ENDEMIC_SPECIES_TABLE",
            payload: res?.data,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const GET_MOST_COMMON_SPECIES_DATA = (data, isFormData, value, value2) => {
  return async (dispatch) => {
    try {
      if (isFormData) {
        let res = await api.post(`latlong/pertcentage_most_common_species?start=${value}&end=${value2}`, data);
        if (res?.status === 200) {
          dispatch({
            type: "GET_MOST_COMMON_SPECIES_DATA",
            payload: res?.data,
          });
        }
      } else {
        let res = await api.get(`users/pertcentage_most_common_species`, {
          params: { ...data, start: value, end: value2 },
        });
        if (res?.status === 200) {
          dispatch({
            type: "GET_MOST_COMMON_SPECIES_DATA",
            payload: res?.data,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const GET_WATERBIRD_CONGREGATION_DATA = (data, isFormData, value, value2) => {
  return async (dispatch) => {
    try {
      if (isFormData) {
        let res = await api.post(`latlong/water_bird_congregation?start=${value}&end=${value2}`, data);
        if (res?.status === 200) {
          dispatch({
            type: "GET_WATERBIRD_CONGREGATION_DATA",
            payload: res?.data.data,
          });
        }
      } else {
        let res = await api.get(`/users/water_bird_congregation`, {
          params: { ...data, start: value, end: value2 },
        });
        if (res?.status === 200) {
          dispatch({
            type: "GET_WATERBIRD_CONGREGATION_DATA",
            payload: res?.data.data,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};


export const GET_SEASONAL_CHAT_DATA = (data, isFormData, value, value2) => {
  // console.log(value, 'hii')
  return async (dispatch) => {
    try {
      if (isFormData) {
        let res = await api.post(`latlong/seasonal_chart_for_species?start=${value}&end=${value2}`, data);
        if (res?.status === 200) {
          dispatch({
            type: "GET_SEASONAL_CHAT_DATA",
            payload: res?.data,
          });
        }
      } else {
        let res = await api.get(`users/seasonal_chart_for_species`, {
          params: { ...data, start: value, end: value2 },
        });
        if (res?.status === 200) {
          dispatch({
            type: "GET_SEASONAL_CHAT_DATA",
            payload: res?.data,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const GET_HOTSPOT_AREAS = (data, isFormData, value, value2) => {
  return async (dispatch) => {
    try {
      if (isFormData) {

        let res = await api.post(`latlong/hotspot_area?start=${value}&end=${value2}`, data);
        if (res?.status === 200) {
          dispatch({
            type: "GET_HOTSPOT_AREAS",
            payload: res?.data,
          });
        }
      } else {
        let res = await api.get(`users/hotspot_area`, {
          params: { ...data, start: value, end: value2 },
        });
        if (res?.status === 200) {
          dispatch({
            type: "GET_HOTSPOT_AREAS",
            payload: res?.data,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const GET_COMPLETE_LIST_OF_SPECIES = (data, isFormData, value, value2) => {
  return async (dispatch) => {
    try {
      if (isFormData) {
        let res = await api.post(`latlong/complete_List_Of_Species?start=${value}&end=${value2}`, data);
        if (res?.status === 200) {
          dispatch({
            type: "GET_COMPLETE_LIST_OF_SPECIES",
            payload: res?.data,
          });
        }
      } else {
        let res = await api.get(`users/complete_List_Of_Species`, {
          params: { ...data, start: value, end: value2 },
        });
        if (res?.status === 200) {
          dispatch({
            type: "GET_COMPLETE_LIST_OF_SPECIES",
            payload: res?.data,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const GET_ALL_EFFORT_DETAILS = (data, isFormData, value, value2) => {
  return async (dispatch) => {
    try {
      if (isFormData) {
        let res = await api.post(`latlong/effortsDetails?start=${value}&end=${value2}`, data);
        if (res?.status === 200) {
          dispatch({
            type: "GET_ALL_EFFORT_DETAILS",
            payload: res?.data?.data,
          });
        }
      } else {
        let res = await api.get(`users/effortsDetails`, {
          params: { ...data, start: value, end: value2 },
        });
        if (res?.status === 200) {
          dispatch({
            type: "GET_ALL_EFFORT_DETAILS",
            payload: res?.data?.data,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const RESET_ALL_DATA = () => {
  return async (dispatch) => {
    dispatch({
      type: "RESET_DATA",
    });
  };
};
