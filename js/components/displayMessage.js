
export function displayMessage(type, message, location){
    const messageContainer = document.querySelector(location)
    messageContainer.classList.remove("success","warning", "error");
    messageContainer.innerHTML = message;
    messageContainer.classList.add("message", type);
}