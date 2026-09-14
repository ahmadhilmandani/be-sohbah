const express = require('express');

require("dotenv").config();

const cors = require('cors');

const app = express();

const quranRoute = require('./route/quran/quranRoute.js')
const authRoute = require('./route/auth/authRoute.js')

const errorResponse = require('./utils/errorResponse.js')



app.use(cors({
  origin: '*', // URL Frontend Vite/React
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


app.use("/api/quran", quranRoute);
app.use("/api/auth", authRoute);

app.use(errorResponse);


app.listen(process.env.PORT, () => {
    console.log(`Server Running localhost:${process.env.PORT}`);
});
