const bcrypt = require('bcrypt-nodejs')

const jwt = require('../config/jwt')
const User = require('../models/user')

function getAll(req, res){
  User.findAll({where: req.body}).then(users => {
    res.json(users)
  }).catch(err => {
    console.log(err)
    res.status(400).send({errors: err.errors})
  })
}

function getById(req, res){
  User.findByPk(req.params.id).then(user => {
    res.json(user)
  }).catch(err => {
    console.log(err)
    res.status(400).send(err.errors)
  })
}

function create(req, res){
  let user = req.body
  bcrypt.hash(user.password, null, null, (err, hash) => {
    user.password = hash
    User.create(user).then((user) => {
      res.json(user)
    }).catch(err => {
      console.log(err)
      res.status(400).send(err.errors)
    })
  })
}

function update(req, res){
  User.findByPk(req.params.id).then(user => {
    User.update(req.body, { where: { id: user.id }}).then(() => {
      res.status(400).send(user)
    }).catch(err => {
      console.log(err)
      res.status(400).send(err.errors)
    })  
  }).catch(err => {
    console.log(err)
    res.status(400).send(err.errors)
  })
}

function destroy(req, res){
  User.findByPk(req.params.id).then(user => {
    let id = user ? user.id : 0;
    User.destroy({ where: { id: user.id }}).then(() => {
      res.json(user)
    }).catch(err => {
      console.log(err)
      res.status(400).send(err.errors)
    })    
  }).catch(err => {
    console.log(err)
    res.status(400).send(err.errors)
  })
}

function login(req, res){
  User.findOne({where : { email: req.body.email }}).then(user => {
    if(user){
      bcrypt.compare(req.body.password, user.password, (err, check) => {
        if(check){
          res.status(200).send({ token: jwt.createToken(user), user: { id: user.id, email: user.email, name: user.name, surname: user.surname, role: user.role, image: user.image } })
        }else{
          res.send({error: true, message: 'Unauthorized'})
        }
      })
    }else{
      res.send({error: true, message: 'Unauthorized'})
    }
  }).catch(err => {
    console.log(err)
    res.status(400).send(err.errors)
  })
}

function decodeToken(req, res){
  res.send( jwt.decodeToken(req.body.token) )
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
  login,
  decodeToken
}