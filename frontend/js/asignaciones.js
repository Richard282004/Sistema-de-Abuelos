// ======================================================
// ASIGNACIONES.JS
// Maneja el módulo de asignaciones SIN BACKEND.
// Los datos se guardan temporalmente en localStorage.
// ======================================================


// ------------------------------------------------------
// NOMBRES DE LOS DATOS GUARDADOS EN LOCALSTORAGE
// ------------------------------------------------------

// Aquí están las solicitudes creadas en solicitudes.html
const KEY_SOLICITUDES = "ayudaMayor_solicitudes";

// Aquí están los voluntarios creados en voluntarios.html
const KEY_VOLUNTARIOS = "ayudaMayor_voluntarios";

// Aquí guardaremos las asignaciones.
const KEY_ASIGNACIONES = "ayudaMayor_asignaciones";


// ------------------------------------------------------
// OBTENER DATOS DESDE LOCALSTORAGE
// ------------------------------------------------------

// Esta función recibe el nombre de una clave de localStorage.
// Por ejemplo: "ayudaMayor_solicitudes".
function obtenerDatos(clave) {

  // Busca los datos guardados.
  const datos = localStorage.getItem(clave);

  // Si existen datos, JSON.parse los transforma
  // desde texto JSON nuevamente a un arreglo de JavaScript.
  // Si no existen, devuelve un arreglo vacío [].
  return datos
    ? JSON.parse(datos)
    : [];

}


// ------------------------------------------------------
// GUARDAR DATOS EN LOCALSTORAGE
// ------------------------------------------------------

// Recibe una clave y un arreglo de datos.
function guardarDatos(clave, datos) {

  // JSON.stringify convierte el arreglo JavaScript
  // a texto para poder almacenarlo en localStorage.
  localStorage.setItem(
    clave,
    JSON.stringify(datos)
  );

}


// ------------------------------------------------------
// ELEMENTOS DEL HTML
// ------------------------------------------------------

// Formulario completo de nueva asignación.
const formulario =
  document.getElementById("formAsignacion");


// Contenedor que comienza oculto.
const contenedorFormulario =
  document.getElementById(
    "contenedorFormularioAsignacion"
  );


// Botón "+ Nueva asignación".
const btnNuevaAsignacion =
  document.getElementById(
    "btnNuevaAsignacion"
  );


// Botón "Cancelar".
const btnCancelarAsignacion =
  document.getElementById(
    "btnCancelarAsignacion"
  );


// Selector donde aparecerán las solicitudes.
const selectSolicitud =
  document.getElementById(
    "solicitudAsignacion"
  );


// Selector donde aparecerán los voluntarios.
const selectVoluntario =
  document.getElementById(
    "voluntarioAsignacion"
  );


// Tabla donde mostraremos las asignaciones.
const tablaAsignaciones =
  document.getElementById(
    "tablaAsignaciones"
  );


// Texto que mostrará cuántas asignaciones existen.
const cantidadAsignaciones =
  document.getElementById(
    "cantidadAsignaciones"
  );


// ======================================================
// CARGAR SOLICITUDES EN EL SELECT
// ======================================================

function cargarSolicitudes() {

  // Recuperamos las solicitudes guardadas.
  const solicitudes =
    obtenerDatos(KEY_SOLICITUDES);


  // Limpiamos el selector.
  selectSolicitud.innerHTML = `

    <option value="">
      Seleccione una solicitud
    </option>

  `;


  // Solo queremos solicitudes que todavía
  // no estén completamente resueltas.
  const disponibles =
    solicitudes.filter(
      solicitud =>
        solicitud.estado !== "Resuelta"
    );


  // Recorremos las solicitudes disponibles.
  disponibles.forEach(solicitud => {

    // Creamos una nueva opción del select.
    const opcion =
      document.createElement("option");


    // Guardamos el ID como valor interno.
    opcion.value =
      solicitud.id;


    // Esto será lo que verá el usuario.
    opcion.textContent =
      `${solicitud.adultoNombre} - ${solicitud.categoria} (${solicitud.urgencia})`;


    // Agregamos la opción al selector.
    selectSolicitud.appendChild(
      opcion
    );

  });

}


