import "./scss/index.scss"
import { header } from "./modules/header.js";

const assembleBody = () => {
  const body = document.querySelector("body");
  const elements = [
    header,
  ];

  elements.forEach(element => body.appendChild(element));
}

assembleBody();

