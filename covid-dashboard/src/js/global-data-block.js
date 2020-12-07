export default class GlobalDataBlock {
  constructor(globalData, population100k) {
    this.globalData = globalData;
    this.population100k = population100k;

    // elements where data should be exported
    this.casesElem = document.querySelector("body");
    this.deathsElem = document.querySelector("body");
    this.recoveredElem = document.querySelector("body");
  }

  getCases(period, unit) {
    let cases;
    let deaths;
    let recovered;
    if (period === "total" && unit === "absolute") {
      console.log(this.globalData[0])
      cases = this.globalData[0].confirmed;
      deaths = this.globalData[0].deaths;
      recovered = this.globalData[0].recovered;
    } else if (period === "lastDay" && unit === "absolute") {
      cases = this.globalData[0].new_confirmed;
      deaths = this.globalData[0].new_deaths;
      recovered = this.globalData[0].new_recovered;
    } else if (period === "total" && unit === "relavite") {
      cases = parseInt((this.globalData[0].confirmed / this.population100k), 10);
      deaths = parseInt((this.globalData[0].deaths / this.population100k), 10);
      recovered = parseInt((this.globalData[0].recovered / this.population100k), 10);
    } else if (period === "lastDay" && unit === "relavite") {
      cases = parseInt((this.globalData[0].new_confirmed / this.population100k), 10);
      deaths = parseInt((this.globalData[0].new_deaths / this.population100k), 10);
      recovered = parseInt((this.globalData[0].new_recovered / this.population100k), 10);
    }

    this.casesElem.innerHTML = cases;
    this.deathsElem.innerHTML = deaths;
    this.recoveredElem.innerHTML = recovered;
  }

  
}