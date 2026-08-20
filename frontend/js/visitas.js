// ======================================================
// VISITAS.JS
// Controla el módulo "Visitas y Entregas".
// Por ahora trabajamos solamente con localStorage.
// ======================================================


// ------------------------------------------------------
// CLAVES DE LOCALSTORAGE
// ------------------------------------------------------

// Aquí están guardadas las solicitudes.
const KEY_SOLICITUDES = "ayudaMayor_solicitudes";

// Aquí están guardadas las asignaciones.
const KEY_ASIGNACIONES = "ayudaMayor_asignaciones";

// Aquí guardaremos las visitas y entregas.
const KEY_VISITAS = "ayudaMayor_visitas";


// ======================================================
// FUNCIONES GENERALES PARA LOCALSTORAGE
// ======================================================

// Esta función permite obtener información desde localStorage.
function obtenerDatos(clave) {

  // Buscamos la información usando la clave recibida.
  const datos = localStorage.getItem(clave);

  // localStorage guarda texto.
  // JSON.parse convierte ese texto nuevamente
  // en un arreglo u objeto de JavaScript.
  // Si no existen datos, devolvemos [].
  return datos
    ? JSON.parse(datos)
    : [];
}


// Esta función guarda información en localStorage.
function guardarDatos(clave, datos) {

  // JSON.stringify transforma el arreglo u objeto
  // de JavaScript en texto JSON.
  localStorage.setItem(
    clave,
    JSON.stringify(datos)
  );
}


// ======================================================
// ELEMENTOS DEL HTML
// ======================================================

// Buscamos el formulario por su ID.
const formulario =
  document.getElementById("formVisita");


// Contenedor que permite mostrar u ocultar el formulario.
const contenedorFormulario =
  document.getElementById(
    "contenedorFormularioVisita"
  );


// Botón "+ Registrar visita / entrega".
const btnNuevaVisita =
  document.getElementById(
    "btnNuevaVisita"
  );


// Botón Cancelar.
const btnCancelarVisita =
  document.getElementById(
    "btnCancelarVisita"
  );


// Selector donde aparecerán las asignaciones.
const selectAsignacion =
  document.getElementById(
    "asignacionVisita"
  );


// Cuerpo de la tabla donde mostraremos las visitas.
const tablaVisitas =
  document.getElementById(
    "tablaVisitas"
  );


// Contador de visitas.
const cantidadVisitas =
  document.getElementById(
    "cantidadVisitas"
  );


// ======================================================
// CARGAR ASIGNACIONES
// ======================================================

// Esta función toma las asignaciones existentes
// y las coloca dentro del <select> del HTML.
function cargarAsignaciones() {

  // Obtenemos las asignaciones desde localStorage.
  const asignaciones =
    obtenerDatos(KEY_ASIGNACIONES);


  // Limpiamos el selector antes de agregar opciones.
  selectAsignacion.innerHTML = `

    <option value="">
      Seleccione una asignación
    </option>

  `;


  // Recorremos todas las asignaciones.
  asignaciones.forEach(asignacion => {

    // Creamos una opción HTML nueva.
    const opcion =
      document.createElement("option");


    // Guardamos el ID de la asignación como valor.
    opcion.value =
      asignacion.id;


    // Este será el texto visible para el usuario.
    opcion.textContent =
      `${asignacion.adultoNombre} - ${asignacion.categoria} - ${asignacion.voluntarioNombre}`;


    // Agregamos la opción al selector.
    selectAsignacion.appendChild(
      opcion
    );

  });

}


// ======================================================
// MOSTRAR FORMULARIO
// ======================================================

// Escuchamos cuando el usuario hace clic
// en "+ Registrar visita / entrega".
btnNuevaVisita.addEventListener(
  "click",
  () => {

    // Limpiamos el formulario.
    formulario.reset();


    // Actualizamos las asignaciones disponibles.
    cargarAsignaciones();


    // Quitamos la clase "oculto".
    // Esto hace visible el formulario.
    contenedorFormulario.classList.remove(
      "oculto"
    );

  }
);


// ======================================================
// CANCELAR
// ======================================================

// Escuchamos el botón Cancelar.
btnCancelarVisita.addEventListener(
  "click",
  () => {

    // Limpiamos el formulario.
    formulario.reset();


    // Agregamos nuevamente la clase "oculto".
    contenedorFormulario.classList.add(
      "oculto"
    );

  }
);


// ======================================================
// GUARDAR UNA VISITA O ENTREGA
// ======================================================

