import { completeActivity, recordAnswer } from "../../core/storage.js";
import {
  activityHeader,
  bindInstruction,
  renderCompletion,
  setView,
  showFeedback,
  shuffle,
} from "../../core/ui.js";
import { shapes } from "../shared/activity-data.js";

const activityId = "vision-shapes";
const totalRounds = 6;
let round = 0;
let score = 0;
let target = null;

export function renderVisionShapes(reset = true) {
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
      title: "¡Terminaste formas y figuras!",
      score,
      total: totalRounds,
      activityPath: "/baja-vision/formas",
      menuPath: "/baja-vision",
    });
    return;
  }

  target = shapes[round % shapes.length];
  const optionCount = round < 2 ? 2 : round < 4 ? 3 : 4;
  const options = shuffle(shapes.filter((shape) => shape.id !== target.id))
    .slice(0, optionCount - 1)
    .concat(target);
  const instruction = `Encuentra el ${target.label}`;

  setView(
    `${activityHeader({
      eyebrow: "Formas y figuras",
      title: "Busca la figura igual",
      instruction,
      current: round + 1,
      total: totalRounds,
    })}
    <section class="reference-card" aria-label="Figura de referencia">
      <span class="shape ${target.className}" aria-hidden="true"></span>
      <strong>${target.label}</strong>
    </section>
    <section class="choice-grid shape-choice-grid" aria-labelledby="instruction">
      ${shuffle(options)
        .map(
          (shape) => `
          <button class="visual-choice shape-choice" data-answer="${shape.id}" aria-label="${shape.label}">
            <span class="shape ${shape.className}" aria-hidden="true"></span>
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
    showFeedback({
      correct: true,
      message: `¡Es un ${target.label}!`,
      onContinue: () => {
        round += 1;
        renderRound();
      },
    });
  } else {
    showFeedback({
      correct: false,
      message: "Compara los contornos y vuelve a mirar.",
      onContinue: () => button.focus(),
    });
  }
}
