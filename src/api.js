const axios = require("axios");

export const fetchLists = (endpoint, params, key) => {
  key = key || endpoint.split("/").slice(-1)[0];

  return axios
    .get(`https://alexi-news-api.herokuapp.com/api${endpoint}`, { params })
    .then((res) => {
      return [res.data[key], res.data.total_count];
    });
};

export const fetchSingles = (endpoint, params) => {
  const key = endpoint.split("/")[1].slice(0, -1);

  return axios
    .get(`https://alexi-news-api.herokuapp.com/api${endpoint}`, { params })
    .then((res) => {
      return res.data[key];
    });
};

export const patchSingle = (endpoint, body) => {
  return axios.patch(`https://alexi-news-api.herokuapp.com/api/${endpoint}`, body);
};

export const postSingle = (endpoint, body) => {
  return axios.post(`https://alexi-news-api.herokuapp.com/api/${endpoint}`, body);
};
