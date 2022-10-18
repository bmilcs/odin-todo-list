import { makeElement } from './make-element';

// @returns a new div with a class of divClassName and
//          appends all childElements elements to it
export const containerize = (divClassName, ...childElements) => {
  if ( !divClassName ) return;
  
  const container = makeElement("div", divClassName);
  const children = Array.from(childElements);

  children.forEach(child => container.appendChild(child));

  return container;
}
