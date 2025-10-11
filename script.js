async function loadProducts() {
  const res = await fetch('products.json');
  const products = await res.json();
  const container = document.getElementById('products');
  container.innerHTML = '';

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product';
    card.dataset.category = p.category; // para filtrar después

    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description || ''}</p>
      <strong>${p.price} MXN</strong><br>
      <button onclick="sendWhatsAppMessage('${p.name}')">Comprar vía WhatsApp</button>
    `;

    container.appendChild(card);
  });
}

// Filtrar productos por categoría con animación
function filterCategory(category) {
  const products = document.querySelectorAll('.product');
  products.forEach(prod => {
    prod.style.opacity = '0'; // empieza invisible
    setTimeout(() => {
      if (category === 'Todos' || prod.dataset.category === category) {
        prod.style.display = 'block';
        setTimeout(() => (prod.style.opacity = '1'), 100); // fade in
      } else {
        prod.style.opacity = '0'; // fade out
        setTimeout(() => (prod.style.display = 'none'), 300);
      }
    }, 200);
  });

  // Cambiar fondo según la categoría
  const bg = document.body;
  switch (category) {
    case 'Reptiles':
      bg.style.backgroundImage = "url('images/bg-reptiles.jpg')";
      break;
    case 'Roedores':
      bg.style.backgroundImage = "url('images/bg-roedores.jpg')";
      break;
    case 'Gatos':
      bg.style.backgroundImage = "url('images/bg-gatos.jpg')";
      break;
    case 'Perros':
      bg.style.backgroundImage = "url('images/bg-perros.jpg')";
      break;
    default:
      bg.style.backgroundImage = "none";
  }

  bg.style.backgroundSize = "cover";
  bg.style.backgroundAttachment = "fixed";
}

// Cargar productos al iniciar
loadProducts();
function sendWhatsAppMessage(productName) {
  const phone = "5215523456789"; // ← cambia por tu número con lada (sin + ni espacios)
  const message = `Hola! Estoy interesado en el producto "${productName}". ¿Podrías darme más información?`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}
