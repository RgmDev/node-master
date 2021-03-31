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
  let user = {
    name: $("#name").val(),
    surname: $("#surname").val(),
    email: $("#email").val(),
    password: $("#password").val(),
    role: $("input[name=role]:checked").val(),
    image: null
  }
  if($("#image")[0].files.length > 0){
    try{
      let file = $("#image")[0].files[0]
      var data = new FormData();
      data.append("avatar", file);
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
          let response = JSON.parse(this.response)
          user.image = response.data
          createUser(user)
        }
      });
      xhr.open("POST", "/api/uploadAvatar");
      xhr.send(data)
    }catch(e){
      console.log(e)
    }
  }else{
    createUser(user)
  }  
}

function createUser(param){
  let user = JSON.stringify(param)
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