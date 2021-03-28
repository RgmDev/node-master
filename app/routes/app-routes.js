const express = require('express')
const appRoutesController = require('../controllers/app-routes')

let app = express.Router()

app.get('/home', appRoutesController.home)

module.exports = app