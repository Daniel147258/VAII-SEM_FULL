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

const odstranUcet = (email) => {
  return new Promise((resolve, reject)=> {
    const sqlQuery = 'Delete FROM pouzivatel WHERE email = ? ';
    connection.query(sqlQuery, [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve({ success: true });
      }
    });
  });
};

const zmenHeslo = (heslo, idPouzivatel) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = 'CALL zmenHeslo(?, ?)';
    connection.query(sqlQuery, [idPouzivatel, heslo], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getFarby = () => {
    return new Promise((resolve, reject) =>{
      const sqlQuery = "SELECT * from farba";
      connection.query(sqlQuery,(error,results)=>{
        if(error){
          reject(error);
        } else{
          resolve(results);
        }
      });
    });
};

const getKategorie = () => {
  return new Promise((resolve, reject) =>{
    const sqlQuery = "SELECT * from Kategoria";
    connection.query(sqlQuery,(error,results)=>{
      if(error){
        reject(error);
      } else{
        resolve(results);
      }
    });
  });
};

const pridajProdukt = (selectedPohlavie, selectedCategory,sub, name, image, prize, popis) =>{
  return new Promise((resolve, reject) => {
      const sqlQuery = 'CALL pridajNovyProdukt(?, ?, ? ,? ,? ,? ,? )';
      connection.query(sqlQuery, [selectedPohlavie, selectedCategory, sub ,name, image, prize, popis], (error, results) => {
          if (error) {
              reject(error.message);
          } else {
              resolve(results);
          }
      });
  });
}

const getProdukty = () => {
  return new Promise((resolve, reject) =>{
    const sqlQuery = "SELECT * from produkt";
    connection.query(sqlQuery,(error,results)=>{
      if(error){
        reject(error);
      } else{
        resolve(results);
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
  odstranUcet,
  zmenHeslo,
  getFarby,
  getKategorie,
  pridajProdukt,
  getProdukty,
};
