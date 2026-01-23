// main.js
import { getParkData } from "./parkService.mjs";

async function init() {
    const parkData = await getParkData();
    
    const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    image: getImageUrl(parkData, 2),
    description: "See what conditions to expect in the park before leaving on your trip!"
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    image: getImageUrl(parkData, 3),
    description: "Learn about the fees and passes that are available."
  },
  {
    name: "Vistor Centers &#x203A;",
    link: "vistor_centers.html",
    image: getImageUrl(parkData, 9, 1),
    description: "Learn about the visitor centers in the park."
  }
];
    setHeaderInfo(parkData);
    setIntroSection(parkData);
    setInfoSection(parkInfoLinks);
    setFooter(parkData);
}



function setHeaderInfo(data) {
    // DISCLAIMER SECTION
    const disclaimer = document.querySelector(".disclaimer > a");
    disclaimer.href = data.url;
    disclaimer.innerHTML = data.fullName;

    // TITLE OF THE SITE SELECTER
    document.querySelector("head > title").textContent = data.fullName;

    // HERO IMAGE
    document.querySelector(".hero-banner > img").src = data.images[0].url;
 
    // TEMPLATE??
    document.querySelector(".hero-banner__content").innerHTML =
    parkInfoTemplate(data);
}

function setIntroSection(data) {
    // PARK FULL NAME / DESCRIPTION
    const introEl = document.querySelector(".intro");
    introEl.innerHTML = `<h1>${data.fullName}</h1>
    <p>${data.description}</p>`;
}

function setInfoSection(data) {
    const infoEl = document.querySelector(".info");
    
    const mediaHTML = data.map(mediaCardTemplate)
    infoEl.innerHTML = mediaHTML.join("");
}

function setFooter(data) {
    const footerEl = document.querySelector("#park-footer");
    footerEl.innerHTML = footerTemplate(data);
}

function parkInfoTemplate(info) {
  return `<a href="/" class="hero-banner__title">${info.name}</a>
  <p class="hero-banner__subtitle">
    <span>${info.designation}</span>
    <span>${info.states}</span>
  </p>`;
}

function mediaCardTemplate(info) {
    return `
    <div class="media-card">
        <a href="${info.link}">
            <img src="${info.image}" alt="${info.name}" class="media-card-img">
            <h3 class="media-card-title">${info.name}</h3>
        </a>
        <p>${info.description}</p>
    </div>`;
}

function getMailingAddress(addresses) {
    return addresses?.find(a => a.type === "Mailing") ?? addresses?.[0] ?? null;
}

function getPhone(numbers) {
    const phone = numbers?.find(n => n.type === "Voice") ?? numbers?.[0] ?? null;
  return phone?.phoneNumber ?? "Not available";

}

function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses);
  const phone = getPhone(info.contacts?.phoneNumbers);

  const mailingHtml = mailing
    ? `<div><p>${mailing.line1}</p><p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p></div>`
    : `<p>Mailing address not available</p>`;

  return `<section class="contact">
    <h3>Contact Info</h3>
    <h4>Mailing Address:</h4>
    ${mailingHtml}
    <h4>Phone:</h4>
    <p>${phone}</p>
  </section>`;
}

function getImageUrl(parkData, index, fallbackIndex = 0) {
  return parkData?.images?.[index]?.url ?? parkData?.images?.[fallbackIndex]?.url ?? "";
}



// RUN THE FUNCTIONS HERE
init();

