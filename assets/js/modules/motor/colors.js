import { completeActivity, recordAnswer } from "../../core/storage.js";
import {
  activityHeader,
  bindInstruction,
  renderCompletion,
  setView,
  showFeedback,
  shuffle,
} from "../../core/ui.js";
import { colors } from "../shared/activity-data.js";

const activityId = "motor-colors";
const totalRounds = 5;
let round = 0;
let score = 0;
let target = null;

export function renderMotorColors(reset = true) {
  if (reset) {
    round = 0;
    score = 0;
  }
  renderRound();
}

function renderRound() {
  if (round >= totalRounds) {
    completeActivity(activityId, score);
    renderCompletion({
      title: "¡Terminaste descubre el color!",
      score,
      total: totalRounds,
      activityPath: "/fisico-motora/colores",
      menuPath: "/fisico-motora",
    });
    return;
  }

  target = colors[(round + 1) % colors.length];
  const instruction = `Selecciona el color ${target.label}`;

  setView(
    `${activityHeader({
      eyebrow: "Descubre el color",
      title: "Elige una opción",
      instruction,
      current: round + 1,
      total: totalRounds,
    })}
    <section class="choice-grid motor-color-grid" aria-labelledby="instruction">
      ${shuffle(colors)
        .map(
          (color) => `
          <button class="motor-color-button" data-answer="${color.id}" style="--choice-color:${color.value}">
            <span class="sr-only">${color.label}</span>
          </button>`,
        )
        .join("")}
    </section>`,
    { backTo: "/fisico-motora", theme: "motor" },
  );

  bindInstruction(instruction);
  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => checkAnswer(button));
  });
}

function checkAnswer(button) {
  const isCorrect = button.dataset.answer === target.id;
  recordAnswer(activityId, isCorrect);
  if (isCorrect) {
    score += 1;
    showFeedback({
      correct: true,
      message: `Elegiste el color ${target.label}.`,
      onContinue: () => {
        round += 1;
        renderRound();
      },
    });
  } else {
    showFeedback({
      correct: false,
      message: `Prueba de nuevo. Busca el ${target.label}.`,
      onContinue: () => button.focus(),
    });
  }
}
