import { baseUrl } from "./settings/api.js";
import { searchProducts } from "./utils/search.js";
import { displayMessage} from "./components/displayMessage.js";
import { productCard } from "./components/products/productCard.js";

const productsUrl = baseUrl + "products";


(async function() {
    const productContainer = document.querySelector(".products");
    productContainer.innerHTML = `<div class="loader">loading...</div>`;

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();
       
        let products = json;
        productCard(products, productContainer);
        searchProducts(products, productContainer, json);


    }catch(error){
        console.log(error)
        displayMessage("error", "An error occured", ".products");
    }
})();