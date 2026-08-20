// ======================================================
// DASHBOARD.JS
// Lee los datos guardados en localStorage
// y actualiza el Dashboard automáticamente.
// ======================================================


// ======================================================
// CLAVES DE LOCALSTORAGE
// ======================================================

// Solicitudes registradas.
const KEY_SOLICITUDES = "ayudaMayor_solicitudes";

// Voluntarios registrados.
const KEY_VOLUNTARIOS = "ayudaMayor_voluntarios";

// Visitas y entregas registradas.
const KEY_VISITAS = "ayudaMayor_visitas";


// ======================================================
// FUNCIÓN PARA LEER LOCALSTORAGE
// ======================================================

function obtenerDatos(clave) {

  // Buscamos los datos almacenados con esa clave.
  const datos = localStorage.getItem(clave);

  // Si existen, los convertimos desde JSON.
  // Si no existen, devolvemos un arreglo vacío.
  return datos
    ? JSON.parse(datos)
    : [];
}


// ======================================================
// ACTUALIZAR TARJETAS DEL DASHBOARD
// ======================================================

function actualizarResumen() {

  // Recuperamos solicitudes.
  const solicitudes =
    obtenerDatos(KEY_SOLICITUDES);

  // Recuperamos voluntarios.
  const voluntarios =
    obtenerDatos(KEY_VOLUNTARIOS);


  // Contamos solicitudes pendientes.
  const pendientes =
    solicitudes.filter(
      solicitud =>
        solicitud.estado === "Pendiente"
    ).length;


  // Contamos solicitudes que están siendo gestionadas.
  const enProceso =
    solicitudes.filter(
      solicitud =>
        solicitud.estado === "En proceso" ||
        solicitud.estado === "Asignada"
    ).length;


  // Contamos solicitudes resueltas.
  const resueltas =
    solicitudes.filter(
      solicitud =>
        solicitud.estado === "Resuelta"
    ).length;


  // Contamos voluntarios activos.
  const voluntariosActivos =
    voluntarios.filter(
      voluntario =>
        voluntario.estado === "Activo"
    ).length;


  // Buscamos los números de las cuatro tarjetas
  // superiores del Dashboard.
  const numeros =
    document.querySelectorAll(
      ".tarjetas .tarjeta h2"
    );


  // Comprobamos que existan las cuatro tarjetas.
  if (numeros.length >= 4) {

    numeros[0].textContent =
      pendientes;

    numeros[1].textContent =
      enProceso;

    numeros[2].textContent =
      resueltas;

    numeros[3].textContent =
      voluntariosActivos;

  }

}


// ======================================================
// SOLICITUDES RECIENTES
// ======================================================

function cargarSolicitudesRecientes() {

  // Recuperamos todas las solicitudes.
  const solicitudes =
    obtenerDatos(KEY_SOLICITUDES);


  // Buscamos la tabla de solicitudes recientes.
  const tabla =
    document.querySelector(
      ".solicitudes-recientes tbody"
    );


  // Si la tabla no existe, detenemos la función.
  if (!tabla) {
    return;
  }


  // Eliminamos los datos de ejemplo del HTML.
  tabla.innerHTML = "";


  // Tomamos como máximo 5 solicitudes.
  const recientes =
    solicitudes.slice(0, 5);


  // Si todavía no tenemos solicitudes...
  if (recientes.length === 0) {

    tabla.innerHTML = `

      <tr>

        <td colspan="6">
          No hay solicitudes registradas.
        </td>

      </tr>

    `;

    return;
  }


  // Recorremos las solicitudes encontradas.
  recientes.forEach(solicitud => {


    // Clase visual predeterminada de urgencia.
    let claseUrgencia =
      "urgencia-baja";


    // Si la urgencia es alta...
    if (solicitud.urgencia === "Alta") {

      claseUrgencia =
        "urgencia-alta";

    }


    // Si es media...
    if (solicitud.urgencia === "Media") {

      claseUrgencia =
        "urgencia-media";

    }


    // Clase predeterminada para el estado.
    let claseEstado =
      "pendiente";


    if (solicitud.estado === "Asignada") {

      claseEstado =
        "asignada";

    }


    if (solicitud.estado === "En proceso") {

      claseEstado =
        "proceso";

    }


    if (solicitud.estado === "Resuelta") {

      claseEstado =
        "resuelta";

    }


    // Creamos una nueva fila HTML.
    const fila =
      document.createElement("tr");


    // Insertamos los datos de la solicitud.
    fila.innerHTML = `

      <td>
        #${String(solicitud.id).slice(-4)}
      </td>


      <td>

        <strong>
          ${solicitud.adultoNombre}
        </strong>

      </td>


      <td>
        ${solicitud.categoria}
      </td>


      <td>

        <span class="estado ${claseUrgencia}">
          ${solicitud.urgencia}
        </span>

      </td>


      <td>

        <span class="estado ${claseEstado}">
          ${solicitud.estado}
        </span>

      </td>


      <td>
        ${solicitud.fecha || "-"}
      </td>

    `;


    // Agregamos la fila a la tabla.
    tabla.appendChild(fila);

  });

}


