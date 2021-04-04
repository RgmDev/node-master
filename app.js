const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mustacheExpress = require('mustache-express')

const sequelize = require('./app/config/db')

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

let md_auth = require(path.join(__dirname, 'app/middleware/authenticate'))

const mainRoutes = require(path.join(__dirname, 'app/routes/main-routes'))
app.use(mainRoutes)

const appRoutes = require(path.join(__dirname, 'app/routes/app-routes'))
app.use('/app', appRoutes)

const usersRoutes = require(path.join(__dirname, 'app/routes/users'))
app.use('/api', usersRoutes)





app.get('/sandbox', (req, res) => { 
  res.render('sandbox', {
  title: 'sandbox', 
  css: [
    'https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/cyborg/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/simplelightbox@2.7.0/dist/simple-lightbox.min.css',
    '/css/style.css'
  ],
  scripts: [
    'https://code.jquery.com/jquery-3.6.0.min.js', 
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/simplelightbox@2.7.0/dist/simple-lightbox.min.js',
    '/js/sandbox.js', 
    '/js/app.js' 
  ]
  }) 
})





app.listen(port, () => {
  
  console.log('Example app listening at http://localhost:'+port)

  // Check database
  sequelize.authenticate().then(() =>{
    console.log('Connected to database successfully')
  }).catch(()=>{
    console.log('Failed to connect to database')
  })

  // Sync database
  sequelize.sync({force: false}).then(() =>{
    console.log('Synchronized with the database correctly')
  }).catch(()=>{
    console.log('Failed to sync to database')
  })

})
