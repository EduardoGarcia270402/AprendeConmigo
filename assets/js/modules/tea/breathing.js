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
        <div class="balloon-wrap">
          <div class="breathing-balloon" id="breathing-balloon">
            <span class="balloon-shine" aria-hidden="true"></span>
            <strong id="breathing-message">Comenzar</strong>
          </div>
          <span class="balloon-knot" aria-hidden="true"></span>
          <span class="balloon-string" aria-hidden="true"></span>
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
  const balloon = document.querySelector("#breathing-balloon");
  const message = document.querySelector("#breathing-message");
  const counter = document.querySelector("#breathing-counter");

  for (let cycle = 1; cycle <= preferences.breathingCycles && !stopped; cycle += 1) {
    counter.textContent = `Ciclo ${cycle} de ${preferences.breathingCycles}`;
    message.textContent = "Inhala";
    balloon.className = "breathing-balloon is-inhaling";
    if (preferences.soundEnabled) {
      speak("Inhala lentamente. Uno, dos, tres, cuatro", { volume: preferences.volume });
    }
    await wait(4000);
    if (stopped) return;

    message.textContent = "Mantén";
    balloon.className = "breathing-balloon is-holding";
    if (preferences.soundEnabled) {
      speak("Mantén el aire. Uno, dos", { volume: preferences.volume });
    }
    await wait(2000);
    if (stopped) return;

    message.textContent = "Exhala";
    balloon.className = "breathing-balloon is-exhaling";
    if (preferences.soundEnabled) {
      speak("Exhala despacio. Uno, dos, tres, cuatro, cinco", { volume: preferences.volume });
    }
    await wait(5000);
  }

  if (stopped) return;
  balloon.className = "breathing-balloon is-complete";
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
