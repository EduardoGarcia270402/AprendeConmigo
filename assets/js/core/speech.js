let currentText = "";
let pendingSpeech = null;

export function speak(text, { remember = true } = {}) {
  if (remember) currentText = text;
  if (!("speechSynthesis" in window)) return;

  stopSpeech({ keepInstruction: true });
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-ES";
  utterance.rate = 0.85;
  utterance.pitch = 1.1;
  window.speechSynthesis.speak(utterance);
}

export function scheduleSpeech(text, delay = 250) {
  currentText = text;
  window.clearTimeout(pendingSpeech);
  pendingSpeech = window.setTimeout(() => {
    pendingSpeech = null;
    speak(text);
  }, delay);
}

export function stopSpeech({ keepInstruction = false } = {}) {
  window.clearTimeout(pendingSpeech);
  pendingSpeech = null;
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  if (!keepInstruction) currentText = "";
}

export function repeatInstruction() {
  if (currentText) speak(currentText);
}
