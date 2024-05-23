"use strict";

const catalogBtn = document.getElementById("catalogBtn");
const  iconPart = document.querySelectorAll(".icon-part");
const catalogDropmenu = document.getElementById("catalogDropmenu");

catalogBtn.addEventListener("click", () => {
    iconPart.forEach((part) => part.classList.toggle("iconClickCatalog"));
    catalogDropmenu.classList.toggle("hidden");
});

