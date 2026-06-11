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

const activityId = "vision-colors";
const totalRounds = 5;
let round = 0;
let score = 0;
let target = null;

export function renderVisionColors(reset = true) {
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
      title: "¡Terminaste colores y objetos!",
      score,
      total: totalRounds,
      activityPath: "/baja-vision/colores",
      menuPath: "/baja-vision",
    });
    return;
  }

  target = colors[round % colors.length];
  const options = shuffle(colors).slice(0, 3);
  if (!options.some((item) => item.id === target.id)) options[0] = target;
  const instruction = `Selecciona el color ${target.label}`;

  setView(
    `${activityHeader({
      eyebrow: "Colores y objetos",
      title: "Mira con atención",
      instruction,
      current: round + 1,
      total: totalRounds,
    })}
    <section class="choice-grid color-choice-grid" aria-labelledby="instruction">
      ${shuffle(options)
        .map(
          (color) => `
          <button class="visual-choice color-choice" data-answer="${color.id}" aria-label="${color.label}">
            <span class="object-shape" style="--object-color:${color.value}" aria-hidden="true">${color.symbol}</span>
            <strong>${color.label}</strong>
          </button>`,
        )
        .join("")}
    </section>`,
    { backTo: "/baja-vision", theme: "vision" },
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
    button.classList.add("selected-correct");
    showFeedback({
      correct: true,
      message: `Encontraste el color ${target.label}.`,
      onContinue: () => {
        round += 1;
        renderRound();
      },
    });
  } else {
    button.classList.add("selected-incorrect");
    showFeedback({
      correct: false,
      message: `Busca el color ${target.label}.`,
      onContinue: () => button.focus(),
    });
  }
}
