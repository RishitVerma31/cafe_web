// Retrieve cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display the cart items
function displayCart() {
  const cartList = document.getElementById('cartList');
  const totalPrice = document.getElementById('totalPrice');

  // Clear the cart display
  cartList.innerHTML = '';
  let total = 0; // Reset total price

  // Add each item to the cart display
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'cart-item';

    li.innerHTML = `
      <span>${item.name} - ₹${item.price.toFixed(2)}</span>
      <div class="quantity-controls">
        <button class="quantity-btn" onclick="decreaseQuantity(${index})">−</button>
        <span class="quantity">${item.quantity}</span>
        <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
      </div>
      <button class="remove-button" onclick="removeFromCart(${index})">Remove</button>
    `;

    cartList.appendChild(li);

    // Add item total to the total price
    total += item.price * item.quantity;
  });

  // Update the total price
  totalPrice.textContent = `Total: ₹${total.toFixed(2)}`;
}

// Function to increase quantity
function increaseQuantity(index) {
  cart[index].quantity += 1;
  saveAndRefreshCart();
}

// Function to decrease quantity
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
    saveAndRefreshCart();
  } else {
    removeFromCart(index); // Remove item if quantity reaches 0
  }
}

// Function to remove an item from the cart
function removeFromCart(index) {
  cart.splice(index, 1);
  saveAndRefreshCart();
}

// Save cart to localStorage and refresh the display
function saveAndRefreshCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

// Function to handle checkout
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty. Add some items to proceed!');
    return;
  }

  // Get customer details from input fields
  const name = document.getElementById('customerName').value.trim();
  const email = document.getElementById('customerEmail').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();

  // Basic validation
  if (!name || !email || !phone) {
    alert("Please fill in all customer details before proceeding to checkout.");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const options = {
    key: "rzp_live_wxGqSQbembVkdC", // Replace with your test key
    amount: total * 100,
    currency: "INR",
    name: "Brooks & Café",
    description: "Cart Payment",
    image: "logo1.jpg",
    handler: function (response) {
      alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
      localStorage.removeItem('cart');
      cart = [];
      displayCart();
    },
    prefill: {
      name: name,
      email: email,
      contact: phone
    },
    theme: {
      color: "#431f10"
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();

  rzp.on('payment.failed', function (response) {
    alert("Payment failed: " + response.error.description);
  });
}



// Function to go back to the menu page
function goBack() {
  window.location.href = 'menu.html';
}

// Display the cart on page load
displayCart();
