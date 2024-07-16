// Mengimpor modul HTTP bawaan Node.js
const http = require("http");

// Menentukan port yang akan digunakan oleh server
const port = 3000;

// Membuat server HTTP
const server = http.createServer((req, res) => {
  // Menetapkan status kode dan header untuk respon
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  // Menulis pesan "Hello, World!" ke dalam respon
  res.end("Hello, World!\n");
});

// Menjalankan server pada port yang telah ditentukan
server.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}/`);
});
