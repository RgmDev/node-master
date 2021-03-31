function home(req, res){
  res.render('home', {
    title: 'Home', 
    css: [
      '/css/bootswatch.min.css', 
      '/css/style.css'
    ],
    scripts: [
      '/js/jquery.min.js', 
      '/js/bootstrap.bundle.min.js', 
      '/js/app.js' 
    ],
    cards : [{
      style: 'bg-dark',
      command : 'npm i express',
      title : 'express',
      description: 'Fast, unopinionated, minimalist web framework for Node.js',
      npmLink: 'https://npmjs.com/package/express',
      websiteLink : 'https://expressjs.com/' 
    },{
      style: 'bg-danger',
      command : 'npm i mustache-express',
      title : 'mustache-express',
      description: 'Mustache Express lets you use Mustache and Express together, including auto-loading partials.',
      npmLink: 'https://www.npmjs.com/package/mustache-express'
    },{
      style: 'bg-success',
      command : 'npm i sequelize',
      title : 'sequelize',
      description: 'Sequelize is a promise-based Node.js ORM tool for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.',
      npmLink: 'https://www.npmjs.com/package/sequelize',
      websiteLink : 'https://sequelize.org/'
    },{
      style: 'bg-success',
      command : 'npm i mysql2',
      title : 'mysql2',
      description: 'MySQL client for Node.js with focus on performance. Supports prepared statements, non-utf8 encodings, binary log protocol, compression, ssl...',
      npmLink: 'https://www.npmjs.com/package/mysql2'
    },{
      style: 'bg-light',
      command : 'npm i jwt-simple',
      title : 'jwt-simple',
      description: 'JWT(JSON Web Token) encode and decode module for node.js.',
      npmLink: 'https://www.npmjs.com/package/jwt-simple'
    },{
      style: 'bg-light',
      command : 'npm i bcrypt',
      title : 'bcrypt-nodejs',
      description: 'The bcrypt library on NPM makes it really easy to hash and compare passwords in Nodejs.',
      npmLink: 'https://www.npmjs.com/package/bcrypt'
    },{
      style: 'bg-info',
      command : 'npm i multer',
      title : 'multer',
      description: 'Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.',
      npmLink: 'https://www.npmjs.com/package/mustache-express'
    },{
      style: 'bg-primary',
      command : 'npm i dotenv',
      title : 'dotenv',
      description: 'Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.',
      npmLink: 'https://www.npmjs.com/package/dotenv'
    },{
      style: 'bg-info',
      command : 'npm i body-parser',
      title : 'body-parser',
      description: 'Node.js body parsing middleware. Parse incoming request bodies in a middleware before your handlers, available under the req.body property.',
      npmLink: 'npmjs.com/package/body-parser'
    },{
      style: 'bg-secondary',
      command : 'npm i moment',
      title : 'moment',
      description: 'A JavaScript date library for parsing, validating, manipulating, and formatting dates.',
      npmLink: 'https://www.npmjs.com/package/moment'
    },{
      style: 'bg-warning',
      command : 'npm i path',
      title : 'path',
      description: 'The path module provides utilities for working with file and directory paths.',
      npmLink: 'https://www.npmjs.com/package/path'
    }]
  })
}

function textillate(req, res){
  res.render('textillate', {
    title: 'Textillate', 
    css: [
      '/css/bootswatch.min.css',
      '/css/style.css'
    ],
    scripts: [
      '/js/jquery.min.js', 
      '/js/bootstrap.bundle.min.js', 
      '/js/app.js' 
    ]
  })
}

function datatable(req, res){
  res.render('datatable', {
    title: 'Datatable', 
    css: [
      '/css/bootswatch.min.css', 
      'https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css',
      'https://github.com/downloads/lafeber/world-flags-sprite/flags32.css',
      '/css/style.css'
    ],
    scripts: [
      '/js/jquery.min.js', 
      '/js/bootstrap.bundle.min.js', 
      'https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js',
      '/js/datatable.js',
      '/js/app.js' 
    ]
  })
}

function amcharts(req, res){
  res.render('amcharts', {
    title: 'amcharts', 
    css: [
      '/css/bootswatch.min.css', 
      '/css/style.css'
    ],
    scripts: [
      '/js/jquery.min.js', 
      '/js/bootstrap.bundle.min.js',
      'https://cdn.amcharts.com/lib/4/core.js',
      'https://cdn.amcharts.com/lib/4/charts.js',
      'https://cdn.amcharts.com/lib/4/plugins/timeline.js',
      'https://cdn.amcharts.com/lib/4/plugins/bullets.js',
      'https://cdn.amcharts.com/lib/4/themes/animated.js',
      'https://cdn.amcharts.com/lib/4/themes/dark.js',
      '/js/amcharts.js',
      '/js/app.js'
    ]
  })
}

module.exports = {
  home,
  textillate,
  datatable,
  amcharts
}