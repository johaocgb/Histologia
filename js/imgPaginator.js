// ==============================
// PAGINADOR DE IMÁGENES PAGINA DE INICIO
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".image-container img");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  let currentIndex = 0;

  function showImage(index) {
    images.forEach((image, i) => {
      if (i === index) {
        image.classList.add("fadeIn");
        image.style.display = "block";
      } else {
        image.classList.remove("fadeIn");
        image.style.display = "none";
      }
    });
  }

  function goToNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function goToPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", goToPrevImage);
    nextButton.addEventListener("click", goToNextImage);
  }

  showImage(currentIndex);
});

// ==============================
// PAGINADOR DE TEXTO / COLUMNAS
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  let paginaActual = 1;
  const paginas = document.querySelectorAll(".pagina");
  const totalPaginas = paginas.length;
  const pageIndicator = document.getElementById("pageIndicator");

  const btnAnterior = document.getElementById("prevPage");
  const btnSiguiente = document.getElementById("nextPage");

  // Función para mostrar la página correspondiente
  function mostrarPagina(index) {
    paginas.forEach((pagina, i) => {
      if (i === index - 1) {
        pagina.classList.remove("d-none");
        pagina.classList.add("active");
      } else {
        pagina.classList.add("d-none");
        pagina.classList.remove("active");
      }
    });

    // Actualizar indicador
    if (pageIndicator) {
      pageIndicator.textContent = `${paginaActual} / ${totalPaginas}`;
    }

    // Actualizar estado de los botones
    actualizarBotones();
  }

  // Función para cambiar de página
  function cambiarPagina(direccion) {
    const nuevaPagina = paginaActual + direccion;
    if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return; // evita salir de rango
    paginaActual = nuevaPagina;
    mostrarPagina(paginaActual);
  }

  // Deshabilitar o habilitar botones según la página actual
  function actualizarBotones() {
    if (btnAnterior) btnAnterior.disabled = paginaActual === 1;
    if (btnSiguiente) btnSiguiente.disabled = paginaActual === totalPaginas;
  }

  // Inicializar paginador
  mostrarPagina(paginaActual);

  // Escuchar los botones
  if (btnAnterior && btnSiguiente) {
    btnAnterior.addEventListener("click", () => cambiarPagina(-1));
    btnSiguiente.addEventListener("click", () => cambiarPagina(1));
  }
});
