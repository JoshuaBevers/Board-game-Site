const db = require('./conn.js');
const gamebase = require('../data/boardgames.json');

class Functions {
  static async getGameListJson(game) {
    console.log('The requested gameName is: ', game);
    let gameList = [];
    try {
      const response = gamebase.boardgames.map((reference, index) => {
        console.log(reference.name);

        if (reference.name.includes(game)) {
          gameList.push(reference);
          console.log('the if statement returns: ', reference);
        }
      });
      console.log('the end resonse is: ', gameList);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async getGameList(search) {
    try {
      search = search + '%';
      const response = await db.any('Select * FROM games WHERE name LIKE $1', [
        search,
      ]);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async getGameByName(name) {
    try {
      const response = await db.one('SELECT * FROM games WHERE name = $1', [
        name,
      ]);
      return response;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = Functions;
