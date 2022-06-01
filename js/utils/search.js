import { productCard } from "../components/products/productCard.js";
import { displayMessage } from "../components/displayMessage.js";

export function searchProducts(products, productContainer, json){
    const filterInput = document.querySelector(".search");

    filterInput.onkeyup = function(){
        products = json;

        const searchValue = event.target.value.trim().toLowerCase();
       
        const filteredProducts = products.filter(function(product){
            if(product.title.toLowerCase().includes(searchValue) || product.description.includes(searchValue)) {
                return true;
            }
        });
        
        products = filteredProducts;

        if(products.length === 0){
            displayMessage("warning", "No results to display", ".message");
        }else{
            const messageContainer = document.querySelector(".message");
            messageContainer.innerHTML = "";
            messageContainer.className = "col mx-3 message";
        }

        productCard(products, productContainer);
    };
}