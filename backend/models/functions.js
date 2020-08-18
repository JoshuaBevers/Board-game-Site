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
      return gameList;
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
      let returnableGame = [];
      const game = gamebase.boardgames.forEach((reference, index) => {
        if (reference.name === name) {
          returnableGame.push(reference);
        }
      });
      console.log('The game from the JSON grab is: ', game);

      // const response = await db.one('SELECT * FROM games WHERE name = $1', [
      //   name,
      // ]);
      return returnableGame;
    } catch (err) {
      return err.message;
    }
  }

  //users

  static async getByUsername(name) {
    try {
      const response = await db.one('SELECT * FROM users WHERE username = $1', [
        name,
      ]);
      return response;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = Functions;
