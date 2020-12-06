import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min';
import 'normalize-css';
import create from './helpers/create';
import '../scss/style.css';

const cases = document.getElementById('cases');

async function getCountries() {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch('https://api.covid19api.com/summary', requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const { Countries, Global } = data;
      Countries.forEach((el) => {
        const confirmed = create('div', 'confirmed red-text', `${el.TotalConfirmed}`);
        const country = create('div', 'country', `${el.Country}`);
        const line = create('div', 'cases-country', null, cases, ['data-key', `${el.Country}`]);
        line.append(confirmed, country);
      });
    });
}

getCountries();
