const API_URL = 'http://127.0.0.1:8000/api/pacientes/';

// 1. GET: Cargar la lista de pacientes en la tabla
function obtenerPacientes() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tabla-pacientes');
            tbody.innerHTML = '';
            data.forEach(paciente => {
                tbody.innerHTML += `
                    <tr style="border-bottom: 1px solid #e2e8f0;">
                        <td style="padding: 12px;">${paciente.id}</td>
                        <td style="padding: 12px;">${paciente.nombre}</td>
                        <td style="padding: 12px;">${paciente.apellido}</td>
                        <td style="padding: 12px;">${paciente.documento}</td>
                        <td style="padding: 12px;">${paciente.edad}</td>
                        <td style="padding: 12px;">${paciente.telefono}</td>
                        <td style="padding: 12px; text-align: center;">
                            <button onclick="prepararEdicion(${paciente.id}, '${paciente.nombre}', '${paciente.apellido}', '${paciente.documento}', ${paciente.edad}, '${paciente.telefono}')" style="background-color: #d97706; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; margin-right: 5px;">Editar</button>
                            <button onclick="eliminarPaciente(${paciente.id})" style="background-color: #dc2626; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold;">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Error al obtener pacientes:', error));
}

// 2. POST / PUT: Crear o Actualizar paciente
document.getElementById('form-paciente').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('id_paciente').value;
    const pacienteData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        documento: document.getElementById('documento').value,
        edad: parseInt(document.getElementById('edad').value),
        telefono: document.getElementById('telefono').value
    };

    const esEdicion = Boolean(id);
    const url = esEdicion ? `${API_URL}${id}/` : API_URL;
    const metodo = esEdicion ? 'PUT' : 'POST';

    fetch(url, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pacienteData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al procesar la solicitud');
        return response.json();
    })
    .then(() => {
        alert(esEdicion ? 'Paciente actualizado con éxito' : 'Paciente registrado con éxito');
        limpiarFormulario();
        obtenerPacientes();
    })
    .catch(error => console.error('Error en la operación:', error));
});

// 3. Preparar formulario para Editar (PUT)
function prepararEdicion(id, nombre, apellido, documento, edad, telefono) {
    document.getElementById('id_paciente').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('documento').value = documento;
    document.getElementById('edad').value = edad;
    document.getElementById('telefono').value = telefono;

    document.getElementById('form-titulo').innerText = 'Editar Paciente';
    document.getElementById('btn-guardar').innerText = 'Actualizar Paciente';
    document.getElementById('btn-cancelar').style.display = 'inline-block';
}

// 4. DELETE: Eliminar Paciente
function eliminarPaciente(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
        fetch(`${API_URL}${id}/`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Paciente eliminado correctamente');
                obtenerPacientes();
            } else {
                alert('No se pudo eliminar el registro');
            }
        })
        .catch(error => console.error('Error al eliminar paciente:', error));
    }
}

// 5. Limpiar formulario y resetear estados
function limpiarFormulario() {
    document.getElementById('form-paciente').reset();
    document.getElementById('id_paciente').value = '';
    document.getElementById('form-titulo').innerText = 'Registrar Nuevo Paciente';
    document.getElementById('btn-guardar').innerText = 'Guardar Paciente';
    document.getElementById('btn-cancelar').style.display = 'none';
}

// Cargar pacientes al iniciar
obtenerPacientes();