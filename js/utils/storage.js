const tokenKey = "token";
const userKey = "user";
const cartKey = "cart";

export function saveToken(token) {
    saveToStorage(tokenKey, token)
}

export function getToken() {
    return getFromStorage(tokenKey);
}

export function saveUser(user){
    saveToStorage(userKey, user);
}

export function getUsername() {
    const user = getFromStorage(userKey);

    if(user) {
        return user.username;
    }
    return null;
}

export function saveCart(cart){
    saveToStorage(cartKey, cart);
}

export function getCart(){
    return getFromStorage(cartKey);
}

export function clearStorage() {
    localStorage.clear();
}


function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    const value = localStorage.getItem(key);

    if(!value) {
        return [];
    }

    return JSON.parse(value);
}