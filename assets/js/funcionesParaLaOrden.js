// Esta clase contiene funciones que ayudan a la realizacion del pedido


var carritoDeCompras = obtenerCarrito();
var currentValue = 1; // Variable global
var longitudCarritoDeCompras = carritoDeCompras.length;

///////////////////////////////// A C C I O N E S//////////////////////////////////////////


function mostrarLongitudArrayCarrito() {
   // Actualiza el contenido del elemento con el id "longitudCarrito"
   var elementoCarrito = document.getElementById("longitudCarrito");
   elementoCarrito.textContent = longitudCarritoDeCompras;
 
   // Imprime en la consola la cantidad del carrito
   console.log("Cantidad del carrito: " + longitudCarritoDeCompras);
}

function mostrarLosItemsParaElPopUp() {
  var mensaje = "";
  for (var i = 0; i < carritoDeCompras.length; i++) {
    var arrayCarrito = carritoDeCompras[i];
    // var subtotal = arrayCarrito.quantity * parseInt(arrayCarrito.boton);
    // total += subtotal;
    mensaje += arrayCarrito.boton + " x " + arrayCarrito.quantity + ", ";
  }
  mensaje = mensaje.slice(0, -2); // Eliminar la última coma y espacio
  var itemsDelCarrito = document.getElementById("itemsDelCarrito");
  itemsDelCarrito.textContent = mensaje;
  window.onload = function() {
  var miPopUp = document.getElementById('miPopUp');
  var miPopUpContenido = document.getElementById('miPopUpContenido');

  miPopUp.style.display = 'block';
  miPopUpContenido.style.top = (window.innerHeight / 2 - miPopUpContenido.offsetHeight / 2) + 'px';
  miPopUpContenido.style.left = (window.innerWidth / 2 - miPopUpContenido.offsetWidth / 2) + 'px';
};

  
}



// Funcion que suma el valor y cantidad al arrayCarrito, del boton cual fue seleccionado para ejecutar esta accion
function guardarValorYCantidad(valorBoton) {
  var quantityInput = event.target.closest('.down-content').querySelector('.quantity-input');
  var quantityValue = parseInt(quantityInput.value);
  var arrayCarrito = { boton: valorBoton, quantity: quantityValue };

  carritoDeCompras.push(arrayCarrito);
  guardarCarrito(carritoDeCompras);
  console.log("Valor del botón: " + valorBoton + ", cantidad de packs: " + quantityValue);
}


// Funcion que quita el valor y cantidad del array, del boton cual fue seleccionado para ejectuar esta accion
function quitarValorYCantidad(valorBoton) {
  var index = -1;
  for (var i = 0; i < carritoDeCompras.length; i++) {
    var arrayCarrito = carritoDeCompras[i];
    if (arrayCarrito.boton === valorBoton) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    carritoDeCompras.splice(index, 1); // Elimina el item del carrito
    guardarCarrito(carritoDeCompras);
    var quantityInput = document.querySelector('.down-content .quantity-input');
    quantityInput.value = 1; // Resetea la cantidad del input a 1
    console.log("Valor del botón: " + valorBoton + " eliminado del carrito");
  }
}


// // Funcione que realice una viceversa de acciones entre los botones de quitar o agregar pedido, cuando una se muestra la otra se esconde
// function alternarBotones(idBoton1, idBoton2) {
//   var boton1 = document.getElementById(idBoton1);
//   var boton2 = document.getElementById(idBoton2);
  
//   if (boton1.style.display === "none") {
//     boton1.style.display = "block";
//     boton2.style.display = "none";
//   } else {
//     boton1.style.display = "none";
//     boton2.style.display = "block";
//   }
// }


//////////////////////////// A L M A C E N A D O /////////////////////////////////

// Funcion para obtener el carrito y almacenarlo
function obtenerCarrito() {
  var carritoGuardado = localStorage.getItem('carritoDeCompras');
  if (carritoGuardado) {
    return JSON.parse(carritoGuardado);
  }
  return [];
}


// Funcion que guarda el carrito en una memoria local para no perderlo al moverse de pagina
function guardarCarrito(carrito) {
  localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
}

///////////////////////////////// A L M A C E N A D O /////////////////////////////////



//////////////////////////////// E N V I O  ////////////////////////////////

// Funcion que envia un mensaje a whatsapp con el pedido realizado y su cantidad
function enviarCarrito() {
  var total = 0;
  var mensaje = "Mi pedido es: ";
  for (var i = 0; i < carritoDeCompras.length; i++) {
    var arrayCarrito = carritoDeCompras[i];
    // var subtotal = arrayCarrito.quantity * parseInt(arrayCarrito.boton);
    // total += subtotal;
    mensaje += arrayCarrito.boton + " x " + arrayCarrito.quantity + ", ";
  }
  mensaje = mensaje.slice(0, -2); // Eliminar la última coma y espacio
  mensaje = mensaje.replace(/ /g, "%20");
  mensaje += "%0A"
  var enlace = "https://wa.me/543425087441/?text=" + mensaje;
  window.open(enlace);
  resetearCarritoYRecargarPagina()
}
//////////////////////////////// E N V I O  ////////////////////////////////



//////////////////////////////// R E D I R E C C I O N  ////////////////////////////////

// Funcion que resetea el carrito de compras al tocan el boton realizar pedido y recarga la pagina
function resetearCarritoYRecargarPagina() {
  carritoDeCompras = []; // Limpiar carrito
  guardarCarrito(carritoDeCompras); // Guardar carrito vacío en localStorage
 location.reload(); // Recargar página
}

function recargarPaginaYMostrarCantidadCarrito() {
  location.reload()
  mostrarLongitudArrayCarrito()
}

// Funcion que redirige a una pagina
function irAPagina(pagina) {
  window.location.href = pagina;
}

//////////////////////////////// R E D I R E C C I O N  ////////////////////////////////



// Funciones para el quantity
window.addEventListener('load', function() {
  // Obtener todos los elementos con la clase "quantity-input"
  var quantityInputs = document.querySelectorAll(".quantity-input");

  // Iterar sobre los elementos y agregar los eventos a los botones
  quantityInputs.forEach(function(quantityInput) {
    const decreaseButton = quantityInput.previousElementSibling;
    const increaseButton = quantityInput.nextElementSibling;

    function decreaseQuantity() {
      currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    }

    function increaseQuantity() {
      currentValue = parseInt(quantityInput.value);
      if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
      }
    }

    function getValue() {
      currentValue = parseInt(quantityInput.value);
      console.log('Valor actual:', currentValue);
      // Haga algo con el valor actual aquíe
    }

    decreaseButton.addEventListener('click', decreaseQuantity);
    increaseButton.addEventListener('click', increaseQuantity);
    quantityInput.addEventListener('change', getValue);
  });
});
