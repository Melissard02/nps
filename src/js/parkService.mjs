// parkService.mjs
const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;

async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };

  let data = {};
  const response = await fetch(baseUrl + url, options);

  if (response.ok) {
    data = await response.json();
  } else {
    throw new Error("response not ok");
  }

  return data;
}


export async function getParkData(parkCode = "yell") {
  const parkData = await getJson(`parks?parkCode=${parkCode}`);

  if (!parkData.data || parkData.data.length === 0) {
    throw new Error(`No park found for parkCode: ${parkCode}`);
  }

  return parkData.data[0];
}


