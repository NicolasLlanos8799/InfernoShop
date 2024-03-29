// Esta clase contiene funciones que ayudan a la realizacion del pedido


var carritoDeCompras = obtenerCarrito();
var currentValue = 1; // Variable global
var longitudCarritoDeCompras = carritoDeCompras.length;

///////////////////////////////// A C C I O N E S//////////////////////////////////////////

// Muestra la cantidad del carrito cuando inicia la pagina
function mostrarLongitudArrayCarrito() {
  // Actualiza el contenido del elemento con el id "longitudCarrito"
  var elementoCarrito = document.getElementById("longitudCarrito");
  elementoCarrito.textContent = longitudCarritoDeCompras;

  // Imprime en la consola la cantidad del carrito
  console.log("Cantidad del carrito: " + longitudCarritoDeCompras);
}



// Muestra los items del carrito de compras en un popup. Los separa por tipo (semillas o aceites)
// y los muestra en una lista con un botón para eliminar cada uno.
// function mostrarLosItemsParaElPopUp() {
//   // Variables para almacenar los items separados por tipo
//   // Botón para eliminar cada item
//   // Recorre el carrito de compras y agrega cada item a la lista correspondiente
  
function mostrarLosItemsParaElPopUp() {
  var articulosDeSemillas = "<h6>Semillas: </h6>";
  var articulosDeAceites = "<h6>Aceites: </h6>";
  var articulosDeFertilizantes = "<h6>Fertilizantes: </h6>";

  for (var i = 0; i < carritoDeCompras.length; i++) {
    var arrayCarrito = carritoDeCompras[i];
    var boton = arrayCarrito.boton;
    var quantity = arrayCarrito.quantity;
    var botonEliminar = "<img src='assets/images/trash.svg' alt='Eliminar' class='eliminar-btn blanco' data-index='" + i + "' data-item='" + boton + "'>";

    if (boton.includes("semillas")) {
      articulosDeSemillas += "<li>" + boton.replace(",semillas", "") + " x " + quantity + botonEliminar + "</li>";
    } else if (boton.includes("aceites")) {
      articulosDeAceites += "<li>" + boton.replace(",aceites", "") + " x " + quantity + botonEliminar + "</li>";
    } else if (boton.includes("fertilizantes")) {
      articulosDeFertilizantes += "<li>" + boton.replace(",fertilizantes", "") + " x " + quantity + botonEliminar + "</li>";
    }
  }

  if (carritoDeCompras.some(item => item.boton.includes("semillas"))) {
    articulosDeSemillas = "<ul>" + articulosDeSemillas + "</ul>";
  } else {
    articulosDeSemillas = "";
  }

  if (carritoDeCompras.some(item => item.boton.includes("aceites"))) {
    articulosDeAceites = "<ul>" + articulosDeAceites + "</ul>";
  } else {
    articulosDeAceites = "";
  }

  if (carritoDeCompras.some(item => item.boton.includes("fertilizantes"))) {
    articulosDeFertilizantes = "<ul>" + articulosDeFertilizantes + "</ul>";
  } else {
    articulosDeFertilizantes = "";
  }

  var itemsDelCarrito = document.getElementById("itemsDelCarrito");
  itemsDelCarrito.innerHTML = articulosDeSemillas + articulosDeAceites + articulosDeFertilizantes;

  // Agregar un listener para el evento click en cada botón de eliminar item
  var botonesEliminar = document.querySelectorAll('.eliminar-btn');
  for (var i = 0; i < botonesEliminar.length; i++) {
    botonesEliminar[i].addEventListener('click', function(e) {
      var item = e.target.getAttribute('data-item');
      quitarValorYCantidad(item);
      mostrarLosItemsParaElPopUp();
    });
  }
}






// Funcion que suma el valor y cantidad al arrayCarrito, del boton cual fue seleccionado para ejecutar esta accion
function guardarValorYCantidad(valorBoton) {
  var quantityInput = event.target.closest('.down-content').querySelector('.quantity-input');
  var quantityValue = parseInt(quantityInput.value);
  var arrayCarrito = { boton: valorBoton, quantity: quantityValue };

  carritoDeCompras.push(arrayCarrito);
  guardarCarrito(carritoDeCompras);
  console.log("Valor del botón: " + valorBoton + ", cantidad de packs: " + quantityValue);
  longitudCarritoDeCompras = carritoDeCompras.length;
  actualizarCarritoEnPagina(arrayCarrito); // Agregar el producto al carrito en la página
}