// ======================================================
// CARGAR VOLUNTARIOS
// ======================================================

function cargarVoluntarios() {

  // Recuperamos todos los voluntarios.
  const voluntarios =
    obtenerDatos(KEY_VOLUNTARIOS);


  // Limpiamos el selector.
  selectVoluntario.innerHTML = `

    <option value="">
      Seleccione un voluntario
    </option>

  `;


  // Solo queremos voluntarios activos.
  const activos =
    voluntarios.filter(
      voluntario =>
        voluntario.estado === "Activo"
    );


  // Recorremos los voluntarios activos.
  activos.forEach(voluntario => {

    // Creamos una opción.
    const opcion =
      document.createElement("option");


    // El ID será el valor interno.
    opcion.value =
      voluntario.id;


    // Texto visible para el coordinador.
    opcion.textContent =
      `${voluntario.nombre} ${voluntario.apellido} - ${voluntario.comuna}`;


    // Insertamos la opción.
    selectVoluntario.appendChild(
      opcion
    );

  });

}


// ======================================================
// MOSTRAR FORMULARIO
// ======================================================

// Escuchamos cuando el usuario presiona
// "+ Nueva asignación".
btnNuevaAsignacion.addEventListener(
  "click",
  () => {

    // Limpiamos cualquier dato anterior.
    formulario.reset();


    // Volvemos a cargar solicitudes y voluntarios
    // por si fueron modificados en otro módulo.
    cargarSolicitudes();

    cargarVoluntarios();


    // Quitamos "oculto" para mostrar el formulario.
    contenedorFormulario.classList.remove(
      "oculto"
    );

  }
);


// ======================================================
// CANCELAR
// ======================================================

btnCancelarAsignacion.addEventListener(
  "click",
  () => {

    // Limpiamos los campos.
    formulario.reset();


    // Volvemos a ocultar el formulario.
    contenedorFormulario.classList.add(
      "oculto"
    );

  }
);


// ======================================================
// CREAR ASIGNACIÓN
// ======================================================

