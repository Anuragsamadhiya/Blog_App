import express from 'express';
import cors from 'cors';
import connectToMongo from './db.js';
import authRoutes from './Routes/blog.js';

const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running"));

const startServer = async () => {
  await connectToMongo(); // ✅ wait for DB

  app.use("/api/v1", authRoutes);

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
