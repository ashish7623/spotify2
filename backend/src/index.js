
// video 2:00 hrs
import express from 'express'
import dotenv from "dotenv"
import { clerkMiddleware } from '@clerk/express'
import fileupload from "express-fileupload";

import path from "path";
import cors from "cors";
import { connectDB } from './lib/db.js'
import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.route.js'
import authRoutes from './routes/auth.routes.js'
import songRoutes from './routes/song.route.js'
import statsRoutes from './routes/stats.route.js'
import albumsRoutes from './routes/album.route.js'


dotenv.config()

const __dirname = path.resolve()
const app = express()
const PORT = process.env.PORT

app.use(cors({
    origin: "http://localhost:3000",
    credentials:true,
}
))

app.use(express.json());// to parse req.body
app.use(clerkMiddleware()) // this will add auth to req body => req.auth.userId
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10mb max file size
    },
}))


app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)

app.use("/api/songs", songRoutes)

app.use("/api/stats", statsRoutes)
app.use('/api/albums', albumsRoutes)

app.use((err, req, res, next) => {
    res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal server error " : err.message });
})

app.listen(PORT, () => {
    console.log("server is running on port" + PORT)
    connectDB()
})


// todo: socket.io