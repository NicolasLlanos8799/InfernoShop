const riquiButton = document.getElementById("riquiButton");
const loyaltyButton = document.getElementById("loyaltyButton");
const riquiContent = document.getElementById("riquiContent");
const loyaltyContent = document.getElementById("loyaltyContent");
const allproducts = document.querySelectorAll(".allproducts");

document.addEventListener("DOMContentLoaded", function () {
    // Esperar 0.1 segundos (100 milisegundos) antes de ejecutar la función riquiButton
    setTimeout(function () {
        hiddenAll();
    }, 100);
});

function hiddenAll() {
    riquiContent.style.display = "none"; // Muestra el contenido de riquiButton
    loyaltyContent.style.display = "none"; // Oculta el contenido de loyaltyButton
    dataContent.style.display = "none";
}

function riquiButtonAction() {
    riquiContent.style.display = "block"; // Muestra el contenido de riquiButton
    loyaltyContent.style.display = "none"; // Oculta el contenido de loyaltyButton
    dataContent.style.display = "block";
    document.getElementById("labelMarcas").textContent = "RIQUI GENETICS"; // Cambia el texto del elemento con ID "labelMarcas" a "RIQUI GENETICS"
}

function loyaltyButtonAction() {
    loyaltyContent.style.display = "block"; // Muestra el contenido de loyaltyButton
    riquiContent.style.display = "none"; // Oculta el contenido de riquiButton
    dataContent.style.display = "block";
    document.getElementById("labelMarcas").textContent = "LOYALTY GENETICS"; // Cambia el texto del elemento con ID "labelMarcas" a "Nuevo Texto"
}

riquiButton.addEventListener("click", riquiButtonAction);

loyaltyButton.addEventListener("click", loyaltyButtonAction); 
