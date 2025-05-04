let currentUser = null;
let cart = [];
let services = [
  { id: 1, title: 'Word', price: 25 },
  { id: 2, title: 'Excel', price: 25 },
  { id: 3, title: 'PowerPoint', price: 25 },
  { id: 4, title: 'Atividade com prazo', price: 50 },
  { id: 5, title: 'Atividade sem prazo', price: 30 }
];

const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');
const mainPanel = document.getElementById('main-panel');
const usernameSpan = document.getElementById('username');
const serviceList = document.getElementById('service-list');
const cartItemsDiv = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
const cartSection = document.getElementById('cart-section');
const profilePhoto = document.getElementById('profile-photo');
const profileMenu = document.getElementById('profile-menu');
const orderListDiv = document.getElementById('order-list');

function showLogin() {
  loginContainer.classList.remove('hidden');
  registerContainer.classList.add('hidden');
}

function showRegister() {
  registerContainer.classList.remove('hidden');
  loginContainer.classList.add('hidden');
}

function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if (email && password) {
    // Simulando login (em um caso real, deve verificar em banco de dados)
    currentUser = { email: email, name: email.split('@')[0] };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUI();
    showMainPanel();
  } else {
    document.getElementById('login-message').innerText = 'Por favor, insira todos os campos.';
  }
}

function register() {
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  if (name && email && password) {
    // Simulando registro (em um caso real, deve salvar no banco de dados)
    alert('Conta criada com sucesso!');
    showLogin();
  } else {
    document.getElementById('register-message').innerText = 'Por favor, preencha todos os campos.';
  }
}

function showMainPanel() {
  loginContainer.classList.add('hidden');
  registerContainer.classList.add('hidden');
  mainPanel.classList.remove('hidden');
}

function toggleSection(section) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(s => s.classList.add('hidden'));

  if (section === 'services') {
    loadServices();
    document.getElementById('services-section').classList.remove('hidden');
  } else if (section === 'cart') {
    loadCart();
    document.getElementById('cart-section').classList.remove('hidden');
  } else if (section === 'orders') {
    loadOrders();
    document.getElementById('orders-section').classList.remove('hidden');
  }
}

function loadServices() {
  serviceList.innerHTML = '';
  services.forEach(service => {
    const serviceCard = document.getElementById('service-template').content.cloneNode(true);
    serviceCard.querySelector('.service-title').textContent = service.title;
    serviceCard.querySelector('.service-price').textContent = `R$ ${service.price}`;
    serviceCard.querySelector('.add-to-cart').onclick = () => addToCart(service);
    serviceList.appendChild(serviceCard);
  });
}

function addToCart(service) {
  cart.push(service);
  alert(`${service.title} adicionado ao carrinho!`);
  updateCartTotal();
}

function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotalSpan.textContent = total.toFixed(2);
}

function loadCart() {
  cartItemsDiv.innerHTML = '';
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `<p>${item.title}</p><p>R$ ${item.price}</p>`;
    cartItemsDiv.appendChild(cartItem);
  });
}

function applyCoupon() {
  const coupon = document.getElementById('coupon').value;
  if (coupon === 'DESCONTO') {
    alert('Cupom de desconto aplicado!');
    const discount = cart.reduce((sum, item) => sum + item.price, 0) * 0.10;
    const newTotal = cart.reduce((sum, item) => sum + item.price, 0) - discount;
    cartTotalSpan.textContent = newTotal.toFixed(2);
  } else {
    alert('Cupom inválido.');
  }
}

function confirmPayment() {
  alert('Pagamento confirmado! Seu pedido será enviado em breve.');
  cart = [];
  updateCartTotal();
  toggleSection('orders');
}

function updateProfilePhoto(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function() {
      profilePhoto.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

function toggleProfileMenu() {
  profileMenu.classList.toggle('hidden');
}

function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  alert('Você saiu da sua conta.');
  showLogin();
}

function loadOrders() {
  orderListDiv.innerHTML = '';
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.forEach(order => {
    const orderItem = document.createElement('div');
    orderItem.innerHTML = `<p>Pedido: ${order.title}</p><p>Status: ${order.status}</p>`;
    orderListDiv.appendChild(orderItem);
  });
}

// Iniciar o usuário se já tiver logado anteriormente
window.onload = function() {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    updateUI();
    showMainPanel();
  }
};

function updateUI() {
  if (currentUser) {
    usernameSpan.textContent = currentUser.name;
    profilePhoto.src = currentUser.profilePhoto || 'default-profile.png';
  }
}
