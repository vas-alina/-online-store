require('dotenv').config();
const express = require('express');
const sequelize = require('./db')
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT

const app = express()

app.use(express.json());
app.use(cookieParser());


const start = async () => {
    try {
        await sequelize.authenticate()
            .then(() => {
                console.log('Connection to ProductgreSQL has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
        await sequelize.sync()

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}

start();