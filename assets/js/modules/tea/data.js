export const communicationCategories = [
  {
    id: "needs",
    title: "Necesito algo",
    description: "Comida, agua, descanso o dolor",
    symbol: "water",
    items: [
      { id: "thirsty", label: "Tengo sed", symbol: "water" },
      { id: "hungry", label: "Tengo hambre", symbol: "food" },
      { id: "tired", label: "Estoy cansado", symbol: "rest" },
      { id: "pain", label: "Me duele algo", symbol: "pain" },
    ],
  },
  {
    id: "help",
    title: "Pido ayuda",
    description: "Ayuda, compañía o espacio",
    symbol: "help",
    items: [
      { id: "need-help", label: "Necesito ayuda", symbol: "help" },
      { id: "not-understand", label: "No entendí", symbol: "confused" },
      { id: "alone", label: "Quiero estar solo", symbol: "alone" },
      { id: "mom", label: "Quiero a mi mamá", symbol: "mom" },
    ],
  },
];

export function pictogram(symbol, className = "pictogram") {
  return `<svg class="${className}" aria-hidden="true">
    <use href="assets/images/pictograms/tea-symbols.svg#${symbol}"></use>
  </svg>`;
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
