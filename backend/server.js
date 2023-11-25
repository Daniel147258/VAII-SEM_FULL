const express = require('express');
const app = express();
const port = 3006; // Zvolte si libovolný port, který není již používán


app.listen(port, () => {
  console.log(`Server běží na portu ${port}`);
});