// Escuchamos cuando se envía el formulario.
formulario.addEventListener(
  "submit",
  event => {

    // Evita que HTML recargue la página.
    event.preventDefault();


    // Obtenemos el ID de la solicitud elegida.
    const solicitudId =
      selectSolicitud.value;


    // Obtenemos el ID del voluntario elegido.
    const voluntarioId =
      selectVoluntario.value;


    // Recuperamos solicitudes.
    const solicitudes =
      obtenerDatos(KEY_SOLICITUDES);


    // Recuperamos voluntarios.
    const voluntarios =
      obtenerDatos(KEY_VOLUNTARIOS);


    // Buscamos la solicitud seleccionada.
    const solicitud =
      solicitudes.find(
        item =>
          item.id === solicitudId
      );


    // Buscamos el voluntario seleccionado.
    const voluntario =
      voluntarios.find(
        item =>
          item.id === voluntarioId
      );


    // Seguridad por si no se encuentra la solicitud.
    if (!solicitud) {

      alert(
        "Debes seleccionar una solicitud."
      );

      return;

    }


    // Seguridad por si no se encuentra el voluntario.
    if (!voluntario) {

      alert(
        "Debes seleccionar un voluntario."
      );

      return;

    }


    // Recuperamos las asignaciones existentes.
    const asignaciones =
      obtenerDatos(KEY_ASIGNACIONES);


    // Creamos el objeto que representa
    // nuestra nueva asignación.
    const nuevaAsignacion = {

      // Generamos un ID usando la fecha/hora actual.
      id:
        Date.now().toString(),


      // Guardamos qué solicitud estamos asignando.
      solicitudId:
        solicitud.id,


      // Guardamos el adulto mayor.
      adultoId:
        solicitud.adultoId,


      // Guardamos el nombre para mostrarlo fácilmente.
      adultoNombre:
        solicitud.adultoNombre,


      // Guardamos la categoría de ayuda.
      categoria:
        solicitud.categoria,


      // Guardamos la urgencia original.
      urgencia:
        solicitud.urgencia,


      // Guardamos el voluntario.
      voluntarioId:
        voluntario.id,


      // Guardamos su nombre completo.
      voluntarioNombre:
        `${voluntario.nombre} ${voluntario.apellido}`,


      // Fecha elegida en el formulario.
      fecha:
        document.getElementById(
          "fechaAsignacion"
        ).value,


      // Hora elegida.
      hora:
        document.getElementById(
          "horaAsignacion"
        ).value,


      // Estado inicial o seleccionado.
      estado:
        document.getElementById(
          "estadoAsignacion"
        ).value,


      // Observaciones opcionales.
      observaciones:
        document.getElementById(
          "observacionesAsignacion"
        ).value.trim()

    };


    // Insertamos la nueva asignación
    // al principio del arreglo.
    asignaciones.unshift(
      nuevaAsignacion
    );


    // Guardamos las asignaciones.
    guardarDatos(
      KEY_ASIGNACIONES,
      asignaciones
    );


    // ==================================================
    // CAMBIAR ESTADO DE LA SOLICITUD
    // ==================================================

    // Buscamos dónde está la solicitud
    // dentro del arreglo original.
    const indiceSolicitud =
      solicitudes.findIndex(
        item =>
          item.id === solicitud.id
      );


    // Si la encontramos...
    if (indiceSolicitud !== -1) {

      // Cambiamos automáticamente
      // su estado a "Asignada".
      solicitudes[indiceSolicitud].estado =
        "Asignada";


      // Guardamos nuevamente las solicitudes.
      guardarDatos(
        KEY_SOLICITUDES,
        solicitudes
      );

    }


    // Limpiamos el formulario.
    formulario.reset();


    // Lo ocultamos.
    contenedorFormulario.classList.add(
      "oculto"
    );


    // Actualizamos la tabla.
    cargarAsignaciones();


    // Avisamos al usuario.
    alert(
      "Asignación registrada correctamente."
    );

  }
);


// ======================================================
// MOSTRAR ASIGNACIONES EN LA TABLA
// ======================================================

function cargarAsignaciones() {

  // Recuperamos las asignaciones.
  const asignaciones =
    obtenerDatos(KEY_ASIGNACIONES);


  // Limpiamos la tabla.
  tablaAsignaciones.innerHTML = "";


  // Actualizamos el contador.
  cantidadAsignaciones.textContent =
    `${asignaciones.length} asignaciones`;


  // Si no existen asignaciones...
  if (asignaciones.length === 0) {

    tablaAsignaciones.innerHTML = `

      <tr>

        <td colspan="7">
          No hay asignaciones registradas.
        </td>

      </tr>

    `;

    return;

  }


  // Recorremos cada asignación.
  asignaciones.forEach(asignacion => {

    // Creamos una fila nueva.
    const fila =
      document.createElement("tr");


    // Definimos una clase visual para el estado.
    let claseEstado =
      "asignada";


    if (
      asignacion.estado ===
      "En proceso"
    ) {

      claseEstado =
        "proceso";

    }


    if (
      asignacion.estado ===
      "Completada"
    ) {

      claseEstado =
        "resuelta";

    }


    if (
      asignacion.estado ===
      "Rechazada"
    ) {

      claseEstado =
        "urgencia-alta";

    }


    // Construimos las columnas.
    fila.innerHTML = `

      <td>
        <strong>
          ${asignacion.adultoNombre}
        </strong>
      </td>

      <td>
        ${asignacion.categoria}
      </td>

      <td>
        ${asignacion.voluntarioNombre}
      </td>

      <td>
        ${asignacion.fecha}
      </td>

      <td>
        ${asignacion.hora}
      </td>

      <td>

        <span class="estado ${claseEstado}">
          ${asignacion.estado}
        </span>

      </td>

      <td>

        <button
          class="btn-accion ver"
          onclick="verAsignacion('${asignacion.id}')"
        >
          Ver
        </button>

        <button
          class="btn-accion eliminar"
          onclick="eliminarAsignacion('${asignacion.id}')"
        >
          Eliminar
        </button>

      </td>

    `;


    // Insertamos la fila en la tabla.
    tablaAsignaciones.appendChild(
      fila
    );

  });

}


