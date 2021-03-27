$(document).ready(function(){
  checkToken();
})

/* Token */
function getToken(){
  return localStorage.getItem('token')
}
function checkToken(){
  let token = getToken()
  let data = JSON.stringify({
    token: token
  })
  var settings = {
    "url": "/api/users/checkToken",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "data" : data
  };
  $.ajax(settings)
    .done(function (response) { 
      // for load datat user
      console.log(response)
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      location.href = "/login"
    })

}