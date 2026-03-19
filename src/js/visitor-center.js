// visitor-center.js
import "../css/style.css";
import "../css/visitor-center.css";
import {getParkData, getParkVisitorCenterDetails } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import {vcInfoTemplate, vcTitleTemplate, vcDetailsTemplate, vcAmenityTemplate, vcImageTemplate, listTemplate, vcAddressesListTemplate, vcDirectionsTemplate, vcContactsTemplate
} from "./templates.mjs";

function getParam(param) {
    const paramString = location.search;
    const params = new URLSearchParams(paramString);
    return params.get(param);
}

function buildPage(data) {
  document.querySelector(".vc-name").innerHTML = vcTitleTemplate(data.name);
  document.querySelector(".vc-info").innerHTML = vcInfoTemplate(data);
  const detailsEl = document.querySelector(".vc-details-list");
  detailsEl.innerHTML = "";
  
/*===========================================
************     ADDRESSES    **************
===========================================*/
  const addressHTML = vcAddressesListTemplate(data.addresses);
  detailsEl.insertAdjacentHTML(
    "beforeend",
    vcDetailsTemplate(
      "vcAddresses",
      "Addresses",
      "heading-icon_map-pin",
      addressHTML
    )
  );

/*===========================================
************     DIRECTIONS    **************
===========================================*/
  detailsEl.insertAdjacentHTML(
    "beforeend",
    vcDetailsTemplate(
      "vcDirections",
      "Directions",
      "directions",
      vcDirectionsTemplate(data.directionsInfo)
    )
  );

/*===========================================
************     AMENITIES    **************
===========================================*/
  const amenitiesHTML = listTemplate(data.amenities, vcAmenityTemplate);
  detailsEl.insertAdjacentHTML(
    "beforeend",
    vcDetailsTemplate(
      "vcAmenities",
      "Amenities",
      "heading-icon_info",
      amenitiesHTML
    )
  );


/*===========================================
**************    CONTACT    ***************
===========================================*/
  const contactHTML = vcContactsTemplate(data.contacts);
  detailsEl.insertAdjacentHTML(
    "beforeend",
    vcDetailsTemplate("vcContacts", "Contacts", "phone", contactHTML)
  );

/*===========================================
*************     GALLERY    ***************
===========================================*/
  const galleryHTML = listTemplate(data.images, vcImageTemplate);
  document
    .querySelector(".vc-gallery")
    .insertAdjacentHTML("beforeend", galleryHTML);
}

async function init () {
    const parkData = await getParkData();
    const id = getParam("id");
    const centerDetails = await getParkVisitorCenterDetails(id);
    setHeaderFooter(parkData);
    buildPage(centerDetails);
}

init();