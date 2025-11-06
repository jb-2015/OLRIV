// Script para manejar el formulario de contacto (simulación de envío)
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el envío real del formulario

    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    // Simulación de envío (en un sitio real, aquí iría una llamada a una API o backend)
    alert(`Gracias, ${nombre}. Tu mensaje ha sido enviado. Email: ${email}, Mensaje: ${mensaje}`);

    // Limpiar el formulario
    document.getElementById('contact-form').reset();
});

// Animaciones adicionales (opcional, para hover en productos - ya manejado en CSS, pero aquí un ejemplo de JS)
document.querySelectorAll('.producto').forEach(producto => {
    producto.addEventListener('mouseenter', () => {
        // Puedes agregar lógica adicional aquí si es necesario, pero el hover está en CSS
    });
});