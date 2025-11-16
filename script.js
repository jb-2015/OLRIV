// Cargar productos desde JSON
fetch('/products.json')
    .then(response => response.json())
    .then(data => {
        const productosContainer = document.getElementById('productos');
        data.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'producto-card';
            card.innerHTML = `
                <img src="${producto.image}" alt="${producto.name}">
                <div class="producto-info">
                    <h3>${producto.name}</h3>
                    <p>${producto.description}</p>
                    <p class="producto-precio">$${producto.price}</p>
                    <a href="https://wa.me/5492664848066?text=Hola,%20quiero%20información%20sobre:%20${encodeURIComponent(producto.name)}" class="btn-whatsapp" target="_blank">Consultar por WhatsApp</a>
                </div>
            `;
            productosContainer.appendChild(card);
        });
    })
    .catch(error => console.error('Error cargando productos:', error));

// Menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});