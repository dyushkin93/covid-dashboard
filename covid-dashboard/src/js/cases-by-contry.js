import create from './helpers/create';

export default class CasesByCountry {
  constructor(byCountryData) {
    this.byCountryData = byCountryData.data;

    this.countryBlock = document.getElementById('by-country');
    this.cases = document.getElementById('cases');
    this.death = document.getElementById('death');
    this.recovered = document.getElementById('recovered');

    this.switcher = document.getElementById('switcher');
    this.mapSwitcher = document.getElementById('map-switcher');
    this.deskBoardSwitcher = document.getElementById('deskboard-switcher');
    this.unitsType = document.getElementById('units');

    this.type = 'cases';
    this.units = 'absolute';
  }

  createCountryCases(type, units) {
    if (units === 'absolute') {
      if (type === 'death') {
        this.countryBlock.innerHTML = '';
        this.byCountryData.sort((a, b) => b.latest_data.deaths - a.latest_data.deaths)
          .forEach((el) => {
            this.countryCases = create('div', 'confirmed', `${el.latest_data.deaths}`);
            this.country = create('div', 'country', `${el.name}`);
            this.countryCell = create('div', 'country-cell', [this.countryCases, this.country], this.countryBlock, ['data-key', `${el.code}`]);
          });
      } else if (type === 'recovered') {
        this.countryBlock.innerHTML = '';
        this.byCountryData.sort((a, b) => b.latest_data.recovered - a.latest_data.recovered)
          .forEach((el) => {
            this.countryCases = create('div', 'confirmed', `${el.latest_data.recovered}`);
            this.country = create('div', 'country', `${el.name}`);
            this.countryCell = create('div', 'country-cell', [this.countryCases, this.country], this.countryBlock, ['data-key', `${el.code}`]);
          });
      } else this.countryBlock.innerHTML = '';
      this.byCountryData.sort((a, b) => b.latest_data.confirmed - a.latest_data.confirmed)
        .forEach((el) => {
          this.countryCases = create('div', 'confirmed', `${el.latest_data.confirmed}`);
          this.country = create('div', 'country', `${el.name}`);
          this.countryCell = create('div', 'country-cell', [this.countryCases, this.country], this.countryBlock, ['data-key', `${el.code}`]);
        });
    } else if (units === 'relative') {
      if (type === 'death') {
        this.countryBlock.innerHTML = '';
        this.byCountryData.sort((a, b) => b.latest_data.deaths - a.latest_data.deaths)
          .forEach((el) => {
            this.countryCases = create('div', 'confirmed', `${el.latest_data.deaths !== 0 ? Math.round((el.latest_data.deaths / el.population) * 100000, -2) : 0}`);
            this.country = create('div', 'country', `${el.name}`);
            this.countryCell = create('div', 'country-cell', [this.countryCases, this.country], this.countryBlock, ['data-key', `${el.code}`]);
          });
      } else if (type === 'recovered') {
        this.countryBlock.innerHTML = '';
        this.byCountryData.sort((a, b) => b.latest_data.deaths - a.latest_data.deaths)
          .forEach((el) => {
            this.countryCases = create('div', 'confirmed', `${el.latest_data.recovered !== 0 ? Math.round((el.latest_data.recovered / el.population) * 100000, -2) : 0}`);
            this.country = create('div', 'country', `${el.name}`);
            this.countryCell = create('div', 'country-cell', [this.countryCases, this.country], this.countryBlock, ['data-key', `${el.code}`]);
          });
      } else this.countryBlock.innerHTML = '';
      this.byCountryData.sort((a, b) => b.latest_data.deaths - a.latest_data.deaths)
        .forEach((el) => {
          this.countryCases = create('div', 'confirmed', `${el.latest_data.confirmed !== 0 ? Math.round((el.latest_data.confirmed / el.population) * 100000, -2) : 0}`);
          this.country = create('div', 'country', `${el.name}`);
          this.countryCell = create('div', 'country-cell', [this.countryCases, this.country], this.countryBlock, ['data-key', `${el.code}`]);
        });
    }
  }

  updateCountryCases() {
    this.createCountryCases(this.type, this.units);
    this.switcher.addEventListener('click', (e) => {
      if (e.target.id === this.cases.id) {
        this.type = 'cases';
        this.createCountryCases(this.type, this.units);
      } else if (e.target.id === this.death.id) {
        this.type = 'death';
        this.createCountryCases(this.type, this.units);
      } else if (e.target.id === this.recovered.id) {
        this.type = 'recovered';
        this.createCountryCases(this.type, this.units);
      }
    });
    this.mapSwitcher.addEventListener('click', (e) => {
      if (e.target.id === this.cases.id) {
        this.type = 'cases';
        this.createCountryCases(this.type);
      } else if (e.target.id === this.death.id) {
        this.type = 'death';
        this.createCountryCases(this.type);
      } else if (e.target.id === this.recovered.id) {
        this.type = 'recovered';
        this.createCountryCases(this.type);
      }
    });
    this.deskBoardSwitcher.addEventListener('click', (e) => {
      if (e.target.id === this.unitsType.id && this.units === 'absolute') {
        this.units = 'relative';
        return this.createCountryCases(this.type, this.units);
      } if (e.target.id === this.unitsType.id && this.units === 'relative') {
        this.units = 'absolute';
        return this.createCountryCases(this.type, this.units);
      }
    });
  }
}
