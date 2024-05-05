require("dotenv").config()
const mongoose = require('mongoose');

const db_url = process.env.DB_URI || "mongodb+srv://lakshay:lakshaygargd@form.lsyxxi0.mongodb.net/"
const db_name = process.env.DB_NAME || "coursera"


const connection = mongoose.createConnection(db_url+db_name)
.on('open',()=>{
    console.log("connected to db")
    
})
.on('error',(error)=>{
    console.log(error);
});

module.exports = connection;