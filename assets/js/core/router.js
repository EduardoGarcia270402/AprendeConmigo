import { stopSpeech } from "./speech.js";

const routes = new Map();
export function registerRoute(path, renderer) {
  routes.set(path, renderer);
}

export function navigate(path) {
  if (window.location.hash.slice(1) === path) {
    renderCurrentRoute();
    return;
  }
  window.location.hash = path;
}

export function getRoute() {
  return window.location.hash.slice(1) || "/";
}

export function renderCurrentRoute() {
  stopSpeech();
  const path = getRoute();
  const renderer = routes.get(path) || routes.get("/not-found");
  renderer?.();
  window.scrollTo({ top: 0, behavior: "instant" });
}

export function startRouter() {
  window.addEventListener("hashchange", renderCurrentRoute);
  window.addEventListener("pagehide", () => stopSpeech());
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopSpeech();
  });
  renderCurrentRoute();
}
