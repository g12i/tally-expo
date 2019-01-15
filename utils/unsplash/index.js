import merge from "lodash/merge";
import tmp from "./tmp.json";

const API_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const fetch = (endpoint, options = {}) => {
  const defaults = {
    headers: {
      Authorization: `Client-ID ${API_ACCESS_KEY}`,
    },
  };

  return fetch(`https://api.unsplash.com${endpoint}`, merge(defaults, options));
};

export const searchPhotos = (query, page = 1) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(tmp[page] || []), 1000);
  });
  return fetch(`/search/photos?query=${query}&page=${page}`);
};
