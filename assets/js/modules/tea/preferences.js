const KEY = "aprende-conmigo-tea-preferences-v1";
const defaults = {
  soundEnabled: true,
  volume: 0.75,
  breathingCycles: 5,
  customPhrases: {},
  customPictograms: {},
};

export function getTeaPreferences() {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(KEY)) };
  } catch {
    return { ...defaults };
  }
}

export function saveTeaPreferences(changes) {
  const preferences = { ...getTeaPreferences(), ...changes };
  localStorage.setItem(KEY, JSON.stringify(preferences));
  return preferences;
}

export function getPhrase(item) {
  return getTeaPreferences().customPhrases[item.id] || item.label;
}

export function getCustomPictogram(itemId) {
  return getTeaPreferences().customPictograms[itemId] || "";
}
