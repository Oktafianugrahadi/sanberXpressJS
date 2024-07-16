const fs = require("fs");

// Nama file yang akan dibaca
const fileName = "sample.txt";

// Membaca file secara asynchronous
fs.readFile(fileName, "utf8", (err, data) => {
  if (err) {
    console.error(`Error saat membaca file: ${err}`);
    return;
  }
  console.log(`Isi file ${fileName}:\n${data}`);
});
