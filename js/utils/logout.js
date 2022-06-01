
export function logoutUser(){
 const button = document.querySelector(".logout-button")

 if(button){
     button.onclick = function(){
         const logoutConfirm = confirm("Are you sure?");

         if(logoutConfirm) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            location.href = "/";
         }
     }
 }
}