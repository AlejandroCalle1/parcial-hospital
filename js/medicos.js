// Dirección de la API de médicos (termina en "/")
const API = "http://127.0.0.1:8000/api/medicos/";

// Aquí se guarda la lista que llega de la API
let medicos = [];

// Escribe un aviso en el párrafo #mensaje
function avisar(texto) {
    document.getElementById("mensaje").textContent = texto;
}

// CONSULTAR (GET): trae los médicos y llena la tabla
async function cargarMedicos() {
    const respuesta = await fetch(API);
    medicos = await respuesta.json();

    const tabla = document.getElementById("tabla-medicos");
    tabla.innerHTML = "";
    for (const m of medicos) {
        tabla.innerHTML += `
            <tr>
                <td>${m.id}</td>
                <td>${m.nombre}</td>
                <td>${m.especialidad}</td>
                <td>
                    <button class="btn-explorar" onclick="editar(${m.id})">Editar</button>
                    <button class="btn-explorar" onclick="eliminar(${m.id})">Eliminar</button>
                </td>
            </tr>`;
    }
}

// CREAR (POST) o ACTUALIZAR (PUT): se ejecuta al pulsar "Guardar"
document.getElementById("form-medico").addEventListener("submit", async function (evento) {
    evento.preventDefault(); // evita que la página se recargue

    const id = document.getElementById("medico-id").value;
    const datos = {
        nombre: document.getElementById("nombre").value,
        especialidad: document.getElementById("especialidad").value,
    };

    // Si hay id estamos editando (PUT); si no, creando (POST)
    let url = API;
    let metodo = "POST";
    if (id) {
        url = API + id + "/";
        metodo = "PUT";
    }

    const respuesta = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });

    if (respuesta.ok) {
        avisar(id ? "Médico actualizado" : "Médico creado");
        limpiar();
        cargarMedicos();
    } else {
        avisar("Error: " + JSON.stringify(await respuesta.json()));
    }
});

// EDITAR: pasa los datos del médico al formulario
function editar(id) {
    const m = medicos.find((x) => x.id === id);
    document.getElementById("medico-id").value = m.id;
    document.getElementById("nombre").value = m.nombre;
    document.getElementById("especialidad").value = m.especialidad;
    document.getElementById("titulo-form").textContent = "Editar médico";
    document.getElementById("btn-cancelar").hidden = false;
}

// ELIMINAR (DELETE)
async function eliminar(id) {
    if (!confirm("¿Eliminar este médico? También se borrarán sus consultas.")) return;
    await fetch(API + id + "/", { method: "DELETE" });
    avisar("Médico eliminado");
    cargarMedicos();
}

// Deja el formulario como "Nuevo médico"
function limpiar() {
    document.getElementById("form-medico").reset();
    document.getElementById("medico-id").value = "";
    document.getElementById("titulo-form").textContent = "Nuevo médico";
    document.getElementById("btn-cancelar").hidden = true;
}

document.getElementById("btn-cancelar").addEventListener("click", limpiar);

// Al abrir la página, cargar la lista
cargarMedicos().catch(() => avisar("No hay conexión con el servidor"));