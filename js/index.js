import { baseUrl } from "./settings/api.js";
import { productCard } from "./components/products/productCard.js";
import { displayMessage } from "./components/displayMessage.js";

const productsUrl = baseUrl + "products";
const heroUrl = baseUrl + "home";


(async function() {
    const heroContainer = document.querySelector(".heroImg");
    heroContainer.innerHTML = `<div class="loader">loading...</div>`;

    try {
       const response = await fetch(heroUrl);
       const json = await response.json();
       const hero = json.hero_banner;

       heroContainer.innerHTML = `<img src="public/${hero.formats.medium.url}"
                                       class="img-fluid"
                                       alt="${json.hero_banner_alt_text}"/>`; 

    }catch(error){
        console.log(error)
        displayMessage("error", "An error occured", ".heroImg");
    }
})();

(async function() {
    const featuredContainer = document.querySelector(".featured");
    featuredContainer.innerHTML = `<div class="loader">loading...</div>`;

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();
        featuredContainer.innerHTML ="";

        productCard(json, featuredContainer);
        
 
    }catch(error){
        console.log(error)
        displayMessage("error", "An error occured", ".featured");
    }
})();
