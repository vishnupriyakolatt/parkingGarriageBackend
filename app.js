const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ParkingRoutes=require('./route/parkingRoutes')
const cors = require('cors');
const dotenv = require('dotenv');
const dbconnect = require('./config/connection');


const PORT = process.env.PORT;
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dbconnect.dbconnect();
app.use(cors());




app.use("/",(req,res,next)=>{console.log(req.body)
  next()})
app.get("/",(req,res)=>res.send ("connectee"))
app.use('/api/Parking', ParkingRoutes);
app.listen(PORT, () => {
  console.log(`server is running  on http://localhost:${PORT}`);
});