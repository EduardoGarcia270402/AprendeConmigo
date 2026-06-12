import { completeActivity, recordAnswer } from "../../core/storage.js";
import {
  activityHeader,
  bindInstruction,
  renderCompletion,
  setView,
  showFeedback,
  shuffle,
} from "../../core/ui.js";

const activityId = "motor-routes";
const scenarios = [
  {
    destination: "parque",
    destinationPhrase: "al parque",
    destinationIcon: "park",
    instruction: "Lucas quiere ir al parque. Elige el camino con rampa.",
    options: [
      { id: "ramp", label: "Camino con rampa", icon: "accessible", correct: true },
      { id: "stairs", label: "Camino con escaleras", icon: "stairs" },
      { id: "barrier", label: "Camino bloqueado", icon: "barrier" },
    ],
  },
  {
    destination: "escuela",
    destinationPhrase: "a la escuela",
    destinationIcon: "school",
    instruction: "Lucas va a la escuela. Busca la rampa y el paso peatonal.",
    options: [
      { id: "crosswalk-ramp", label: "Paso peatonal y rampa", icon: "crosswalk", badge: "accessible", correct: true },
      { id: "street", label: "Cruzar sin paso peatonal", icon: "barrier" },
      { id: "school-stairs", label: "Entrada con escaleras", icon: "stairs" },
    ],
  },
  {
    destination: "biblioteca",
    destinationPhrase: "a la biblioteca",
    destinationIcon: "library",
    instruction: "Lucas quiere leer. Elige el camino accesible a la biblioteca.",
    options: [
      { id: "library-ramp", label: "Entrada con rampa", icon: "accessible", correct: true },
      { id: "library-hole", label: "Camino con un hueco", icon: "hole" },
      { id: "library-barrier", label: "Camino con barrera", icon: "barrier" },
    ],
  },
  {
    destination: "casa",
    destinationPhrase: "a casa",
    destinationIcon: "home",
    instruction: "Lucas vuelve a casa. Observa las señales y elige la ruta segura.",
    options: [
      { id: "home-ramp", label: "Rampa libre", icon: "accessible", correct: true },
      { id: "home-stairs", label: "Escaleras altas", icon: "stairs" },
      { id: "home-hole", label: "Suelo con hueco", icon: "hole" },
      { id: "home-barrier", label: "Paso cerrado", icon: "barrier" },
    ],
  },
  {
    destination: "parque",
    destinationPhrase: "al parque",
    destinationIcon: "park",
    instruction: "Lucas visita otro parque. Elige la ruta con dos señales accesibles.",
    options: [
      { id: "final-route", label: "Paso peatonal y rampa", icon: "crosswalk", badge: "accessible", correct: true },
      { id: "final-stairs", label: "Paso peatonal y escaleras", icon: "crosswalk", badge: "stairs" },
      { id: "final-hole", label: "Rampa con un hueco", icon: "accessible", badge: "hole" },
      { id: "final-blocked", label: "Rampa bloqueada", icon: "accessible", badge: "barrier" },
    ],
  },
];

let round = 0;
let score = 0;
let locked = false;
let feedbackTimer = null;

export function renderMotorRoutes(reset = true) {
  if (reset) {
    round = 0;
    score = 0;
  }
  renderRound();
  return cleanupRoutes;
}

function renderRound() {
  if (round >= scenarios.length) {
    completeActivity(activityId, score);
    renderCompletion({
      title: "¡Lucas llegó a sus destinos!",
      score,
      total: scenarios.length,
      activityPath: "/fisico-motora/rutas",
      menuPath: "/fisico-motora",
    });
    return;
  }

  locked = false;
  const scenario = scenarios[round];
  setView(
    `${activityHeader({
      eyebrow: "Ayuda a Lucas",
      title: `Destino: ${scenario.destination}`,
      instruction: scenario.instruction,
      current: round + 1,
      total: scenarios.length,
    })}
    <section class="route-story" aria-label="Lucas quiere llegar al ${scenario.destination}">
      ${routeIcon("lucas", "lucas-character")}
      <span class="route-story-arrow" aria-hidden="true">→</span>
      <div class="destination-sign">
        ${routeIcon(scenario.destinationIcon, "destination-icon")}
        <strong>${scenario.destination}</strong>
      </div>
    </section>
    <p class="route-prompt">¿Cuál camino debe elegir Lucas?</p>
    <section class="route-options" aria-labelledby="instruction">
      ${shuffle(scenario.options)
        .map(
          (option) => `
          <button class="route-card" data-route="${option.id}" data-correct="${Boolean(option.correct)}">
            <span class="route-card-scene">
              ${routeIcon("lucas", "route-lucas")}
              <span class="route-path" aria-hidden="true"></span>
              ${routeIcon(option.icon, "route-signal")}
              ${option.badge ? routeIcon(option.badge, "route-badge") : ""}
              ${routeIcon(scenario.destinationIcon, "route-destination")}
            </span>
            <strong>${option.label}</strong>
          </button>`,
        )
        .join("")}
    </section>`,
    { backTo: "/fisico-motora", theme: "motor" },
  );

  bindInstruction(scenario.instruction);
  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => checkRoute(button, scenario));
  });
}

function checkRoute(button, scenario) {
  if (locked) return;
  const isCorrect = button.dataset.correct === "true";
  recordAnswer(activityId, isCorrect);

  if (!isCorrect) {
    button.classList.add("selected-incorrect");
    showFeedback({
      correct: false,
      message: "Ese camino tiene un obstáculo. Busca las señales de acceso.",
      onContinue: () => button.focus(),
    });
    return;
  }

  locked = true;
  score += 1;
  button.classList.add("is-arriving");
  feedbackTimer = window.setTimeout(() => {
    showFeedback({
      correct: true,
      message: `¡Elegiste una ruta accesible ${scenario.destinationPhrase}!`,
      onContinue: () => {
        round += 1;
        renderRound();
      },
    });
  }, 1100);
}

function routeIcon(id, className) {
  return `<svg class="${className}" aria-hidden="true">
    <use href="assets/images/icons/route-icons.svg#${id}"></use>
  </svg>`;
}

function cleanupRoutes() {
  window.clearTimeout(feedbackTimer);
  feedbackTimer = null;
}
