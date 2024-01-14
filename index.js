// Initialize cart variables
let cartItems = [];
let totalAmount = 0;
let cartCounter = 0;

// Function to close the shopping cart
function closeCart() {
  document.querySelector(".shopping-cart").classList.add("closed");
}

// Function to open the shopping cart
function openCart() {
  document.querySelector(".shopping-cart").classList.remove("closed");
}

// Function to add a product to the cart
function addToCart(name, price, image) {
  // Check if the item is already in the cart
  const existingItem = cartItems.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ name, price, image, quantity: 1 });
  }

  // Update total amount and cart counter
  totalAmount += parseFloat(price.substring(1)); // Convert price to a number
  cartCounter += 1;

  // Update the cart UI
  updateCartUI();
}

// Function to remove a product from the cart
function removeFromCart(name, price) {
  const existingItemIndex = cartItems.findIndex((item) => item.name === name);

  if (existingItemIndex !== -1) {
    const removedItem = cartItems.splice(existingItemIndex, 1)[0];
    // Update total amount and cart counter
    totalAmount -= parseFloat(price.substring(1)) * removedItem.quantity;
    cartCounter -= removedItem.quantity;

    // Update the cart UI
    updateCartUI();
  }
}

// Function to update the cart UI
function updateCartUI() {
  const cartList = document.querySelector(".list-cart");
  const totalAmountElement = document.getElementById("totalAmount");
  const cartCounterElement = document.getElementById("cartCounter");

  const total = document.getElementById("total");
  // Clear the cart list before updating
  cartList.innerHTML = "";

  // Update the cart list
  cartItems.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
            <img class="list-img" src='${item.image}' alt='${item.name}'></img>
            <div>${item.name} x${item.quantity}</div>
            <div>${item.price}</div>
            <button class="remove-btn" onclick="removeFromCart('${item.name}', '${item.price}')">Remove</button>
        `;
    cartList.appendChild(cartItem);
  });

  // Update the total amount and cart counter
  totalAmountElement.textContent = totalAmount.toFixed(2);
  cartCounterElement.textContent = cartCounter;

  total.textContent = totalAmount.toFixed(2);
}

// Event listener for opening the cart
document.querySelector(".bxs-cart").addEventListener("click", openCart);

// Event listener for closing the cart
document.getElementById("closeBtn").addEventListener("click", closeCart);

// Sample product data
const products = [
  {
    name: "Product 1",
    description: "Description of Product 1.",
    price: "$19.99",
    image: "/images/1.png",
  },
  {
    name: "Product 2",
    description: "Description of Product 2.",
    price: "$24.99",
    image: "/images/2.png",
  },
  {
    name: "Product 3",
    description: "Description of Product 3.",
    price: "$29.99",
    image: "/images/3.png",
  },
  {
    name: "Product 4",
    description: "Description of Product 4.",
    price: "$14.99",
    image: "/images/4.png",
  },
  {
    name: "Product 5",
    description: "Description of Product 5.",
    price: "$34.99",
    image: "/images/5.png",
  },
  {
    name: "Product 6",
    description: "Description of Product 6.",
    price: "$39.99",
    image: "/images/6.png",
  },
  {
    name: "Product 7",
    description: "Description of Product 7.",
    price: "$44.99",
    image: "/images/7.png",
  },
  {
    name: "Product 8",
    description: "Description of Product 8.",
    price: "$49.99",
    image: "/images/8.png",
  },
  {
    name: "Product 9",
    description: "Description of Product 9.",
    price: "$54.99",
    image: "/images/1.png",
  },
  {
    name: "Product 10",
    description: "Description of Product 10.",
    price: "$59.99",
    image: "/images/5.png",
  },
  // Nouveaux produits
  {
    name: "Product 11",
    description: "Description of Product 11.",
    price: "$49.99",
    image: "/images/7.png",
  },
  {
    name: "Product 12",
    description: "Description of Product 12.",
    price: "$64.99",
    image: "/images/4.png",
  },
  {
    name: "Product 13",
    description: "Description of Product 13.",
    price: "$39.99",
    image: "/images/2.png",
  },
];

// Display products on the page
const productContainer = document.getElementById("productContainer");
const productCards = products.map((product) => {
  return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="Product Image" />
            </div>
            <div class="product-details">
                <div class="product-title">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">${product.price}</div>
                <div class="product-add" onclick="addToCart('${product.name}', '${product.price}', '${product.image}')">Add to Cart</div>
            </div>
        </div>
    `;
});
productContainer.innerHTML = productCards.join("");

// Display latest products in a separate section
const newProductsContainer = document.getElementById("newProductsContainer");
const latestProducts = products.slice(-3);
latestProducts.forEach((product) => {
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");
  productCard.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="product-details">
            <div class="product-title">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-price">${product.price}</div>
            <div class="product-add" onclick="addToCart('${product.name}', '${product.price}', '${product.image}')">Add to Cart</div>
        </div>
    `;
  newProductsContainer.appendChild(productCard);
});

// Event listener pour le bouton "Purchase"
const purchaseBtn = document.getElementById("purchaseBtn");
if (purchaseBtn) {
  purchaseBtn.addEventListener("click", purchase);
}

// Event listener pour le bouton "Return Back"
const returnBackBtn = document.getElementById("returnBackBtn");
if (returnBackBtn) {
  returnBackBtn.addEventListener("click", closeCheckout);
}

// Function to open the checkout section
function openCheckout() {
  document.getElementById("checkoutSection").classList.remove("closed");
}

// Function to close the checkout section
function closeCheckout() {
  document.getElementById("checkoutSection").classList.add("closed");
}

// Function to handle the purchase
function purchase() {
  // Check if the cart is not empty
  if (cartItems.length === 0) {
    alert("Your cart is empty. Add items before purchasing.");
    return;
  }

  // Prompt the user to choose the payment method
  const paymentMethod = prompt(
    "Choose payment method: Credit Card, PayPal, etc."
  );
  console.log(`Purchasing with ${paymentMethod}`);

  // clear the cart
  cartItems = [];
  totalAmount = 0;
  cartCounter = 0;

  // Update the cart UI
  updateCartUI();

  // Close the checkout section
  closeCheckout();
}
