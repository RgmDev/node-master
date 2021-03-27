const express = require('express')
const usersController = require('../controllers/users')

let app = express.Router()

let md_auth = require('../middleware/authenticate')

app.get('/users', usersController.getAll)
app.get('/users/:id', usersController.getById)
app.post('/users', usersController.create)
app.put('/users/:id', usersController.update)
app.delete('/users/:id', md_auth.ensureAuth, usersController.destroy)

app.post('/users/login', usersController.login)
app.post('/users/decodeToken', usersController.decodeToken)
app.post('/users/checkToken', usersController.checkToken)


module.exports = app