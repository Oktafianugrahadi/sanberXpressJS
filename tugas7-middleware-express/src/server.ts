import express from "express";
import indexRoutes from "./route";

const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Gunakan routes
app.use("/", indexRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
