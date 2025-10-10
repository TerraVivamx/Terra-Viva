async function loadProducts() {
  const res = await fetch('products.json');
  const products = await res.json();
  const container = document.getElementById('products');
  container.innerHTML = '';

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product';
    card.dataset.category = p.category; // for filtering later

    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description || ''}</p>
      <strong>${p.price} MXN</strong><br>
      <a href="${p.link}" target="_blank">
        <button>Buy via WhatsApp</button>
      </a>
    `;

    container.appendChild(card);
  });
}

// Filter products by category
function filterCategory(category) {
  const products = document.querySelectorAll('.product');
  products.forEach(prod => {
    if (category === 'All' || prod.dataset.category === category) {
      prod.style.display = 'block';
    } else {
      prod.style.display = 'none';
    }
  });

  // Change background according to category
  const bg = document.body;
  switch (category) {
    case 'Reptiles':
      bg.style.backgroundImage = "url('images/bg-reptiles.jpg')";
      break;
    case 'Rodents':
      bg.style.backgroundImage = "url('images/bg-rodents.jpg')";
      break;
    case 'Cats':
      bg.style.backgroundImage = "url('images/bg-cats.jpg')";
      break;
    case 'Dogs':
      bg.style.backgroundImage = "url('images/bg-dogs.jpg')";
      break;
    default:
      bg.style.backgroundImage = "none";
  }

  bg.style.backgroundSize = "cover";
  bg.style.backgroundAttachment = "fixed";
}

// Load products when page opens
loadProducts();
