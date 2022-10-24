import makeElement from "./utils/make-element";

const createMain = () => {
  const sidebar = makeElement("div", "sidebar");
  const content = makeElement("div", "content");

  return {
    sidebar,
    content,
  };
};

const main = createMain();
export default main;
