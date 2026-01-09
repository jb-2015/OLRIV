// Obtener el ID del producto desde la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"));

if (!productId) {
    document.getElementById("producto-content").innerHTML = `
        <h1>Error</h1>
        <p>No se especificó un producto válido. 
        <a href="index.html">Volver al catálogo</a>.</p>`;
} else {
    fetch("products.json")
        .then(res => res.json())
        .then(data => {
            const producto = data.find(p => p.id === productId);

            if (!producto) {
                document.getElementById("producto-content").innerHTML = `
                    <h1>Producto no encontrado</h1>
                    <p>El producto solicitado no existe. 
                    <a href="index.html">Volver al catálogo</a>.</p>`;
                return;
            }

            // Meta tags
            document.getElementById("page-title").textContent = `${producto.name} - Mi Tienda`;
            document.getElementById("page-description").content = producto.description;
            document.querySelector('meta[property="og:title"]').content =
                `${producto.name} - Mi Tienda`;
            document.querySelector('meta[property="og:description"]').content =
                producto.description;
            document.querySelector('meta[property="og:image"]').content =
                producto.image;

            // Galería
            const galleryHTML = `
                <div class="gallery">
                    <img id="main-image" src="${producto.gallery?.[0] || producto.image}" 
                         alt="${producto.name}" class="main-image">

                    ${producto.gallery ? `
                    <div class="thumbnails">
                        ${producto.gallery.map((img, i) => `
                            <img src="${img}" class="thumbnail" data-index="${i}">
                        `).join('')}
                    </div>` 
                    : ''}
                </div>
            `;

            // Especificaciones
            const specsHTML = producto.specs?.length
                ? `
                    <div class="specs">
                        <h3>Especificaciones</h3>
                        <ul>${producto.specs.map(s => `<li>${s}</li>`).join('')}</ul>
                    </div>`
                : "";

            // Render final
            document.getElementById("producto-content").innerHTML = `
                <div class="product-container">

                    <div class="left-column">
                        ${galleryHTML}
                    </div>

                    <div class="right-column">
                        <h1>${producto.name}</h1>
                        <p class="descripcion-larga">${producto.longDescription}</p>
                        ${specsHTML}
                        <p class="precio">$${producto.price}</p>

                        <div class="botones">
                            <a href="https://wa.me/5492664842401?text=Hola,%20quiero%20información%20sobre:%20${encodeURIComponent(producto.name)}"
                               class="btn-whatsapp" target="_blank">Consultar por WhatsApp</a>

                            <a href="index.html#catalogo" class="btn-volver">
                                Volver al Catálogo
                            </a>
                        </div>
                    </div>

                </div>
            `;

            // Miniaturas
            const mainImage = document.getElementById("main-image");
            document.querySelectorAll(".thumbnail").forEach(thumb => {
                thumb.addEventListener("click", () => {
                    mainImage.src = producto.gallery[thumb.dataset.index];
                });
            });
        });
}
