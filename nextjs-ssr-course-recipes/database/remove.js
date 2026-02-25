const fs = require('fs');
const filePath = './database/meals.db';

fs.unlink(filePath, (err) => {
  if (err) {
    console.error(`Error removing file: ${err}`);
    return;
  }

  console.log(`File ${filePath} has been successfully removed.`);
});
