import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server started on PORT:", PORT);
  });
});

// mongodb+srv://chunhinhenry:DlS7GC3xmvJFgaJE@cluster0.wudex8k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
