async function loadProducts() {
  const res = await fetch('products.json');
  const products = await res.json();
  const container = document.getElementById('products');
  container.innerHTML = '';

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'producto';
    card.dataset.categoria = p.categoria; // para filtrar después

    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>${p.descripcion || ''}</p>
      <strong>${p.precio} MXN</strong><br>
      <a href="${p.link}" target="_blank">
        <button>Comprar por WhatsApp</button>
      </a>
    `;

    container.appendChild(card);
  });
}

// Filtrar productos por categoría
function filtrarCategoria(categoria) {
  const productos = document.querySelectorAll('.producto');
  productos.forEach(prod => {
    if (categoria === 'Todos' || prod.dataset.categoria === categoria) {
      prod.style.display = 'block';
    } else {
      prod.style.display = 'none';
    }
  });

  // Cambiar fondo según la categoría
  const fondo = document.body;
  switch (categoria) {
    case 'Reptiles':
      fondo.style.backgroundImage = "url('images/fondo-reptiles.jpg')";
      break;
    case 'Roedores':
      fondo.style.backgroundImage = "url('images/fondo-roedores.jpg')";
      break;
    case 'Gatos':
      fondo.style.backgroundImage = "url('images/fondo-gatos.jpg')";
      break;
    case 'Perros':
      fondo.style.backgroundImage = "url('images/fondo-perros.jpg')";
      break;
    default:
      fondo.style.backgroundImage = "none";
  }

  fondo.style.backgroundSize = "cover";
  fondo.style.backgroundAttachment = "fixed";
}

// Ejecutar al cargar
loadProducts();
