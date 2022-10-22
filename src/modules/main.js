import makeElement from "./utils/make-element";

const createMain = () => {
  const parent = makeElement("div", "main-parent");
  const sidebar = makeElement("div", "sidebar");
  const content = makeElement("div", "content");

  parent.appendChild(sidebar);
  parent.appendChild(content);

  return {
    parent,
    sidebar,
    content
  }
}

const main = createMain();
export default main;
