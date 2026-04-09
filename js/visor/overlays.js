// ==============================
// MÓDULO: OVERLAYS (ZONAS INTERACTIVAS)
// ==============================
// Se encarga de:
// - Dibujar zonas clicables sobre la imagen
// - Mostrar label al hacer hover
// - Navegar a otra imagen al hacer click

export function iniciarOverlays(visor, estructura, estado){

    // ============================
    // LIMPIAR OVERLAYS
    // ============================
    function clearOverlays(){
        visor.clearOverlays();
    }

    // ============================
    // DIBUJAR ZONAS
    // ============================
    // Crea overlays según la imagen actual

    function dibujarZonas(){

        clearOverlays();

        const zonas = estructura[estado.currentLevel][estado.currentId].zonas;

        zonas.forEach(z => {

            const div = document.createElement("div");

            // Estilo base (invisible hasta hover)
            div.style.border = "2px solid rgba(255,255,255,0)";
            div.style.background = "transparent";
            div.style.cursor = "pointer";
            div.style.position = "relative";

            // ============================
            // LABEL (texto de la zona)
            // ============================

            const label = document.createElement("div");
            label.textContent = z.label || "";

            label.style.position = "absolute";
            label.style.top = "5px";
            label.style.left = "5px";
            label.style.background = "rgba(0,0,0,0.7)";
            label.style.color = "#fff";
            label.style.fontSize = "12px";
            label.style.padding = "2px 6px";
            label.style.borderRadius = "4px";
            label.style.pointerEvents = "none";
            label.style.opacity = "0";
            label.style.transition = "opacity 0.2s";

            div.appendChild(label);

            // ============================
            // AÑADIR AL VISOR
            // ============================

            visor.addOverlay({
                element: div,
                location: new OpenSeadragon.Rect(z.x, z.y, z.w, z.h)
            });

            // ============================
            // HOVER (feedback visual)
            // ============================

            div.addEventListener("mouseenter", () => {
                div.style.border = "2px solid #ffffff";
                label.style.opacity = "1";
            });

            div.addEventListener("mouseleave", () => {
                div.style.border = "2px solid rgba(255,255,255,0)";
                label.style.opacity = "0";
            });

            // ============================
            // CLICK (navegación)
            // ============================

            new OpenSeadragon.MouseTracker({
                element: div,
                clickHandler: function(evt){
                    evt.preventDefaultAction = true;

                    // Abre la imagen destino
                    estado.abrirImagen(z.targetLevel, z.target);
                }
            });

        });

    }

    // ============================
    // EVENTO: NUEVA IMAGEN
    // ============================
    // Cuando cambia la imagen:
    // - centra vista
    // - redibuja zonas

    visor.addHandler("open", () => {
        visor.viewport.goHome(true);
        dibujarZonas();
    });

}