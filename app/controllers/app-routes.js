function home(req, res){
  res.render('home', {title: 'Home', css: 'link css', cards : 'cards'})
}

module.exports = {
  home
}