import "dotenv/config";
import cors from "cors";
import express from "express";
import connectDB from "./config/db";
import taskRoutes from "./routes/taskRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

connectDB();