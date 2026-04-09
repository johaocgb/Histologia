// ==============================
// MÓDULO: INICIALIZAR VISOR
// ==============================
// Crea y configura una instancia de OpenSeadragon (LIBRERIA JAVASCRIPT PARA VISOR AVANZADO DE IMAGNES)

export function iniciarVisor(){

    const visor = OpenSeadragon({

        id: "viewer-main", // ID del contenedor HTML

        // Ruta de iconos internos de OpenSeadragon
        prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",

        showNavigationControl: false, // Oculta controles por defecto

        animationTime: 0.8, // Suavidad del zoom/pan
        blendTime: 0.1,    // Transición entre imágenes

        constrainDuringPan: true // Evita salir de los límites de la imagen

    });

    return visor; // Devuelve la instancia para usar en otros módulos
}