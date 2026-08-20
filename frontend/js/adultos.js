// ==========================================
// ADULTOS MAYORES - FRONTEND PROVISIONAL
// Datos guardados en localStorage
// ==========================================

const STORAGE_KEY = "ayudaMayor_adultos";

let adultoEditandoId = null;


// ELEMENTOS HTML
const tablaAdultos =
  document.getElementById("tablaAdultos");

const cantidadAdultos =
  document.getElementById("cantidadAdultos");

const formAdulto =
  document.getElementById("formAdulto");

const contenedorFormulario =
  document.getElementById("contenedorFormulario");

const btnMostrarFormulario =
  document.getElementById("btnMostrarFormulario");

const btnCancelar =
  document.getElementById("btnCancelar");


// ==========================================
// LOCALSTORAGE
// ==========================================

function obtenerAdultos() {

  const datos =
    localStorage.getItem(STORAGE_KEY);

  if (!datos) {
    return [];
  }

  return JSON.parse(datos);
}


function guardarAdultos(adultos) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(adultos)
  );

}


// ==========================================
// GENERAR ID
// ==========================================

function generarId() {

  return Date.now().toString();

}


// ==========================================
// MOSTRAR FORMULARIO
// ==========================================

btnMostrarFormulario.addEventListener(
  "click",
  () => {

    adultoEditandoId = null;

    formAdulto.reset();

    contenedorFormulario.classList.remove(
      "oculto"
    );

  }
);


// ==========================================
// CANCELAR
// ==========================================

btnCancelar.addEventListener(
  "click",
  () => {

    adultoEditandoId = null;

    formAdulto.reset();

    contenedorFormulario.classList.add(
      "oculto"
    );

  }
);


// ==========================================
// CARGAR ADULTOS
// ==========================================

function cargarAdultos() {

  const adultos =
    obtenerAdultos();

  tablaAdultos.innerHTML = "";

  cantidadAdultos.textContent =
    `${adultos.length} registrados`;


  if (adultos.length === 0) {

    tablaAdultos.innerHTML = `
      <tr>

        <td colspan="7">
          No hay adultos mayores registrados.
        </td>

      </tr>
    `;

    return;

  }


  adultos.forEach(adulto => {

    const fila =
      document.createElement("tr");


    fila.innerHTML = `

      <td>
        <strong>
          ${adulto.nombre}
          ${adulto.apellido}
        </strong>
      </td>

      <td>
        ${adulto.rut}
      </td>

      <td>
        ${adulto.edad}
      </td>

      <td>
        ${adulto.comuna}
      </td>

      <td>
        ${adulto.telefono}
      </td>

      <td>

        <span class="estado resuelta">
          Activo
        </span>

      </td>

      <td>

        <button
          class="btn-accion ver"
          onclick="verAdulto('${adulto.id}')"
        >
          Ver
        </button>

        <button
          class="btn-accion editar"
          onclick="editarAdulto('${adulto.id}')"
        >
          Editar
        </button>

        <button
          class="btn-accion eliminar"
          onclick="eliminarAdulto('${adulto.id}')"
        >
          Eliminar
        </button>

      </td>
    `;


    tablaAdultos.appendChild(fila);

  });

}


// ==========================================
// REGISTRAR / ACTUALIZAR ADULTO
// ==========================================

