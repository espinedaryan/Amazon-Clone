import {cart, removeFromCart, calculateCartQuantity, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js'
import {formatCurrency} from './utils/money.js';

updateCartQuantity();
let checkoutHTML = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }

        
    });
    const { id, image, name, priceCents } = matchingProduct;

    checkoutHTML += `
    <div class="cart-item-container js-cart-item-container-${id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${name}
            </div>
            <div class="product-price">
                $${formatCurrency(priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label js-quantity-label-${id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${id}">
                    Update
                </span>
                <input type="number" class="quantity-input js-quantity-input-${id}">
                <span class="save-quantity-link link-primary" data-product-id="${productId}">
                    Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${id}">
                    Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${id}">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${id}">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${id}">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    `;
});

document.querySelector('.js-order-summary').innerHTML = checkoutHTML;

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;

            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
            updateCartQuantity();
        });
    });

function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();

    document.querySelector('.js-checkout-items-quantity').innerHTML = `${cartQuantity} items`;
}

document.querySelectorAll('.js-update-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);

            container.classList.add('is-editing-quantity');

            const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
            quantityInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    const productId = link.dataset.productId;

                    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
                    const newQuantity = Number(quantityInput.value);

                    if (newQuantity < 0 || newQuantity >= 1000) {
                        alert('Quantity must be at least 0 and less than 1000');
                        return;
                    }
                    const container = document.querySelector(`.js-cart-item-container-${productId}`);
                    container.classList.remove('is-editing-quantity');

                    updateQuantity(productId, newQuantity);

                    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
                    quantityLabel.innerHTML = newQuantity;

                    updateCartQuantity();
                }
            });
        });
    });

document.querySelectorAll('.save-quantity-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;

            const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
            const newQuantity = Number(quantityInput.value);

            if (newQuantity < 0 || newQuantity >= 1000) {
                alert('Quantity must be at least 0 and less than 1000');
                return;
            }
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.remove('is-editing-quantity');

            updateQuantity(productId, newQuantity);

            const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
            quantityLabel.innerHTML = newQuantity;

            updateCartQuantity();
        });
    });