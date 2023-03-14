function scrollToProductos(seccion) {
    var linkProductos = document.querySelector('a[href="#productos"]');
    linkProductos.addEventListener('click', function (event) {
       event.preventDefault(); // Evita el comportamiento predeterminado del enlace
       document.querySelector(seccion).scrollIntoView({
          behavior: 'smooth'
       });
    });
 }
 