export function moduleIcon(id, className = "module-symbol") {
  return `<svg class="${className}" aria-hidden="true">
    <use href="assets/images/icons/module-icons.svg#${id}"></use>
  </svg>`;
}
