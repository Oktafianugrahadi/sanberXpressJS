const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Masukkan sebuah angka: ", (input) => {
  const angka = parseInt(input);

  if (isNaN(angka)) {
    console.log("Input bukan angka.");
  } else {
    if (angka % 2 === 0) {
      console.log(`Angka ${angka} adalah genap.`);
    } else {
      console.log(`Angka ${angka} adalah ganjil.`);
    }

    switch (angka) {
      case 1:
        console.log("Senin");
        break;
      case 2:
        console.log("Selasa");
        break;
      case 3:
        console.log("Rabu");
        break;
      case 4:
        console.log("Kamis");
        break;
      case 5:
        console.log("Jumat");
        break;
      case 6:
        console.log("Sabtu");
        break;
      case 7:
        console.log("Minggu");
        break;
      default:
        console.log(
          "Nomor hari tidak valid atau tidak termasuk dalam rentang 1-7."
        );
    }
  }

  rl.close();
});
