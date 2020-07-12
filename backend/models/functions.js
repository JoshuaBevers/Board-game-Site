const db = require('./conn.js');

class Functions {
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
