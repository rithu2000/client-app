import express from "express";
import cors from 'cors'
import userRoute from './routes/userRoute.js'
import connect from "./database/config.js";

const app = express();
const port = 8000;

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
    exposedHeaders: ['Content-Range', 'X-Content-Range']
}))

app.use('/api', userRoute)

connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server has connected to ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
})