import { getActivityProgress } from "../../core/storage.js";
import { setView } from "../../core/ui.js";
import { moduleIcon } from "../shared/module-icons.js";

export function renderLowVisionMenu() {
  const colorsProgress = getActivityProgress("vision-colors");
  const shapesProgress = getActivityProgress("vision-shapes");

  setView(
    `<section class="module-heading">
      <div class="module-heading-icon">${moduleIcon("low-vision")}</div>
      <div>
        <p class="eyebrow">Módulo de baja visión</p>
        <h1>Elige una actividad</h1>
        <p>Imágenes grandes, contornos definidos y colores de alto contraste.</p>
      </div>
    </section>
    <section class="activity-grid">
      <button class="activity-card" data-nav="/baja-vision/colores">
        <span class="activity-illustration">
          <img src="assets/images/activities/vision-colors.jpg"
            alt="Manzana roja, auto amarillo y pelota azul" />
        </span>
        <span class="activity-number">Actividad 1</span>
        <strong>Colores y objetos</strong>
        <span>Encuentra el color correcto</span>
        <small>${colorsProgress.correct} respuestas correctas</small>
      </button>
      <button class="activity-card" data-nav="/baja-vision/formas">
        <span class="activity-illustration">
          <img src="assets/images/activities/vision-shapes.jpg"
            alt="Círculo, cuadrado, triángulo y rectángulo de colores" />
        </span>
        <span class="activity-number">Actividad 2</span>
        <strong>Formas y figuras</strong>
        <span>Busca la figura que se repite</span>
        <small>${shapesProgress.completed} partidas terminadas</small>
      </button>
    </section>`,
    { backTo: "/", theme: "vision" },
  );
}
