import create from './helpers/create';

export default class CasesByCountry {
  constructor(byCountryData) {
    this.byCountryData = byCountryData.data;

    this.countryBlock = document.getElementById('by-country');
    this.cases = document.getElementById('cases');
    this.death = document.getElementById('death');
    this.recovered = document.getElementById('recovered');
    this.search = document.getElementById('search-country');
    this.title = document.getElementById('country-title');

    this.switcher = document.getElementById('switcher');
    this.mapSwitcher = document.getElementById('map-switcher');
    this.deskBoardSwitcher = document.getElementById('deskboard-switcher');
    this.unitsType = document.getElementById('units');

    this.type = 'cases';
    this.units = 'absolute';

    this.switcher.addEventListener('click', (e) => {
      if (e.target.id === this.death.id) {
        this.type = 'death';
        this.title.textContent = 'Deaths';
      } if (e.target.id === this.cases.id) {
        this.type = 'cases';
        this.title.textContent = 'Cases';
      } if (e.target.id === this.recovered.id) {
        this.type = 'recovered';
        this.title.textContent = 'Recovered';
      }
    });
  }

  matches() {
    const matches = this.byCountryData.filter((country) => {
      const regex = new RegExp(`^${this.search.value}`, 'gi');
      return country.name.match(regex);
    });
    return matches;
  }

  createBlock(data, type, units) {
    if (units === 'absolute') {
      if (type === 'death') {
        this.countryBlock.innerHTML = '';
        data.sort((a, b) => b.latest_data.deaths - a.latest_data.deaths)
          .forEach((el) => {
            this.countryCases = create('div', 'confirmed', `${el.latest_data.deaths}`);
            this.country = create('div', 'country', `${el.name}`);
            this.flag = create('img', 'flag right', null, null, ['src', `../assets/img/flags/${el.code.toLowerCase()}`], ['alt', `${el.code}`]);
            this.countryCell = create('div', 'country-cell', [this.countryCases, this.country, this.flag], this.countryBlock, ['data-key', `${el.code}`]);
          });
        return this.countryCell;
      } if (type === 'recovered') {
        this.countryBlock.innerHTML = '';
        data.sort((a, b) => b.latest_data.recovered - a.latest_data.recovered)
          .forEach((el) => {
            this.countryCases = create('div', 'confirmed', `${el.latest_data.recovered}`);
            this.country = create('div', 'country', `${el.name}`);
            this.flag = create('img', 'flag right', null, null, ['src', `../assets/img/flags/${el.code.toLowerCase()}`], ['alt', `${el.code}`]);
            this.countryCell = create('div', 'country-cell', [this.countryCases, this.country, this.flag], this.countryBlock, ['data-key', `${el.code}`]);
          });
        return this.countryCell;
      } this.countryBlock.innerHTML = '';
      data.sort((a, b) => b.latest_data.confirmed - a.latest_data.confirmed)
        .forEach((el) => {
          this.countryCases = create('div', 'confirmed', `${el.latest_data.confirmed}`);
          this.country = create('div', 'country', `${el.name}`);
          this.flag = create('img', 'flag right', null, null, ['src', `../assets/img/flags/${el.code.toLowerCase()}.svg`], ['alt', `${el.code}`]);
          this.countryCell = create('div', 'country-cell', [this.countryCases, this.country, this.flag], this.countryBlock, ['data-key', `${el.code}`]);
        });
      return this.countryCell;
    } if (units === 'relative') {
      if (type === 'death') {
        this.countryBlock.innerHTML = '';
        data.sort((a, b) => b.latest_data.deaths - a.latest_data.deaths)
          .forEach((el) => {
            this.countryCases = create('div', 'confirmed', `${el.latest_data.deaths !== 0 ? Math.round((el.latest_data.deaths / el.population) * 100000, -2) : 0}`);
            this.country = create('div', 'country', `${el.name}`);
            this.flag = create('img', 'flag', null, null, ['src', `../assets/img/flags/${el.code.toLowerCase()}`], ['alt', `${el.code}`]);
            this.countryCell = create('div', 'country-cell', [this.countryCases, this.country, this.flag], this.countryBlock, ['data-key', `${el.code}`]);
          });
        return this.countryCell;
      } if (type === 'recovered') {
        this.countryBlock.innerHTML = '';
        data.sort((a, b) => b.latest_data.deaths - a.latest_data.deaths)
          .forEach((el) => {
            this.countryCases = create('div', 'confirmed', `${el.latest_data.recovered !== 0 ? Math.round((el.latest_data.recovered / el.population) * 100000, -2) : 0}`);
            this.country = create('div', 'country', `${el.name}`);
            this.flag = create('img', 'flag', null, null, ['src', `../assets/img/flags/${el.code.toLowerCase()}`], ['alt', `${el.code}`]);
            this.countryCell = create('div', 'country-cell', [this.countryCases, this.country, this.flag], this.countryBlock, ['data-key', `${el.code}`]);
          });
        return this.countryCell;
      } this.countryBlock.innerHTML = '';
      data.sort((a, b) => b.latest_data.deaths - a.latest_data.deaths)
        .forEach((el) => {
          this.countryCases = create('div', 'confirmed', `${el.latest_data.confirmed !== 0 ? Math.round((el.latest_data.confirmed / el.population) * 100000, -2) : 0}`);
          this.country = create('div', 'country', `${el.name}`);
          this.flag = create('img', 'flag', null, null, ['src', `../assets/img/flags/${el.code.toLowerCase()}`], ['alt', `${el.code}`]);
          this.countryCell = create('div', 'country-cell', [this.countryCases, this.country, this.flag], this.countryBlock, ['data-key', `${el.code}`]);
        });
      return this.countryCell;
    }
    return this.countryCell;
  }

  updateBlock() {
    this.createBlock(this.byCountryData, this.type, this.units);
    this.switcher.addEventListener('click', () => {
      if (this.type === 'death') {
        this.createBlock(this.byCountryData, this.type, this.units);
        if (this.search.value) {
          this.createBlock(this.matches(), this.type, this.units);
        }
      } if (this.type === 'cases') {
        this.createBlock(this.byCountryData, this.type, this.units);
        if (this.search.value) {
          this.createBlock(this.matches(), this.type, this.units);
        }
      } if (this.type === 'recovered') {
        this.createBlock(this.byCountryData, this.type, this.units);
        if (this.search.value) {
          this.createBlock(this.matches(), this.type, this.units);
        }
      }
    });
    this.search.addEventListener('input', () => {
      this.createBlock(this.matches(), this.type, this.units);
    });
  }
}
