// ==============================
// MÓDULO: PANEL DE DESCRIPCIÓN
// ==============================
// Controla:
// - Qué descripción se muestra según la imagen activa
// - La visibilidad del panel lateral

export function iniciarPanel(visor, estado){

    // Contenedor principal del visor
    const viewerContainer = document.getElementById("viewer");

    // Todas las páginas/descripciones del panel
    const paginas = document.querySelectorAll("#panel-descripcion .pagina");

    // ============================
    // ACTUALIZAR DESCRIPCIÓN ACTIVA
    // ============================
    // Muestra la descripción que coincide con:
    // - level + id (prioridad)  4, 10, 40
    // - solo level (fallback)

    function actualizarDescripcion(){

        paginas.forEach(p => {

            const level = p.dataset.level;
            const id = p.dataset.id;

            //  Coincidencia exacta: level + id
            if(id){
                if(level === estado.currentLevel && id === estado.currentId){
                    p.classList.add("active");
                } else {
                    p.classList.remove("active");
                }
            }

            //  Solo por nivel
            else if(level){
                if(level === estado.currentLevel){
                    p.classList.add("active");
                } else {
                    p.classList.remove("active");
                }
            }

        });

    }

    // ============================
    // TOGGLE DEL PANEL
    // ============================
    // Muestra/oculta el panel lateral

    document.getElementById("btn-panel")?.addEventListener("click", () => {
        viewerContainer.classList.toggle("panel-hidden");
    });

    // ============================
    // SINCRONIZACIÓN CON EL VISOR
    // ============================
    // Cada vez que el visor carga una imagen ("open"),
    // se actualiza la descripción mostrada

    visor.addHandler("open", actualizarDescripcion);

}