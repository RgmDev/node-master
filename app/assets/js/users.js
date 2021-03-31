/* Login */
function login(){
  let data = JSON.stringify({
    email: $("#email").val(),
    password: $("#password").val()
  })
  var settings = {
    "url": "/auth/login",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "data" : data
  };
  $.ajax(settings)
    .done(function (response) { 
      if(response.error){
        $("#alert-danger").fadeIn()
        setInterval(function(){ $("#alert-danger").fadeOut() }, 3000)
      }else{
        saveToken(response.token)
        location.href = '/app/home'
      }
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown)
    })
}

function register(){
 
  let user = JSON.stringify({
    name: $("#name").val(),
    surname: $("#surname").val(),
    email: $("#email").val(),
    password: $("#password").val(),
    role: $("input[name=role]:checked").val()
  })
  var settings = {
    "url": "/api/users",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "data": user
  };
  $.ajax(settings)
    .done(function (response) { 
      $("#formSingUp").trigger("reset")
      $("#alert-success").fadeIn()
      setInterval(function(){ $("#alert-success").fadeOut() }, 3000)
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown)
    })
    
}


/* Local storage */
function saveToken(token){
  localStorage.setItem('token', token)
}