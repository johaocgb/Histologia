// ==============================
// IMPORTACIONES DE MÓDULOS
// ==============================
// Cada módulo se encarga de una parte específica del visor

import { crearEstructura } from "./utilidades/estructuraImagenes.js"; // Genera la estructura de imágenes
import { iniciarVisor } from "./visor/visor.js"; // Inicializa el contenedor/visor principal
import { iniciarInteraccion } from "./visor/interaccion.js"; // Maneja eventos del usuario (click, zoom, etc.)
import { iniciarOverlays } from "./visor/overlays.js"; // Maneja capas superpuestas (overlays)
import { iniciarPanel } from "./interfaz/panel.js"; // Controla la interfaz/panel lateral
import { iniciarCoordenadas } from "./visor/coordenadas.js"; // Muestra coordenadas en el visor
import { iniciarEtiquetas } from "./visor/etiquetas.js"; // Maneja etiquetas visibles en la imagen

console.log("MAIN INICIANDO");

// ==============================
// PUNTO DE ENTRADA DE LA APP
// ==============================
// Se ejecuta cuando el HTML ya está completamente cargado

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // 1. CREAR ESTRUCTURA DE DATOS
    // ==============================
    // Genera un objeto con la organización de imágenes (por niveles e IDs)

    const estructura = crearEstructura();

    console.log("estructura:", estructura);

    // ==============================
    // 2. DETECTAR IMAGEN INICIAL
    // ==============================
    // Busca en el HTML un botón con clase .thumb-btn
    // que tenga data-inicial="true"

    let initialLevel = null;
    let initialId = null;

    document.querySelectorAll(".thumb-btn").forEach(btn => {
        if (btn.dataset.inicial === "true") {
            initialLevel = btn.dataset.level; // Nivel de la imagen
            initialId = btn.dataset.id;       // ID de la imagen
        }
    });

    // ==============================
    // 3. FALLBACK (POR DEFECTO)
    // ==============================
    // Si no se define una imagen inicial en el HTML:
    // → Se toma la primera disponible en la estructura

    if (!initialLevel) {
        const niveles = Object.keys(estructura);

        // Validación: no hay imágenes
        if (niveles.length === 0) {
            console.error("❌ No hay imágenes en el visor");
            return;
        }

        // Se selecciona el primer nivel y la primera imagen
        initialLevel = niveles[0];
        initialId = Object.keys(estructura[initialLevel])[0];
    }

    // ==============================
    // 4. ESTADO GLOBAL DEL VISOR
    // ==============================
    // Objeto central que guarda el estado actual de la aplicación

    const estado = {
        currentLevel: initialLevel,  // Nivel actual
        currentId: initialId,        // Imagen actual
        initialLevel: initialLevel,  // Nivel inicial
        initialId: initialId,        // Imagen inicial
        historial: [],               // Historial de navegación
        etiquetasVisibles: true      // Control de visibilidad de etiquetas
    };

    // ==============================
    // 5. INICIALIZAR VISOR
    // ==============================
    // Crea el contenedor principal donde se renderiza la imagen

    const visor = iniciarVisor();

    // ==============================
    // 6. INICIALIZAR MÓDULOS
    // ==============================
    // Se pasan las dependencias necesarias a cada módulo

    iniciarInteraccion(visor, estructura, estado); // Eventos del usuario
    iniciarOverlays(visor, estructura, estado);    // Capas visuales
    iniciarCoordenadas(visor, estado);             // Coordenadas en pantalla
    iniciarPanel(visor, estado);                   // UI lateral
    iniciarEtiquetas(visor, estado);               // Etiquetas sobre la imagen

});