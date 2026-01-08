import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

const disclaimer = document.querySelector(".disclaimer > a");
disclaimer.href = parkData.url;
disclaimer.innerHTML = parkData.fullName;

const parkName = document.querySelector(".hero-banner__title")
parkName.href = parkData.url;
parkName.innerHTML = parkData.name;


const states = document.querySelector(".states")
states.innerHTML = parkData.states;

const designation = document.querySelector(".designation")
designation = parkData.designation