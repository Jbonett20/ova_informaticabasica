$(document).ready(function () {
  $("#abrir-recursos").click(function (e) {
    e.preventDefault(); // Prevenir la acción predeterminada del enlace
    // Toggle (mostrar u ocultar) la sección de recursos
    $("#DivRecursos").toggle("slow"); // Puedes cambiar 'slow' por 'fast' o un número en milisegundos
  });
  loadContent("contenido", "./contenido1.html");
  // visibilidad reproductor
  $("#PlayAudio").hide();
  $("#StopAudio").hide();
});
let contenidoActual = 1; // Índice inicial
let totalDiapositivas = 6; // Número total de diapositivas
// const archivo = `contenido${contenidoActual}.html`;
function loadContent(containerId, url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error al cargar ${url}: ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      getProgreso();
      document.getElementById(containerId).innerHTML = data;
    })
    .catch((error) => console.error(error));
}
function cargarContenido(accion = null) {
  // Actualizar el índice según la acción
  if (accion === "siguiente" && contenidoActual < totalDiapositivas) {
    contenidoActual++;
    loadContent("contenido", `./contenido${contenidoActual}.html`);
    reproducirAudio(contenidoActual);
  } else if (accion === "anterior" && contenidoActual > 1) {
    contenidoActual--;
    loadContent("contenido", `./contenido${contenidoActual}.html`);
    reproducirAudio(contenidoActual);
  } else if (contenidoActual == totalDiapositivas) {
    Swal.fire({
      title: "Curso finalizado",
      text: "Usted ha llegado al final del curso, por favor presione el botón salir en la parte superior derecha",
      icon: "question",
    });
  }
}
function getProgreso() {
  const progreso = (contenidoActual / totalDiapositivas) * 100;
  const progressBar = document.querySelector("#progress-bar");
  progressBar.style.width = `${progreso}%`;
  progressBar.innerHTML = `${Math.floor(progreso)}%`;
}

/* contenido recursos */
function pVideoDir() {
  $("#DivRecursos").addClass("activo");
  $("#DivRecursos").removeClass("inactivo");
  $("#VideoDirectivo").trigger("pause");
  $('#vidIntroduc').trigger('play');
}
function ReproVidDir(video) {
  $('#audiointro').trigger('pause');
  $("#DivRecursos").addClass("inactivo");
  $("#DivRecursos").removeClass("activo");
  $("#ModalVideoDirectivo").modal();
  $("#VideoDirectivo").attr("src", "./assets/video/" + video);
  $("#VideoDirectivo").trigger("play");
}
function hideModalIntroduccion() {
  $('#vidIntroduc').trigger('pause');
  document.querySelectorAll(".btnNavegacion").forEach(function (btn) {
    btn.disabled = false; // Habilitar cada botón
  });
  reproducirAudio(contenidoActual)
}
$("#StopAudio").click(function () {
  const audio = document.getElementById("audiointro");
  audio.pause();
  $("#StopAudio").hide();
  $("#PlayAudio").show();
});

$("#PlayAudio").click(function () {
  const audio = document.getElementById("audiointro");
  audio.play();
  $("#StopAudio").show();
  $("#PlayAudio").hide();
});

function reproducirAudio(indice) {
  $('#audiointro').trigger('pause');
  $("#StopAudio").show();
  $("#PlayAudio").hide();
  $('#audiointro').attr('src', `./assets/audio/contenido${indice}.mp3`);
  $('#audiointro').trigger('play');
}
