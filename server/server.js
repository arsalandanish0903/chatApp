import {app, server} from "./socket/socket.js"
import express from 'express';
import userRoutes from './routes/user.route.js';
import messageRoutes from './routes/message.route.js'
import { connectDb } from './db/connection1.js';
import cookieParser from "cookie-parser"
import cors from "cors"

connectDb()
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/message', messageRoutes)

// middlewares
import {errorMiddleware}  from "./middlewares/error.middleware.js"
app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send('Server is Running!')
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})