"use strict";

const mainFilter = document.querySelectorAll(".main-filter");
const eachFilterType = document.querySelectorAll(".eachfilter-type");

const siralama = document.querySelector(".siralama");
const listType = document.querySelector(".list-type");

const productContainer = document.querySelector(".product-container");

const catalogBtn = document.getElementById("catalogBtn");
const iconPart = document.querySelectorAll(".icon-part");
const catalogDropmenu = document.getElementById("catalogDropmenu");

const defaultdata = document.querySelector(".default")
const increasinfdata = document.querySelector(".increasing")
const decreasingdata = document.querySelector(".decreasing")

let originalorder= [];

increasinfdata.addEventListener("click",()=>{
  mydata.sort((a,b)=> a.price - b.price);
  renderProducts();
})
decreasingdata.addEventListener("click",()=>{
  mydata.sort((a,b)=> b.price - a.price);
  renderProducts();
})
defaultdata.addEventListener("click",()=>{
  mydata = [...originalorder];
  renderProducts();
})

// Insert start

const categoryList = document.getElementById("categoryList");
const brandList = document.getElementById("brandList");
const sizeList = document.getElementById("sizeList");
const colorList = document.getElementById("colorList");
const typeBoxList = document.querySelectorAll(".type-box");



const brands = ['Emporio Armani', 'Michael Kors', 'Valentino', 'Tory Burch', 'Coach', 'Charles&Keith', 'New Balance',
  'Adidas', 'Nike', 'Ralph Lauren', 'Liu Jo', 'Tommy Hilfiger', 'Armani Exchange', 'Versace Jeans Couture', 'Pinko',
  'Love Moschino', 'Lacoste', 'Marc Jacobs', 'U.S POLO ASSN.', 'Bally', 'Lancome', 'Versace'];
const ssizes = ['xs', 's', 'm', 'l', 'xl', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5',
  '40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5', '45', 'mini', 'small', 'medium', 'large', 'standart'];
const colors = ['black', 'white', 'red', 'green', 'blue', 'brown', 'purple', 'pink', 'orange', 'cream', 'monogram', 'gray'];

const categories = [
  { name: "shoes", values: ['sport-shoes'] },
  { name: "bag", values: ['wallet', 'crossbody-bag', 'handbag'] },
  { name: "clothing", values: ['t-shirt', 'jacket'] },
  { name: "accessories", values: ['watch'] },
  { name: "cosmetics", values: ['perfume-set'] }
];


brands.forEach((brand) => {
  brandList.innerHTML += `<li>
                                <div class="eachfilter-type brandTypeList">${brand}</div>
                            </li>`;
});

ssizes.forEach((size) => {
  sizeList.innerHTML += ` <li>
                                <div class="eachfilter-type sizeTypeList">${size}</div>
                            </li>`;
});

colors.forEach((color) => {
  colorList.innerHTML += ` <li>
                                <div class="eachfilter-type "> <div class="color-type colorTypeList"> <div class="color-box" style="background-color: ${color};"></div>${color} </div> </div>
                            </li>`;
});

categories.forEach(item => {
  const listItem = document.createElement("li");

  const eachFilterTypeDiv = document.createElement("div");
  eachFilterTypeDiv.textContent = item.name.charAt(0).toUpperCase() + item.name.slice(1);
  eachFilterTypeDiv.classList.add("eachfilter-type");
  eachFilterTypeDiv.innerHTML += `<i class="fa-solid fa-chevron-down fa-sm"></i>`;

  const innerUl = document.createElement("ul");
  innerUl.classList.add('type-box');
  innerUl.style.display = "none";

  item.values.forEach(value => {
    const innerLi = document.createElement("li");
    innerLi.textContent = value;

    innerLi.classList.add("type-kind");

    innerUl.appendChild(innerLi);

  });


  listItem.appendChild(eachFilterTypeDiv);
  listItem.appendChild(innerUl);

  

  eachFilterTypeDiv.addEventListener("click", function () {

    if (innerUl.style.display === "none") {
      innerUl.style.display = "block";
    } else if (innerUl.style.display === "block") {
      innerUl.style.display = "none";
    }
  });

  // eachFilterType.forEach(part => {
  //   part.addEventListener('click', function () {
  //     const brandList = this.nextElementSibling;
  //     const mainFilterIcon = this.querySelector(".eachfilter-type i");
  //     brandList.style.display = brandList.style.display === 'none' ? 'block' : 'none';
  
  //     mainFilterIcon.classList.toggle('rotat180deg');
  //   });
  // });

  categoryList.appendChild(listItem);
});


// Insert end

