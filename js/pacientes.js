const API_URL = 'http://127.0.0.1:8000/api/pacientes/';

// 1. GET: Obtener pacientes y pintarlos en la tabla
function obtenerPacientes() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tabla-pacientes');
            tbody.innerHTML = ''; // Limpiar la tabla antes de renderizar
            data.forEach(paciente => {
                tbody.innerHTML += `
                    <tr>
                        <td>${paciente.id}</td>
                        <td>${paciente.nombre}</td>
                        <td>${paciente.apellido}</td>
                        <td>${paciente.documento}</td>
                        <td>${paciente.edad}</td>
                        <td>${paciente.telefono}</td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Error al obtener pacientes:', error));
}

// 2. POST: Crear un nuevo paciente
document.getElementById('form-paciente').addEventListener('submit', function (e) {
    e.preventDefault();

    const nuevoPaciente = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        documento: document.getElementById('documento').value,
        edad: parseInt(document.getElementById('edad').value),
        telefono: document.getElementById('telefono').value
    };

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoPaciente)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición POST');
            }
            return response.json();
        })
        .then(data => {
            alert('Paciente registrado exitosamente');
            document.getElementById('form-paciente').reset();
            obtenerPacientes(); // Refrescar la tabla
        })
        .catch(error => console.error('Error al guardar paciente:', error));
});

// Cargar la lista al abrir la página
obtenerPacientes();