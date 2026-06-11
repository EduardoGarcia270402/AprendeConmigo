import { registerRoute, startRouter } from "./core/router.js?v=3";
import { renderHome, renderNotFound } from "./modules/home.js?v=3";
import { renderVisionColors } from "./modules/low-vision/colors.js?v=3";
import { renderLowVisionMenu } from "./modules/low-vision/menu.js?v=3";
import { renderVisionShapes } from "./modules/low-vision/shapes.js?v=3";
import { renderMotorColors } from "./modules/motor/colors.js?v=3";
import { renderMotorMemory } from "./modules/motor/memory.js?v=3";
import { renderMotorMenu } from "./modules/motor/menu.js?v=3";
import { renderTeaBreathing } from "./modules/tea/breathing.js?v=3";
import { renderTeaCommunicator } from "./modules/tea/communicator.js?v=3";
import { renderTeaMenu } from "./modules/tea/menu.js?v=3";
import { renderTeaSettings } from "./modules/tea/settings.js?v=3";

registerRoute("/", renderHome);
registerRoute("/baja-vision", renderLowVisionMenu);
registerRoute("/baja-vision/colores", renderVisionColors);
registerRoute("/baja-vision/formas", renderVisionShapes);
registerRoute("/fisico-motora", renderMotorMenu);
registerRoute("/fisico-motora/colores", renderMotorColors);
registerRoute("/fisico-motora/memoria", renderMotorMemory);
registerRoute("/tea", renderTeaMenu);
registerRoute("/tea/comunicador", renderTeaCommunicator);
registerRoute("/tea/respiracion", renderTeaBreathing);
registerRoute("/tea/configuracion", renderTeaSettings);
registerRoute("/not-found", renderNotFound);

document.addEventListener("click", (event) => {
  const navigationTarget = event.target.closest("[data-nav]");
  if (!navigationTarget) return;
  window.location.hash = navigationTarget.dataset.nav;
});

startRouter();
