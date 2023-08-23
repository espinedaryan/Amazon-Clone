export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`); // takes the quantity selected from the options.
    const quantity = Number(quantitySelector.value); // converts it to a Number
  
    if (matchingItem) { // If matching Item is already in the cart, add the selected quantity to it.
      matchingItem.quantity += quantity;
    } else { // If it's still not on the cart, add it to the cart with the productID and selected quantity.
      cart.push({
        productId,
        quantity
      });
    }

    saveToStorage();
  }

export function removeFromCart(productId) {
  cart = cart.filter((cartItem) => {
    return cartItem.productId !== productId;
  })

  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}