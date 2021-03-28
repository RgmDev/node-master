function home(req, res){
  res.render('home', {
    title: 'Home', 
    css: ['/css/bootswatch.min.css'],
    scripts: [
        '/js/jquery.min.js', 
        '/js/bootstrap.bundle.min.js', 
        '/js/app.js' 
      ],
    cards : [{
      style: 'bg-dark',
      command : 'npm i express',
      title : 'Express',
      description: 'Fast, unopinionated, minimalist web framework for Node.js',
      npmLink: 'https://npmjs.com/package/express',
      websiteLink : 'https://expressjs.com/' 
    },{
      style: 'bg-danger',
      command : 'npm i mustache-express',
      title : 'mustache-express',
      description: 'Mustache Express lets you use Mustache and Express together, including auto-loading partials.',
      npmLink: 'https://www.npmjs.com/package/mustache-express'
    }]
  })
}

module.exports = {
  home
}