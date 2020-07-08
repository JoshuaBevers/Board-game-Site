export const get = async (url) => {
  const response = await fetch(url);
  const data = response.json();
  return data;
};

export const post = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const API_URL = 'tbd';
