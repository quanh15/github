
  // Giả lập API lưu trữ giỏ hàng bằng localStorage
  const cartKey = "cartItems";

  function getCartItems() {
    return JSON.parse(localStorage.getItem(cartKey)) || [];
  }

  function saveCartItems(items) {
    localStorage.setItem(cartKey, JSON.stringify(items));
    updateCartUI();
  }

  function addToCart(product) {
    const cart = getCartItems();
    cart.push(product);
    saveCartItems(cart);
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  }

  function clearCart() {
    localStorage.removeItem(cartKey);
    updateCartUI();
  }

  function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price, 0);
  }

  function updateCartUI() {
    const cart = getCartItems();
    const cartList = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const cartCount = document.getElementById("cart-count");

    cartList.innerHTML = "";
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ${item.price.toLocaleString()}₫`;
      cartList.appendChild(li);
    });

    totalPrice.textContent = calculateTotal(cart).toLocaleString() + "₫";
    cartCount.textContent = cart.length;
  }

  function buyNow(product) {
    alert(`Bạn vừa mua ${product.name} với giá ${product.price.toLocaleString()}₫`);
    // Tuỳ bạn xử lý: redirect, tạo hóa đơn, gửi đến backend thật...
  }

  // Gọi hàm để cập nhật UI khi tải trang
  document.addEventListener("DOMContentLoaded", updateCartUI);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Thêm sản phẩm vào giỏ
function addToCart(product) {
  let existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.quantity++;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Hiển thị giỏ hàng
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <div>
          <h4>${item.name}</h4>
          <p>Giá: ${item.price.toLocaleString()}₫</p>
          <p>Số lượng: ${item.quantity}</p>
        </div>
        <button onclick="removeFromCart(${index})">Xóa</button>
      </div>
    `;
  });

  cartCount.innerText = cart.length;
  cartTotal.innerText = total.toLocaleString();
}

// Xóa sản phẩm
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Thanh toán
document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Giỏ hàng trống!");
    return;
  }
  alert("Thanh toán thành công!");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
});

// Toggle sidebar khi bấm icon 🛒
document.getElementById("cart-toggle").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("cart-sidebar").classList.toggle("active");
});

renderCart();
