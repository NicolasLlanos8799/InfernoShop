// Esta clase contiene funciones que ayudan a la realizacion del pedido


var carritoDeSemillas = obtenerCarrito();
var currentValue = 1; // Variable global

function guardarValorYCantidad(valorBoton) {
  var quantityInput = event.target.closest('.down-content').querySelector('.quantity-input');
  var quantityValue = parseInt(quantityInput.value);
  var item = { boton: valorBoton, quantity: quantityValue };

  carritoDeSemillas.push(item);
  guardarCarrito(carritoDeSemillas);
  console.log("Valor del botón: " + valorBoton + ", cantidad de packs: " + quantityValue);
}

function quitarDelPedido(valorBoton) {
  var index = -1;
  for (var i = 0; i < carritoDeSemillas.length; i++) {
    var item = carritoDeSemillas[i];
    if (item.boton === valorBoton) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    carritoDeSemillas.splice(index, 1); // Elimina el item del carrito
    guardarCarrito(carritoDeSemillas);
    var quantityInput = document.querySelector('.down-content .quantity-input');
    quantityInput.value = 1; // Resetea la cantidad del input a 1
    console.log("Valor del botón: " + valorBoton + " eliminado del carrito");
  }
}
function alternarBotones(idBoton1, idBoton2 ) {
  var boton1 = document.getElementById(idBoton1);
  var boton2 = document.getElementById(idBoton2);
  
  if (boton1.style.display === "none") {
    boton1.style.display = "block";
    boton2.style.display = "none";
  } else {
    boton1.style.display = "none";
    boton2.style.display = "block";
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

// function cambiarColor(idBoton) {
//   var boton = document.getElementById(idBoton);
//   boton.style.backgroundColor = "green";
// }

function enviarCarrito() {
  var total = 0;
  var mensaje = "Mi pedido de semillas es: ";
  for (var i = 0; i < carritoDeSemillas.length; i++) {
    var item = carritoDeSemillas[i];
    var subtotal = item.quantity * parseInt(item.boton);
    total += subtotal;
    mensaje += item.boton + " x " + item.quantity + ", ";
  }
  mensaje = mensaje.slice(0, -2); // Eliminar la última coma y espacio
  mensaje = mensaje.replace(/ /g, "%20");
  mensaje += "%0A"
  var enlace = "https://wa.me/543425087441/?text=" + mensaje;
  window.open(enlace);
  resetearCarritoYRecargarPagina()
}

function resetearCarritoYRecargarPagina() {
  carritoDeSemillas = []; // Limpiar carrito
  guardarCarrito(carritoDeSemillas); // Guardar carrito vacío en localStorage
  location.reload(); // Recargar página
}

function irAPagina(pagina) {
  window.location.href = pagina;
}

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
