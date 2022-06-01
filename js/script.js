import { createNav } from "./components/nav.js";
import { createFooter } from "./components/footer.js";
import { submitLoginForm } from "./utils/login.js";
import { cartedProducts, removeProduct } from "./components/cart.js";


createNav();

const form = document.querySelector(".login-form");
if(form){
    form.addEventListener("submit", submitLoginForm);
}


cartedProducts();

removeProduct();

createFooter();

