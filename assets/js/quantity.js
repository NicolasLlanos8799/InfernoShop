window.addEventListener('load', function() {
    const decreaseButton = document.querySelector('.decrease-button');
    const increaseButton = document.querySelector('.increase-button');
    const quantityInput = document.querySelector('.quantity-input');
  
    function decreaseQuantity() {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    }
  
    function increaseQuantity() {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
      }
    }
  
    decreaseButton.addEventListener('click', decreaseQuantity);
    increaseButton.addEventListener('click', increaseQuantity);
  });
  