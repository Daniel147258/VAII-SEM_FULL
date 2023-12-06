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
        const sqlQuery = 'CALL pridajNovehoPouzivatela(?, ?, ?, ?, ?, ?)';
        connection.query(sqlQuery, [email, heslo, meno, adresa, mesto, psc], (error, results) => {
            if (error) {
                reject(error.message);
            } else {
                resolve(results);
            }
        });
    });
}
const kontrolaExistencieEmailu = (email) => {
  return new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT 1 FROM pouzivatel WHERE email = ?';
      connection.query(sqlQuery, [email], (error, results) => {
          if (error) {
              reject(error.message);
          } else {
              resolve(results.length > 0);
          }
      });
  });
}

const getPrihlasovacieUdajePouzivatela = (email, heslo) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = 'SELECT * FROM pouzivatel WHERE email = ? AND heslo = ?';
    connection.query(sqlQuery, [email, heslo], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
};



module.exports = {
  getPohlavie,
  getPouzivatel,
  pridajPouzivatela,
  kontrolaExistencieEmailu,
  getPrihlasovacieUdajePouzivatela,
};
