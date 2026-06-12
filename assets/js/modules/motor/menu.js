import { getActivityProgress } from "../../core/storage.js";
import { setView } from "../../core/ui.js";
import { moduleIcon } from "../shared/module-icons.js";

export function renderMotorMenu() {
  const routesProgress = getActivityProgress("motor-routes");
  const memoryProgress = getActivityProgress("motor-memory");

  setView(
    `<section class="module-heading">
      <div class="module-heading-icon">${moduleIcon("motor")}</div>
      <div>
        <p class="eyebrow">Módulo físico-motor</p>
        <h1>Elige una actividad</h1>
        <p>Acciones simples, botones amplios y mucho espacio para jugar con comodidad.</p>
      </div>
    </section>
    <section class="activity-grid">
      <button class="activity-card" data-nav="/fisico-motora/rutas">
        <span class="activity-illustration">
          <img src="assets/images/activities/motor-routes.jpg"
            alt="Lucas eligiendo una rampa accesible para llegar al parque" />
        </span>
        <span class="activity-number">Actividad 1</span>
        <strong>Ayuda a Lucas</strong>
        <span>Elige la ruta accesible al destino</span>
        <small>${routesProgress.correct} rutas correctas</small>
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
