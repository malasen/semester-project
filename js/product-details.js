import {baseUrl} from "./settings/api.js";
import { getCart, saveCart } from "./utils/storage.js";
import {displayMessage} from "./components/displayMessage.js";
import { cartedProducts, removeProduct } from "./components/cart.js";

const container = document.querySelector(".product-container");
container.innerHTML="loading..";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = baseUrl+"products/"+id;

async function fetchProduct() {
    try{
        const response = await fetch(url);
        const json = await response.json();
        createHtml(json);
    }catch(error){
        console.log(error)
        displayMessage("error", "An error occured", ".product-container");
    }
}
fetchProduct();

function createHtml(product){  
    let imageUrl = `<img src="${product.image_url}" class="product-img" 
                          alt="${product.image_url}" />`
    if(!product.image_url){
        imageUrl = `<img src="../public/${product.image.url}" class="product-img"  
                          alt="${product.image.alternativeText}" />`;
    }

    let imageUrlData = product.image_url;
    if(!product.image_url){
        imageUrlData = `../public/${product.image.url}`;
    }

    container.innerHTML = ` </div><h3>${product.title}</h3>
                            ${imageUrl}
                            <h5 class="mt-2">Description</h5>
                            <p>${product.description}</p>
                            <h4>$${product.price}</h4>
                            
                            <button style="width: 100%" 
                                           type="button" 
                                           class="btn btn-primary add-to-cart-button" 
                                           data-id=${product.id}
                                           data-title=${product.title}
                                           data-price=${product.price}
                                           data-img=${imageUrlData}>
                                <h6>Add to Cart</h6>
                            </button>
                            <div class="product-message"></div>
                            `;
                            
                          
    const button = document.querySelector(".add-to-cart-button");
    button.addEventListener("click", addToCart);                  
}

function addToCart(){
    const id = this.dataset.id;
    const title = this.dataset.title;
    const price = this.dataset.price;
    const img = this.dataset.img;

    const currentCart = getCart();
    const product = {id, title, price, img};

    currentCart.push(product)
    
    saveCart(currentCart);
    displayMessage("success", "Item Added", ".product-message");
    cartedProducts();
    removeProduct();
}



