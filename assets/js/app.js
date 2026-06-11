import { registerRoute, startRouter } from "./core/router.js";
import { renderHome, renderNotFound } from "./modules/home.js";
import { renderVisionColors } from "./modules/low-vision/colors.js";
import { renderLowVisionMenu } from "./modules/low-vision/menu.js";
import { renderVisionShapes } from "./modules/low-vision/shapes.js";
import { renderMotorColors } from "./modules/motor/colors.js";
import { renderMotorMemory } from "./modules/motor/memory.js";
import { renderMotorMenu } from "./modules/motor/menu.js";

registerRoute("/", renderHome);
registerRoute("/baja-vision", renderLowVisionMenu);
registerRoute("/baja-vision/colores", renderVisionColors);
registerRoute("/baja-vision/formas", renderVisionShapes);
registerRoute("/fisico-motora", renderMotorMenu);
registerRoute("/fisico-motora/colores", renderMotorColors);
registerRoute("/fisico-motora/memoria", renderMotorMemory);
registerRoute("/not-found", renderNotFound);

document.addEventListener("click", (event) => {
  const navigationTarget = event.target.closest("[data-nav]");
  if (!navigationTarget) return;
  window.location.hash = navigationTarget.dataset.nav;
});

startRouter();
