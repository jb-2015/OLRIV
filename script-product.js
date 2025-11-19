// Obtener el ID del producto desde la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

if (!productId) {
    document.getElementById('producto-content').innerHTML = `
        <h1>Error</h1>
        <p>No se especificó un producto válido. <a href="index.html">Volver al catálogo</a>.</p>
    `;
} else {
    // Cargar productos desde JSON
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const producto = data.find(p => p.id === productId);
            if (!producto) {
                document.getElementById('producto-content').innerHTML = `
                    <h1>Producto no encontrado</h1>
                    <p>El producto solicitado no existe. <a href="index.html">Volver al catálogo</a>.</p>
                `;
                return;
            }

            // Actualizar meta tags dinámicamente
            document.getElementById('page-title').textContent = `${producto.name} - Mi Tienda`;
            document.getElementById('page-description').content = producto.description;
            document.querySelector('meta[property="og:title"]').content = `${producto.name} - Mi Tienda`;
            document.querySelector('meta[property="og:description"]').content = producto.description;
            document.querySelector('meta[property="og:image"]').content = producto.image;

            // Crear galería de imágenes
            let galleryHTML = '';
            if (producto.gallery && producto.gallery.length > 0) {
                galleryHTML = `
                    <div class="gallery">
                        <img id="main-image" src="${producto.gallery[0]}" alt="${producto.name}" class="main-image">
                        <div class="thumbnails">
                            ${producto.gallery.map((img, index) => `<img src="${img}" alt="Vista ${index + 1}" class="thumbnail" data-index="${index}">`).join('')}
                        </div>
                    </div>
                `;
            } else {
                galleryHTML = `<img src="${producto.image}" alt="${producto.name}" class="main-image">`;
            }

            // Crear especificaciones
            let specsHTML = '';
            if (producto.specs && producto.specs.length > 0) {
                specsHTML = `
                    <div class="specs">
                        <h3>Especificaciones</h3>
                        <ul>
                            ${producto.specs.map(spec => `<li>${spec}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }

            // Poblar el contenido
            document.getElementById('producto-content').innerHTML = `
                
                <h1>${producto.name}</h1>
                ${galleryHTML}
                <p class="descripcion-larga">${producto.longDescription}</p>
                ${specsHTML}
                <p class="precio">$${producto.price}</p>
                <div class="botones">
                    <a href="https://wa.me/549XXXXXXXXXX?text=Hola,%20quiero%20información%20sobre:%20${encodeURIComponent(producto.name)}" class="btn-whatsapp" target="_blank">Consultar por WhatsApp</a>
                    <a href="index.html#catalogo" class="btn-volver">Volver al Catálogo</a>
                </div>
            `;

            // Funcionalidad de la galería
            const mainImage = document.getElementById('main-image');
            const thumbnails = document.querySelectorAll('.thumbnail');
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', () => {
                    mainImage.src = producto.gallery[thumb.dataset.index];
                });
            });
        })  }