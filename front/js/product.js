const item__img = document.querySelector('.item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
//const colors = document.getElementById('colors');

//methode pour récupérer l'id dans URL//
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product_id = urlParams.get('id')
//console.log(product_id);

let productDetails = [];


const fetchProductsDetails = async () => {
    await fetch(`http://localhost:3000/api/products/${product_id}`)
        .then(res => res.json())
        .then((res) => {
            productDetails = res
            /*console.log(productDetails)*/;
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


    let colors = productDetails['colors']
    let select = document.getElementById('colors');
    for (var i = 0; i < colors.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = colors[i];
        option.value = colors[i];
        select.appendChild(option);
    }

    addToCart(productDetails);
};
showProductsDetails();



const addToCart = () => {
    let btn = document.getElementById('addToCart')
    btn.addEventListener('click', () => {
        let select = document.getElementById('colors');
        let quantity = document.getElementById('quantity');

        const returnedValue = Object.assign( productDetails, {
            colors : `${select.value}`,
            quantity: `${quantity.value}`,
        })

        console.log(returnedValue);

        let cart = JSON.parse(localStorage.getItem("product"));

        if (cart == null) {
            cart = [];
            cart.push(productDetails)
            console.log(cart);
            localStorage.setItem('product', JSON.stringify(cart))

        } else{
            cart.push(productDetails)
            console.log(cart);
            localStorage.setItem('product', JSON.stringify(cart))
        }
    })
}



/*const addToCart = () => {

}*/



