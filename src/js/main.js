import "../css/style.css";
import "../css/home.css";
import { getParkData, getInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";

function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = `<h1>${data.fullName}</h1>
  <p>${data.description}</p>`;
}

function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info");

  const html = data.map(mediaCardTemplate);

  infoEl.insertAdjacentHTML("afterbegin", html.join(""));
}
function enableNavigation() {
  // use a querySelector to get the menu buttons
    const menuButton = document.querySelector("#global-nav-toggle");
  // when the main menu button is clicked:
  menuButton.addEventListener("click", (ev) => {
    let target = ev.target;
    // toggle the show class on the global-nav
    document.querySelector(".global-nav").classList.toggle("show");
    // check to see if target is the button or something inside the button
    if (target.tagName != "BUTTON") {
      target = target.closest("button");
    }
    // check to see if we just opened or closed the menu
    if (document.querySelector(".global-nav").classList.contains("show")) {
      // if we opened it then set the aria-expanded attribute on the button to true
      target.setAttribute("aria-expanded", true);
    } else {
      // if we closed it then set the aria-expanded attribute on the button to false
      target.setAttribute("aria-expnded", false);
    }
  });
}

async function init() {
  const parkData = await getParkData();
  const links = getInfoLinks(parkData.images);
  setHeaderFooter(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(links);
  enableNavigation();
}

init();