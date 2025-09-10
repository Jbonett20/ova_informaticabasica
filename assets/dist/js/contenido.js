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
let maxVelocidad=1;
let terminado =0;
let contenidoActual = 1; // Índice inicial
let totalDiapositivas = 6; // Número total de diapositivas
// const archivo = `contenido${contenidoActual}.html`;
function loadContent(containerId, url) {
  document.getElementById(`${containerId}`).innerHTML = `
    <iframe src="${url}" 
            style="width:100%; height:600px; border:none;"></iframe>
  `;
}
function cargarContenido(accion = null) {
  // Actualizar el índice según la acción
  if (accion === "siguiente" && contenidoActual < totalDiapositivas) {
    contenidoActual++;
    reproducirAudio(contenidoActual)
    loadContent("contenido", `./contenido${contenidoActual}.html`);
    getProgreso(); // <--- actualizar progreso
  } else if (accion === "anterior" && contenidoActual > 1) {
    contenidoActual--;
    reproducirAudio(contenidoActual)
    loadContent("contenido", `./contenido${contenidoActual}.html`);
    getProgreso(); // <--- actualizar progreso
  } else if (contenidoActual == totalDiapositivas) {
    getProgreso(); // <--- actualizar al 100%
    Swal.fire({
      title: "Curso finalizado",
      text: "Usted ha llegado al final del curso, por favor presione el botón salir en la parte superior derecha",
      icon: "question",
    });
       terminado=1;
        let inputFinal = document.getElementById('finalizado');
        inputFinal.value = "SI";
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
  // $('#vidIntroduc').trigger('play');
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

  $("#StopAudio").hide();   
  $("#PlayAudio").show();   
  $("#velocidadAudio").show(); 
}

$("#StopAudio").click(function () {
  const audio = document.getElementById("audiointro");

  audio.pause();
  $("#StopAudio").hide();
  $("#PlayAudio").show();
});

$("#PlayAudio").click(function () {
  const audio = document.getElementById("audiointro");
  audio.playbackRate =maxVelocidad;
  audio.play();
  $("#StopAudio").show();
  $("#PlayAudio").hide();
});

function reproducirAudio(indice) {

  $('#audiointro').attr('src', `./assets/audio/contenido${indice}.mp3`);
   $("#StopAudio").hide();
  $("#PlayAudio").show();
}
// Control de velocidad de reproducción
$(document).ready(function () {
  const velocidades = [1, 1.25, 1.5, 2];
  let indice = 0;

  $("#velocidadAudio").click(function () {
     const audio = document.getElementById("audiointro");
    // avanzar índice
    indice = (indice + 1) % velocidades.length;
     maxVelocidad=velocidades[indice]
     audio.playbackRate =maxVelocidad;
    // poner texto en el botón
    $(this).text(`${velocidades[indice]}x`);
  });
});

$(document).ready(function () {
  const audio = document.getElementById("audiointro");

  // Cuando el audio termina, que quede en "pausa"
  audio.addEventListener("ended", function () {
    $("#StopAudio").hide();
    $("#PlayAudio").show();
    audio.pause(); // aseguramos que no quede en loop
    audio.currentTime = 0; // opcional: reinicia al inicio
  });
});

// Cuando cualquier modal se cierra, pausa todos los audios y videos
$('.modal').on('hidden.bs.modal', function () {
  // Pausar audios
  const audio = document.getElementById("audiointro");
  if (audio) {
    audio.pause();
    audio.currentTime = 0; // opcional: reinicia
  }

  // Pausar videos
  $(this).find('video').each(function () {
    this.pause();
    this.currentTime = 0; // opcional: reinicia
  });
});
$('#btn_salir').on('click',(e)=>{
  e.preventDefault;
  if(terminado==1)   completaCourse(1)
})