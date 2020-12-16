export default class GlobalDataBlock {
  constructor(covidData) {
    this.covidData = covidData;
    this.countryToShow = this.covidData.world;
    this.units = 'absolute';
    this.period = 'total';
    // elements where data should be exported
    this.casesElem = document.querySelector('#cases-count');
    this.deathsElem = document.querySelector('#death-count');
    this.recoveredElem = document.querySelector('#recovered-count');
    this.casesBlock = document.getElementById('by-country');

    this.switcher = document.getElementById('deskboard-switcher');

    this.casesToShow = 0;
    this.deathsToShow = 0;
    this.recoveredToShow = 0;

    this.setData();
  }

  setData() {
    this.casesBlock.addEventListener('click', (e) => {
      if (e.target.tagName === 'DIV' && e.target.classList.contains('country')) {
        this.countryToShow = this.covidData[e.target.dataset.key];
        console.log(this.countryToShow);
      }
      this.switchData(this.countryToShow, this.period, this.units);
    });
    this.switcher.addEventListener('click', (e) => {
      if (e.target.id === 'all-time') {
        this.countryToShow = this.covidData.world;
        this.period = 'total';
      }
      if (e.target.id === 'total') {
        this.period = 'total';
      }
      if (e.target.id === 'last-day') {
        this.period = 'last';
      }
      if (e.target.id === 'units') {
        this.units = 'relative';
        e.target.classList.toggle('active');
      }
      if (!e.target.classList.contains('active')) {
        this.units = 'absolute';
      }
      this.switchData(this.countryToShow, this.period, this.units);
    });
    this.switchData(this.countryToShow, this.period, this.units);
  }

  /**
   *
   * @param {String} param0.country
   * @param {"total"|"last"} param0.covidData
   * @param {"absolute"|"relative"} param0.units
   */
  switchData({ country, period, units }) {
    if (country) {
      const countryCode = country.toUpperCase();
      this.countryToShow = this.covidData[countryCode];
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
    if (this.period === 'total') {
      this.casesToShow = this.countryToShow.cases;
      this.deathsToShow = this.countryToShow.deaths;
      this.recoveredToShow = this.countryToShow.recovered;
    } else if (this.period === 'last') {
      this.casesToShow = this.countryToShow.newCases;
      this.deathsToShow = this.countryToShow.newDeaths;
      this.recoveredToShow = this.countryToShow.newRecovered;
    }

    if (this.units === 'relative') {
      this.casesToShow /= (this.countryToShow.population / 100000);
      this.deathsToShow /= (this.countryToShow.population / 100000);
      this.recoveredToShow /= (this.countryToShow.population / 100000);
      this.casesToShow = this.casesToShow.toFixed(3);
      this.deathsToShow = this.deathsToShow.toFixed(3);
      this.recoveredToShow = this.recoveredToShow.toFixed(3);
    }

    this.casesElem.innerHTML = new Intl.NumberFormat('ru-RU').format(this.casesToShow);
    this.deathsElem.innerHTML = new Intl.NumberFormat('ru-RU').format(this.deathsToShow);
    this.recoveredElem.innerHTML = new Intl.NumberFormat('ru-RU').format(this.recoveredToShow);
  }
}
