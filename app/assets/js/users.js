function register(){

  let user = JSON.stringify({
    name: $("#name").val(),
    surname: $("#surname").val(),
    email: $("#email").val(),
    password: $("#password").val(),
    role: $("input[name=role]:checked").val()
  })
  var settings = {
    "url": "http://localhost:3000/api/users",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "data" : user
  };
  $.ajax(settings)
    .done(function (response) { 
      console.log(response)
      $("#formSingUp").trigger("reset")
      $("#alert-success").fadeIn()
      setInterval(function(){ $("#alert-success").fadeOut() }, 3000)
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown)
    })   

}