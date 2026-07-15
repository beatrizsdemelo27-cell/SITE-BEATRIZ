/*
==========================================
MENU
==========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".header");

    if (!header) return;

    function updateHeader(){

        if(window.scrollY > 50){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader);

});