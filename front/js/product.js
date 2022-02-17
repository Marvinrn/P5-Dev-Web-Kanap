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
};
showProductsDetails();



let btn = document.getElementById('addToCart')
btn.addEventListener('click', () => {
    let color = document.getElementById('colors').value;
    let quantity = parseInt(document.getElementById('quantity').value);
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (cart == null) {
        //si cart vide crée un nouveau cart 
        cart = {
            [product_id]: {
                [color]: quantity
            }
        }
    } else {
        // on cherche a savoir si dans le cart on a deja notre produit 
        if (cart[product_id]) {
            //si oui, on regarde si on a deja la couleur sélectionnée dans notre cart
            if (cart[product_id][color]) {
                // si oui, on ajoute à cette quantité qu'on à deja une quantité supplémentaire choisi
                cart[product_id][color] += quantity
            } else {
                // sinon, on crée une nouvelle couleur avec sa quantité choisi de base
                cart[product_id][color] = quantity
            }
        } else {
            // si le produit n'existe pas (pas de quantité ni de couleur ni d'id) alors on le crée comme au debut
            cart[product_id] = {
                    [color]: quantity
                }
            
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart))
})






