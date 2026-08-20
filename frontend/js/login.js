// ======================================================
// LOGIN.JS
// Controla exclusivamente el inicio de sesión.
//
// IMPORTANTE:
// Esto todavía NO es una autenticación real.
// Como aún no tenemos FastAPI + MongoDB,
// simularemos la sesión utilizando localStorage.
// ======================================================


// ======================================================
// OBTENER ELEMENTOS DEL HTML
// ======================================================

// Buscamos el formulario que tiene id="formLogin".
const formLogin =
  document.getElementById("formLogin");


// Buscamos el campo donde se escribe el correo.
const correoLogin =
  document.getElementById("correoLogin");


// Buscamos el campo de contraseña.
const passwordLogin =
  document.getElementById("passwordLogin");


// Buscamos el selector del rol.
const rolLogin =
  document.getElementById("rolLogin");


// Buscamos el espacio donde podremos mostrar errores.
const mensajeLogin =
  document.getElementById("mensajeLogin");


// ======================================================
// ESCUCHAR EL FORMULARIO
// ======================================================

// "submit" ocurre cuando el usuario presiona
// el botón "Iniciar sesión".
formLogin.addEventListener(
  "submit",
  function(event) {


    // Evita que HTML recargue automáticamente la página.
    // Queremos que JavaScript controle qué ocurre.
    event.preventDefault();


    // ==================================================
    // OBTENER LOS DATOS INGRESADOS
    // ==================================================

    // Obtenemos el correo.
    // trim() elimina espacios innecesarios
    // al principio y al final.
    const correo =
      correoLogin.value.trim();


    // Obtenemos la contraseña.
    const password =
      passwordLogin.value;


    // Obtenemos el rol seleccionado.
    const rol =
      rolLogin.value;


    // ==================================================
    // VALIDACIÓN
    // ==================================================

    // Comprobamos que los tres datos existan.
    if (
      !correo ||
      !password ||
      !rol
    ) {

      // Mostramos el mensaje dentro del HTML.
      mensajeLogin.textContent =
        "Por favor, complete todos los campos.";


      // return detiene la función.
      // Por lo tanto, el usuario no inicia sesión.
      return;

    }


    // ==================================================
    // CREAR SESIÓN PROVISIONAL
    // ==================================================

    // Creamos un objeto JavaScript
    // representando al usuario conectado.
    const sesion = {

      // Guardamos su correo.
      correo: correo,

      // Guardamos el rol seleccionado.
      rol: rol,

      // Guardamos cuándo inició sesión.
      fechaInicio:
        new Date().toISOString(),

      // Indicamos que la sesión está activa.
      activa: true

    };


    // ==================================================
    // GUARDAR SESIÓN
    // ==================================================

    // Convertimos el objeto "sesion" a JSON
    // y lo guardamos temporalmente en el navegador.
    localStorage.setItem(
      "ayudaMayor_sesion",
      JSON.stringify(sesion)
    );


    // ==================================================
    // REDIRECCIONAR AL DASHBOARD
    // ==================================================

    // Si llegamos hasta aquí significa que
    // los campos fueron completados.

    // Enviamos al usuario al panel principal.
    window.location.href =
      "dashboard.html";

  }
);