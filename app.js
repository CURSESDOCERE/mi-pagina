const URL_API = "PEGA_AQUI_TU_URL";

let adminActivo = "";
let empleadoActual = {};

function login(){

let usuario = document.getElementById("usuario").value;
let password = document.getElementById("password").value;

fetch(URL_API,{
method:"POST",
headers:{"Content-Type":"application/x-www-form-urlencoded"},
body:"accion=login&usuario="+usuario+"&password="+password
})
.then(res=>res.text())
.then(data=>{

if(data.startsWith("OK")){
 adminActivo = usuario;
 localStorage.setItem("admin",usuario);
 window.location.href="panel.html";
}else{
 document.getElementById("msg").innerText="Credenciales incorrectas";
}

});

}

function buscarEmpleado(){

let id = document.getElementById("buscarID").value;

fetch(URL_API,{
method:"POST",
headers:{"Content-Type":"application/x-www-form-urlencoded"},
body:"accion=buscarEmpleado&id="+id
})
.then(res=>res.text())
.then(data=>{

if(data=="NO_EXISTE"){
 document.getElementById("ficha").innerHTML="Empleado no encontrado";
 return;
}

let info = data.split("|");

empleadoActual = {
 id: info[1],
 nombre: info[2]
};

document.getElementById("ficha").innerHTML =
"<b>"+info[2]+"</b><br>Tel: "+info[3]+"<br>Tarjeta: "+info[4];

document.getElementById("acciones").style.display="block";

});

}

function registrar(estado){

let admin = localStorage.getItem("admin");

fetch(URL_API,{
method:"POST",
headers:{"Content-Type":"application/x-www-form-urlencoded"},
body:
"accion=registrarEvento"+
"&id="+empleadoActual.id+
"&nombre="+empleadoActual.nombre+
"&estado="+estado+
"&admin="+admin
})
.then(res=>res.text())
.then(data=>{
alert("Registro guardado");
});

}
