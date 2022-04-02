const items = document.getElementById('items');
let products;

// appel de l'api avec fetch 
const fetchProducts = async () => {
  products = await fetch('http://localhost:3000/api/products')
    .then(res => res.json());
}

// fonction pour afficher nos produits
const showProducts = async () => {
  await fetchProducts();

  items.innerHTML = (
    products.map(product => (
      `<a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`
    )).join('')
  )
}

showProducts();