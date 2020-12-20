import create from './helpers/create';
import VirtualKeyboard from './keyboard/virtual-keyboard';

export default class CasesByCountry {
  constructor(covidData, app) {
    this.byCountryData = Object.values(covidData).slice(1);
    this.app = app;

    this.countryBlock = document.getElementById('by-country');
    this.search = document.getElementById('search-country');
    this.title = document.getElementById('country-title');

    this.keyboard = new VirtualKeyboard(this.search).init();

    this.unitsToggle = document.getElementById('units');

    this.type = 'cases';
    this.units = 'absolute';
    this.period = 'total';

    this.switchCountry = (event) => {
      event.target.parentElement.classList.toggle('active-country-cell');
      this.currentCountry = event.target;
      console.log(this.currentCountry);
      let countryCode = '';
      if (event.target.parentElement.classList.contains('active-country-cell') && !this.currentCountry.parentElement.classList.contains('current')) {
        countryCode = event.target.dataset.key;
      } else {
        countryCode = 'world';
      }
      app.switchBlocksData({
        countryCode,
      });
      this.app.blocks.map.focusOnCountry(countryCode);
      this.currentCountry.parentElement.classList.remove('current');
      this.currentCountry.parentElement.classList.remove('current');
    };

    this.update();

    this.searchCountry = (event) => {
      Array.from(this.countryBlock.children).forEach((elem) => {
        elem.classList.remove('hidden-country-cell');
      });
      this.matches(event.target.value).forEach((elem) => {
        elem.parentElement.classList.add('hidden-country-cell');
      });
    };
    this.search.addEventListener('keyup', this.searchCountry);
  }

  matches(value) {
    const matches = Array.from(this.countryBlock
      .querySelectorAll('.country')).filter((elem) => {
      const regex = new RegExp(`^${value}`, 'gi');
      return !elem.innerText.match(regex);
    });
    return matches;
  }

