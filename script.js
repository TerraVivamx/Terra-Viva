async function loadProducts() {
  const res = await fetch('products.json');
  const products = await res.json();
  const container = document.getElementById('products');
  container.innerHTML = '';

products.forEach(p => {
  const card = document.createElement('div');
  card.className = 'product';
  card.dataset.category = p.category;

  // Convertir precio a número por si viene como texto
  const price = parseFloat(p.price);

  // --- BLOQUE DE PRECIO Y DESCUENTO ---
  let priceHTML = `<strong>${price.toFixed(2)} MXN</strong>`;
  if (p.discount && p.discount > 0) {
    const newPrice = (price * (1 - p.discount / 100)).toFixed(2);
    priceHTML = `
      <p style="text-decoration: line-through; color: #888;">${price.toFixed(2)} MXN</p>
      <strong style="color:#25d366;">${newPrice} MXN (${p.discount}% OFF)</strong>
    `;
  }

  // --- ESTRUCTURA DE LA TARJETA ---
  card.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p>${p.description || ''}</p>
    ${priceHTML}<br>
    <button onclick="sendWhatsAppMessage('${p.name}')">Comprar vía WhatsApp</button>
  `;

  container.appendChild(card);
});
}

// --- FUNCIÓN PARA ENVIAR MENSAJE DE WHATSAPP ---
function sendWhatsAppMessage(productName) {
  const phone = "5215525621060"; // ← cambia por tu número con LADA (sin + ni espacios)
  const message = `Hola! Estoy interesado en el producto "${productName}". ¿Podrías darme más información?`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// --- FUNCIÓN PARA FILTRAR CATEGORÍAS ---
function filterCategory(category) {
  const products = document.querySelectorAll('.product');
  products.forEach(prod => {
    prod.style.opacity = '0';
    setTimeout(() => {
      if (category === 'Todos' || prod.dataset.category === category) {
        prod.style.display = 'block';
        setTimeout(() => (prod.style.opacity = '1'), 100);
      } else {
        prod.style.opacity = '0';
        setTimeout(() => (prod.style.display = 'none'), 300);
      }
    }, 200);
  });

  // Cambiar fondo
  const bg = document.body;
  switch (category) {
    case 'Reptiles':
      bg.style.backgroundImage = "url('images/IMG_1932.jpeg')";
      break;
    case 'Artículos Aves':
      bg.style.backgroundImage = "url('images/IMG_1938.jpeg')";
      break;
    case 'Roedores':
      bg.style.backgroundImage = "url('images/IMG_1940.jpeg')";
      break;
    case 'Artículos Gatos':
      bg.style.backgroundImage = "url('images/IMG_1935.jpeg')";
      break;
    case 'Artículos Perros':
      bg.style.backgroundImage = "url('images/IMG_1934.gif')";
      break;
    case 'Mamíferos':
      bg.style.backgroundImage = "url('images/IMG_1933.webp')";
      break;
    default:
      bg.style.backgroundImage = "none";
  }

  bg.style.backgroundSize = "cover";
  bg.style.backgroundAttachment = "fixed";
}

// --- CARGA AUTOMÁTICA ---
loadProducts();
<script>
const imagenesHero = [
  "https://via.placeholder.com/600x600?text=Tortuga",
  "https://via.placeholder.com/600x600?text=Hurón",
  "https://via.placeholder.com/600x600?text=Iguana"
];

let indice = 0;
const heroImg = document.getElementById("heroImg");

setInterval(() => {
  indice = (indice + 1) % imagenesHero.length;
  heroImg.src = imagenesHero[indice];
}, 4000);
</script>