import { saveToken, saveUser } from "./storage.js";
import { displayMessage } from "../components/displayMessage.js";
import { baseUrl } from "../settings/api.js";


export function submitLoginForm(event){
    event.preventDefault();

    const username = document.querySelector("#loginUsername");
    const password = document.querySelector("#loginPassword");

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if(usernameValue.length === 0 || passwordValue.length === 0){
        return displayMessage("warning", "Invalid values", ".message-container");
    }

    proceedLogin(usernameValue, passwordValue);
}

async function proceedLogin(username, password) {
    const url = baseUrl + "auth/local";
    const data = JSON.stringify({ identifier: username, password: password});

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-type": "application/json"
        }
    };

    try{
        const response = await fetch(url, options);
        const json = await response.json();

        if(json.user){
            displayMessage("success", "User logged in", ".message-container");

            saveToken(json.jwt);
            saveUser(json.user);

            location.href = "/html/admin-panel.html";
        }

        if(json.error){
            displayMessage("warning", "Invalid login details", ".message-container");
        }

    }catch(error){
        console.log(error)
        displayMessage("error", "An error occured", ".message-container");;
    }
};

