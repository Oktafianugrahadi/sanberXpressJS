const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let kategoriProduk = [
  { id: 1, name: "Elektronik" },
  { id: 2, name: "Perabotan" },
];

let produk2 = [
  { id: 1, name: "Laptop", category: "Elektronik" },
  { id: 2, name: "Meja", category: "Perabotan" },
];

// GET semua kategori produk
app.get("/api/kategori-produk", (req, res) => {
  res.json(kategoriProduk);
});

// GET kategori produk berdasarkan ID
app.get("/api/kategori-produk/:id", (req, res) => {
  const produkId = parseInt(req.params.id);
  const produk = kategoriProduk.find((p) => p.id === produkId);
  if (produk) {
    res.json(produk);
  } else {
    res.status(404).json({ message: "Kategori Produk tidak ditemukan" });
  }
});

// POST kategori produk baru
app.post("/api/kategori-produk", (req, res) => {
  const kategoriProdukBaru = req.body;
  kategoriProdukBaru.id = kategoriProduk.length
    ? kategoriProduk[kategoriProduk.length - 1].id + 1
    : 1;
  kategoriProduk.push(kategoriProdukBaru);
  res.status(201).json(kategoriProdukBaru);
});

// PUT update kategori produk
app.put("/api/kategori-produk/:id", (req, res) => {
  const kategoriProdukId = parseInt(req.params.id);
  const kategoriProdukIndeks = kategoriProduk.findIndex(
    (p) => p.id === kategoriProdukId
  );
  if (kategoriProdukIndeks !== -1) {
    kategoriProduk[kategoriProdukIndeks] = {
      id: kategoriProdukId,
      ...req.body,
    };
    res.json(kategoriProduk[kategoriProdukIndeks]);
  } else {
    res.status(404).json({ message: "Kategori Produk tidak ditemukan" });
  }
});

// DELETE kategori produk
app.delete("/api/kategori-produk/:id", (req, res) => {
  const kategoriProdukId = parseInt(req.params.id);
  kategoriProduk = kategoriProduk.filter((p) => p.id !== kategoriProdukId);
  res.status(204).send();
});

// Route dengan query string
// cari produk berdasarkan nama
app.get("/api/cari-produk", (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  // Lakukan pencarian berdasarkan query
  const results = produk2.filter((produk) =>
    produk.name.toLowerCase().includes(query.toLowerCase())
  );

  res.json({ query: query, results: results });
});

// Route dengan parameter dan query string
// untuk mendapatkan produk dalam kategori tertentu dan mencari berdasarkan nama
app.get("/api/cari-produk/:kategori/produk", (req, res) => {
  const kategoriProduk = req.params.kategori; // cari berdasarkan kategori produk
  const searchQuery = req.query.q;
  if (!searchQuery) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  // Ambil postingan pengguna berdasarkan ID dan query pencarian
  const results = produk2.filter(
    (produk) =>
      produk.category.toLowerCase() === kategoriProduk.toLowerCase() &&
      produk.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  res.json({
    query: searchQuery,
    results: results,
  });
});

app.listen(port, () => {
  console.log(`Server is running at <http://localhost>:${port}`);
});
