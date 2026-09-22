// Inicialización de Framework7
var app = new Framework7({
  root: '#app',
  name: 'Food Order',
  id: 'com.foodorder.app',
  theme: 'auto'
});

var $$ = Dom7;
var cartCount = 0;
var cartItems = [];

function updateCartBadge() {
  var badge = $$('#cart-count');
  badge.text(cartCount);

  if (cartCount > 0) {
    badge.addClass('visible');
  } else {
    badge.removeClass('visible');
  }
}

// Agregar productos al carrito
$$(document).on('click', '.add-button', function (e) {
  e.preventDefault();

  var card = $$(this).closest('.product-card');
  var product = card.attr('data-product');
  var price = card.attr('data-price');

  cartCount += 1;
  cartItems.push({
    name: product,
    price: Number(price)
  });

  updateCartBadge();

  app.toast.create({
    text: product + ' agregado al carrito',
    closeTimeout: 1600,
    position: 'center'
  }).open();
});

// Promoción de pizza
$$(document).on('click', '#order-now', function (e) {
  e.preventDefault();

  app.dialog.alert(
    'Promoción seleccionada. ¡Tu pizza está lista para ordenar!',
    'Free Pizza'
  );
});

// Perfil desde navbar
$$(document).on('click', '.profile-button', function (e) {
  e.preventDefault();
  showProfile();
});

// Navegación inferior y enlaces del panel
$$(document).on('click', '.toolbar-link, .menu-link', function (e) {
  e.preventDefault();

  var section = $$(this).attr('data-section');

  if (section === 'home') {
    app.toast.create({
      text: 'Ya estás en Inicio',
      closeTimeout: 1200,
      position: 'center'
    }).open();
  }

  if (section === 'cart') {
    showCart();
  }

  if (section === 'profile') {
    showProfile();
  }
});

function showCart() {
  if (cartItems.length === 0) {
    app.dialog.alert('Todavía no has agregado productos.', 'Carrito');
    return;
  }

  var total = cartItems.reduce(function (sum, item) {
    return sum + item.price;
  }, 0);

  var itemsText = cartItems
    .map(function (item) {
      return '• ' + item.name + ' — $' + item.price.toFixed(2);
    })
    .join('<br>');

  app.dialog.alert(
    itemsText + '<br><br><b>Total: $' + total.toFixed(2) + '</b>',
    'Tu carrito'
  );
}

function showProfile() {
  app.dialog.alert(
    'Aquí puedes colocar la información del perfil del usuario.',
    'Perfil'
  );
}
