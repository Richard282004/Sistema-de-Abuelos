// ======================================================
// REPORTES.JS
// Lee los datos almacenados por los demás módulos
// y genera automáticamente los reportes de gestión.
// ======================================================


// ------------------------------------------------------
// CLAVES DE LOCALSTORAGE
// ------------------------------------------------------

// Adultos mayores registrados.
const KEY_ADULTOS = "ayudaMayor_adultos";

// Solicitudes de ayuda registradas.
const KEY_SOLICITUDES = "ayudaMayor_solicitudes";

// Voluntarios registrados.
const KEY_VOLUNTARIOS = "ayudaMayor_voluntarios";

// Visitas y entregas registradas.
const KEY_VISITAS = "ayudaMayor_visitas";


// ======================================================
// OBTENER DATOS
// ======================================================

// Función reutilizable para leer cualquier arreglo
// almacenado en localStorage.
function obtenerDatos(clave) {

  // Buscamos los datos utilizando su clave.
  const datos = localStorage.getItem(clave);

  // Si existen, JSON.parse los convierte nuevamente
  // desde texto JSON a un arreglo de JavaScript.
  // Si no existen, devolvemos un arreglo vacío.
  return datos
    ? JSON.parse(datos)
    : [];

}


// ======================================================
// GENERAR INDICADORES GENERALES
// ======================================================

function generarIndicadores() {

  // Obtenemos los datos de cada módulo.
  const adultos =
    obtenerDatos(KEY_ADULTOS);

  const solicitudes =
    obtenerDatos(KEY_SOLICITUDES);

  const voluntarios =
    obtenerDatos(KEY_VOLUNTARIOS);

  const visitas =
    obtenerDatos(KEY_VISITAS);


  // --------------------------------------------------
  // SOLICITUDES PENDIENTES
  // --------------------------------------------------

  // filter crea un nuevo arreglo solamente
  // con las solicitudes cuyo estado sea "Pendiente".
  const pendientes =
    solicitudes.filter(
      solicitud =>
        solicitud.estado === "Pendiente"
    );


  // --------------------------------------------------
  // SOLICITUDES RESUELTAS
  // --------------------------------------------------

  const resueltas =
    solicitudes.filter(
      solicitud =>
        solicitud.estado === "Resuelta"
    );


  // --------------------------------------------------
  // VOLUNTARIOS ACTIVOS
  // --------------------------------------------------

  const voluntariosActivos =
    voluntarios.filter(
      voluntario =>
        voluntario.estado === "Activo"
    );


  // --------------------------------------------------
  // VISITAS REALIZADAS
  // --------------------------------------------------

  const visitasRealizadas =
    visitas.filter(
      visita =>
        visita.estado === "Realizada"
    );


  // ==================================================
  // MOSTRAR LOS RESULTADOS EN EL HTML
  // ==================================================

  // .length devuelve la cantidad de elementos
  // existentes dentro de un arreglo.

  document.getElementById(
    "reporteAdultos"
  ).textContent =
    adultos.length;


  document.getElementById(
    "reporteSolicitudes"
  ).textContent =
    solicitudes.length;


  document.getElementById(
    "reportePendientes"
  ).textContent =
    pendientes.length;


  document.getElementById(
    "reporteResueltas"
  ).textContent =
    resueltas.length;


  document.getElementById(
    "reporteVoluntarios"
  ).textContent =
    voluntariosActivos.length;


  document.getElementById(
    "reporteVisitas"
  ).textContent =
    visitasRealizadas.length;

}


// ======================================================
// REPORTE DE SOLICITUDES POR CATEGORÍA
// ======================================================

function generarReporteCategorias() {

  // Recuperamos las solicitudes.
  const solicitudes =
    obtenerDatos(KEY_SOLICITUDES);


  // Buscamos la tabla correspondiente en el HTML.
  const tabla =
    document.getElementById(
      "tablaReporteCategorias"
    );


  // Creamos un objeto vacío.
  // Aquí iremos contando cada categoría.
  const categorias = {};


  // Recorremos todas las solicitudes.
  solicitudes.forEach(solicitud => {

    // Obtenemos la categoría.
    const categoria =
      solicitud.categoria;


    // Si la categoría todavía no existe
    // dentro de nuestro objeto...
    if (!categorias[categoria]) {

      // La creamos comenzando en cero.
      categorias[categoria] = 0;

    }


    // Sumamos una solicitud a esa categoría.
    categorias[categoria]++;

  });


  // Limpiamos la tabla antes de generar las filas.
  tabla.innerHTML = "";


  // Object.keys devuelve las categorías existentes.
  const nombresCategorias =
    Object.keys(categorias);


  // Si no tenemos ninguna categoría...
  if (nombresCategorias.length === 0) {

    tabla.innerHTML = `

      <tr>

        <td colspan="2">
          No existen solicitudes registradas.
        </td>

      </tr>

    `;

    return;

  }


  // Recorremos las categorías encontradas.
  nombresCategorias.forEach(categoria => {

    // Creamos una fila.
    const fila =
      document.createElement("tr");


    // Mostramos la categoría y su cantidad.
    fila.innerHTML = `

      <td>
        ${categoria}
      </td>

      <td>
        ${categorias[categoria]}
      </td>

    `;


    // Agregamos la fila a la tabla.
    tabla.appendChild(fila);

  });

}


// ======================================================
// REPORTE DE SOLICITUDES POR ESTADO
// ======================================================

function generarReporteEstados() {

  // Recuperamos las solicitudes.
  const solicitudes =
    obtenerDatos(KEY_SOLICITUDES);


  // Buscamos la tabla en el HTML.
  const tabla =
    document.getElementById(
      "tablaReporteEstados"
    );


  // Objeto donde guardaremos los conteos.
  const estados = {};


  // Recorremos las solicitudes.
  solicitudes.forEach(solicitud => {

    // Obtenemos su estado actual.
    const estado =
      solicitud.estado;


    // Si todavía no existe ese estado,
    // lo inicializamos en cero.
    if (!estados[estado]) {

      estados[estado] = 0;

    }


    // Sumamos uno.
    estados[estado]++;

  });


  // Limpiamos la tabla.
  tabla.innerHTML = "";


  // Obtenemos todos los estados encontrados.
  const nombresEstados =
    Object.keys(estados);


  // Si todavía no hay solicitudes...
  if (nombresEstados.length === 0) {

    tabla.innerHTML = `

      <tr>

        <td colspan="2">
          No existen solicitudes registradas.
        </td>

      </tr>

    `;

    return;

  }


  // Recorremos cada estado.
  nombresEstados.forEach(estado => {

    // Creamos una fila.
    const fila =
      document.createElement("tr");


    // Insertamos estado + cantidad.
    fila.innerHTML = `

      <td>
        ${estado}
      </td>

      <td>
        ${estados[estado]}
      </td>

    `;


    // Agregamos la fila.
    tabla.appendChild(fila);

  });

}


// ======================================================
// INICIAR REPORTES
// ======================================================

// Esperamos hasta que reportes.html
// haya terminado completamente de cargar.
document.addEventListener(
  "DOMContentLoaded",
  () => {

    // Calculamos las tarjetas superiores.
    generarIndicadores();

    // Generamos tabla por categoría.
    generarReporteCategorias();

    // Generamos tabla por estado.
    generarReporteEstados();

  }
);