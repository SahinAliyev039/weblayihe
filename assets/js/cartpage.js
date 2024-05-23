"use strict";

const catalogBtn = document.getElementById("catalogBtn");
const iconPart = document.querySelectorAll(".icon-part");
const catalogDropmenu = document.getElementById("catalogDropmenu");
const addedproduct_container = document.querySelector(".addedproduct-container")

catalogBtn.addEventListener("click", () => {
    iconPart.forEach((part) => part.classList.toggle("iconClickCatalog"));
    catalogDropmenu.classList.toggle("hidden");
});
let cartData = JSON.parse(localStorage.getItem("cart"));
console.log(cartData)
displayCartData()

function displayCartData() {
    // console.log(data)
    cartData.length > 0 ? (
        cartData?.map(item => {
            addedproduct_container.innerHTML += `
                <div class="added-product">
                    <div class="img-box"><img src="${item.product_img}" alt=""></div>
                    <div class="product-info">
                        <p>${item.brand}</p>
                        <span>${item.brand} ${item.product_name}</span>
                        
                    </div>
                    <div class="functions-box">
                        <div class="input-box">
                            <button class="count-btn" onclick='decreaseCount(${item.id}, "${item.size}", "${item.sizeOwnCount}")'><i class="fa-solid fa-minus"></i></button>
                            <input type="text" value="${item.quantity}">
                            <button class="count-btn" onclick='increaseCount(${item.id}, "${item.size}","${item.sizeOwnCount}")'><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <button type="button" class="delete-btn" onclick='deleteFromCart(${item.id}, "${item.size}")'> <i class="fa-regular fa-trash-can"></i> </button>
                    </div>
                </div>
            `
        })
    ) : addedproduct_container.innerHTML = `<div class="emptycart-container">
    <div class="empty-cart">
        <img src="./assets/icons/ghost.svg" alt="">
        <p class="cartinfo">Səbətdə məhsul yoxdur</p>
        <a href="shoppage.html" class="goshopbtn">Mağazaya keç <i class="rightnav-img fa-solid fa-right-long"></i></a>
    </div>
</div> `

}

function deleteFromCart(id, size) {
    console.log('function running');
    console.log(cartData);

    cartData = cartData.filter(item => item.id !== id || item.size !== size);
    console.log(cartData);

    localStorage.setItem('cart', JSON.stringify(cartData));

    addedproduct_container.innerHTML = '';
    displayCartData();
}

function increaseCount(id, size, count) {
    const index = cartData.findIndex(item => item.id === id && item.size === size)
    if (index !== -1) {
        if (cartData[index].quantity < Number(count)) {
            cartData[index].quantity += 1;
        }
        localStorage.setItem('cart', JSON.stringify(cartData));

        addedproduct_container.innerHTML = '';
        displayCartData();
    }
}

function decreaseCount(id, size) {
    const index = cartData.findIndex(item => item.id === id && item.size === size)
    if (index !== -1) {
        if (cartData[index].quantity > 1) {
            cartData[index].quantity -= 1;
        }
        localStorage.setItem('cart', JSON.stringify(cartData));

        addedproduct_container.innerHTML = '';
        displayCartData();
    }
}

