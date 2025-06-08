// Function to add items to the cart
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve existing cart from localStorage or initialize empty



// Function to navigate to the cart page
function goToCart() {
  window.location.href = 'cart.html'; // Redirect to cart page
}

// Function to filter menu items based on search input
function filterMenu() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach((item) => {
    const itemName = item.querySelector('h3').textContent.toLowerCase();
    if (itemName.includes(searchInput)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
function addToCart(itemName, itemPrice) {
    // Check if cart already contains the item
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === itemName);
  
    if (existingItem) {
      // If item already exists, increase its quantity
      existingItem.quantity += 1;
    } else {
      // Otherwise, add a new item with quantity = 1
      cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
  
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${itemName} added to cart!`);
  }
  