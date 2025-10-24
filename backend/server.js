import express from "express";
import cors from "cors";
import flowersRoute from "./routes/flowers.js";
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import profileRoute from "./routes/profile.js";
import cartRoute from "./routes/cart.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/flowers", flowersRoute);
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/profile", profileRoute);
app.use("/api/cart", cartRoute);

// Default route (opsional)
app.get("/", (req, res) => {
  res.send("Backend server is running smoothly!");
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
