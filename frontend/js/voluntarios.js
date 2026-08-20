const STORAGE_KEY = "ayudaMayor_voluntarios";

let voluntarioEditandoId = null;


// ================================
// OBTENER VOLUNTARIOS
// ================================

function obtenerVoluntarios() {

  return JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );

}


// ================================
// GUARDAR VOLUNTARIOS
// ================================

function guardarVoluntarios(voluntarios) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(voluntarios)
  );

}


// ================================
// ELEMENTOS HTML
// ================================

const tablaVoluntarios =
  document.getElementById("tablaVoluntarios");

const cantidadVoluntarios =
  document.getElementById("cantidadVoluntarios");

const formulario =
  document.getElementById("formVoluntario");

const contenedorFormulario =
  document.getElementById(
    "contenedorFormularioVoluntario"
  );

const btnNuevo =
  document.getElementById("btnNuevoVoluntario");

const btnCancelar =
  document.getElementById("btnCancelarVoluntario");


// ================================
// MOSTRAR FORMULARIO
// ================================

btnNuevo.addEventListener("click", () => {

  voluntarioEditandoId = null;

  formulario.reset();

  document.getElementById(
    "estadoVoluntario"
  ).value = "Activo";

  contenedorFormulario.classList.remove(
    "oculto"
  );

});


// ================================
// CANCELAR
// ================================

btnCancelar.addEventListener("click", () => {

  voluntarioEditandoId = null;

  formulario.reset();

  contenedorFormulario.classList.add(
    "oculto"
  );

});


// ================================
// MOSTRAR VOLUNTARIOS
// ================================

function cargarVoluntarios() {

  const voluntarios =
    obtenerVoluntarios();

  tablaVoluntarios.innerHTML = "";

  cantidadVoluntarios.textContent =
    `${voluntarios.length} registrados`;


  if (voluntarios.length === 0) {

    tablaVoluntarios.innerHTML = `
      <tr>
        <td colspan="7">
          No hay voluntarios registrados.
        </td>
      </tr>
    `;

    return;

  }


  voluntarios.forEach(voluntario => {

    const fila =
      document.createElement("tr");


    const claseEstado =
      voluntario.estado === "Activo"
        ? "resuelta"
        : "urgencia-alta";


    fila.innerHTML = `

      <td>
        <strong>
          ${voluntario.nombre}
          ${voluntario.apellido}
        </strong>

        <small>
          ${voluntario.correo}
        </small>
      </td>

      <td>
        ${voluntario.rut}
      </td>

      <td>
        ${voluntario.comuna}
      </td>

      <td>
        ${voluntario.telefono}
      </td>

      <td>
        ${voluntario.disponibilidad}
      </td>

      <td>
        <span class="estado ${claseEstado}">
          ${voluntario.estado}
        </span>
      </td>

      <td>

        <button
          class="btn-accion ver"
          onclick="verVoluntario('${voluntario.id}')"
        >
          Ver
        </button>

        <button
          class="btn-accion editar"
          onclick="editarVoluntario('${voluntario.id}')"
        >
          Editar
        </button>

        <button
          class="btn-accion eliminar"
          onclick="eliminarVoluntario('${voluntario.id}')"
        >
          Eliminar
        </button>

      </td>
    `;


    tablaVoluntarios.appendChild(fila);

  });

}


// ================================
// GUARDAR / EDITAR
// ================================

formulario.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    const voluntario = {

      id:
        voluntarioEditandoId ||
        Date.now().toString(),

      nombre:
        document.getElementById(
          "nombreVoluntario"
        ).value.trim(),

      apellido:
        document.getElementById(
          "apellidoVoluntario"
        ).value.trim(),

      rut:
        document.getElementById(
          "rutVoluntario"
        ).value.trim(),

      telefono:
        document.getElementById(
          "telefonoVoluntario"
        ).value.trim(),

      correo:
        document.getElementById(
          "correoVoluntario"
        ).value.trim(),

      comuna:
        document.getElementById(
          "comunaVoluntario"
        ).value.trim(),

      disponibilidad:
        document.getElementById(
          "disponibilidadVoluntario"
        ).value,

      estado:
        document.getElementById(
          "estadoVoluntario"
        ).value,

      observaciones:
        document.getElementById(
          "observacionesVoluntario"
        ).value.trim()

    };


    const voluntarios =
      obtenerVoluntarios();


    // Evitar RUT duplicado
    const rutExiste =
      voluntarios.some(
        item =>
          item.rut === voluntario.rut &&
          item.id !== voluntario.id
      );


    if (rutExiste) {

      alert(
        "Ya existe un voluntario con ese RUT."
      );

      return;

    }


    // EDITAR
    if (voluntarioEditandoId) {

      const indice =
        voluntarios.findIndex(
          item =>
            item.id === voluntarioEditandoId
        );


      if (indice !== -1) {

        voluntarios[indice] =
          voluntario;

      }

    }

    // NUEVO
    else {

      voluntarios.unshift(
        voluntario
      );

    }


    guardarVoluntarios(voluntarios);


    voluntarioEditandoId = null;

    formulario.reset();

    contenedorFormulario.classList.add(
      "oculto"
    );


    cargarVoluntarios();

  }
);


// ================================
// VER VOLUNTARIO
// ================================

function verVoluntario(id) {

  const voluntario =
    obtenerVoluntarios().find(
      item => item.id === id
    );


  if (!voluntario) {
    return;
  }


  alert(
`Voluntario:
${voluntario.nombre} ${voluntario.apellido}

RUT:
${voluntario.rut}

Teléfono:
${voluntario.telefono}

Correo:
${voluntario.correo}

Comuna / Zona:
${voluntario.comuna}

Disponibilidad:
${voluntario.disponibilidad}

Estado:
${voluntario.estado}

Observaciones:
${voluntario.observaciones || "Sin observaciones"}`
  );

}


// ================================
// EDITAR VOLUNTARIO
// ================================

function editarVoluntario(id) {

  const voluntario =
    obtenerVoluntarios().find(
      item => item.id === id
    );


  if (!voluntario) {
    return;
  }


  voluntarioEditandoId =
    voluntario.id;


  document.getElementById(
    "nombreVoluntario"
  ).value =
    voluntario.nombre;


  document.getElementById(
    "apellidoVoluntario"
  ).value =
    voluntario.apellido;


  document.getElementById(
    "rutVoluntario"
  ).value =
    voluntario.rut;


  document.getElementById(
    "telefonoVoluntario"
  ).value =
    voluntario.telefono;


  document.getElementById(
    "correoVoluntario"
  ).value =
    voluntario.correo;


  document.getElementById(
    "comunaVoluntario"
  ).value =
    voluntario.comuna;


  document.getElementById(
    "disponibilidadVoluntario"
  ).value =
    voluntario.disponibilidad;


  document.getElementById(
    "estadoVoluntario"
  ).value =
    voluntario.estado;


  document.getElementById(
    "observacionesVoluntario"
  ).value =
    voluntario.observaciones || "";


  contenedorFormulario.classList.remove(
    "oculto"
  );


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


// ================================
// ELIMINAR VOLUNTARIO
// ================================

function eliminarVoluntario(id) {

  const confirmar =
    confirm(
      "¿Seguro que deseas eliminar este voluntario?"
    );


  if (!confirmar) {
    return;
  }


  const voluntarios =
    obtenerVoluntarios().filter(
      item => item.id !== id
    );


  guardarVoluntarios(voluntarios);

  cargarVoluntarios();

}


// ================================
// INICIAR
// ================================

document.addEventListener(
  "DOMContentLoaded",
  cargarVoluntarios
);