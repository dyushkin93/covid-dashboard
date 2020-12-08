export default class GlobalDataBlock {
  constructor(covidData, population) {
    this.covidData = covidData;
    this.globalPopulation = population;
    this.countryPopulation = this.globalPopulation;
    this.units = "absolute";
    this.period = "total";
    // elements where data should be exported
    this.casesElem = document.querySelector("#cases-count");
    this.deathsElem = document.querySelector("#death-count");
    this.recoveredElem = document.querySelector("#recovered-count");

    this.casesToShow;
    this.deathsToShow;
    this.recoveredToShow;

    this.update()
  }

  set covidData(dataArray) {
    this.cases = dataArray.confirmed;
    this.deaths = dataArray.deaths;
    this.recovered = dataArray.recovered;
    this.newCases = dataArray.new_confirmed;
    this.newDeaths = dataArray.new_deaths;
    this.newRecovered = dataArray.new_recovered;
  }

  /**
   * 
   * @param {Array} param0.covidData
   * @param {"total"|"last"} param0.covidData
   * @param {"absolute"|"relative"} param0.units
   */
  setNewData({covidData, period, units}) {
    if (covidData) {
      if (covidData.data) {
        this.covidData = covidData.data.timeline[0];
        this.countryPopulation = covidData.data.population / 100000;
      } else {
        this.covidData = covidData[0];
        this.countryPopulation = this.globalPopulation;
      }
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
    if (this.period === "total") {
      this.casesToShow = this.cases;
      this.deathsToShow = this.deaths;
      this.recoveredToShow = this.recovered;
    } else if (this.period === "last") {
      this.casesToShow = this.newCases;
      this.deathsToShow = this.newDeaths;
      this.recoveredToShow = this.newRecovered;
    }

    if (this.units === "relative") {
      this.casesToShow /= this.countryPopulation;
      this.deathsToShow /= this.countryPopulation;
      this.recoveredToShow /= this.countryPopulation;
    }

    this.casesElem.innerHTML = new Intl.NumberFormat("ru-RU").format(this.casesToShow);
    this.deathsElem.innerHTML = new Intl.NumberFormat("ru-RU").format(this.deathsToShow);
    this.recoveredElem.innerHTML = new Intl.NumberFormat("ru-RU").format(this.recoveredToShow);
  }
}