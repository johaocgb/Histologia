// ==============================
// MÓDULO: INTERACCIÓN DEL VISOR
// ==============================
// Controla:
// - Navegación entre imágenes
// - Panel de descripción
// - Botones (zoom, fullscreen, etc.)
// - Historial

export function iniciarInteraccion(visor, estructura, estado){

    const viewerContainer = document.getElementById("viewer");

    // ============================
    // ACTUALIZAR PANEL
    // ============================
    // Muestra la descripción según ID
    // Si está vacía, busca otra del mismo grupo

    function actualizarPanel(id){

        const paginas = document.querySelectorAll("#panel-descripcion .pagina");

        // Ocultar todas
        paginas.forEach(p => p.style.display = "none");

        // Buscar por ID
        let pagina = document.querySelector(`.pagina[data-id="${id}"]`);

        // Fallback: buscar por grupo si está vacía
        if (pagina && pagina.innerHTML.trim() === ""){
            const grupo = pagina.dataset.grupo;

            if (grupo){
                const paginasGrupo = document.querySelectorAll(`.pagina[data-grupo="${grupo}"]`);

                for (let p of paginasGrupo){
                    if (p.innerHTML.trim() !== ""){
                        pagina = p;
                        break;
                    }
                }
            }
        }

        // Mostrar la elegida
        if (pagina){
            pagina.style.display = "block";
        }
    }

    // ============================
    // TRANSICIÓN VISUAL
    // ============================
    // Efecto zoom + flash al cambiar imagen

    function transicionCambioImagen(callback){

        const center = visor.viewport.getCenter();
        visor.viewport.zoomBy(1.2, center);
        visor.viewport.applyConstraints();

        let flash = document.getElementById("visor-flash");

        if(!flash){
            flash = document.createElement("div");
            flash.id = "visor-flash";

            flash.style.position = "absolute";
            flash.style.top = "0";
            flash.style.left = "0";
            flash.style.width = "100%";
            flash.style.height = "100%";
            flash.style.background = "white";
            flash.style.opacity = "0";
            flash.style.pointerEvents = "none";
            flash.style.zIndex = "9999";
            flash.style.transition = "opacity 0.25s ease";

            viewerContainer.appendChild(flash);
        }

        flash.style.opacity = "0.6";

        setTimeout(() => flash.style.opacity = "0", 150);
        setTimeout(callback, 250);
    }

    // ============================
    // ABRIR IMAGEN
    // ============================
    // Cambia imagen + guarda historial

    function abrirImagen(level, id){

        if (!estructura[level] || !estructura[level][id]) return;

        // Guardar estado anterior
        estado.historial.push({
            level: estado.currentLevel,
            id: estado.currentId
        });

        transicionCambioImagen(() => {

            estado.currentLevel = level;
            estado.currentId = id;

            visor.open({
                type: "image",
                url: estructura[level][id].src
            });

            actualizarPanel(id);
        });
    }

    // ============================
    // VOLVER ATRÁS
    // ============================

    function volverAtras(){

        if (!estado.historial.length) return;

        const anterior = estado.historial.pop();

        transicionCambioImagen(() => {

            estado.currentLevel = anterior.level;
            estado.currentId = anterior.id;

            visor.open({
                type: "image",
                url: estructura[estado.currentLevel][estado.currentId].src
            });

            actualizarPanel(estado.currentId);
        });
    }

    // ============================
    // IR AL INICIO
    // ============================

    function irInicio(){
        transicionCambioImagen(() => {
            abrirImagen(estado.initialLevel, estado.initialId);
        });
    }

    // Exponer función para otros módulos
    estado.abrirImagen = abrirImagen;

    // ============================
    // BOTONES UI
    // ============================

    document.getElementById("btn-home")?.addEventListener("click", irInicio);
    document.getElementById("btn-back")?.addEventListener("click", volverAtras);

    document.getElementById("btn-exit")?.addEventListener("click", () => {
        if (document.fullscreenElement) document.exitFullscreen();
    });

    document.getElementById("zoom-in")?.addEventListener("click", () => {
        visor.viewport.zoomBy(1.25);
        visor.viewport.applyConstraints();
    });

    document.getElementById("zoom-out")?.addEventListener("click", () => {
        visor.viewport.zoomBy(0.8);
        visor.viewport.applyConstraints();
    });

    document.getElementById("fit-btn")?.addEventListener("click", () => {
        visor.viewport.goHome(true);
    });

    document.getElementById("fullscreen-btn")?.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            viewerContainer.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    // ============================
    // TOGGLE ETIQUETAS
    // ============================

    document.getElementById("toggle-labels")?.addEventListener("click", () => {

        estado.etiquetasVisibles = !estado.etiquetasVisibles;

        if (estado.actualizarEtiquetas) {
            estado.actualizarEtiquetas();
        }

        document.getElementById("toggle-labels")
            ?.classList.toggle("active", estado.etiquetasVisibles);
    });

    // ============================
    // INICIO DEL VISOR
    // ============================

    visor.open({
        type: "image",
        url: estructura[estado.currentLevel][estado.currentId].src
    });

    // Mostrar descripción inicial
    actualizarPanel(estado.currentId);
}