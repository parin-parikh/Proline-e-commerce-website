const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");

if(bar){
    bar.addEventListener("click", () => {
        nav.classList.add("active");
    });
}

const close = document.getElementById("close");
if(close){
    close.addEventListener("click", () => {
        nav.classList.remove("active");
    });
}

let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: 'Hoodie Number 1',
        tag: 'p1',
        price: 89,
        inCart: 0
    },
    {
        name: 'Hoodie Number 2',
        tag: 'p2',
        price: 96,
        inCart: 0
    },
    {
        name: 'Hoodie Number 3',
        tag: 'p3',
        price: 108,
        inCart: 0
    },
    {
        name: 'Hoodie Number 4',
        tag: 'p4',
        price: 68,
        inCart: 0
    },
    {
        name: 'Hoodie Number 5',
        tag: 'p5',
        price: 68,
        inCart: 0
    },
    {
        name: 'Hoodie Number 6',
        tag: 'p6',
        price: 88,
        inCart: 0
    },
    {
        name: 'Hoodie Number 7',
        tag: 'p7',
        price: 70,
        inCart: 0
    },
    {
        name: 'Hoodie Number 8',
        tag: 'p8',
        price: 98,
        inCart: 0
    },
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        console.log(products[i]);
        totalCost(products[i]);
    })
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
    } else {
        localStorage.setItem('cartNumbers', 1);
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }

        cartItems[product.tag].inCart += 1; 
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag] : product
        }
    }
    
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
    
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products');
    let cartCost = localStorage.getItem('totalCost');

    
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <img src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">
                $${item.price}
            </div>
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="total">
                $${item.inCart * item.price}.00
            </div>
            `;
        });

        productContainer.innerHTML += `
        <div class = "totalContainer">
            <h4 class = "totalTitle">
                Total
            </h4>
            <h4 class = "total">
                $${cartCost}.00
            </h4>
        `
    }

}

displayCart();