let mydata = [];
let selectedCategories = [];
let selctedBrands = [];
let selctedSizes = [];
let selctedColors = [];

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    originalorder.push(...data)
    adddata(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function adddata(apidata) {
  mydata.push(...apidata);

  const typeKindList = document.querySelectorAll(".type-kind");
  const brandTypeList = document.querySelectorAll(".brandTypeList");
  const sizeTypeList = document.querySelectorAll(".sizeTypeList");
  const colorTypeList = document.querySelectorAll(".colorTypeList");

  typeKindList.forEach((e) => {
    e.addEventListener("click", () => {
      const clickedTextContent = e.textContent;
      console.log('Clicked Text Content:', clickedTextContent);

      const filterIndex = selectedCategories.indexOf(clickedTextContent);
      if (filterIndex === -1) {
        selectedCategories.push(clickedTextContent);
      } else {
        selectedCategories.splice(filterIndex, 1);
      }

      const filteredData = mydata.filter(item => selectedCategories.includes(item.productName));
      renderProducts(filteredData);
    });
  });

  brandTypeList.forEach((e) => {
    e.addEventListener("click", () => {
      e.classList.toggle("blue");
      const clickedTextContent = e.textContent;
      console.log('Clicked Text Content:', clickedTextContent);

      

      const filterIndex = selctedBrands.indexOf(clickedTextContent);
      if (filterIndex === -1) {
        selctedBrands.push(clickedTextContent);
      } else {
        selctedBrands.splice(filterIndex, 1);
      }

      console.log(selctedBrands);
      const filteredData = mydata.filter(item => selctedBrands.includes(item.brand));
      console.log(filteredData);
      renderProducts(filteredData);
      
    });
  });

  sizeTypeList.forEach((e) => {
    e.addEventListener("click", () => {
      const clickedTextContent = e.textContent;
      console.log('Clicked Text Content:', clickedTextContent);

      const filterIndex = selctedSizes.indexOf(clickedTextContent);
      if (filterIndex === -1) {
        selctedSizes.push(clickedTextContent);
      } else {
        selctedSizes.splice(filterIndex, 1);
      }

      const sizes = mydata.filter(product =>
        product.sizes && product.sizes.some(sizeObject => sizeObject.size == clickedTextContent)
      );

      renderProducts(sizes);
    });
  });
  
  colorTypeList.forEach((e) => {
    e.addEventListener("click", () => {
      const clickedTextContent = e.textContent.trim();
      console.log('Clicked Text Content:', clickedTextContent);

      const filterIndex = selctedColors.indexOf(clickedTextContent);
      if (filterIndex === -1) {
        selctedColors.push(clickedTextContent);
      } else {
        selctedColors.splice(filterIndex, 1);
      }
      console.log(selctedColors);
      const filteredData = mydata.filter(item => selctedColors.includes(item.color));
      console.log(filteredData);
      renderProducts(filteredData);
    });
  });

  renderProducts(mydata);
}

function filterByColor(products) {
  return selctedColors.length === 0 ? products : products.filter(product => selctedColors.includes(product.color));
}

function filterBySize(products) {
  return selctedSizes.length === 0 ? products : products.filter(product =>
    product.sizes && product.sizes.some(sizeObject => selctedSizes.includes(sizeObject.size))
  );
}

function filterByBrand(products) {
  return selctedBrands.length === 0 ? products : products.filter(product => selctedBrands.includes(product.brand));
}

function filterByCategory(products) {
  return selectedCategories.length === 0 ? products : products.filter(product => selectedCategories.includes(product.productName));
}

function renderProducts() {
  productContainer.innerHTML = ""; 
  let combinedFilteredData = mydata;

  combinedFilteredData = filterByColor(combinedFilteredData);
  combinedFilteredData = filterBySize(combinedFilteredData);
  combinedFilteredData = filterByBrand(combinedFilteredData);
  combinedFilteredData = filterByCategory(combinedFilteredData);

  console.log(combinedFilteredData);
  
  combinedFilteredData.length > 0 ? (
    combinedFilteredData.forEach((product) => {
      const productLink = `./productpage.html?id=${product.id}`;
      productContainer.innerHTML += `
        <a href="${productLink}" class="eachproduct">
          <div class="img-box"> <img src="${product.image[0]}" alt=""> </div>
          <p>${product.title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
          <span>AZN ${product.price.toFixed(2)}</span>
        </a>
      `;
    })
  ) : productContainer.innerHTML += `<div class="empty-cart">
  <img src="./assets/icons/ghost.svg" alt="">
  <p class="cartinfo">Hecbir məhsul yoxdur</p>
  
</div>
</div> `;

  
}

fetchData();


catalogBtn.addEventListener("click", () => {
  iconPart.forEach((part) => part.classList.toggle("iconClickCatalog"));
  catalogDropmenu.classList.toggle("hidden");
});

mainFilter.forEach(part => {
  part.addEventListener('click', function () {
    const brandList = this.nextElementSibling;
    const mainFilterIcon = this.querySelector(".main-filter i");
    brandList.style.display = brandList.style.display === 'none' ? 'block' : 'none';

    if (brandList.style.display == 'none') {
      mainFilterIcon.classList.remove("fa-minus");
      mainFilterIcon.classList.add("fa-plus");
    } else if (brandList.style.display == 'block') {
      mainFilterIcon.classList.add("fa-minus");
      mainFilterIcon.classList.remove("fa-plus");
    }
  });
});



siralama.addEventListener('click', function () {
  listType.style.display = listType.style.display === 'none' ? 'block' : 'none';
});
 
 