import express from "express";
import dotenv from "dotenv"
import connectDB from "./utils/db/db.js";
import userRoutes from "./routes/userRoutes.js"
import courseRoute from "./routes/courseRoute.js"
import mediaRoute from "./routes/mediaRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import testimonialRoutes from "./routes/testimonialRoute.js";
import contactRoutes from "./routes/contactRoute.js";
import blogRoutes from "./routes/blogRoute.js"

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true, // Allow cookies
}));

app.use(express.urlencoded({ extended: true }));

connectDB();

const PORT = process.env.PORT || 3000;  

app.use("/api/user", userRoutes)
app.use("/api/courses", courseRoute)
app.use("/api/media", mediaRoute)
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blog", blogRoutes);

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);   
})