// ======================================================
// PRÓXIMAS VISITAS
// ======================================================

function cargarProximasVisitas() {

  // Recuperamos las visitas registradas.
  const visitas =
    obtenerDatos(KEY_VISITAS);


  // Buscamos los paneles centrales del Dashboard.
  const paneles =
    document.querySelectorAll(
      ".grid-dashboard .panel"
    );


  // Aquí guardaremos el panel de visitas.
  let panelVisitas = null;


  // Recorremos los paneles.
  paneles.forEach(panel => {

    // Buscamos su título.
    const titulo =
      panel.querySelector("h2");


    // Identificamos el panel de próximas visitas.
    if (
      titulo &&
      titulo.textContent.trim() ===
      "Próximas visitas"
    ) {

      panelVisitas =
        panel;

    }

  });


  // Si no encontramos el panel...
  if (!panelVisitas) {
    return;
  }


  // Eliminamos las visitas ficticias
  // que existían originalmente en dashboard.html.
  panelVisitas
    .querySelectorAll(".visita")
    .forEach(
      visita =>
        visita.remove()
    );


  // Seleccionamos visitas que todavía
  // no estén realizadas.
  const proximas =
    visitas
      .filter(
        visita =>
          visita.estado !== "Realizada"
      )
      .slice(0, 3);


  // Si no tenemos próximas visitas...
  if (proximas.length === 0) {

    const mensaje =
      document.createElement("p");


    mensaje.textContent =
      "No hay próximas visitas registradas.";


    panelVisitas.appendChild(
      mensaje
    );


    return;
  }


  // Recorremos las próximas visitas.
  proximas.forEach(visita => {


    // Generamos iniciales del adulto mayor.
    //
    // Ejemplo:
    // Ana López → AL
    const iniciales =
      visita.adultoNombre
        .split(" ")
        .slice(0, 2)
        .map(
          palabra =>
            palabra.charAt(0)
        )
        .join("")
        .toUpperCase();


    // Creamos el elemento visual.
    const elemento =
      document.createElement("div");


    // Agregamos la clase CSS.
    elemento.classList.add(
      "visita"
    );


    // Construimos su contenido.
    elemento.innerHTML = `

      <div class="avatar-adulto">
        ${iniciales}
      </div>


      <div class="info-visita">

        <strong>
          ${visita.fecha} - ${visita.hora}
        </strong>

        <h4>
          ${visita.adultoNombre}
        </h4>

        <p>
          ${visita.tipo}
        </p>

        <small>
          ${visita.voluntarioNombre}
        </small>

      </div>


      <span class="estado programada">
        ${visita.estado}
      </span>

    `;


    // Insertamos la visita en el Dashboard.
    panelVisitas.appendChild(
      elemento
    );

  });

}


// ======================================================
// INICIAR DASHBOARD
// ======================================================

// Esperamos a que dashboard.html
// termine completamente de cargar.
document.addEventListener(
  "DOMContentLoaded",
  () => {

    // Actualizamos los números superiores.
    actualizarResumen();

    // Mostramos solicitudes recientes.
    cargarSolicitudesRecientes();

    // Mostramos próximas visitas.
    cargarProximasVisitas();

  }
);