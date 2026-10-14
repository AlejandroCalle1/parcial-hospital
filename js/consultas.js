// Manejar el envío del formulario para crear una nueva consulta
const formConsulta = document.getElementById('form-consulta');

if (formConsulta) {
    formConsulta.addEventListener('submit', function (e) {
        e.preventDefault();

        // Construir el objeto JSON con los datos del formulario
        const nuevaConsulta = {
            medico: document.getElementById('medico').value,
            paciente: document.getElementById('paciente').value,
            fecha: document.getElementById('fecha').value,
            motivo: document.getElementById('motivo').value,
            diagnostico: document.getElementById('diagnostico').value || null
        };

        // Petición POST a la API
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaConsulta)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al guardar la consulta');
            }
            return response.json();
        })
        .then(data => {
            alert('¡Consulta registrada con éxito!');
            formConsulta.reset(); // Limpiar campos del formulario
            cargarConsultas();    // Recargar la tabla sin refrescar la página
        })
        .catch(error => console.error('Error:', error));
    });
}