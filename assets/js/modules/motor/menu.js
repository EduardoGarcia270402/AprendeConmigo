import { getActivityProgress } from "../../core/storage.js";
import { setView } from "../../core/ui.js";

export function renderMotorMenu() {
  const colorsProgress = getActivityProgress("motor-colors");
  const memoryProgress = getActivityProgress("motor-memory");

  setView(
    `<section class="module-heading">
      <div class="module-heading-icon" aria-hidden="true">✋</div>
      <div>
        <p class="eyebrow">Módulo físico-motor</p>
        <h1>Elige una actividad</h1>
        <p>Acciones simples, botones amplios y mucho espacio para jugar con comodidad.</p>
      </div>
    </section>
    <section class="activity-grid">
      <button class="activity-card" data-nav="/fisico-motora/colores">
        <span class="activity-illustration">
          <img src="assets/images/activities/motor-colors.jpg"
            alt="Niño seleccionando un botón de color grande en una tableta" />
        </span>
        <span class="activity-number">Actividad 1</span>
        <strong>Descubre el color</strong>
        <span>Selecciona el color indicado</span>
        <small>${colorsProgress.correct} respuestas correctas</small>
      </button>
      <button class="activity-card" data-nav="/fisico-motora/memoria">
        <span class="activity-illustration">
          <img src="assets/images/activities/motor-memory.jpg"
            alt="Niño descubriendo una pareja de estrellas en tarjetas grandes" />
        </span>
        <span class="activity-number">Actividad 2</span>
        <strong>Encuentra la pareja</strong>
        <span>Descubre las tarjetas iguales</span>
        <small>${memoryProgress.completed} partidas terminadas</small>
      </button>
    </section>`,
    { backTo: "/", theme: "motor" },
  );
}
