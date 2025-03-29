const express = require('express');

require('dotenv').config();

const app = express();
const cors = require('cors');
const axios = require('axios');
const ApiError = require('./Utils/ApiError');

app.use(cors({
    origin: ["http://localhost:5173"], // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
    credentials: true, // Allow cookies & authorization headers
    optionsSuccessStatus: 200 // Fix preflight issues for older browsers
}));

app.use(express.json());

require('./Models/Config');

const PORT = process.env.PORT || 5000;

const SERVER_URL = `http://localhost:${PORT}/ping`;


app.get('/ping', (req, res) => {
    res.send('Server is alive');
});

app.use('/api/user',require('./Routes/User.Routes'));

app.use('/api/doctor',require('./Routes/Doctor.Routes'));

app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server Up and Listen on ${PORT}`);
    setInterval(() => {
            axios
            .get(SERVER_URL)
            .then(() => console.log("Self-ping successful"))
            .catch((err) => console.error("Self-ping failed:", err.message));
    }, 3 *60*1000);
});