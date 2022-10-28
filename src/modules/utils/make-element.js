export default function makeElement(
  type,
  classes,
  textContentOrAltOrValue,
  id,
  srcOrHref
) {
  // minimum requirements: element type
  if (!type) return;

  const element = document.createElement(type);

  // add classes, separated by spaces
  if (classes) classes.split(" ").forEach((cls) => element.classList.add(cls));

  // add alt text if img, value if input, textContent for all other element types
  if (type === "img") element.alt = textContentOrAltOrValue;
  else if (type === "input") element.value = textContentOrAltOrValue;
  else element.textContent = textContentOrAltOrValue;

  // if img set src OR if a set href
  if (type === "img") element.src = srcOrHref;
  if (type === "a") element.href = srcOrHref;

  if (id) element.id = id;

  return element;
}