function actualizarCarritoEnPagina(producto) {
  // Crear un nuevo elemento HTML para el producto y agregarlo al carrito
  var nuevoElemento = document.createElement('div');
  nuevoElemento.textContent = 'Producto: ' + producto.boton + ', Cantidad: ' + producto.quantity;
  var contenedorCarrito = document.getElementById('itemsDelCarrito');
  contenedorCarrito.appendChild(nuevoElemento);
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

    longitudCarritoDeCompras = carritoDeCompras.length; // Actualiza la longitud del carrito
    
    mostrarLongitudArrayCarrito(); // Actualiza la cantidad en la página
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

// La función realizarPedido() llama a las funciones calcularTotal() y generarMensaje() para obtener el total de la compra y generar el mensaje de pedido
//  respectivamente. Luego, construye un enlace de WhatsApp y lo abre en una nueva ventana, y finalmente llama a la función 
//  resetearCarritoYRecargarPagina() para limpiar el carrito de compras y recargar la página.
function realizarPedido() {
  var total = calcularTotal();
  var mensaje = generarMensaje();
  var enlace = "https://wa.me/543426392425/?text=" + mensaje;
  window.open(enlace);
  resetearCarritoYRecargarPagina();
}

// La función calcularTotal() itera sobre los elementos del carrito de compras y, aunque el código está comentado,
//  debería calcular el subtotal de cada elemento y sumarlos al total de la compra.
function calcularTotal() {
  var total = 0;
  for (var i = 0; i < carritoDeCompras.length; i++) {
    var arrayCarrito = carritoDeCompras[i];
    var boton = arrayCarrito.boton;
    var quantity = arrayCarrito.quantity;
    // var subtotal = quantity * parseInt(boton.slice(boton.indexOf("$") + 1));
    // total += subtotal;
  }
  return total;
}

// La función generarMensaje() construye un mensaje para el pedido, separando los productos en dos categorías: semillas y aceites. Luego, utiliza some() para verificar si 
// hay algún elemento en el carrito de compras correspondiente a cada categoría, y si es así, construye el mensaje correspondiente, eliminando la última coma y espacio,
//  reemplazando los espacios por %20 y agregando %0A al final para indicar un salto de línea. 
//  Si no hay elementos en alguna categoría, devuelve una cadena vacía en su lugar.
function generarMensaje() {
  var mensajeSemillas = "Mi pedido de semillas: ";
  var mensajeAceites = "Mi pedido de aceites: ";
  var mensajeFertilizantes = "Mi pedido de fertilizantes: ";

  for (var i = 0; i < carritoDeCompras.length; i++) {
    var arrayCarrito = carritoDeCompras[i];
    var boton = arrayCarrito.boton;
    var quantity = arrayCarrito.quantity;

    if (boton.includes("semillas")) {
      mensajeSemillas += boton.replace(",semillas", "") + " x " + quantity + ", ";
    } else if (boton.includes("aceites")) {
      mensajeAceites += boton.replace(",aceites", "") + " x " + quantity + ", ";
    } else if (boton.includes("fertilizantes")) {
      mensajeFertilizantes += boton.replace(",fertilizantes", "") + " x " + quantity + ", ";
    }
  }

  if (carritoDeCompras.some(item => item.boton.includes("semillas"))) {
    mensajeSemillas = mensajeSemillas.slice(0, -2); // Eliminar la última coma y espacio
    mensajeSemillas = mensajeSemillas.replace(/ /g, "%20");
    mensajeSemillas += "%0A";
  } else {
    mensajeSemillas = "";
  }

  if (carritoDeCompras.some(item => item.boton.includes("aceites"))) {
    mensajeAceites = mensajeAceites.slice(0, -2); // Eliminar la última coma y espacio
    mensajeAceites = mensajeAceites.replace(/ /g, "%20");
    mensajeAceites += "%0A";
  } else {
    mensajeAceites = "";
  }

  if (carritoDeCompras.some(item => item.boton.includes("fertilizantes"))) {
    mensajeFertilizantes = mensajeFertilizantes.slice(0, -2); // Eliminar la última coma y espacio
    mensajeFertilizantes = mensajeFertilizantes.replace(/ /g, "%20");
    mensajeFertilizantes += "%0A";
  } else {
    mensajeFertilizantes = "";
  }

  return mensajeSemillas + mensajeAceites + mensajeFertilizantes;
}


//////////////////////////////// E N V I O  ////////////////////////////////



//////////////////////////////// R E D I R E C C I O N  ////////////////////////////////

// Funcion que resetea el carrito de compras al tocan el boton realizar pedido y recarga la pagina
function resetearCarritoYRecargarPagina() {
  carritoDeCompras = []; // Limpiar carrito
  guardarCarrito(carritoDeCompras); // Guardar carrito vacío en localStorage
  location.reload(); // Recargar página
}

// Funcion que redirige a una pagina
function irAPagina(pagina) {
  window.location.href = pagina;
}

//////////////////////////////// R E D I R E C C I O N  ////////////////////////////////



// Funciones para el quantity
window.addEventListener('load', function () {
  // Obtener todos los elementos con la clase "quantity-input"
  var quantityInputs = document.querySelectorAll(".quantity-input");

  // Iterar sobre los elementos y agregar los eventos a los botones
  quantityInputs.forEach(function (quantityInput) {
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
