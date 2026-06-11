import { setView } from "../core/ui.js";

export function renderHome() {
  setView(
    `<section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Aprender es una aventura</p>
        <h1>¡Hola! ¿Qué quieres aprender hoy?</h1>
        <p>Elige una forma de jugar. Todas las actividades se pueden escuchar y repetir.</p>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <span class="visual-circle"></span>
        <span class="visual-square"></span>
        <span class="visual-star">★</span>
      </div>
    </section>
    <section class="module-grid" aria-label="Módulos educativos">
      <button class="module-card vision-card" data-nav="/baja-vision">
        <span class="module-icon" aria-hidden="true">◉</span>
        <span>
          <small>Imágenes claras y contrastantes</small>
          <strong>Baja visión</strong>
          <span>Colores, objetos y formas</span>
        </span>
        <span class="card-arrow" aria-hidden="true">→</span>
      </button>
      <button class="module-card motor-card" data-nav="/fisico-motora">
        <span class="module-icon" aria-hidden="true">✋</span>
        <span>
          <small>Botones grandes y simples</small>
          <strong>Físico-motora</strong>
          <span>Colores y memoria visual</span>
        </span>
        <span class="card-arrow" aria-hidden="true">→</span>
      </button>
    </section>
    <p class="privacy-note">Tu progreso se guarda únicamente en este dispositivo.</p>`,
    { backTo: "/", showHome: false },
  );
}

export function renderNotFound() {
  setView(
    `<section class="completion-card">
      <p class="eyebrow">Página no encontrada</p>
      <h1>Vamos a volver al inicio</h1>
      <button class="primary-button" data-nav="/">Ir al inicio</button>
    </section>`,
    { backTo: "/" },
  );
}
