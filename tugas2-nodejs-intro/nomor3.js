// operasi.js

// Mengimpor fungsi add dari modul math.js
const tambah = require("./operasi");

// Menggunakan fungsi add
const angka1 = 5;
const angka2 = 7;
const jum = tambah(angka1, angka2);

console.log(`Hasil penjumlahan ${angka1} + ${angka2} adalah ${jum}`);
