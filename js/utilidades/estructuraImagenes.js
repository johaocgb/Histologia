// ==============================
// FUNCIÓN: CREAR ESTRUCTURA DE DATOS
// ==============================
// Construye un objeto con:
// - Imágenes organizadas por level e id
// - Zonas interactivas (cuadrantes) asociadas a cada imagen

export function crearEstructura(){

    const estructura = {};

    // ============================
    // 1. REGISTRAR IMÁGENES
    // ============================
    // Lee los botones .thumb-btn del HTML
    // y crea la base de la estructura

    document.querySelectorAll(".thumb-btn").forEach(btn => {

        const level = btn.dataset.level; // Nivel de agrupación
        const id = btn.dataset.id;       // ID único de la imagen
        const src = btn.dataset.src;     // Ruta de la imagen

        // Si el nivel no existe, se crea
        if (!estructura[level]) estructura[level] = {};

        // Se registra la imagen con sus zonas vacías
        estructura[level][id] = {
            src,
            zonas: []
        };

    });

    // ============================
    // 2. REGISTRAR CUADRANTES
    // ============================
    // Lee configuraciones de zonas interactivas
    // desde #config-cuadrantes

    document.querySelectorAll("#config-cuadrantes > div").forEach(el => {

        const parent = el.dataset.parent;       // Nivel al que pertenece
        const parentId = el.dataset.parentId;   // ID de la imagen

        // Definición de la zona (posición + comportamiento)
        const zona = {
            x: parseFloat(el.dataset.x), // posición X
            y: parseFloat(el.dataset.y), // posición Y
            w: parseFloat(el.dataset.w), // ancho
            h: parseFloat(el.dataset.h), // alto
            label: el.dataset.label || "", 
            target: el.dataset.target,           // ID destino
            targetLevel: el.dataset.targetLevel  // Nivel destino
        };

        // ============================
        // ASIGNACIÓN DE ZONA
        // ============================
        // Solo se añade si la imagen existe

        if (estructura[parent] && estructura[parent][parentId]) {
            estructura[parent][parentId].zonas.push(zona);
        }

    });

    // Devuelve la estructura completa lista para usar
    return estructura;
}