import { setView } from "../core/ui.js";
import { moduleIcon } from "./shared/module-icons.js";

export function renderHome() {
  setView(
    `<section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Un espacio para aprender a tu manera</p>
        <h1>¡Hola! Vamos a aprender juntos</h1>
        <p>Elige una actividad, escucha las instrucciones y juega a tu propio ritmo.</p>
        <div class="hero-benefits" aria-label="Características">
          <span>Un paso a la vez</span>
          <span>Audio disponible</span>
          <span>Sin prisas</span>
        </div>
      </div>
      <div class="hero-mascot-area">
        <span class="mascot-message">¡Estoy aquí para ayudarte!</span>
        <img class="hero-mascot" src="assets/images/brand/owl-mascot.png"
          alt="Búho azul, mascota de Aprende Conmigo" />
      </div>
    </section>
    <section class="home-section-heading">
      <p class="eyebrow">Elige tu módulo</p>
      <h2>¿Qué quieres practicar hoy?</h2>
    </section>
    <section class="module-grid" aria-label="Módulos educativos">
      <button class="module-card vision-card" data-nav="/baja-vision">
        <span class="module-icon">${moduleIcon("low-vision")}</span>
        <span>
          <small>Imágenes claras y contrastantes</small>
          <strong>Baja visión</strong>
          <span>Colores, objetos y formas</span>
        </span>
        <span class="card-arrow" aria-hidden="true">→</span>
      </button>
      <button class="module-card motor-card" data-nav="/fisico-motora">
        <span class="module-icon">${moduleIcon("motor")}</span>
        <span>
          <small>Orientación y decisiones</small>
          <strong>Físico-motora</strong>
          <span>Rutas accesibles y memoria visual</span>
        </span>
        <span class="card-arrow" aria-hidden="true">→</span>
      </button>
      <button class="module-card tea-card" data-nav="/tea">
        <span class="module-icon">${moduleIcon("tea")}</span>
        <span>
          <small>Comunicación y calma</small>
          <strong>TEA nivel 2</strong>
          <span>Pictogramas y respiración guiada</span>
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
