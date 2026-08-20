const KEY_ADULTOS = "ayudaMayor_adultos";
const KEY_SOLICITUDES = "ayudaMayor_solicitudes";

let solicitudEditando = null;


/* ==============================
   LOCALSTORAGE
================================ */

function obtenerAdultos() {
  return JSON.parse(
    localStorage.getItem(KEY_ADULTOS) || "[]"
  );
}

function obtenerSolicitudes() {
  return JSON.parse(
    localStorage.getItem(KEY_SOLICITUDES) || "[]"
  );
}

function guardarSolicitudes(solicitudes) {
  localStorage.setItem(
    KEY_SOLICITUDES,
    JSON.stringify(solicitudes)
  );
}


/* ==============================
   CARGAR ADULTOS EN SELECT
================================ */

function cargarAdultosSelect() {

  const select =
    document.getElementById("adultoMayor");

  const adultos = obtenerAdultos();

  select.innerHTML = `
    <option value="">
      Seleccione adulto mayor
    </option>
  `;

  adultos.forEach(adulto => {

    const option =
      document.createElement("option");

    option.value = adulto.id;

    option.textContent =
      `${adulto.nombre} ${adulto.apellido}`;

    select.appendChild(option);

  });

}


/* ==============================
   MOSTRAR SOLICITUDES
================================ */

function cargarSolicitudes() {

  const tabla =
    document.getElementById("tablaSolicitudes");

  const contador =
    document.getElementById("cantidadSolicitudes");

  const solicitudes =
    obtenerSolicitudes();


  contador.textContent =
    `${solicitudes.length} solicitudes`;

  tabla.innerHTML = "";


  if (solicitudes.length === 0) {

    tabla.innerHTML = `
      <tr>
        <td colspan="7">
          No hay solicitudes registradas.
        </td>
      </tr>
    `;

    return;
  }


  solicitudes.forEach(solicitud => {

    const fila =
      document.createElement("tr");


    let claseUrgencia = "";

    if (solicitud.urgencia === "Alta") {
      claseUrgencia = "urgencia-alta";
    }

    if (solicitud.urgencia === "Media") {
      claseUrgencia = "urgencia-media";
    }

    if (solicitud.urgencia === "Baja") {
      claseUrgencia = "urgencia-baja";
    }


    let claseEstado = "";

    if (solicitud.estado === "Pendiente") {
      claseEstado = "pendiente";
    }

    if (solicitud.estado === "Asignada") {
      claseEstado = "asignada";
    }

    if (solicitud.estado === "En proceso") {
      claseEstado = "proceso";
    }

    if (solicitud.estado === "Resuelta") {
      claseEstado = "resuelta";
    }


    fila.innerHTML = `

      <td>
        #${solicitud.id.slice(-4)}
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
        ${solicitud.fecha}
      </td>

      <td>

        <button
          class="btn-accion ver"
          onclick="verSolicitud('${solicitud.id}')"
        >
          Ver
        </button>

        <button
          class="btn-accion editar"
          onclick="editarSolicitud('${solicitud.id}')"
        >
          Editar
        </button>

        <button
          class="btn-accion eliminar"
          onclick="eliminarSolicitud('${solicitud.id}')"
        >
          Eliminar
        </button>

      </td>
    `;


    tabla.appendChild(fila);

  });

}


/* ==============================
   NUEVA SOLICITUD
================================ */

const btnNuevaSolicitud =
  document.getElementById("btnNuevaSolicitud");

const btnCancelarSolicitud =
  document.getElementById("btnCancelarSolicitud");

const contenedorFormulario =
  document.getElementById(
    "contenedorFormularioSolicitud"
  );

const formulario =
  document.getElementById("formSolicitud");


btnNuevaSolicitud.addEventListener(
  "click",
  () => {

    solicitudEditando = null;

    formulario.reset();

    contenedorFormulario.classList.remove(
      "oculto"
    );

  }
);


btnCancelarSolicitud.addEventListener(
  "click",
  () => {

    solicitudEditando = null;

    formulario.reset();

    contenedorFormulario.classList.add(
      "oculto"
    );

  }
);


/* ==============================
   GUARDAR
================================ */

formulario.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    const adultoId =
      document.getElementById(
        "adultoMayor"
      ).value;


    const adultos =
      obtenerAdultos();


    const adulto =
      adultos.find(
        item => item.id === adultoId
      );


    if (!adulto) {

      alert(
        "Debes seleccionar un adulto mayor."
      );

      return;

    }


    const nuevaSolicitud = {

      id:
        solicitudEditando ||
        Date.now().toString(),

      adultoId:
        adulto.id,

      adultoNombre:
        `${adulto.nombre} ${adulto.apellido}`,

      categoria:
        document.getElementById(
          "categoria"
        ).value,

      urgencia:
        document.getElementById(
          "urgencia"
        ).value,

      estado:
        document.getElementById(
          "estado"
        ).value,

      descripcion:
        document.getElementById(
          "descripcion"
        ).value,

      fecha:
        new Date().toLocaleDateString(
          "es-CL"
        )

    };


    const solicitudes =
      obtenerSolicitudes();


    if (solicitudEditando) {

      const indice =
        solicitudes.findIndex(
          item =>
            item.id === solicitudEditando
        );


      solicitudes[indice] =
        nuevaSolicitud;

    } else {

      solicitudes.unshift(
        nuevaSolicitud
      );

    }


    guardarSolicitudes(solicitudes);


    solicitudEditando = null;

    formulario.reset();

    contenedorFormulario.classList.add(
      "oculto"
    );


    cargarSolicitudes();

  }
);


/* ==============================
   VER
================================ */

function verSolicitud(id) {

  const solicitud =
    obtenerSolicitudes().find(
      item => item.id === id
    );


  if (!solicitud) {
    return;
  }


  alert(
`Adulto mayor:
${solicitud.adultoNombre}

Categoría:
${solicitud.categoria}

Urgencia:
${solicitud.urgencia}

Estado:
${solicitud.estado}

Descripción:
${solicitud.descripcion}

Fecha:
${solicitud.fecha}`
  );

}


/* ==============================
   EDITAR
================================ */

function editarSolicitud(id) {

  const solicitud =
    obtenerSolicitudes().find(
      item => item.id === id
    );


  if (!solicitud) {
    return;
  }


  solicitudEditando = id;


  document.getElementById(
    "adultoMayor"
  ).value =
    solicitud.adultoId;


  document.getElementById(
    "categoria"
  ).value =
    solicitud.categoria;


  document.getElementById(
    "urgencia"
  ).value =
    solicitud.urgencia;


  document.getElementById(
    "estado"
  ).value =
    solicitud.estado;


  document.getElementById(
    "descripcion"
  ).value =
    solicitud.descripcion;


  contenedorFormulario.classList.remove(
    "oculto"
  );


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ==============================
   ELIMINAR
================================ */

function eliminarSolicitud(id) {

  const confirmar =
    confirm(
      "¿Seguro que deseas eliminar esta solicitud?"
    );


  if (!confirmar) {
    return;
  }


  const solicitudes =
    obtenerSolicitudes().filter(
      item => item.id !== id
    );


  guardarSolicitudes(solicitudes);

  cargarSolicitudes();

}


/* ==============================
   INICIAR
================================ */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    cargarAdultosSelect();

    cargarSolicitudes();

  }
);