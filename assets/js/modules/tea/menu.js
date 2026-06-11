import { setView } from "../../core/ui.js";

export function renderTeaMenu() {
  setView(
    `<section class="module-heading tea-heading">
      <div class="module-heading-icon" aria-hidden="true">CAA</div>
      <div>
        <p class="eyebrow">Módulo TEA nivel 2</p>
        <h1>Elige una actividad</h1>
        <p>Comunicación clara, pasos predecibles y colores tranquilos.</p>
      </div>
    </section>
    <section class="activity-grid">
      <button class="activity-card" data-nav="/tea/comunicador">
        <span class="activity-illustration">
          <img src="assets/images/activities/tea-communicator.jpg"
            alt="Niño seleccionando pictogramas de necesidades en una tableta" />
        </span>
        <span class="activity-number">Actividad 1</span>
        <strong>¿Qué necesito?</strong>
        <span>Comunica una necesidad con pictogramas</span>
        <small>Un toque para expresar una frase</small>
      </button>
      <button class="activity-card" data-nav="/tea/respiracion">
        <span class="activity-illustration">
          <img src="assets/images/activities/tea-breathing.jpg"
            alt="Niño realizando un ejercicio tranquilo de respiración" />
        </span>
        <span class="activity-number">Actividad 2</span>
        <strong>Respira conmigo</strong>
        <span>Observa y sigue una respiración suave</span>
        <small>Movimiento lento y predecible</small>
      </button>
    </section>
    <button class="adult-settings-link" data-nav="/tea/configuracion">
      <span aria-hidden="true">⚙</span> Configuración para adultos
    </button>`,
    { backTo: "/", theme: "tea" },
  );
}