// ======================================================
// VER ASIGNACIÓN
// ======================================================

function verAsignacion(id) {

  // Buscamos la asignación por su ID.
  const asignacion =
    obtenerDatos(KEY_ASIGNACIONES)
      .find(
        item =>
          item.id === id
      );


  // Si no existe, detenemos la función.
  if (!asignacion) {
    return;
  }


  // Por ahora mostramos los detalles
  // utilizando alert().
  alert(
`Adulto mayor:
${asignacion.adultoNombre}

Tipo de ayuda:
${asignacion.categoria}

Urgencia:
${asignacion.urgencia}

Voluntario:
${asignacion.voluntarioNombre}

Fecha:
${asignacion.fecha}

Hora:
${asignacion.hora}

Estado:
${asignacion.estado}

Observaciones:
${asignacion.observaciones || "Sin observaciones"}`
  );

}


// ======================================================
// ELIMINAR ASIGNACIÓN
// ======================================================

function eliminarAsignacion(id) {

  // Preguntamos antes de eliminar.
  const confirmar =
    confirm(
      "¿Seguro que deseas eliminar esta asignación?"
    );


  // Si responde Cancelar, terminamos.
  if (!confirmar) {
    return;
  }


  // Recuperamos las asignaciones.
  const asignaciones =
    obtenerDatos(KEY_ASIGNACIONES);


  // Buscamos la asignación que eliminaremos.
  const asignacion =
    asignaciones.find(
      item =>
        item.id === id
    );


  // Creamos un nuevo arreglo sin esa asignación.
  const nuevasAsignaciones =
    asignaciones.filter(
      item =>
        item.id !== id
    );


  // Guardamos el nuevo arreglo.
  guardarDatos(
    KEY_ASIGNACIONES,
    nuevasAsignaciones
  );


  // ==================================================
  // DEVOLVER SOLICITUD A PENDIENTE
  // ==================================================

  // Si encontramos la asignación...
  if (asignacion) {

    // Recuperamos las solicitudes.
    const solicitudes =
      obtenerDatos(KEY_SOLICITUDES);


    // Buscamos la solicitud relacionada.
    const indice =
      solicitudes.findIndex(
        item =>
          item.id ===
          asignacion.solicitudId
      );


    // Si existe...
    if (indice !== -1) {

      // La devolvemos a estado Pendiente.
      solicitudes[indice].estado =
        "Pendiente";


      // Guardamos el cambio.
      guardarDatos(
        KEY_SOLICITUDES,
        solicitudes
      );

    }

  }


  // Actualizamos la tabla.
  cargarAsignaciones();


  // Actualizamos también las solicitudes disponibles.
  cargarSolicitudes();

}


// ======================================================
// INICIAR LA PÁGINA
// ======================================================

// Esperamos a que el HTML termine de cargar.
document.addEventListener(
  "DOMContentLoaded",
  () => {

    // Cargamos las solicitudes existentes.
    cargarSolicitudes();


    // Cargamos los voluntarios activos.
    cargarVoluntarios();


    // Mostramos las asignaciones guardadas.
    cargarAsignaciones();

  }
);