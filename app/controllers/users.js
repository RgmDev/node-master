const bcrypt = require('bcrypt-nodejs')
const moment = require('moment')
const path = require('path')

// https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/
// https://medium.com/@SigniorGratiano/image-uploads-with-multer-f306469ef2
const multer  = require('multer')

const jwt = require('../config/jwt')
const User = require('../models/user')

function getAll(req, res){
  try{
    User.findAll({where: req.body}).then(users => {
      res.json(users)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
  
}

function getById(req, res){
  try{
    User.findByPk(req.params.id).then(user => {
      res.json(user)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function create(req, res){
  try{
    let user = req.body
    bcrypt.hash(user.password, null, null, (err, hash) => {
      user.password = hash
      User.create(user).then((user) => {
        res.json(user)
      }).catch(err => {
        res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
      })
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function update(req, res){
  try{
    User.findByPk(req.params.id).then(user => {
      User.update(req.body, { where: { id: user.id }}).then(() => {
        res.status(400).send(user)
      }).catch(err => {
        res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
      })  
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function destroy(req, res){
  try{
    User.findByPk(req.params.id).then(user => {
      let id = user ? user.id : 0;
      User.destroy({ where: { id: user.id }}).then(() => {
        res.json(user)
      }).catch(err => {
        res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
      })    
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function login(req, res){
  try{
    User.findOne({where : { email: req.body.email }}).then(user => {
      if(user){
        bcrypt.compare(req.body.password, user.password, (err, check) => {
          if(check){
            res.json({ token: jwt.createToken(user), user: { id: user.id, email: user.email, name: user.name, surname: user.surname, role: user.role, image: user.image } })
          }else{
            res.status(401).send({error: true, message: 'Unauthorized'})
          }
        })
      }else{
        res.status(401).send({error: true, message: 'Unauthorized'})
      }
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function checkToken(req, res){
  try{
    if(!req.headers.authorization){
      return res.status(403).send({error: true, message: 'Authorization header not found'})
    }
    payload = jwt.decodeToken(req.headers.authorization)
    if(payload.exp <= moment().unix()){
      return res.status(401).send({error: true, message: 'Expired token'})
    }
    return res.status(200).send({
      error: false, 
      message: 'Valid token', 
      user: { 
        id: payload.id, 
        email: payload.email, 
        name: payload.name, 
        surname: payload.surname, 
        role: payload.role, 
        image: payload.image 
      }
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
  
}

function uploadAvatar(req, res){
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../assets/img/profile/'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'_'+Math.floor(Math.random() * 10000)+path.extname(file.originalname))
    }
  })
  var upload = multer({ storage: storage }).single('avatar')
  upload(req, res, function(err){
    if (req.fileValidationError) {
      return res.status(500).send({error: true, message: 'Internal Server Error', data: req.fileValidationError})
    }
    else if (!req.file) {
      return res.status(400).send({error: true, message: 'Bad Request'})
    }
    else if (err instanceof multer.MulterError) {
      return res.status(500).send({error: true, message: 'Internal Server Error', data: err})
    }
    else if (err) {
      return res.status(500).send({error: true, message: 'Internal Server Error', data: err})
    }
    res.status(200).send({error: false, data: path.basename(req.file.path)})
  })
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
  login,
  checkToken,
  uploadAvatar
}