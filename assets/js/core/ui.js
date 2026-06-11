import { navigate } from "./router.js";
import { repeatInstruction, scheduleSpeech, speak, stopSpeech } from "./speech.js";

const app = document.querySelector("#app");

export function setView(content, options = {}) {
  stopSpeech();
  const { backTo = "/", theme = "default", showHome = true } = options;
  document.body.dataset.theme = theme;
  app.innerHTML = `
    <header class="topbar">
      <button class="icon-button" data-nav="${backTo}" aria-label="Volver">
        <span aria-hidden="true">←</span><span>Volver</span>
      </button>
      <a class="brand" href="#/" aria-label="Aprende Conmigo, inicio">
        <span class="brand-mark" aria-hidden="true">AC</span>
        <span>Aprende Conmigo</span>
      </a>
      ${
        showHome
          ? `<button class="icon-button" data-nav="/" aria-label="Ir al inicio">
              <span aria-hidden="true">⌂</span><span>Inicio</span>
            </button>`
          : '<span class="topbar-spacer"></span>'
      }
    </header>
    <main id="main-content" class="main-content">${content}</main>
  `;

  app.querySelectorAll("[data-nav]").forEach((element) => {
    element.addEventListener("click", () => navigate(element.dataset.nav));
  });
  document.querySelector("#main-content")?.focus({ preventScroll: true });
}

export function activityHeader({ eyebrow, title, instruction, current, total }) {
  return `
    <section class="activity-heading">
      <div>
        <p class="eyebrow">${eyebrow}</p>
        <h1>${title}</h1>
      </div>
      <div class="progress-box" aria-label="Progreso">
        <strong>${current} de ${total}</strong>
        <div class="progress-track">
          <span style="width:${Math.round((current / total) * 100)}%"></span>
        </div>
      </div>
    </section>
    <section class="instruction-panel">
      <p class="instruction" id="instruction">${instruction}</p>
      <button class="audio-button" id="repeat-audio" type="button">
        <span aria-hidden="true">🔊</span> Escuchar
      </button>
    </section>
  `;
}

export function bindInstruction(text) {
  document.querySelector("#repeat-audio")?.addEventListener("click", repeatInstruction);
  scheduleSpeech(text);
}

export function showFeedback({ correct, message, onContinue }) {
  const existing = document.querySelector(".feedback-overlay");
  existing?.remove();

  const overlay = document.createElement("div");
  overlay.className = "feedback-overlay";
  overlay.innerHTML = `
    <div class="feedback-card ${correct ? "is-correct" : "is-incorrect"}" role="dialog" aria-modal="true">
      <span class="feedback-symbol" aria-hidden="true">${correct ? "★" : "↻"}</span>
      <h2>${correct ? "¡Muy bien!" : "¡Casi lo logras!"}</h2>
      <p>${message}</p>
      <button class="primary-button" id="feedback-action" type="button">
        ${correct ? "Continuar" : "Intentar otra vez"}
      </button>
    </div>
  `;
  document.body.appendChild(overlay);
  speak(`${correct ? "Muy bien." : "Casi lo logras."} ${message}`, {
    remember: false,
  });
  const action = overlay.querySelector("#feedback-action");
  action.focus();
  action.addEventListener("click", () => {
    overlay.remove();
    onContinue?.();
  });
}

export function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function renderCompletion({ title, score, total, activityPath, menuPath }) {
  stopSpeech();
  setView(
    `<section class="completion-card">
      <span class="completion-star" aria-hidden="true">★</span>
      <p class="eyebrow">Actividad terminada</p>
      <h1>${title}</h1>
      <p class="completion-score">Lograste <strong>${score} de ${total}</strong></p>
      <p>¡Cada intento te ayuda a aprender!</p>
      <div class="button-row">
        <button class="primary-button" data-nav="${activityPath}">Jugar otra vez</button>
        <button class="secondary-button" data-nav="${menuPath}">Elegir otra actividad</button>
      </div>
    </section>`,
    { backTo: menuPath },
  );
}
