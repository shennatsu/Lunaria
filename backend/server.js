import express from "express";
import cors from "cors";
import flowersRoute from "./routes/flowers.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/flowers", flowersRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});