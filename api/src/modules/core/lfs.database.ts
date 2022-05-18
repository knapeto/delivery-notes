import odbc, { NodeOdbcError, Result } from 'odbc';

class LfsConnection {
  query(sql: string, args = []) {
    return new Promise(async (resolve, reject) => {
      try {
        const connection = await odbc.connect(
          'DSN=AS400;UID=ELGODBC;PWD=d8k3g49sr',
        );
        connection.query(
          sql,
          args,
          {},
          (err: NodeOdbcError, rows: Result<unknown>): any => {
            if (err) {
              console.error(err);
              reject(err);
            }
            connection.close();
            resolve(rows);
          },
        );

      } catch(error) {
        console.log(error)
      }
    });
  }
}

export default new LfsConnection();
