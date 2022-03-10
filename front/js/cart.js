let itemContainers = document.getElementById('cart__items');
let cart = JSON.parse(localStorage.getItem("cart"));
let quantity = document.getElementsByClassName('itemQuantity');
let deleteItemsBtn = document.getElementsByClassName('deleteItem');
let totalPrice = 0;
let totalQuantity = 0;


function renderCart (){
    quantity = document.getElementsByClassName('itemQuantity');
    itemContainers.innerHTML = '';
    for (let key in cart) {
        fetch(`http://localhost:3000/api/products/${key}`)
            .then(res => res.json())
            .then(product => {
                for (let colorKey in cart[key]) {
                    itemContainers.insertAdjacentHTML('beforeend',
                        `<article class="cart__item" data-id="${key}" data-color="${colorKey}"> 
                            <div class="cart__item__img">
                                <img src="${product.imageUrl}" alt="${product.altTxt}">
                            </div>
                            <div class="cart__item__content">
                                <div class="cart__item__content__description">
                                    <h2>${product.name}</h2>
                                    <p>${colorKey}</p>
                                    <p>${product.price}€</p>
                                </div>
                                <div class="cart__item__content__settings">
                                    <div class="cart__item__content__settings__quantity">
                                        <p>Qté : ${cart[key][colorKey]} </p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[key][colorKey]}">
                                    </div>
                                    <div class="cart__item__content__settings__delete">
                                        <p class="deleteItem">Supprimer</p>
                                    </div>
                                </div>
                            </div>
                        </article>`
                    );
                    
                    // calcul et affichage de la quantité totale du panier (parseFloat permet de transformer une chaîne de caractères en un nombre flottant après avoir analysée celle-ci)
                    totalQuantity += cart[key][colorKey];
                    document.getElementById('totalQuantity').innerHTML = `${totalQuantity}`
                    
                    //calcul et affichage du prix total du panier
                    totalPrice += product.price * cart[key][colorKey]
                    document.getElementById('totalPrice').innerHTML = `${totalPrice}`

                    handleQuantity();
                    
                }
            });
        }
}

function handleQuantity(){
    // changement de la quantité via input
    for (let i = 0; i < quantity.length; i++) {
        quantity[i].addEventListener('change', (e) => {
            e.preventDefault();
            let el = e.target.closest('article');
            quantityChange = e.target.value
            cart[el.dataset.id][el.dataset.color] = quantityChange
            
            localStorage.setItem('cart', JSON.stringify(cart))
            renderCart();
        })
    }
}

renderCart();





                    // // calcul et affichage de la quantité totale du panier (parseFloat permet de transformer une chaîne de caractères en un nombre flottant après avoir analysée celle-ci)
                    // totalQuantity += parseFloat(cart[key][colorKey]);
                    // document.getElementById('totalQuantity').innerHTML = `${totalQuantity}`
    
                    // //calcul et affichage du prix total du panier
                    // totalPrice += product.price * cart[key][colorKey]
                    // document.getElementById('totalPrice').innerHTML = `${totalPrice}`