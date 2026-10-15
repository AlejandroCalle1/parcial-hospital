// Dirección de la API de médicos (termina en "/")
const API = "http://127.0.0.1:8000/api/medicos/";

// Aquí se guarda la lista de médicos que llega de la API (arreglo de objetos)
let medicos = [];

// Escribe un aviso en el párrafo con id "mensaje"
function avisar(texto) {
    // textContent pone el texto como texto plano (no interpreta HTML)
    document.getElementById("mensaje").textContent = texto;
}

// CONSULTAR (GET): trae los médicos y llena la tabla
async function cargarMedicos() { // función asíncrona: permite usar await para esperar al servidor
    // Hace una petición GET a la API y espera la respuesta
    const respuesta = await fetch(API);
    // Convierte el cuerpo de la respuesta (texto JSON) en un arreglo de objetos y lo guarda
    medicos = await respuesta.json();

    // Busca el <tbody id="tabla-medicos"> del HTML
    const tabla = document.getElementById("tabla-medicos");
    // Lo vacía para que las filas viejas no se dupliquen al recargar la lista
    tabla.innerHTML = "";

    // Recorre la lista: en cada vuelta "m" es un médico distinto
    for (const m of medicos) {
        // Agrega una fila por médico. Dentro de las comillas invertidas solo va HTML:
        // ${...} inserta el valor real, y los botones llevan el id de su médico en el onclick
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
// Escucha el evento "submit" del formulario (se dispara al enviarlo)
document.getElementById("form-medico").addEventListener("submit", async function (evento) {
    // Evita que el navegador recargue la página al enviar el formulario
    evento.preventDefault();

    // Lee el campo oculto: vacío = estamos creando, con valor = estamos editando
    const id = document.getElementById("medico-id").value;
    // Arma el objeto con los datos que espera el serializer de Django
    const datos = {
        nombre: document.getElementById("nombre").value,
        especialidad: document.getElementById("especialidad").value,
    };

    // Por defecto se crea: POST a la lista (/api/medicos/)
    let url = API;
    let metodo = "POST";
    // Si hay id, se actualiza: PUT a la ruta del registro (/api/medicos/<id>/)
    if (id) {
        url = API + id + "/";
        metodo = "PUT";
    }

    // Envía la petición a Django
    const respuesta = await fetch(url, {
        method: metodo, // POST o PUT según el caso
        headers: { "Content-Type": "application/json" }, // avisa que el cuerpo es JSON
        body: JSON.stringify(datos), // convierte el objeto JavaScript a texto JSON
    });

    // respuesta.ok es true si Django contestó con un código 2xx (200, 201...)
    if (respuesta.ok) {
        avisar(id ? "Médico actualizado" : "Médico creado"); // mensaje según la operación
        limpiar();        // deja el formulario vacío y en modo "Nuevo médico"
        cargarMedicos();  // vuelve a pedir la lista para ver el cambio
    } else {
        // Si hubo error (por ejemplo, un campo vacío), muestra lo que respondió Django
        avisar("Error: " + JSON.stringify(await respuesta.json()));
    }
});

// EDITAR: pasa los datos del médico al formulario
function editar(id) {
    // Busca en la lista el médico cuyo id coincide con el del botón pulsado
    const m = medicos.find((x) => x.id === id);
    // Llena los campos del formulario con sus datos
    document.getElementById("medico-id").value = m.id; // el campo oculto activa el modo edición
    document.getElementById("nombre").value = m.nombre;
    document.getElementById("especialidad").value = m.especialidad;
    // Cambia el título para que se note que se está editando
    document.getElementById("titulo-form").textContent = "Editar médico";
    // Muestra el botón "Cancelar" (estaba oculto)
    document.getElementById("btn-cancelar").hidden = false;
}

// ELIMINAR (DELETE)
async function eliminar(id) {
    // Pide confirmación; si el usuario cancela, la función termina aquí (return)
    if (!confirm("¿Eliminar este médico? También se borrarán sus consultas.")) return;
    // Envía DELETE a /api/medicos/<id>/ y espera a que Django termine
    await fetch(API + id + "/", { method: "DELETE" });
    avisar("Médico eliminado"); // informa al usuario
    cargarMedicos();            // recarga la tabla sin el médico borrado
}

// Deja el formulario como "Nuevo médico"
function limpiar() {
    document.getElementById("form-medico").reset(); // vacía los campos visibles
    document.getElementById("medico-id").value = ""; // vacía el id oculto: vuelve al modo crear
    document.getElementById("titulo-form").textContent = "Nuevo médico"; // restaura el título
    document.getElementById("btn-cancelar").hidden = true; // oculta el botón "Cancelar"
}

// Al pulsar "Cancelar" se limpia el formulario y se sale del modo edición
document.getElementById("btn-cancelar").addEventListener("click", limpiar);

// Al abrir la página, carga la lista; si falla la conexión, avisa en pantalla
cargarMedicos().catch(() => avisar("No hay conexión con el servidor"));