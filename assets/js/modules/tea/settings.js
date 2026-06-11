import { setView } from "../../core/ui.js";
import { communicationCategories, escapeHtml } from "./data.js";
import { getTeaPreferences, saveTeaPreferences } from "./preferences.js";

export function renderTeaSettings() {
  const preferences = getTeaPreferences();
  const items = communicationCategories.flatMap((category) => category.items);

  setView(
    `<section class="settings-panel">
      <p class="eyebrow">Zona para adultos</p>
      <h1>Configuración TEA</h1>
      <p>Ajusta el sonido, la respiración y las frases del comunicador.</p>
      <form id="tea-settings-form">
        <fieldset>
          <legend>Sonido</legend>
          <label class="toggle-setting">
            <input type="checkbox" name="soundEnabled" ${preferences.soundEnabled ? "checked" : ""} />
            <span>Usar instrucciones y frases con voz</span>
          </label>
          <label>
            Volumen de voz
            <input type="range" name="volume" min="0.2" max="1" step="0.1" value="${preferences.volume}" />
          </label>
        </fieldset>
        <fieldset>
          <legend>Respiración</legend>
          <label>
            Número de ciclos
            <select name="breathingCycles">
              ${[3, 5, 7].map((value) => `<option value="${value}" ${value === preferences.breathingCycles ? "selected" : ""}>${value} ciclos</option>`).join("")}
            </select>
          </label>
        </fieldset>
        <fieldset>
          <legend>Frases personalizadas</legend>
          <div class="phrase-settings">
            ${items
              .map(
                (item) => `
                <label>
                  ${item.label}
                  <input type="text" name="phrase-${item.id}"
                    value="${escapeHtml(preferences.customPhrases[item.id] || "")}"
                    placeholder="${item.label}" maxlength="60" />
                  <span class="file-setting">
                    Imagen propia opcional
                    <input type="file" name="image-${item.id}" accept="image/png,image/jpeg,image/webp" />
                    ${preferences.customPictograms[item.id] ? '<small>Ya hay una imagen personalizada.</small>' : ""}
                  </span>
                </label>`,
              )
              .join("")}
          </div>
        </fieldset>
        <p class="settings-status" id="settings-status" aria-live="polite"></p>
        <button class="primary-button" type="submit">Guardar configuración</button>
      </form>
    </section>`,
    { backTo: "/tea", theme: "tea" },
  );

  document.querySelector("#tea-settings-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const customPhrases = {};
    const customPictograms = { ...preferences.customPictograms };
    items.forEach((item) => {
      const value = data.get(`phrase-${item.id}`)?.trim();
      if (value) customPhrases[item.id] = value;
    });
    for (const item of items) {
      const file = data.get(`image-${item.id}`);
      if (file instanceof File && file.size > 0) {
        if (file.size > 500_000) {
          document.querySelector("#settings-status").textContent =
            `La imagen para "${item.label}" supera 500 KB.`;
          return;
        }
        customPictograms[item.id] = await readAsDataUrl(file);
      }
    }
    saveTeaPreferences({
      soundEnabled: data.get("soundEnabled") === "on",
      volume: Number(data.get("volume")),
      breathingCycles: Number(data.get("breathingCycles")),
      customPhrases,
      customPictograms,
    });
    document.querySelector("#settings-status").textContent = "Configuración guardada.";
  });
}

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });
}
