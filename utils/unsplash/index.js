// eslint-disable-next-line no-undef
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
  return call(`/search/photos?query=${query}&page=${page}`).then(response => ({
    photos: response.results,
    isLastPage: response.total_pages === page,
  }));
};

export const getRandomPhotos = () => {
  return call(`/photos/random?count=10`).then(response => ({
    photos: response,
    isLastPage: true,
  }));
};

export const triggerDownload = id => {
  return call(`/photos/${id}/download`).catch(err => {
    console.log(`Error marking photo as downloaded`);
    console.log(err);
  });
};
