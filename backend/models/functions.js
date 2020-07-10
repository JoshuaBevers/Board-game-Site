const db = require('./conn.js');

class Functions {
  static async getGameByName(name) {
    try {
      name = 'agricola';
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
