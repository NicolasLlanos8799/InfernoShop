// Esta clase contiene funciones que ayudan a la realizacion del pedido


var carritoDeSemillas = obtenerCarrito();
function guardarValor(valorBoton) {
  if (!carritoDeSemillas.includes(valorBoton)) {
    carritoDeSemillas.push(valorBoton);
    guardarCarrito(carritoDeSemillas);
    console.log("Valor del botón: " + carritoDeSemillas);
  } else {
    console.log("El valor ya existe en el array: " + valorBoton);
  }
}

function obtenerCarrito() {
  var carritoGuardado = localStorage.getItem('carritoDeSemillas');
  if (carritoGuardado) {
    return JSON.parse(carritoGuardado);
  }
  return [];
}

function guardarCarrito(carrito) {
  localStorage.setItem('carritoDeSemillas', JSON.stringify(carrito));
}

function cambiarColor(idBoton) {
  var boton = document.getElementById(idBoton);
  boton.style.backgroundColor = "green";
}

function enviarCarrito() {
  var mensaje = "Mi pedido: " + carritoDeSemillas.join(", ");
  mensaje = mensaje.replace(/ /g, "%20");
  var enlace = "https://wa.me/543425087441/?text=" + mensaje;
  window.open(enlace);
}

function irAPagina(pagina) {
  window.location.href = pagina;
}
