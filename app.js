const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mustacheExpress = require('mustache-express')

// https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/
// https://medium.com/@SigniorGratiano/image-uploads-with-multer-f306469ef2
var multer  = require('multer')

const sequelize = require('./app/config/db')

const usersController = require('./app/controllers/users')

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

app.get('/', (req, res) => { res.render('landing', {name: "rugo"}) })
app.get('/login', (req, res) => { res.render('login', {}) })
app.get('/register', (req, res) => { res.render('register', {}) })
app.post('/auth/login', usersController.login)

const appRoutes = require(path.join(__dirname, 'app/routes/app-routes'))
app.use('/app', appRoutes)

const usersRoutes = require(path.join(__dirname, 'app/routes/users'))
app.use('/api', usersRoutes)



app.post('/profile', function (req, res) {

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/app/uploads/')
    },
    filename: function (req, file, cb) {  
      cb(null, file.fieldname + '-' + path.extname(file.originalname))
    }
  })
  var upload = multer({ storage: storage }).single('avatar')

  upload(req, res, function(err){

    console.log(req.body)
    console.log(req.file)

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    else if (err instanceof multer.MulterError) {
        return res.send(err);
    }
    else if (err) {
        return res.send(err);
    }

    // Display uploaded image for user validation
    res.status(200).send('subida')
    
  })
  

})


app.get('/sandbox', (req, res) => {
  res.render('sandbox', {
    title: 'sandbox', 
    css: ['/css/bootswatch.min.css'],
    scripts: [
        '/js/jquery.min.js', 
        '/js/bootstrap.bundle.min.js',
        'https://cdn.amcharts.com/lib/4/core.js',
        'https://cdn.amcharts.com/lib/4/charts.js',
        'https://cdn.amcharts.com/lib/4/plugins/timeline.js',
        'https://cdn.amcharts.com/lib/4/plugins/bullets.js',
        'https://cdn.amcharts.com/lib/4/themes/animated.js',
        'https://cdn.amcharts.com/lib/4/themes/dark.js'
      ]
    })
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
  sequelize.sync({force: false}).then(() =>{
    console.log('Synchronized with the database correctly')
  }).catch(()=>{
    console.log('Failed to sync to database')
  })

})
