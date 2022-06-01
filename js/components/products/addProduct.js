import { displayMessage } from "../displayMessage.js";
import { getToken } from "../../utils/storage.js";
import { baseUrl } from "../../settings/api.js";


export function submitProductForm(event){
    event.preventDefault();
    const message = document.querySelector(".modal-message");
    message.innerHTML = "";
    
    const title = document.querySelector("#product-title");
    const price = document.querySelector("#product-price");
    const featured = document.querySelector("#btnradio1");
    const  description = document.querySelector("#product-description");
    const img = document.querySelector("#product-img-url");
    
    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const imgValue = img.value.trim();

    let featuredValue = "false";
    if(featured.checked){
        featuredValue = "true";
    }
    
    if(titleValue.length === 0 || isNaN(priceValue) || priceValue.length === 0 || descriptionValue.length === 0|| imgValue.length === 0){
        return displayMessage("warning", "Please fill inn all values", ".modal-message");
    }

    addProduct(titleValue, priceValue, descriptionValue, featuredValue, imgValue);
}



export async function addProduct(title, price, description, featured, image_url){

    const form = document.querySelector("#add-product-form");
    const data = JSON.stringify({title: title, price: price, description: description, featured: featured, image_url: image_url});
    const token = getToken();

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    };

    try{
        const url = baseUrl + "products";
        const response = await fetch(url, options);
        const json = await response.json();
        
        if(json.created_at) {
            displayMessage("success", "Product created", ".modal-message");
            form.reset(); 
        }
        if(json.error){
            displayMessage("error", json.message, ".modal-message")
        }
    }catch(error){
        console.log(error)
        displayMessage("error", "An error occured", ".modal-message");
    }


}
