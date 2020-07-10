export const get = async (url) => {
  console.log('the requested url is: ', url);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log('Fetch failed. Try again with some different code.', e);
  }
};

export const post = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (e) {
    console.log(e);
    console.log('qua?');
    return e;
  }
};

export const API_URL = 'localhost:5000';
