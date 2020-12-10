import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min';
import 'normalize-css';
import '../scss/style.scss';
import App from './app';

async function main() {
  // get all data from API
  let globalTimeline;
  let byCountryData;
  const byCountryTimeline = [];
  try {
    const globalDataUrl = 'https://corona-api.com/timeline';
    const globalRes = await fetch(globalDataUrl);
    globalTimeline = await globalRes.json();
    console.log(globalTimeline);

    const byCountryDataUrl = 'https://corona-api.com/countries';
    const byCountryRes = await fetch(byCountryDataUrl);
    byCountryData = await byCountryRes.json();
    console.log(byCountryData);

    byCountryData.data.forEach(async (country) => {
      const countryUrl = `https://corona-api.com/countries/${country.code}`;
      const countryRes = await fetch(countryUrl);
      const countryTimeline = await countryRes.json();
      byCountryTimeline.push(countryTimeline);
    });
  } catch {
    throw new Error('Failed to load data');
  }

  // create app object
  const covidApp = new App(globalTimeline, byCountryData, byCountryTimeline);
}

// app init
main();
