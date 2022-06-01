import { baseUrl } from "./settings/api.js";
import { displayMessage } from "./components/displayMessage.js";
import { productTable } from "./components/products/productTable.js";
import { submitProductForm } from "./components/products/addProduct.js";
import { deleteProduct } from "./components/products/deleteProduct.js";
import { editProduct } from "./components/products/editProduct.js";

const productsUrl = baseUrl + "products";
const form = document.querySelector("#add-product-form");

form.addEventListener("submit", submitProductForm);

(async function() {
    const productContainer = document.querySelector(".product-table");
    productContainer.innerHTML = `<div class="loader">loading...</div>`;

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();
       
        let products = json;
        productTable(productContainer, products);
        deleteProduct();
        editProduct(productContainer, products);
        


    }catch(error){
        console.log(error)
        displayMessage("error", "An error occured", ".product-table");
    }
})();

