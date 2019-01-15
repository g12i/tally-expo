import tmp from "./tmp.json";

const API_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const call = async endpoint => {
  const response = await fetch(`https://api.unsplash.com${endpoint}`, {
    headers: {
      Authorization: `Client-ID ${API_ACCESS_KEY}`,
    },
  });

  if (response.status >= 400) {
    throw Error(`Fetch failed (${response.status} ${response.statusText})`);
  }

  return response.json();
};

export const searchPhotos = (query, page = 1) => {
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     const response = tmp[page - 1];

  //     console.log(`Query for ${query}, page=${page}`);
  //     resolve({
  //       photos: response.results,
  //       isLastPage: response.total_pages === page,
  //     });
  //   }, 1000);
  // });
  return call(`/search/photos?query=${query}&page=${page}`).then(response => ({
    photos: response.results,
    isLastPage: response.total_pages === page,
  }));
};
