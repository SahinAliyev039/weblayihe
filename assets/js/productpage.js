"use strict";
let sizesDisplayed = false;
let selectedSize = null;
let selectedSizeCount = 0;
const catalogBtn = document.getElementById("catalogBtn");
const iconPart = document.querySelectorAll(".icon-part");
const catalogDropmenu = document.getElementById("catalogDropmenu");
const productId = getProductIdFromUrl();

catalogBtn.addEventListener("click", () => {
    iconPart.forEach((part) => part.classList.toggle("iconClickCatalog"));
    catalogDropmenu.classList.toggle("hidden");
});

fetch(`http://localhost:3000/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        displayProductDetail(product);
    });

function displaySizes(sizes) {
    if (!sizesDisplayed) {
        sizes.map(item => {
            console.log("item", item)
            document.querySelector(".sizes").innerHTML += `
                    <div class='size' onclick="inStock(${JSON.stringify(item).replace(/"/g, '&quot;')})">${item.size}</div>
                `
        })
        sizesDisplayed = true
    }
}

function inStock({ size, count }) {
    const in_stock = document.querySelector('.in-stock');
    count === 0 ? in_stock.innerHTML = "Stokda yoxdur!" : in_stock.innerHTML = "Stokda var!";
    if (count !== 0) {
        selectedSize = size;
        selectedSizeCount = count;
    } else {
        selectedSize = null;
        selectedSizeCount = 0;
    }
}

function displayProductDetail(product) {
    const productinfo = document.querySelector('.product-section');
    console.log("product", product)


    productinfo.innerHTML = `
        <div class="container product-container">
            <div class="product-info">
                <a href="" class="category-type">${product.productName}</a>
                <h3 class="product-name">${product.title}</h3>
                <span class="text-brend">Brend: <a href="" class="brand-name">${product.brand}</a> </span>
                <p class="code-text">SKU: <span class="product-code">sku018</span></p>
                <p class="price">${product.price}AZN</p>
                <h3 class="word-tes">Təsvir:</h3>
                <p class="product-text">${product.description}</p>
            </div>
            <div class="product-img">
                <button class="img-box"><img src="${product.image[0]}" alt=""></button>
                <div class="product-slide">
                    <button class="manage-button left-btn"><i class="fa-solid fa-angle-left"></i></button>
                    <div class="slide-img-container">
                            ${product.image.map((e) => {
                                return `<button class="img-btn"><img src="${e}" alt=""></button>`
                            })}
                    </div>
                    <button class="manage-button right-btn"><i class="fa-solid fa-chevron-right"></i></button>
                </div>
            </div>
            <div class="addtocart">
                <button onclick="displaySizes(${JSON.stringify(product.sizes).replace(/"/g, '&quot;')})" id="display">Ölçü seç</button>
                <div class="sizes"></div>
                <button type="button" class="addcart-btn" onclick='postToCart(${product.id}, "${product.image[0]}", "${product.brand}", "${product.productName}", "${product.price}")'>Səbətə əlavə et</button>
                <div class="in-stock"></div>
            </div>
        </div>
    `;
}

function getProductIdFromUrl() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('id');
}

function postToCart(prodId, prodImg, prodBrand, prodName, prodPrice) {
    if (selectedSize && selectedSizeCount > 0) {

        const cartItem = {
            id: prodId,
            quantity: 1,
            size: selectedSize,
            product_img: prodImg,
            brand: prodBrand,
            product_name: prodName,
            sizeOwnCount: selectedSizeCount,
            price: prodPrice,
        }

        const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];

        const existingCartItem = existingCartItems.find(item => item.id === cartItem.id && item.size === cartItem.size);

        if (existingCartItem) {
            existingCartItem.quantity += 1;
        } else {
            existingCartItems.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(existingCartItems));

        console.log("Cart updated:", existingCartItems);

    }

}