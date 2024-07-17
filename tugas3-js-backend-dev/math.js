const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Fungsi untuk menghitung luas lingkaran berdasarkan jari-jari
function hitungLuasLingkaran(jariJari) {
  const pi = Math.PI;
  return pi * jariJari * jariJari;
}

// Fungsi untuk mengkuadratkan setiap elemen dalam array
function kuadratkanArray(arr) {
  return arr.map((angka) => angka * angka);
}

// Meminta input jari-jari dari pengguna
rl.question("Masukkan jari-jari lingkaran: ", (input) => {
  const jariJari = parseFloat(input);

  if (isNaN(jariJari) || jariJari <= 0) {
    console.log("Jari-jari tidak valid. Harap masukkan angka positif.");
  } else {
    const luasLingkaran = hitungLuasLingkaran(jariJari);
    console.log(
      `Luas lingkaran dengan jari-jari ${jariJari} adalah ${luasLingkaran}`
    );
  }

  // Contoh array untuk diuji dengan fungsi kuadratkanArray
  const angkaArray = [1, 2, 3, 4, 5];
  const kuadratArray = kuadratkanArray(angkaArray);
  console.log(`Array asli: ${angkaArray}`);
  console.log(`Array setelah dikuadratkan: ${kuadratArray}`);

  rl.close();
});
