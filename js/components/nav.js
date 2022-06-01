import { getUsername } from "../utils/storage.js";
import { logoutUser } from "../utils/logout.js";


export function createNav() {

    const { pathname } = document.location;
    const username = getUsername();

    let adminLink = "";
    
    if(username === "admin"){
        adminLink = `<li class="nav-item">
                        <a class="nav-link ${pathname === "/html/admin-panel.html" ? "active" : ""}"
                           aria-current =" ${pathname === "/html/admin-panel.html" ? "page" : ""}" 
                           href="/html/admin-panel.html">Panel
                        </a>
                    </li>`;
    }

    let authLink = 
    `<button type="button"
             class="nav-button btn btn-secondary d-flex flex-column pt-2 pb-1 px-lg-2 me-lg-1"
             data-bs-toggle="modal"
             data-bs-target="#loginModal">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="30"
             height="30"
             fill="currentColor"
             class="mx-auto bi bi-person-fill"
             viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
        <h6 class="mx-auto">LOGIN</h6>
    </button>`;

    if(username){
        authLink = 
        `<button type="button"
                 class="nav-button logout-button btn btn-secondary d-flex flex-column pt-2 pb-1 px-lg-2 me-lg-1">      
        <svg xmlns="http://www.w3.org/2000/svg"
             width="30"
             height="30"
             fill="currentColor"
             class="mx-auto bi bi-person-fill"
             viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
        <h6 class="mx-auto">LOGOUT</h6>
    </button>`;
    }
    

    const container = document.querySelector(".header-nav");

    container.innerHTML =  
    `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a href="/">
               <img src="../images/logoRun.png"
                    alt="run logo"
                    width="120"
                    height="70"
                    class="logo"/></a>
            <button class="navbar-toggler" 
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between pt-3 pt-lg-0"
                 id="navbarSupportedContent">
                <ul class="navbar-nav me-lg-auto pl-2 mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link ${pathname === "/" ? "active" : ""}"
                           aria-current =" ${pathname === "/" ? "page" : ""}" 
                           href="/">Home
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${pathname === "/html/products.html" ? "active" : ""}"
                           aria-current =" ${pathname === "/html/products.hmtl" ? "page" : ""}" 
                           href="../html/products.html">Products
                        </a>
                    </li>
                    ${adminLink}
                </ul>
                <div class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <div class="d-flex flex-column flex-lg-row mx-auto mt-lg-1" >
                        ${authLink}
                        ${loginModal}
                        <a href="#">
                           <button class="nav-button btn btn-secondary d-flex flex-column pt-2 pb-1 px-lg-3 me-lg-1"
                                   data-bs-toggle="modal" 
                                   data-bs-target="#cartModal">
                           <svg xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="30"
                                fill="currentColor"
                                class="mx-auto bi bi-cart-fill"
                                viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                            <h6 class="mx-auto">CART</h6>
                            </button></a> 
                        ${cartModal} 
                    </div>
                </div>
            </div>
        </div>
    </nav>`
    logoutUser();
}

const loginModal = 
`<div class="modal fade"
id="loginModal"
tabindex="-1"
aria-labelledby="loginModalLabel"
aria-hidden="true">
<div class="modal-dialog">
   <div class="modal-content">
      <div class="modal-header">
           <h5 class="modal-title" id="loginModalLabel">Login</h5>
           <button type="button"
                   class="btn-close"
                   data-bs-dismiss="modal"
                   aria-label="Close">
           </button>
       </div>
       <div class="modal-body">
           <form class="login-form">
               <div class="mb-3">
                   <label for="loginUsername" class="form-label">Username</label>
                   <input type="email"
                          class="form-control"
                          id="loginUsername"
                          aria-describedby="emailHelp"/>
                   <div id="emailHelp" class="form-text">
                        We'll never share your email with anyone else.
                   </div>
               </div>
               <div class="mb-3">
                   <label for="loginPassword" class="form-label">Password</label>
                   <input type="password"
                          class="form-control"
                          id="loginPassword"/>
               </div>
               <button type="submit" class="btn btn-primary">
                   Sign in
               </button>
           </form>
       </div>
       <div class="modal-footer">
          <div class="message-container"></div>
       </div>
   </div>
</div>
</div>`;

const cartModal = 
`<div class="modal fade" 
      id="cartModal" 
      tabindex="-1" 
      role="dialog" 
      aria-labelledby="cartModalLabel" 
      aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content p-3">
        <div class="modal-header">
           <h5 class="modal-title" id="cartModalLabel">Shopping Cart</h5>
           <button type="button"
                   class="btn-close"
                   data-bs-dismiss="modal"
                   aria-label="Close">
           </button>
       </div>
            <div class="cart-message"></div>
            <div class="d-flex flex-column cart-products"></div>
            <div class="d-flex flex-row justify-content-between align-items-center mt-5">
                <h5>Total price of products:</h5><h5 class="cart-total pr-4"></h5>
            </div>
            <button type="button" class="btn btn-primary btn-lg btn-block my-3">Proseed to Payment</button>
        </div>
    </div>
</div>`;