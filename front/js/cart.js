let itemContainers = document.getElementById('cart__items');
let cart = JSON.parse(localStorage.getItem("cart"));
let quantity = document.getElementsByClassName('itemQuantity');
let deleteItemsBtn = document.getElementsByClassName('deleteItem');
let totalPrice = 0;
let totalQuantity = 0;


function renderCart() {
    totalPrice = 0;
    totalQuantity = 0;
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
                                        <input type="number" class="itemQuantity" onchange="changeQty(this)" name="itemQuantity" min="1" max="100" value="${cart[key][colorKey]}">
                                    </div>
                                    <div class="cart__item__content__settings__delete">
                                        <p onclick="deleteItem(this)" class="deleteItem">Supprimer</p>
                                    </div>
                                </div>
                            </div>
                        </article>`
                    );

                    // calcul et affichage de la quantité totale du panier 
                    totalQuantity += parseInt(cart[key][colorKey]);
                    document.getElementById('totalQuantity').innerHTML = `${totalQuantity}`

                    //calcul et affichage du prix total du panier
                    totalPrice += product.price * cart[key][colorKey]
                    document.getElementById('totalPrice').innerHTML = `${totalPrice}`
                }
            });
    }
}

// change et actualise la quantité des produits dans le cart 
function changeQty(target) {
    let el = target.closest('article');
    quantityChange = target.value
    cart[el.dataset.id][el.dataset.color] = quantityChange

    // supprime le produit si quantité est nulle 
    if (quantityChange == 0) {
        delete cart[el.dataset.id][el.dataset.color]

        if (Object.keys(cart[el.dataset.id]).length == 0) {
            delete cart[el.dataset.id]
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    renderCart();
}


// supprime item du cart
function deleteItem(target) {
    let el = target.closest('article');
    delete cart[el.dataset.id][el.dataset.color]

    if (Object.keys(cart[el.dataset.id]).length == 0) {
        delete cart[el.dataset.id]
    }


    localStorage.setItem('cart', JSON.stringify(cart))
    renderCart();
}

renderCart();