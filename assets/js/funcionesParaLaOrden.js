// Esta clase contiene funciones que ayudan a la realizacion del pedido


var carritoDeSemillas = obtenerCarrito();
var currentValue = 1; // Variable global

function guardarValor(valorBoton) {
  // if (!carritoDeSemillas.includes(valorBoton)) {
    carritoDeSemillas.push(valorBoton);
    guardarCarrito(carritoDeSemillas);
    console.log("Valor del botón: " + carritoDeSemillas + " cantidad de packs: " + currentValue);
  // } else {
  //   console.log("El valor ya existe en el array: " + valorBoton);
  // }
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
  var mensaje = "Mi pedido de semillas es: ";
  for (var i = 0; i < carritoDeSemillas.length; i++) {
    mensaje += carritoDeSemillas[i] + " x " + currentValue + ", ";
  }
  mensaje = mensaje.slice(0, -2); // Eliminar la última coma y espacio
  mensaje = mensaje.replace(/ /g, "%20");
  var enlace = "https://wa.me/543425087441/?text=" + mensaje;
  window.open(enlace);
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
