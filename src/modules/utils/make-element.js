function makeElement(type, classes, textContentOrAlt, id, srcOrHref) {
  // minimum requirements: element type
  if (!type) return;

  const element = document.createElement(type);

  // add classes, separated by spaces
  if (classes) classes.split(" ").forEach((cls) => element.classList.add(cls));

  // add alt text if img OR textContent for everything else
  type === "img"
    ? (element.alt = textContentOrAlt)
    : (element.textContent = textContentOrAlt);

  // if img set src OR if a set href
  if (type === "img") element.src = srcOrHref;
  if (type === "a") element.href = srcOrHref;

  if (id) element.id = id;

  return element;
}

export { makeElement };
