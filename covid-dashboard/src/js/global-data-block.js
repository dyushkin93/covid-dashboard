export default class GlobalDataBlock {
  constructor(globalData, population) {
    this.globalData = globalData[0];
    this.population100k = population;

    // elements where data should be exported
    this.casesElem = document.querySelector('body');
    this.deathsElem = document.querySelector('body');
    this.recoveredElem = document.querySelector('body');
  }

  getCases(period, units) {
    let cases;
    let deaths;
    let recovered;
    if (period === 'total' && units === 'absolute') {
      console.log(this.globalData);
      cases = this.globalData.confirmed;
      deaths = this.globalData.deaths;
      recovered = this.globalData.recovered;
    } else if (period === 'lastDay' && units === 'absolute') {
      cases = this.globalData.new_confirmed;
      deaths = this.globalData.new_deaths;
      recovered = this.globalData.new_recovered;
    } else if (period === 'total' && units === 'relavite') {
      cases = parseInt((this.globalData.confirmed / this.population100k), 10);
      deaths = parseInt((this.globalData.deaths / this.population100k), 10);
      recovered = parseInt((this.globalData.recovered / this.population100k), 10);
    } else if (period === 'lastDay' && units === 'relavite') {
      cases = parseInt((this.globalData.new_confirmed / this.population100k), 10);
      deaths = parseInt((this.globalData.new_deaths / this.population100k), 10);
      recovered = parseInt((this.globalData.new_recovered / this.population100k), 10);
    }

    this.casesElem.innerHTML = cases;
    this.deathsElem.innerHTML = deaths;
    this.recoveredElem.innerHTML = recovered;
  }
}
