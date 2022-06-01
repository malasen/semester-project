import { baseUrl } from "../../settings/api.js";
import { displayMessage } from "../displayMessage.js";
import { getToken } from "../../utils/storage.js";



export function editProduct(container, product){
    const editButtons = document.querySelectorAll(".edit-row");

    editButtons.forEach((button) => {
        button.addEventListener("click", handleClick);
    });

    function handleClick(){
        const editContainer = this.parentNode.parentNode;
        const currentId = this.parentNode.parentNode.id;
        const parsedId = parseInt(currentId);
        const currentProduct = product.find(findId);

        function findId(product){
            if(product.id === parsedId){
                return true;
            }
        }

        createTable(editContainer, currentProduct);
        
        const editForm = document.querySelector(".edit-form");
        const closeButton = document.querySelector(".btn-edit-close");
        
        closeButton.onclick=()=> location.reload();
        

        if(editForm){
            const id = document.querySelector("#edit-id");
            const title = document.querySelector("#edit-title");
            const price = document.querySelector("#edit-price");
            const featured = document.querySelector("#btnradio1");
            const  description = document.querySelector("#edit-description");
            const img = document.querySelector("#edit-image");
            const message = document.querySelector(".edit-message");
    
            editForm.addEventListener("submit", submitEditForm);
            
            function submitEditForm(event) {
                event.preventDefault();
     
                message.innerHTML= "";
   
                const idValue = id.value;
                const titleValue = title.value.trim();
                const priceValue = parseFloat(price.value);
                const descriptionValue = description.value.trim();
                const imgValue = img.value.trim();

                let featuredValue = "false";
                if(featured.checked){
                   featuredValue = "true";
                }
    
                if(titleValue.length === 0 || isNaN(priceValue) || priceValue.length === 0 || descriptionValue.length === 0, imgValue.length === 0){
                    return displayMessage("warning", "Please fill inn all values", ".edit-message");
                }
  
                updateProduct(idValue, titleValue, priceValue, descriptionValue, featuredValue, imgValue);
            }
   
            async function updateProduct(id, title, price, description, featured, image_url){
                const url = baseUrl + "products/" + id;
                const data = JSON.stringify({title: title, price: price, description: description, featured: featured, image_url: image_url});
                const token = getToken();
   
                const options = {
                    method: "PUT",
                    body: data,
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };

                try{
                    const response = await fetch(url, options);
                    const json = await response.json();
                    location.reload();

                }catch(error){
                    console.log(error);
                    displayMessage("error", "an error occured", ".edit-message");
                }
            };        
        };
    };

    function createTable(container, currentProduct){
        let imageUrlData = currentProduct.image_url;
        if(!currentProduct.image_url){
            imageUrlData = `../public/${currentProduct.image.url}`;
        }

        let featuredCheck = `<th scope="row">Featured</th>
        <td colspan="2">
            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" value="yes" autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="btnradio1">Yes</label>
                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" value="no" autocomplete="off">
                <label class="btn btn-outline-danger" for="btnradio2">No</label>
            </div>
        </td>`;

        if(currentProduct.featured === false){
            featuredCheck = `<th scope="row">Featured</th>
            <td colspan="2">
                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" name="btnradio" id="btnradio1" value="yes" autocomplete="off">
                    <label class="btn btn-outline-primary" for="btnradio1">Yes</label>
                    <input type="radio" class="btn-check" name="btnradio" id="btnradio2" value="no" autocomplete="off" checked>
                    <label class="btn btn-outline-danger" for="btnradio2">No</label>
                </div>
            </td>`
        }
           
            
        container.innerHTML=
        `<th class="table-secondary" scope="row" colspan="6">${currentProduct.id}
            <form class="edit-form">
                <input type="hidden" class="form-control" id="edit-id" value="${currentProduct.id}" />
                <table class="table table-borderless table-secondary">
                    <tr>
                        <th scope="row">Title</th>
                        <td colspan="2"><input type="text" class="form-control" id="edit-title" value="${currentProduct.title}" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Price</th>
                        <td colspan="2"><input type="text" class="form-control" id="edit-price" value="${currentProduct.price}" /></td>
                    </tr>
                    <tr>
                        ${featuredCheck}
                    </tr>
                    <tr>
                        <th scope="row">Image URL</th>
                        <td colspan="2"><input type="text" class="form-control" id="edit-image" value="${imageUrlData}"></input></td>            
                    </tr>
                    <tr>
                        <th scope="row">Description</th>
                        <td colspan="2"><textarea style="height: 350px" type="text" class="form-control" id="edit-description">${currentProduct.description}</textarea></td>
                    </tr>
                    <tr>
                        <th scope="row"></th>
                        <td><button type="submit" class="btn btn-block btn-primary">Submit</button>
                        <td><button type="button" class="btn btn-secondary btn-edit-close">Cancel</button>
                    </tr>
                </table>
            </form>
        </th>`;
    };
};