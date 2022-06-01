import { getCart, saveCart } from "../utils/storage.js";
import { displayMessage } from "./displayMessage.js";


export function cartedProducts(){
    const products = getCart();
    const messageContainer = document.querySelector(".cart-message");
    const productContainer = document.querySelector(".cart-products");
    const totalContainer = document.querySelector(".cart-total");

    messageContainer.className = "cart-message";   
    messageContainer.innerHTML = "";
    productContainer.innerHTML = "";
    

    const priceArray = products.map(function(item) { return item["price"]; });
    const priceArrayConverted = priceArray.map(item=> parseFloat(item, 10));
    let total = priceArrayConverted.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    totalContainer.innerHTML = "$" + total;
    
  
    if(products.length === 0){
        displayMessage("warning", "No items added, add something to the Cart to shop with us at Run :)", ".cart-message"); 
    }

    products.forEach((product, index) => {
        productContainer.innerHTML += 
        `<div class="d-flex flex-row justify-content-between align-items-center p-2 m-1 mt-3 bg-white">
            <a href="../html/product-detail.html?id=${product.id}">
                <img src="${product.img}" style="width: 100px; height:100px; object-fit: cover;" />
            </a>
            <a href="../html/product-detail.html?id=${product.id}">
                <h5>${product.title}</h5>
            </a>
            <h5>$${product.price}</h5>
            <span class="fw-bold text-danger mr-4 pb-3"
                  data-index=${index}>x</span>
        </div>`;
    });

}


export function removeProduct(){
    const removeButtons = document.querySelectorAll("span");

    removeButtons.forEach((button) => {
        button.addEventListener("click", handleClick);
    });

    function handleClick(){
        const currentCart = getCart();
        const itemToRemove = this.dataset.index;
        currentCart.splice(itemToRemove, 1);

        saveCart(currentCart);

        cartedProducts();
        removeProduct();
    };
}