formAdulto.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    const necesidadesTexto =
      document.getElementById(
        "necesidades"
      ).value;


    const necesidades =
      necesidadesTexto
        .split(",")
        .map(item => item.trim())
        .filter(item => item !== "");


    const adulto = {

      id:
        adultoEditandoId ||
        generarId(),

      nombre:
        document.getElementById(
          "nombre"
        ).value.trim(),

      apellido:
        document.getElementById(
          "apellido"
        ).value.trim(),

      rut:
        document.getElementById(
          "rut"
        ).value.trim(),

      edad:
        Number(
          document.getElementById(
            "edad"
          ).value
        ),

      telefono:
        document.getElementById(
          "telefono"
        ).value.trim(),

      direccion:
        document.getElementById(
          "direccion"
        ).value.trim(),

      comuna:
        document.getElementById(
          "comuna"
        ).value.trim(),

      necesidades,

      contactoEmergencia: {

        nombre:
          document.getElementById(
            "contactoNombre"
          ).value.trim(),

        telefono:
          document.getElementById(
            "contactoTelefono"
          ).value.trim(),

        parentesco:
          document.getElementById(
            "contactoParentesco"
          ).value.trim()

      },

      restriccionesContacto:
        document.getElementById(
          "restricciones"
        ).value.trim(),

      activo: true

    };


    const adultos =
      obtenerAdultos();


    // Revisar RUT duplicado
    const rutExiste =
      adultos.some(
        item =>
          item.rut === adulto.rut &&
          item.id !== adulto.id
      );


    if (rutExiste) {

      alert(
        "Ya existe un adulto mayor con ese RUT."
      );

      return;

    }


    // EDITAR
    if (adultoEditandoId) {

      const indice =
        adultos.findIndex(
          item =>
            item.id === adultoEditandoId
        );


      if (indice !== -1) {

        adultos[indice] =
          adulto;

      }

    }

    // REGISTRAR NUEVO
    else {

      adultos.unshift(
        adulto
      );

    }


    guardarAdultos(adultos);


    adultoEditandoId = null;

    formAdulto.reset();

    contenedorFormulario.classList.add(
      "oculto"
    );


    cargarAdultos();

  }
);


// ==========================================
// VER ADULTO
// ==========================================

function verAdulto(id) {

  const adulto =
    obtenerAdultos().find(
      item => item.id === id
    );


  if (!adulto) {
    return;
  }


  alert(
`Nombre:
${adulto.nombre} ${adulto.apellido}

RUT:
${adulto.rut}

Edad:
${adulto.edad}

Teléfono:
${adulto.telefono}

Dirección:
${adulto.direccion}

Comuna:
${adulto.comuna}

Necesidades:
${adulto.necesidades.join(", ") || "Sin información"}

Contacto de emergencia:
${adulto.contactoEmergencia.nombre || "Sin información"}

Parentesco:
${adulto.contactoEmergencia.parentesco || "Sin información"}

Teléfono de emergencia:
${adulto.contactoEmergencia.telefono || "Sin información"}

Restricciones de contacto:
${adulto.restriccionesContacto || "Ninguna"}`
  );

}


// ==========================================
// EDITAR ADULTO
// ==========================================

function editarAdulto(id) {

  const adulto =
    obtenerAdultos().find(
      item => item.id === id
    );


  if (!adulto) {
    return;
  }


  adultoEditandoId =
    adulto.id;


  document.getElementById(
    "nombre"
  ).value =
    adulto.nombre;


  document.getElementById(
    "apellido"
  ).value =
    adulto.apellido;


  document.getElementById(
    "rut"
  ).value =
    adulto.rut;


  document.getElementById(
    "edad"
  ).value =
    adulto.edad;


  document.getElementById(
    "telefono"
  ).value =
    adulto.telefono;


  document.getElementById(
    "direccion"
  ).value =
    adulto.direccion;


  document.getElementById(
    "comuna"
  ).value =
    adulto.comuna;


  document.getElementById(
    "necesidades"
  ).value =
    adulto.necesidades.join(", ");


  document.getElementById(
    "contactoNombre"
  ).value =
    adulto.contactoEmergencia?.nombre || "";


  document.getElementById(
    "contactoTelefono"
  ).value =
    adulto.contactoEmergencia?.telefono || "";


  document.getElementById(
    "contactoParentesco"
  ).value =
    adulto.contactoEmergencia?.parentesco || "";


  document.getElementById(
    "restricciones"
  ).value =
    adulto.restriccionesContacto || "";


  contenedorFormulario.classList.remove(
    "oculto"
  );


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


// ==========================================
// ELIMINAR ADULTO
// ==========================================

function eliminarAdulto(id) {

  const confirmar =
    confirm(
      "¿Seguro que deseas eliminar este adulto mayor?"
    );


  if (!confirmar) {
    return;
  }


  const adultos =
    obtenerAdultos().filter(
      item => item.id !== id
    );


  guardarAdultos(adultos);

  cargarAdultos();

}


// ==========================================
// INICIAR
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  cargarAdultos
);