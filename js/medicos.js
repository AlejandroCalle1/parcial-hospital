// Conecta medicos.html con la API de Django (/api/medicos/) usando fetch.
const API = "http://127.0.0.1:8000/api/medicos/"; // termina en "/" a propósito

const form = document.getElementById("form-medico");
const tabla = document.getElementById("tabla-medicos");
const mensaje = document.getElementById("mensaje");
const campoId = document.getElementById("medico-id");
const campoNombre = document.getElementById("nombre");
const campoEspecialidad = document.getElementById("especialidad");
const titulo = document.getElementById("titulo-form");
const btnCancelar = document.getElementById("btn-cancelar");

let medicos = []; // última lista recibida, para llenar el formulario al editar

function avisar(texto) {
    mensaje.textContent = texto;
}

function limpiarFormulario() {
    form.reset();
    campoId.value = "";
    titulo.textContent = "Nuevo médico";
    btnCancelar.hidden = true;
}

// CONSULTAR (GET): pide la lista y la pinta en la tabla
async function cargarMedicos() {
    try {
        const respuesta = await fetch(API);
        if (!respuesta.ok) throw new Error("El servidor respondió " + respuesta.status);
        medicos = await respuesta.json();
    } catch (error) {
        avisar("No se pudo cargar la lista: " + error.message);
        return;
    }

    tabla.innerHTML = "";
    medicos.forEach((m) => {
        const fila = document.createElement("tr");
        [m.id, m.nombre, m.especialidad].forEach((valor) => {
            const celda = document.createElement("td");
            celda.textContent = valor; // textContent evita inyectar HTML
            fila.appendChild(celda);
        });

        const acciones = document.createElement("td");
        acciones.innerHTML =
            `<button type="button" class="btn-explorar" data-accion="editar" data-id="${m.id}">Editar</button> ` +
            `<button type="button" class="btn-explorar" data-accion="eliminar" data-id="${m.id}">Eliminar</button>`;
        fila.appendChild(acciones);
        tabla.appendChild(fila);
    });
}

// CREAR (POST) o ACTUALIZAR (PUT): depende de si el campo oculto tiene id
form.addEventListener("submit", async (evento) => {
    evento.preventDefault(); // evita que el navegador recargue la página

    const id = campoId.value;
    const datos = {
        nombre: campoNombre.value.trim(),
        especialidad: campoEspecialidad.value.trim(),
    };

    try {
        const respuesta = await fetch(id ? API + id + "/" : API, {
            method: id ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos),
        });
        if (!respuesta.ok) {
            // el serializer devuelve los errores de validación en JSON
            avisar("No se pudo guardar: " + JSON.stringify(await respuesta.json()));
            return;
        }
        avisar(id ? "Médico actualizado." : "Médico creado.");
        limpiarFormulario();
        cargarMedicos();
    } catch (error) {
        avisar("No hay conexión con el servidor: " + error.message);
    }
});

// EDITAR y ELIMINAR: un solo listener para los botones de la tabla
tabla.addEventListener("click", async (evento) => {
    const boton = evento.target.closest("button[data-accion]");
    if (!boton) return;
    const id = boton.dataset.id;

    if (boton.dataset.accion === "editar") {
        const m = medicos.find((x) => String(x.id) === id);
        campoId.value = m.id;
        campoNombre.value = m.nombre;
        campoEspecialidad.value = m.especialidad;
        titulo.textContent = "Editar médico";
        btnCancelar.hidden = false;
        form.scrollIntoView();
        return;
    }

    // eliminar (DELETE)
    if (!confirm("¿Eliminar este médico? También se borrarán sus consultas.")) return;
    try {
        const respuesta = await fetch(API + id + "/", { method: "DELETE" });
        if (!respuesta.ok) throw new Error("El servidor respondió " + respuesta.status);
        avisar("Médico eliminado.");
        cargarMedicos();
    } catch (error) {
        avisar("No se pudo eliminar: " + error.message);
    }
});

btnCancelar.addEventListener("click", limpiarFormulario);

cargarMedicos();