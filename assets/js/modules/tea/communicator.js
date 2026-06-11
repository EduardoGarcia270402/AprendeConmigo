import { speak } from "../../core/speech.js";
import { setView } from "../../core/ui.js";
import { communicationCategories, escapeHtml, pictogram } from "./data.js";
import { getCustomPictogram, getPhrase, getTeaPreferences } from "./preferences.js";

export function renderTeaCommunicator() {
  renderCategories();
}

function renderCategories() {
  setView(
    `<section class="tea-activity-heading">
      <p class="eyebrow">¿Qué necesito?</p>
      <h1>Elige una opción</h1>
      <p>Primero elige el grupo que quieres usar.</p>
    </section>
    <section class="tea-category-grid" aria-label="Categorías de comunicación">
      ${communicationCategories
        .map(
          (category) => `
          <button class="tea-category-card" data-category="${category.id}">
            ${pictogram(category.symbol)}
            <strong>${category.title}</strong>
            <span>${category.description}</span>
          </button>`,
        )
        .join("")}
    </section>`,
    { backTo: "/tea", theme: "tea" },
  );

  document.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => renderPictograms(button.dataset.category));
  });
}

function renderPictograms(categoryId) {
  const category = communicationCategories.find((item) => item.id === categoryId);
  setView(
    `<section class="tea-activity-heading">
      <p class="eyebrow">¿Qué necesito?</p>
      <h1>${category.title}</h1>
      <p>Toca un pictograma para escuchar la frase.</p>
    </section>
    <section class="pictogram-grid" aria-label="${category.title}">
      ${category.items
        .map(
          (item) => `
          <button class="pictogram-card" data-phrase-id="${item.id}">
            ${renderItemPictogram(item)}
            <strong>${escapeHtml(getPhrase(item))}</strong>
          </button>`,
        )
        .join("")}
    </section>
    <section class="communication-result" id="communication-result" aria-live="polite">
      <span>Tu frase aparecerá aquí</span>
    </section>`,
    { backTo: "/tea/comunicador", theme: "tea" },
  );

  document.querySelectorAll("[data-phrase-id]").forEach((button) => {
    button.addEventListener("click", () => selectPhrase(button, category));
  });
}

function selectPhrase(button, category) {
  const item = category.items.find((entry) => entry.id === button.dataset.phraseId);
  const phrase = getPhrase(item);
  const preferences = getTeaPreferences();
  document.querySelectorAll(".pictogram-card").forEach((card) => card.classList.remove("is-selected"));
  button.classList.add("is-selected");
  document.querySelector("#communication-result").innerHTML = `
    ${renderItemPictogram(item, "result-pictogram")}
    <strong>${escapeHtml(phrase)}</strong>
    <button class="repeat-phrase" id="repeat-phrase">Escuchar otra vez</button>
  `;
  if (preferences.soundEnabled) speak(phrase, { volume: preferences.volume });
  document.querySelector("#repeat-phrase").addEventListener("click", () => {
    if (preferences.soundEnabled) speak(phrase, { volume: preferences.volume });
  });
}

function renderItemPictogram(item, className = "pictogram") {
  const customImage = getCustomPictogram(item.id);
  if (customImage) {
    return `<img class="${className} custom-pictogram" src="${customImage}"
      alt="" aria-hidden="true" />`;
  }
  return pictogram(item.symbol, className);
}
