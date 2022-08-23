const axios = require("axios");

export const fetchLists = (endpoint) => {
  const key = endpoint.split("?")[0].split("/").slice(-1)[0];

  return axios.get(`https://alexi-news-api.herokuapp.com/api${endpoint}`).then((res) => {
    return res.data[key];
  });
};

export const fetchSingles = (endpoint) => {
  const key = endpoint.split("?")[0].split("/")[1].slice(0, -1);

  return axios.get(`https://alexi-news-api.herokuapp.com/api${endpoint}`).then((res) => {
    return res.data[key];
  });
};
