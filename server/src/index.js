import express from "express";
import dotenv from "dotenv";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";
import { auth } from "./lib/auth.js"

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
)

app.use(express.json());

app.use("/api/auth", toNodeHandler(auth));

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json({ session });
})
app.get("/health", (req, res) => {
  res.send("OK!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
