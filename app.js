const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mustacheExpress = require('mustache-express')

const sequelize = require('./app/config/db')
const User = require('./app/models/user')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.engine('html', mustacheExpress())
app.set('view engine', 'html')
app.set('views', path.join(__dirname, '/app/views'))
app.set('partials', path.join(__dirname, '/app/views/partials'))

/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
*/

app.use('/css', express.static(path.join(__dirname, 'app/assets/css')))
app.use('/js', express.static(path.join(__dirname, 'app/assets/js')))
app.use('/img', express.static(path.join(__dirname, 'app/assets/img')))


app.get('/', (req, res) => { res.render('landing', {name: "rugo"}) })
app.get('/login', (req, res) => { res.render('login', {}) })
app.get('/register', (req, res) => { res.render('register', {}) })


const usersRoutes = require(path.join(__dirname, 'app/routes/users'))

app.use('/api', usersRoutes)


app.get('/sandbox', (req, res) => {
  res.render('sandbox', {})
})

app.get('/partials', (req, res) => {
  res.render('partials-demo', {})
})

app.listen(port, () => {
  
  console.log(`Example app listening at http://localhost:${port}`)

  // Check database
  sequelize.authenticate().then(() =>{
    console.log('Connected to database successfully')
  }).catch(()=>{
    console.log('Failed to connect to database')
  })

  // Sync database
  sequelize.sync({force: true}).then(() =>{
    console.log('Synchronized with the database correctly')
  }).catch(()=>{
    console.log('Failed to sync to database')
  })

})
