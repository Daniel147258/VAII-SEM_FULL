const mysql = require('mysql');

// Vytvoření připojení k databázi
const connection = mysql.createConnection({
  host: 'localhost',
  port:  3306,
  user: 'root', // Vaše uživatelské jméno
  password: '', // Vaše heslo
  database: 'mydb', // Název vaší databáze
});

// Připojení k databázi
connection.connect((err) => {
  if (err) {
    console.error('Chyba připojení k databázi:', err);
  } else {
    console.log('Připojeno k databázi');
  }
});

// Uzavření připojení po dokončení práce
// connection.end();

module.exports = connection;
