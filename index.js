import express from "express";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import session from "express-session";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import promptRoute from "./src/routes/prompt.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
app.use(cors());

app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// Routes
app.get("/", (req, res) => {
  res.json({ success: true, message: "Server is running!!" });
});

// Use router
app.use("/api", promptRoute);

// Flash messages middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success") || [];
  res.locals.error_msg = req.flash("error") || [];
  next();
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