  // this function recreate countryCell on evety update
  // TODO: function should create constant countryCells during the app init
  // On every update data should be replaced via Element.innerHTML property
  // That's because there should be ability to toggle each country and keep it active
  // All event handlers are ready, you should just refactor code as described above
  // to hide CountryCells during the searching you can use display:hidden
  createBlock(data, type, units) {
    if (units === 'absolute') {
      if (type === 'deaths') {
        this.countryBlock.innerHTML = '';
        data.sort((a, b) => b.deaths - a.deaths)
          .forEach((el) => {
            this.countryCases = create('div', 'confirmed', `${el.deaths}`);
            this.country = create('div', 'country', `${el.name}`, null, ['data-key', `${el.code}`]);
            this.flag = create('img', 'flag', null, null,
              ['src', `./assets/img/flags/${el.code.toLowerCase()}.svg`], ['alt', `${el.code}`]);
            if (this.currentCountry && el.code === this.currentCountry.dataset.key) {
              this.countryCell = create('div', 'country-cell current', [this.countryCases, this.country, this.flag], this.countryBlock);
            } else this.countryCell = create('div', 'country-cell', [this.countryCases, this.country, this.flag], this.countryBlock);
          });
      } else if (type === 'recovered') {
        this.countryBlock.innerHTML = '';
        data.sort((a, b) => b.recovered - a.recovered)
          .forEach((el) => {
            this.countryCases = create('div', 'confirmed', `${el.recovered}`);
            this.country = create('div', 'country', `${el.name}`, null, ['data-key', `${el.code}`]);
            this.flag = create('img', 'flag', null, null, ['src', `./assets/img/flags/${el.code.toLowerCase()}.svg`], ['alt', `${el.code}`]);
            if (this.currentCountry && el.code === this.currentCountry.dataset.key) {
              this.countryCell = create('div', 'country-cell current', [this.countryCases, this.country, this.flag], this.countryBlock);
            } else this.countryCell = create('div', 'country-cell', [this.countryCases, this.country, this.flag], this.countryBlock);
          });
      } else {
        this.countryBlock.innerHTML = '';
        data.sort((a, b) => b.cases - a.cases)
          .forEach((el) => {
            this.countryCases = create('div', 'confirmed', `${el.cases}`);
            this.country = create('div', 'country', `${el.name}`, null, ['data-key', `${el.code}`]);
            this.flag = create('img', 'flag', null, null, ['src', `./assets/img/flags/${el.code.toLowerCase()}.svg`], ['alt', `${el.code}`]);
            if (this.currentCountry && el.code === this.currentCountry.dataset.key) {
              this.countryCell = create('div', 'country-cell current', [this.countryCases, this.country, this.flag], this.countryBlock);
            } else this.countryCell = create('div', 'country-cell', [this.countryCases, this.country, this.flag], this.countryBlock);
          });
      }
    } else if (units === 'relative') {
      if (type === 'deaths') {
        this.countryBlock.innerHTML = '';
        data.sort((a, b) => (b.deaths / b.population)
           * 100000 - (a.deaths / a.population) * 100000)
          .forEach((el) => {
            this.countryCases = create('div', 'confirmed', `${el.deaths !== 0 ? Math.round((el.deaths / el.population) * 100000, -2) : 0}`);
            this.country = create('div', 'country', `${el.name}`, null, ['data-key', `${el.code}`]);
            this.flag = create('img', 'flag', null, null, ['src', `./assets/img/flags/${el.code.toLowerCase()}.svg`], ['alt', `${el.code}`]);
            if (this.currentCountry && el.code === this.currentCountry.dataset.key) {
              this.countryCell = create('div', 'country-cell current', [this.countryCases, this.country, this.flag], this.countryBlock);
            } else this.countryCell = create('div', 'country-cell', [this.countryCases, this.country, this.flag], this.countryBlock);
          });
      } else if (type === 'recovered') {
        this.countryBlock.innerHTML = '';
        data.sort((a, b) => (b.recovered / b.population) 
          * 100000 - (a.recovered / a.population) * 100000)
          .forEach((el) => {
            this.countryCases = create('div', 'confirmed', `${el.recovered !== 0 ? Math.round((el.recovered / el.population) * 100000, -2) : 0}`);
            this.country = create('div', 'country', `${el.name}`, null, ['data-key', `${el.code}`]);
            this.flag = create('img', 'flag', null, null, ['src', `./assets/img/flags/${el.code.toLowerCase()}.svg`], ['alt', `${el.code}`]);
            if (this.currentCountry && el.code === this.currentCountry.dataset.key) {
              this.countryCell = create('div', 'country-cell current', [this.countryCases, this.country, this.flag], this.countryBlock);
            } else this.countryCell = create('div', 'country-cell', [this.countryCases, this.country, this.flag], this.countryBlock);
          });
      } else {
        this.countryBlock.innerHTML = '';
        data.sort((a, b) => (b.cases / b.population)
           * 100000 - (a.cases / a.population) * 100000)
          .forEach((el) => {
            this.countryCases = create('div', 'confirmed', `${el.cases !== 0 ? Math.round((el.cases / el.population) * 100000, -2) : 0}`);
            this.country = create('div', 'country', `${el.name}`, null, ['data-key', `${el.code}`]);
            this.flag = create('img', 'flag', null, null, ['src', `./assets/img/flags/${el.code.toLowerCase()}.svg`], ['alt', `${el.code}`]);
            if (this.currentCountry && el.code === this.currentCountry.dataset.key) {
              this.countryCell = create('div', 'country-cell current', [this.countryCases, this.country, this.flag], this.countryBlock);
            } else this.countryCell = create('div', 'country-cell', [this.countryCases, this.country, this.flag], this.countryBlock);
          });
      }
    }

    this.countryBlock.querySelectorAll('.country').forEach((countryElem) => {
      countryElem.addEventListener('click', this.switchCountry);
    });
  }

  switchData({ typeOfData, period, units }) {
    if (typeOfData) {
      this.type = typeOfData;
    }

    if (period) {
      this.period = period;
    }

    if (units) {
      this.units = units;
    }

    this.update();
  }

  update() {
    if (this.currentCountry) {
      console.log(this.currentCountry.parentElement);
      console.log(this.currentCountry.dataset.key);
      this.currentCountry.parentElement.classList.add('current')
    }
    this.createBlock(this.byCountryData, this.type, this.units);
  }
}
