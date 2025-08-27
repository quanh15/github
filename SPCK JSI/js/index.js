const cart = [];
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPrice = document.getElementById("total-price");
const cartBox = document.getElementById("cart-box");
const cartToggle = document.getElementById("cart-toggle");

cartToggle.addEventListener("click", (e) => {
  e.preventDefault();
  cartBox.classList.toggle("open");
});

function addToCart(product) {
  cart.push(product);
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function clearCart() {
  cart.length = 0;
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ${item.price.toLocaleString()}₫ 
      <button onclick="removeItem(${index})">×</button>`;
    cartItems.appendChild(li);
  });

  cartCount.textContent = cart.length;
  totalPrice.textContent = total.toLocaleString() + "₫";
}
function buyNow(product) {
  addToCart(product);
  alert("Đã thêm sản phẩm vào giỏ. Chuyển đến trang thanh toán...");
  // Giả lập chuyển trang: bạn có thể thay bằng window.location.href
  // window.location.href = "/thanh-toan.html";
}