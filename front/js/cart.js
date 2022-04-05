let itemContainers = document.getElementById('cart__items');
let cart = JSON.parse(localStorage.getItem("cart"));
let quantity = document.getElementsByClassName('itemQuantity');
let deleteItemsBtn = document.getElementsByClassName('deleteItem');
let totalPrice = 0;
let totalQuantity = 0;

// fonction pour afficher nos éléments du cart 
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

//Fonction pour gérer le formulaire + envoie des données du formulaire a l'api pour recevoir code de confirmation
function getFormData() {
    let form = document.getElementsByClassName('cart__order__form')

    form[0].addEventListener('submit', (e) => {
        let firstName = document.getElementById('firstName')
        let lastName = document.getElementById('lastName')
        let address = document.getElementById('address')
        let city = document.getElementById('city')
        let email = document.getElementById('email')


        let firstNameErrorMsg = document.getElementById('firstNameErrorMsg')
        let lastNameErrorMsg = document.getElementById('lastNameErrorMsg')
        let addressErrorMsg = document.getElementById('addressErrorMsg')
        let cityErrorMsg = document.getElementById('cityErrorMsg')
        let emailErrorMsg = document.getElementById('emailErrorMsg')

        // initialisation de error = 0 pour envoie du post if(error == 0)
        let error = 0;

        // initialisation des regex
        let regFirstName = new RegExp(/^[a-zA-Z]{2,25}$/g)
        let regLastName = new RegExp(/^[a-zA-Z\s]{2,40}$/g)
        let regAddress = new RegExp(/^[a-zA-Z0-9\s]{2,40}$/g)
        let regCity = new RegExp(/^[a-zA-Z\s]{2,40}$/g)
        let regEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g)

        let order = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value
            },
            // pour récupérer les keys (id) du cart
            products: Object.keys(cart)
        }

        //validation des champs du formulaire avec reg.test
        if (!regFirstName.test(firstName.value)) {
            error++;
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner un prénom valide'
        }

        if (!regLastName.test(lastName.value)) {
            error++;
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner un nom valide'
        }

        if (!regAddress.test(address.value)) {
            error++;
            addressErrorMsg.innerHTML = 'Veuillez renseigner une adresse valide'
        }

        if (!regCity.test(city.value)) {
            error++;
            cityErrorMsg.innerHTML = 'Veuillez renseigner une ville valide'
        }

        if (!regEmail.test(email.value)) {
            error++;
            emailErrorMsg.innerHTML = 'Veuillez renseigner un email valide'
        }


        // si pas d'erreur et que le cart n'est pas vide, on envoie le formulaire et les produits a l'api pour recevoir un order-id
        if (error == 0 && cart) {
            fetch('http://localhost:3000/api/products/order',
                {
                    method: 'POST',
                    body: JSON.stringify(order),
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                .then((response) => response.json())
                .then((data) => {
                    // redirection vers la page de confirmation et met l'orderId dans l'url
                    window.location.href = `confirmation.html?orderId=${data.orderId}`
                })


        }


        localStorage.setItem('order', JSON.stringify(order))
        e.preventDefault()
    })
}

getFormData();


