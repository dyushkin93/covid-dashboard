import 'normalize-css';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import create from './helpers/create';
import '../scss/style.scss';
import App from './app';
import getCovidData from './getCovidData';

async function main() {
  // get all data from API
  const covidData = await getCovidData();
  console.log(covidData);

  // create app object
  const covidApp = new App(covidData);
}

// app init
main();
