import * as odbc from 'odbc';

class IngresConnection {
  async query(sql: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const connection = await odbc.connect('DSN=prytanis_cz');

        try {
          const query = await connection.query(sql);
          await connection.close();
          resolve(query);
        } catch (error) {
          console.log(error);
          return reject(error);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
}

export default new IngresConnection();
