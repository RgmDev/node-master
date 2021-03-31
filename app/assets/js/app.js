$(document).ready(function(){
  checkToken();
})

/* User */
function checkToken(){
  let token = localStorage.getItem('token')
  let data = JSON.stringify({
    token: token
  })
  var settings = {
    "url": "/api/checkToken",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    }
  };
  $.ajax(settings)
    .done(function (response) { 
      loadUserInfo(response.user)
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      location.href = "/login"
    })

}

function loadUserInfo(user){
  $("span#userEmail").html(user.email)
  console.log(user)
  console.log(user.image)
  if(user.image){
    $("img#userImage").attr("src", "/img/profile/ruben-2.png")
  }
}

function logOut(){
  localStorage.clear()
  location.href = "/login"
}