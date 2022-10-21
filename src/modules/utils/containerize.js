import makeElement from './make-element';

// @nodeOrClassesForNewDiv: accepts an existing node for the container or
//                          or space-separated class names for a new div container
// @childNodes: nodes that are nested inside the above container (appendChild)
// @return container node with childNodes appended to it
export default function containerize(nodeOrClassesForNewDiv, ...childNodes) {
  // require at least 2 arguments
  if ( !nodeOrClassesForNewDiv || !childNodes) return;

  let container;

  // if 1st argument is node element, use it for the container
  if ( nodeOrClassesForNewDiv.nodeType ) 
    container = nodeOrClassesForNewDiv;
  else {
    // create a new div & add classes to it, separated by space
    container = makeElement("div", nodeOrClassesForNewDiv);
    nodeOrClassesForNewDiv
      .split(" ")
      .forEach((cls) => container.classList.add(cls));
  }

  const children = Array.from(childNodes);
  children.forEach(child => container.appendChild(child));

  return container;
}
