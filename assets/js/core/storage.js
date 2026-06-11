const STORAGE_KEY = "aprende-conmigo-progress-v1";

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function getActivityProgress(activityId) {
  return readProgress()[activityId] || {
    correct: 0,
    incorrect: 0,
    completed: 0,
    bestScore: 0,
  };
}

export function recordAnswer(activityId, isCorrect) {
  const allProgress = readProgress();
  const progress = getActivityProgress(activityId);
  progress[isCorrect ? "correct" : "incorrect"] += 1;
  allProgress[activityId] = progress;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  return progress;
}

export function completeActivity(activityId, score) {
  const allProgress = readProgress();
  const progress = getActivityProgress(activityId);
  progress.completed += 1;
  progress.bestScore = Math.max(progress.bestScore, score);
  allProgress[activityId] = progress;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  return progress;
}
