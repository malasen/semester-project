import { getToken } from "../../utils/storage.js";
import { displayMessage } from "../displayMessage.js";
import { baseUrl } from "../../settings/api.js";

export function deleteProduct(){
    const deleteButtons = document.querySelectorAll(".delete-row");

    deleteButtons.forEach((button) => {
        button.onclick = async function(){
            const id = this.parentNode.parentNode.id;
            const url = baseUrl + "products/" + id;
            const token = getToken();

            const deleteConfirm = confirm("Are you sure?");

            if(deleteConfirm) {
                const options = {
                    method: "DELETE",
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
    });
};

