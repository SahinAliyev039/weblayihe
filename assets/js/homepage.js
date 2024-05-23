"use strict";

let myData = [];

async function fetchData() {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
  
      adddata(data)
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function adddata(products){
    myData.push(...products)
}
  fetchData();

  function funcchange(){
    const uygundata = document.querySelector('.uldata')
    const myinput =  document.querySelector(".axtaris")
    const datacon = document.querySelector('.uygundatalar')
    datacon.innerHTML = ""
    const inputval = myinput.value.toLowerCase();
    console.log(inputval);

    if(myinput.value.length > 2){
        let li = document.createElement("li")


        const filtersearch = myData.filter(item=>item.brand.toLowerCase().includes(inputval))
    
        filtersearch.map((item)=>{
            let productlink  = `./productpage.html?id=${item.id}`
            return  datacon.innerHTML+=`
            <a class="searchList" href="${productlink}"><li>${item.brand} --- ${item.productName}</li></a>
            `
        })
    }
}

const catalogBtn = document.getElementById("catalogBtn");
const  iconPart = document.querySelectorAll(".icon-part");
const catalogDropmenu = document.getElementById("catalogDropmenu");
const burgerMenu = document.querySelector(".burgerMenu");
const burgerMenuNav = document.getElementById("burgerMenuNav");

catalogBtn.addEventListener("click", () => {
    iconPart.forEach((part) => part.classList.toggle("iconClickCatalog"));
    catalogDropmenu.classList.toggle("hidden");
});

burgerMenu.addEventListener("click", () => {
    burgerMenuNav.classList.toggle("hidden");
});