// Escuchamos cuando el usuario presiona
// "Guardar actividad".
formulario.addEventListener(
  "submit",
  event => {

    // Evita que el navegador recargue la página.
    event.preventDefault();


    // Obtenemos el ID de la asignación seleccionada.
    const asignacionId =
      selectAsignacion.value;


    // Recuperamos las asignaciones existentes.
    const asignaciones =
      obtenerDatos(KEY_ASIGNACIONES);


    // Buscamos exactamente la asignación seleccionada.
    const asignacion =
      asignaciones.find(
        item =>
          item.id === asignacionId
      );


    // Si por algún motivo no existe,
    // mostramos un mensaje y detenemos el proceso.
    if (!asignacion) {

      alert(
        "Debes seleccionar una asignación."
      );

      return;
    }


    // Recuperamos las visitas ya guardadas.
    const visitas =
      obtenerDatos(KEY_VISITAS);


    // ==================================================
    // CREAR EL OBJETO VISITA
    // ==================================================

    const nuevaVisita = {

      // Creamos un ID único sencillo
      // utilizando la fecha y hora actual.
      id:
        Date.now().toString(),


      // Guardamos qué asignación originó esta visita.
      asignacionId:
        asignacion.id,


      // También guardamos la solicitud relacionada.
      solicitudId:
        asignacion.solicitudId,


      // ID del adulto mayor.
      adultoId:
        asignacion.adultoId,


      // Nombre del adulto mayor.
      adultoNombre:
        asignacion.adultoNombre,


      // ID del voluntario.
      voluntarioId:
        asignacion.voluntarioId,


      // Nombre del voluntario.
      voluntarioNombre:
        asignacion.voluntarioNombre,


      // Tipo de ayuda original.
      categoria:
        asignacion.categoria,


      // Leemos el tipo de actividad del formulario.
      tipo:
        document.getElementById(
          "tipoVisita"
        ).value,


      // Leemos la fecha.
      fecha:
        document.getElementById(
          "fechaVisita"
        ).value,


      // Leemos la hora.
      hora:
        document.getElementById(
          "horaVisita"
        ).value,


      // Resultado obtenido.
      resultado:
        document.getElementById(
          "resultadoVisita"
        ).value,


      // Estado de la visita.
      estado:
        document.getElementById(
          "estadoVisita"
        ).value,


      // Observaciones escritas por el usuario.
      observaciones:
        document.getElementById(
          "observacionesVisita"
        ).value.trim()

    };


    // Agregamos la nueva visita
    // al principio del arreglo.
    visitas.unshift(
      nuevaVisita
    );


    // Guardamos nuevamente todas las visitas.
    guardarDatos(
      KEY_VISITAS,
      visitas
    );


    // ==================================================
    // SI LA VISITA FUE REALIZADA
    // ==================================================

    if (
      nuevaVisita.estado === "Realizada"
    ) {

      // ------------------------------------------------
      // ACTUALIZAR ASIGNACIÓN
      // ------------------------------------------------

      // Buscamos la posición de la asignación.
      const indiceAsignacion =
        asignaciones.findIndex(
          item =>
            item.id === asignacionId
        );


      // Si encontramos la asignación...
      if (indiceAsignacion !== -1) {

        // La marcamos como completada.
        asignaciones[indiceAsignacion].estado =
          "Completada";


        // Guardamos el cambio.
        guardarDatos(
          KEY_ASIGNACIONES,
          asignaciones
        );

      }


      // ------------------------------------------------
      // ACTUALIZAR SOLICITUD
      // ------------------------------------------------

      // Recuperamos las solicitudes.
      const solicitudes =
        obtenerDatos(KEY_SOLICITUDES);


      // Buscamos la solicitud relacionada.
      const indiceSolicitud =
        solicitudes.findIndex(
          solicitud =>
            solicitud.id ===
            asignacion.solicitudId
        );


      // Si encontramos la solicitud...
      if (indiceSolicitud !== -1) {

        // La marcamos como resuelta.
        solicitudes[indiceSolicitud].estado =
          "Resuelta";


        // Guardamos el cambio.
        guardarDatos(
          KEY_SOLICITUDES,
          solicitudes
        );

      }

    }


    // ==================================================
    // TERMINAR PROCESO
    // ==================================================

    // Limpiamos el formulario.
    formulario.reset();


    // Ocultamos nuevamente el formulario.
    contenedorFormulario.classList.add(
      "oculto"
    );


    // Actualizamos la tabla.
    cargarVisitas();


    // Informamos que funcionó.
    alert(
      "Actividad registrada correctamente."
    );

  }
);


