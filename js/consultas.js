const API_URL = 'http://127.0.0.1:8000/api/consultas/';

// ----------------------------------------------------
// 1. GET: Cargar consultas en la tabla con botones
// ----------------------------------------------------
function cargarConsultas() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tabla-consultas');
            if (!tbody) return;
            tbody.innerHTML = '';

            data.forEach(consulta => {
                const medicoNombre = consulta.medico_detalle 
                    ? `${consulta.medico_detalle.nombre || ''} ${consulta.medico_detalle.apellido || ''}`.trim()
                    : `Médico ID: ${consulta.medico}`;
                
                const pacienteNombre = consulta.paciente_detalle 
                    ? `${consulta.paciente_detalle.nombre || ''} ${consulta.paciente_detalle.apellido || ''}`.trim()
                    : `Paciente ID: ${consulta.paciente}`;

                const fechaFormateada = consulta.fecha ? new Date(consulta.fecha).toLocaleString() : 'Sin fecha';

                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${consulta.id}</td>
                    <td>${medicoNombre}</td>
                    <td>${pacienteNombre}</td>
                    <td>${fechaFormateada}</td>
                    <td>${consulta.motivo}</td>
                    <td>${consulta.diagnostico || 'Sin diagnóstico'}</td>
                    <td>
                        <button onclick="prepararEdicion(${consulta.id}, ${consulta.medico}, ${consulta.paciente}, '${consulta.fecha}', '${consulta.motivo.replace(/'/g, "\\'")}', '${(consulta.diagnostico || '').replace(/'/g, "\\'")}')" style="background:#f39c12; color:white; border:none; padding:5px 8px; cursor:pointer;">Editar</button>
                        <button onclick="eliminarConsulta(${consulta.id})" style="background:#e74c3c; color:white; border:none; padding:5px 8px; cursor:pointer;">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(fila);
            });
        })
        .catch(error => console.error('Error al cargar consultas:', error));
}

// ----------------------------------------------------
// 2. POST / PUT: Crear o Modificar Consulta
// ----------------------------------------------------
const formConsulta = document.getElementById('form-consulta');
if (formConsulta) {
    formConsulta.addEventListener('submit', function (e) {
        e.preventDefault();

        const consultaId = document.getElementById('consulta-id')?.value;
        const datos = {
            medico: document.getElementById('medico').value,
            paciente: document.getElementById('paciente').value,
            fecha: document.getElementById('fecha').value,
            motivo: document.getElementById('motivo').value,
            diagnostico: document.getElementById('diagnostico').value || null
        };

        const esEdicion = Boolean(consultaId);
        const url = esEdicion ? `${API_URL}${consultaId}/` : API_URL;
        const metodo = esEdicion ? 'PUT' : 'POST';

        fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        })
        .then(response => {
            if (!response.ok) throw new Error('Error en la solicitud');
            return response.json();
        })
        .then(() => {
            alert(esEdicion ? '¡Consulta actualizada correctamente!' : '¡Consulta registrada con éxito!');
            cancelarEdicion();
            cargarConsultas();
        })
        .catch(error => console.error('Error:', error));
    });
}

// ----------------------------------------------------
// 3. Cargar datos en el formulario para Editar (PUT)
// ----------------------------------------------------
function prepararEdicion(id, medico, paciente, fecha, motivo, diagnostico) {
    document.getElementById('consulta-id').value = id;
    document.getElementById('medico').value = medico;
    document.getElementById('paciente').value = paciente;
    
    // Formatear la fecha para la entrada datetime-local (YYYY-MM-THH:mm)
    if (fecha) {
        const d = new Date(fecha);
        const fechaIso = d.toISOString().slice(0, 16);
        document.getElementById('fecha').value = fechaIso;
    }

    document.getElementById('motivo').value = motivo;
    document.getElementById('diagnostico').value = diagnostico;

    // Cambiar apariencia del botón
    const btnSubmit = document.getElementById('btn-guardar-consulta');
    if (btnSubmit) btnSubmit.innerText = 'Actualizar Consulta (PUT)';
    
    const btnCancelar = document.getElementById('btn-cancelar-edicion');
    if (btnCancelar) btnCancelar.style.display = 'inline-block';
}

function cancelarEdicion() {
    const form = document.getElementById('form-consulta');
    if (form) form.reset();
    
    document.getElementById('consulta-id').value = '';
    const btnSubmit = document.getElementById('btn-guardar-consulta');
    if (btnSubmit) btnSubmit.innerText = 'Guardar Consulta';
    
    const btnCancelar = document.getElementById('btn-cancelar-edicion');
    if (btnCancelar) btnCancelar.style.display = 'none';
}

// ----------------------------------------------------
// 4. DELETE: Eliminar registro
// ----------------------------------------------------
function eliminarConsulta(id) {
    if (confirm(`¿Está seguro de que desea eliminar la consulta #${id}?`)) {
        fetch(`${API_URL}${id}/`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Consulta eliminada exitosamente.');
                cargarConsultas();
            } else {
                alert('No se pudo eliminar la consulta.');
            }
        })
        .catch(error => console.error('Error al eliminar:', error));
    }
}

document.addEventListener('DOMContentLoaded', cargarConsultas);