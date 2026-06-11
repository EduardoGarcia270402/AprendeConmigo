import { completeActivity, recordAnswer } from "../../core/storage.js";
import {
  activityHeader,
  bindInstruction,
  renderCompletion,
  setView,
  showFeedback,
  shuffle,
} from "../../core/ui.js";
import { memoryItems } from "../shared/activity-data.js";

const activityId = "motor-memory";
let cards = [];
let openCards = [];
let foundPairs = 0;
let locked = false;

export function renderMotorMemory() {
  cards = shuffle(
    memoryItems.flatMap((item) => [
      { ...item, key: `${item.id}-1` },
      { ...item, key: `${item.id}-2` },
    ]),
  );
  openCards = [];
  foundPairs = 0;
  locked = false;
  renderBoard();
}

function renderBoard() {
  const instruction = "Descubre dos tarjetas y encuentra las parejas";
  setView(
    `${activityHeader({
      eyebrow: "Encuentra la pareja",
      title: "¿Dónde están las parejas?",
      instruction,
      current: foundPairs,
      total: memoryItems.length,
    })}
    <section class="memory-grid" aria-label="Tarjetas de memoria">
      ${cards
        .map(
          (card) => `
          <button class="memory-card" data-key="${card.key}" data-item="${card.id}" aria-label="Tarjeta oculta">
            <span class="card-back" aria-hidden="true">?</span>
            <span class="card-front" aria-hidden="true">${card.symbol}</span>
          </button>`,
        )
        .join("")}
    </section>
    <button class="secondary-button center-button" id="restart-memory">Reiniciar actividad</button>`,
    { backTo: "/fisico-motora", theme: "motor" },
  );
  bindInstruction(instruction);
  bindBoard();
}

function bindBoard() {
  document.querySelectorAll(".memory-card").forEach((button) => {
    button.addEventListener("click", () => flipCard(button));
  });
  document.querySelector("#restart-memory")?.addEventListener("click", renderMotorMemory);
}

function flipCard(button) {
  if (locked || button.classList.contains("is-open") || button.classList.contains("is-found")) return;
  button.classList.add("is-open");
  button.setAttribute("aria-label", button.dataset.item);
  openCards.push(button);
  if (openCards.length === 2) checkPair();
}

function checkPair() {
  locked = true;
  const [first, second] = openCards;
  const isMatch = first.dataset.item === second.dataset.item;
  recordAnswer(activityId, isMatch);

  window.setTimeout(() => {
    if (isMatch) {
      first.classList.add("is-found");
      second.classList.add("is-found");
      foundPairs += 1;
      showFeedback({
        correct: true,
        message: "¡Encontraste una pareja!",
        onContinue: () => {
          if (foundPairs === memoryItems.length) {
            completeActivity(activityId, foundPairs);
            renderCompletion({
              title: "¡Encontraste todas las parejas!",
              score: foundPairs,
              total: memoryItems.length,
              activityPath: "/fisico-motora/memoria",
              menuPath: "/fisico-motora",
            });
          } else {
            openCards = [];
            locked = false;
            updateProgress();
          }
        },
      });
    } else {
      first.classList.remove("is-open");
      second.classList.remove("is-open");
      first.setAttribute("aria-label", "Tarjeta oculta");
      second.setAttribute("aria-label", "Tarjeta oculta");
      openCards = [];
      locked = false;
    }
  }, isMatch ? 350 : 850);
}

function updateProgress() {
  const strong = document.querySelector(".progress-box strong");
  const bar = document.querySelector(".progress-track span");
  if (strong) strong.textContent = `${foundPairs} de ${memoryItems.length}`;
  if (bar) bar.style.width = `${(foundPairs / memoryItems.length) * 100}%`;
}
