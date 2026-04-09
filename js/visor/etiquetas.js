// ==============================
// MÓDULO: ETIQUETAS Y CUADRANTES
// ==============================
// Se encarga de:
// - Mostrar etiquetas (texto)
// - Mostrar zonas (cuadrantes)
// - Sincronizar con la imagen activa

export function iniciarEtiquetas(visor, estado){

    // ============================
    // LIMPIAR OVERLAYS
    // ============================
    // Elimina todas las etiquetas/cuadrantes actuales

    function limpiarEtiquetas(){

        const existentes = visor.container.querySelectorAll(
            ".etiqueta-overlay, .cuadrante-overlay"
        );

        existentes.forEach(el => {
            try { visor.removeOverlay(el); } catch(e){}
            el.remove();
        });

    }

    // ============================
    // CREAR ETIQUETA (TEXTO)
    // ============================
    // Muestra un texto en una coordenada

    function crearEtiqueta(x, y, texto){

        const contenedor = document.createElement("div");
        contenedor.className = "etiqueta-overlay";

        const label = document.createElement("div");
        label.className = "etiqueta-texto";
        label.textContent = texto;

        contenedor.appendChild(label);

        visor.addOverlay({
            element: contenedor,
            location: new OpenSeadragon.Point(x, y)
        });

    }

    // ============================
    // CREAR CUADRANTE (ZONA)
    // ============================
    // Dibuja un rectángulo en el visor

    function crearCuadrante(x, y, w, h){

        const div = document.createElement("div");
        div.className = "cuadrante-overlay";

        visor.addOverlay({
            element: div,
            location: new OpenSeadragon.Rect(x, y, w, h)
        });

    }

    // ============================
    // MOSTRAR ETIQUETAS ACTIVAS
    // ============================
    // Lee .etiqueta-link del HTML y pinta
    // solo las que coinciden con la imagen actual

    function mostrarTodas(){

        if(!estado.etiquetasVisibles) return;

        const links = document.querySelectorAll(".etiqueta-link");

        links.forEach(link => {

            const level = link.dataset.level;
            const id = link.dataset.id;

            // Solo si corresponde a la imagen activa
            if(
                estado.currentLevel !== level ||
                estado.currentId !== id
            ) return;

            const x = parseFloat(link.dataset.x);
            const y = parseFloat(link.dataset.y);
            const w = parseFloat(link.dataset.w);
            const h = parseFloat(link.dataset.h);

            const texto = link.dataset.label || "Etiqueta";

            // 🔹 Punto (etiqueta)
            if(!isNaN(x) && !isNaN(y) && isNaN(w)){
                crearEtiqueta(x, y, texto);
            }

            // 🔹 Rectángulo (cuadrante)
            if(!isNaN(x) && !isNaN(y) && !isNaN(w) && !isNaN(h)){
                crearCuadrante(x, y, w, h);
            }

        });

    }

    // ============================
    // EVENTO: CAMBIO DE IMAGEN
    // ============================
    // Cada vez que se abre una imagen:
    // - limpia overlays
    // - vuelve a pintar

    visor.addHandler("open", () => {
        limpiarEtiquetas();
        mostrarTodas();
    });

    // ============================
    // MÉTODO EXTERNO
    // ============================
    // Permite forzar actualización desde fuera

    estado.actualizarEtiquetas = function(){
        limpiarEtiquetas();
        mostrarTodas();
    };

}