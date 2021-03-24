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
  User.create(user).then((user) => {
    res.json(user)
  }).catch(err => {
    console.log(err)
    res.status(400).send(err.errors)
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

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy
}