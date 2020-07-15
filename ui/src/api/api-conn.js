export const getGame = async (url, gameName) => {
  console.log('the requested url is: ', url);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        game: gameName,
      },
    });
    const data = await response.json();
    console.log('the get game data is: ', data);
    return data;
  } catch (e) {
    console.log(
      'Fetch failed. Try again with some different code, or a bigger sword.',
      e,
    );
  }
};
export const getList = async (gameName) => {
  const url = 'http://localhost:5000/search';
  console.log('the requested url is: ', url);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        game: gameName,
      },
    });
    const data = await response.json();
    console.log('the getList data is: '.data);
    return data;
  } catch (e) {
    console.log(
      'Fetch failed on GetList. Try again with some different code, or a bigger sword.',
      e,
    );
    console.log('relevent data below');
    const regs = {
      method: 'GET',
      headers: gameName,
      mode: 'cors',
      cache: 'default',
    };
    console.log(regs);
  }
};

export const post = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
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

export const API_URL = 'http://localhost:5000';
