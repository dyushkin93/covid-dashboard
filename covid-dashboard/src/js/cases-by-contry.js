import create from './helpers/create';

export default class CasesByCountry {
  constructor(byCountryData) {
    this.byCountryData = byCountryData.data;

    this.countryBlock = document.getElementById('by-country');
    this.cases = document.getElementById('cases');
    this.death = document.getElementById('death');
    this.recovered = document.getElementById('recovered');
  }

  createCountryCases(type) {
    if (type === 'death') {
      console.log(type);
      this.countryBlock.innerHTML = '';
      this.byCountryData.forEach((el) => {
        this.countryCases = create('div', 'confirmed', `${el.latest_data.deaths}`);
        this.country = create('div', 'country', `${el.name}`);
        this.countryCell = create('div', 'country-cell', [this.countryCases, this.country], this.countryBlock, ['data-key', `${el.code}`]);
      });
    } else if (type === 'recovered') {
      console.log(type);
      this.countryBlock.innerHTML = '';
      this.byCountryData.forEach((el) => {
        this.countryCases = create('div', 'confirmed', `${el.latest_data.recovered}`);
        this.country = create('div', 'country', `${el.name}`);
        this.countryCell = create('div', 'country-cell', [this.countryCases, this.country], this.countryBlock, ['data-key', `${el.code}`]);
      });
    } else console.log(type);
    this.countryBlock.innerHTML = '';
    this.byCountryData.forEach((el) => {
      this.countryCases = create('div', 'confirmed', `${el.latest_data.confirmed}`);
      this.country = create('div', 'country', `${el.name}`);
      this.countryCell = create('div', 'country-cell', [this.countryCases, this.country], this.countryBlock, ['data-key', `${el.code}`]);
    });
  }
}
