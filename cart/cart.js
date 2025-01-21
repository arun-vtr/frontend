let openshopping = document.querySelector('.shopping');  // The shopping cart icon/button
let closeshopping = document.querySelector('.closeshopping');  // The close button in the cart
let body = document.querySelector('body');  // The body of the page, which will be modified
let list = document.querySelector('.list');  // The list of items (products)
let listcard = document.querySelector('.listcard');  // The list of items in the cart
let total = document.querySelector('.total');  // The total price display
let quantity = document.querySelector('.quality');  // The cart item count display (fixed name)

// Open the shopping cart when the shopping icon is clicked
openshopping.addEventListener('click', () => {
    body.classList.add('active');  // Adds the 'active' class, opening the cart
});

// Close the shopping cart when the close button is clicked
closeshopping.addEventListener('click', () => {
    body.classList.remove('active');  // Removes the 'active' class, closing the cart
});

let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: '1.jpg',
        price: 120000
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: '2.jpg',
        price: 150000
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: '3.jpg',
        price: 200000
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: '4.jpg',
        price: 320000
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: '5.jpg',
        price: 220000
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: '6.jpg',
        price: 420000
    },
];

let listcards = [];

// Initialize app to display products
function iniApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');  // Add 'item' class to the product div
        newDiv.innerHTML = `
            <img src="${value.image}" />
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add to cart</button>
        `;
        list.appendChild(newDiv);
    });
}

// Function to handle adding products to the cart
function addToCart(key) {
    // Find product by its key
    let product = products[key];

    // Check if product is already in the cart
    let itemInCart = listcards.find(item => item.id === product.id);

    if (itemInCart) {
        itemInCart.quantity++;
    } else {
        // If not in the cart, add it with a quantity of 1
        listcards.push({
            ...product,
            quantity: 1
        });
    }

    // Update the cart display and total
    reloadCart();
}

// Function to reload cart and update total
function reloadCart() {
    listcard.innerHTML = '';  // Clear the existing cart items
    let count = 0;
    let totalPrice = 0;

    listcards.forEach((item, index) => {
        let newLi = document.createElement('li');
        newLi.innerHTML = `
            <div class="cart-item">
                <img src="${item.image}" class="cart-img" />
                <div class="cart-details">
                    <div>${item.name}</div>
                    <div>${item.price.toLocaleString()} each</div>
                    <div class="cart-quantity">
                        <button onclick="changeQuantity(${index}, 'decrease')">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 'increase')">+</button>
                    </div>
                </div>
            </div>
        `;
        listcard.appendChild(newLi);

        // Update the total count and price
        count += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    // Update the quantity display and total price
    quantity.innerText = count;
    total.innerText = totalPrice.toLocaleString();
}

// Function to change item quantity in the cart
function changeQuantity(index, action) {
    if (action === 'increase') {
        listcards[index].quantity++;
    } else if (action === 'decrease' && listcards[index].quantity > 1) {
        listcards[index].quantity--;
    } else if (action === 'decrease' && listcards[index].quantity === 1) {
        // If quantity is 1 and user clicks decrease, remove the item
        listcards.splice(index, 1);
    }

    // Update the cart display and total after quantity change
    reloadCart();
}


iniApp();
