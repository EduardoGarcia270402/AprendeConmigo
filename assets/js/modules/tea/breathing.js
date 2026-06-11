import { speak, stopSpeech } from "../../core/speech.js";
import { setView } from "../../core/ui.js";
import { getTeaPreferences } from "./preferences.js";

let timers = [];
let stopped = false;

export function renderTeaBreathing() {
  const preferences = getTeaPreferences();
  stopped = false;
  timers = [];

  setView(
    `<section class="breathing-screen">
      <p class="eyebrow">Respira conmigo</p>
      <h1>Vamos a respirar despacio</h1>
      <p id="breathing-counter">Preparados para ${preferences.breathingCycles} ciclos</p>
      <div class="breathing-stage">
        <div class="breathing-circle" id="breathing-circle">
          <strong id="breathing-message">Comenzar</strong>
        </div>
      </div>
      <button class="primary-button" id="start-breathing">Comenzar respiración</button>
      <button class="secondary-button" data-nav="/tea">Salir</button>
    </section>`,
    { backTo: "/tea", theme: "tea" },
  );

  document.querySelector("#start-breathing").addEventListener("click", (event) => {
    event.currentTarget.disabled = true;
    runCycles(preferences);
  });

  return stopBreathing;
}

async function runCycles(preferences) {
  const circle = document.querySelector("#breathing-circle");
  const message = document.querySelector("#breathing-message");
  const counter = document.querySelector("#breathing-counter");

  for (let cycle = 1; cycle <= preferences.breathingCycles && !stopped; cycle += 1) {
    counter.textContent = `Ciclo ${cycle} de ${preferences.breathingCycles}`;
    message.textContent = "Inhala";
    circle.className = "breathing-circle is-inhaling";
    if (preferences.soundEnabled) speak("Inhala, uno, dos, tres", { volume: preferences.volume });
    await wait(4000);
    if (stopped) return;

    message.textContent = "Exhala";
    circle.className = "breathing-circle is-exhaling";
    if (preferences.soundEnabled) speak("Exhala, uno, dos, tres", { volume: preferences.volume });
    await wait(4000);
  }

  if (stopped) return;
  circle.className = "breathing-circle is-complete";
  message.textContent = "Muy bien";
  counter.textContent = "Terminaste la respiración";
  if (preferences.soundEnabled) speak("Muy bien. Terminaste la respiración.", { volume: preferences.volume });
  const startButton = document.querySelector("#start-breathing");
  const restartButton = startButton.cloneNode(true);
  restartButton.textContent = "Respirar otra vez";
  restartButton.disabled = false;
  startButton.replaceWith(restartButton);
  restartButton.addEventListener("click", renderTeaBreathing);
}

function wait(milliseconds) {
  return new Promise((resolve) => {
    const timer = window.setTimeout(resolve, milliseconds);
    timers.push(timer);
  });
}

function stopBreathing() {
  stopped = true;
  timers.forEach((timer) => window.clearTimeout(timer));
  timers = [];
  stopSpeech();
}
