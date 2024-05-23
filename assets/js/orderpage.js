"use strict";

const catalogBtn = document.getElementById("catalogBtn");
const  iconPart = document.querySelectorAll(".icon-part");
const catalogDropmenu = document.getElementById("catalogDropmenu");
const addedproduct_box = document.querySelector(".addedproduct-box");
const order_info = document.querySelector(".order-info");
const cemPrice = document.querySelector(".cemPrice");

catalogBtn.addEventListener("click", () => {
    iconPart.forEach((part) => part.classList.toggle("iconClickCatalog"));
    catalogDropmenu.classList.toggle("hidden");
});

let cartData = JSON.parse(localStorage.getItem("cart"));
console.log(cartData)
displayOrderData();

function displayOrderData() {
    // console.log(data)
    cartData.length > 0 ? (
        cartData?.map(item => {
            addedproduct_box.innerHTML += `<div class="addedproduct">
                        <div class="productinfo">
                            <div class="imgbox"><img src="${item.product_img}" alt=""></div>
                            <p class="information"  style="font-weight: 500; margin-left: 8px;">${item.brand} ${item.product_name}</p>
                        </div>
                        <div class="productprice">
                            <span class="price"  style="font-weight: 700;">${item.price}</span>*<span class="count"  style="font-weight: 700;">${item.quantity}</span>
                        </div>
                </div>
            `
            
        })
    ) : addedproduct_box.innerHTML = `<span>Product Carta Add olunmayb</span>`

    
    
}