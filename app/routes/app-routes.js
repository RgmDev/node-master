const express = require('express')
const appRoutesController = require('../controllers/app-routes')

let app = express.Router()

app.get('/home', appRoutesController.home)
app.get('/textillate', appRoutesController.textillate)
app.get('/datatable', appRoutesController.datatable)
app.get('/amcharts', appRoutesController.amcharts)
app.get('/lightbox', appRoutesController.lightbox)

module.exports = app