import dotenv from "dotenv";
dotenv.config();
import { app, server } from "./socket/socket.js"
import express from 'express';
import userRoutes from './routes/user.route.js';
import messageRoutes from './routes/message.route.js'
import { connectDb } from './db/connection1.js';
import cookieParser from "cookie-parser"
import cors from "cors"

connectDb()
console.log("CLIENT_URI:", process.env.CLIENT_URI); // Check Render logs
app.use(cors({
  origin: "http://localhost:5173", // Add deployed frontend URL
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());
app.use(cookieParser());


//routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/message', messageRoutes)

// middlewares
import { errorMiddleware } from "./middlewares/error.middleware.js"
app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send('Server is Running!')
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})