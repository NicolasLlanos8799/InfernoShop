const riquiButton = document.getElementById("riquiButton");
const loyaltyButton = document.getElementById("loyaltyButton");
const riquiContent = document.getElementById("riquiContent");
const loyaltyContent = document.getElementById("loyaltyContent");
const allproducts = document.querySelectorAll(".allproducts");

document.addEventListener("DOMContentLoaded", function() {

});

riquiButton.addEventListener("click", function() {
    riquiContent.style.display = "block"; // Muestra el contenido de riquiButton
    loyaltyContent.style.display = "none"; // Oculta el contenido de loyaltyButton
});

loyaltyButton.addEventListener("click", function() {
    loyaltyContent.style.display = "block"; // Muestra el contenido de loyaltyButton
    riquiContent.style.display = "none"; // Oculta el contenido de riquiButton
});
