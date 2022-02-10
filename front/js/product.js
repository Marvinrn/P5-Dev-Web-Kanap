const item__img = document.querySelector('.item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
//const colors = document.getElementById('colors');

//methode pour récupérer l'id dans URL et retirer le ? avec split//
const product_id = window.location.search.split("?").join('');
console.log(product_id);

let productDetails = [];


const fetchProductsDetails = async () => {
    await fetch(`http://localhost:3000/api/products/${product_id}`)
    .then(res => res.json())
    .then((res) => {
        productDetails = res
        console.log(productDetails);
    });
};

const showProductsDetails = async () => {
    await fetchProductsDetails();
  
    item__img.innerHTML = 
    `<img src="${productDetails.imageUrl}" alt="${productDetails.altTxt}">`;

    title.innerHTML = 
    `${productDetails.name}`;

    price.innerHTML = 
    `${productDetails.price}`;

    description.innerHTML = 
    `${productDetails.description}`;

    /*colors.innerHTML = 
    `<option value="${productDetails.colors[0]}">${productDetails.colors[0]}</option>
    <option value="${productDetails.colors[1]}">${productDetails.colors[1]}</option>
    <option value="${productDetails.colors[2]}">${productDetails.colors[2]}</option>
    <option value="${productDetails.colors[3]}">${productDetails.colors[3]}</option>
    `;*/
    
    let colors = productDetails['colors']
    let select = document.getElementById('colors');
    for(var i = 0; i < colors.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = colors[i];
        opt.value = colors[i];
        select.appendChild(opt);
    }


  };
  
  showProductsDetails();

