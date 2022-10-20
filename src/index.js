import "./scss/index.scss"
import { header } from "./modules/header.js";
import { footer } from "./modules/footer.js";

const assembleBody = () => {
  const body = document.querySelector("body");
  const elements = [
    header,
    footer
  ];

  elements.forEach(element => body.appendChild(element));
}

assembleBody();
