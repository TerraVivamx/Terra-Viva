async function loadProducts() {
  const res = await fetch('products.json');
  const products = await res.json();
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <strong>${p.price}</strong><br>
      <a href="https://wa.me/525525621060?text=Hola,%20me%20interesa%20el%20producto:%20${encodeURIComponent(p.name)}" target="_blank">
        <button>Comprar por WhatsApp</button>
      </a>
    `;
    container.appendChild(card);
  });
}
loadProducts();