// ======================================================
// MOSTRAR VISITAS EN LA TABLA
// ======================================================

function cargarVisitas() {

  // Recuperamos todas las visitas.
  const visitas =
    obtenerDatos(KEY_VISITAS);


  // Limpiamos la tabla.
  tablaVisitas.innerHTML = "";


  // Actualizamos el contador.
  cantidadVisitas.textContent =
    `${visitas.length} registros`;


  // Si todavía no tenemos visitas...
  if (visitas.length === 0) {

    tablaVisitas.innerHTML = `

      <tr>

        <td colspan="8">
          No hay visitas o entregas registradas.
        </td>

      </tr>

    `;

    return;
  }


  // Recorremos cada visita.
  visitas.forEach(visita => {

    // Creamos una nueva fila.
    const fila =
      document.createElement("tr");


    // Clase visual provisional para el estado.
    let claseEstado =
      "asignada";


    // Si fue realizada, usamos la clase verde.
    if (visita.estado === "Realizada") {

      claseEstado =
        "resuelta";

    }


    // Si no fue realizada,
    // utilizamos una clase visual de alerta.
    if (visita.estado === "No realizada") {

      claseEstado =
        "urgencia-alta";

    }


    // Si fue reprogramada,
    // usamos la clase de proceso.
    if (visita.estado === "Reprogramada") {

      claseEstado =
        "proceso";

    }


    // Construimos las columnas de la tabla.
    fila.innerHTML = `

      <td>

        <strong>
          ${visita.adultoNombre}
        </strong>

      </td>


      <td>
        ${visita.voluntarioNombre}
      </td>


      <td>
        ${visita.tipo}
      </td>


      <td>
        ${visita.fecha}
      </td>


      <td>
        ${visita.hora}
      </td>


      <td>
        ${visita.resultado}
      </td>


      <td>

        <span class="estado ${claseEstado}">
          ${visita.estado}
        </span>

      </td>


      <td>

        <button
          class="btn-accion ver"
          onclick="verVisita('${visita.id}')"
        >
          Ver
        </button>

        <button
          class="btn-accion eliminar"
          onclick="eliminarVisita('${visita.id}')"
        >
          Eliminar
        </button>

      </td>

    `;


    // Insertamos la fila en la tabla.
    tablaVisitas.appendChild(
      fila
    );

  });

}


// ======================================================
// VER DETALLE DE UNA VISITA
// ======================================================

function verVisita(id) {

  // Buscamos la visita por su ID.
  const visita =
    obtenerDatos(KEY_VISITAS)
      .find(
        item =>
          item.id === id
      );


  // Si no existe, detenemos la función.
  if (!visita) {
    return;
  }


  // Por ahora usamos alert para mostrar
  // los detalles de la actividad.
  alert(
`Adulto mayor:
${visita.adultoNombre}

Voluntario:
${visita.voluntarioNombre}

Tipo de actividad:
${visita.tipo}

Solicitud:
${visita.categoria}

Fecha:
${visita.fecha}

Hora:
${visita.hora}

Resultado:
${visita.resultado}

Estado:
${visita.estado}

Observaciones:
${visita.observaciones || "Sin observaciones"}`
  );

}


// ======================================================
// ELIMINAR VISITA
// ======================================================

function eliminarVisita(id) {

  // Pedimos confirmación antes de borrar.
  const confirmar =
    confirm(
      "¿Seguro que deseas eliminar este registro?"
    );


  // Si el usuario presiona Cancelar,
  // detenemos la función.
  if (!confirmar) {
    return;
  }


  // Recuperamos las visitas.
  const visitas =
    obtenerDatos(KEY_VISITAS);


  // Creamos un arreglo nuevo excluyendo
  // la visita seleccionada.
  const nuevasVisitas =
    visitas.filter(
      visita =>
        visita.id !== id
    );


  // Guardamos nuevamente el arreglo.
  guardarDatos(
    KEY_VISITAS,
    nuevasVisitas
  );


  // Actualizamos la tabla.
  cargarVisitas();

}


// ======================================================
// INICIAR MÓDULO
// ======================================================

// DOMContentLoaded significa:
// "ejecuta esto cuando el HTML termine de cargarse".
document.addEventListener(
  "DOMContentLoaded",
  () => {

    // Cargamos las asignaciones en el selector.
    cargarAsignaciones();


    // Mostramos las visitas existentes.
    cargarVisitas();

  }
);