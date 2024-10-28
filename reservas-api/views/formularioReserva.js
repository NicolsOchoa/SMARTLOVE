// Cargar opciones de habitaciones desde el servidor
fetch('/api/habitaciones')
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById('tipoHabitacion');
        data.forEach(habitacion => {
            const option = document.createElement('option');
            option.value = habitacion.id;
            option.textContent = `${habitacion.nombre} - S/ ${habitacion.precio}`;
            select.appendChild(option);
        });
    })
    .catch(error => console.error('Error cargando habitaciones:', error));

// Enviar el formulario al servidor
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    fetch('/api/reservas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al hacer la reserva');
        return response.json();
    })
    .then(data => alert('Reserva creada con éxito'))
    .catch(error => console.error('Error:', error));
});
