const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Krupica147258.',
  database: 'mydb',
});

const getPohlavie = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = 'SELECT * FROM pohlavie';
    connection.query(sqlQuery, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getPouzivatel = () =>{
    return new Promise((resolve, reject) => {
        const sqlQuery = 'SELECT * FROM pouzivatel';
        connection.query(sqlQuery, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
}

const pridajPouzivatela = (email,heslo, meno, adresa, mesto, psc) =>{
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL pridajPouzivatela(?, ?, ?, ?, ?, ?)';
        connection.query(sqlQuery, [email, heslo, meno, adresa, mesto, psc], (error, results) => {
            if (error) {
                reject(error.message);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
  getPohlavie,
  getPouzivatel,
  pridajPouzivatela,
};
