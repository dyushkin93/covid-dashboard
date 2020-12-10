import GlobalDataBlock from './global-data-block';
import CovidChart from './covid-chart';
import CasesByCountry from './cases-by-contry';

export default class App {
  constructor(globalData, byCountryData, byCountryTimeline) {
    this.globalData = globalData.data;

    this.byCountryData = byCountryData.data;
    this.byCountryTimeline = byCountryTimeline;

    this.cases = document.getElementById('cases');
    this.death = document.getElementById('death');
    this.recovered = document.getElementById('recovered');

    this.type = 'cases';

    this.globalPopulation100k = 7700000000 / 100000;
    // period to show in blocks "total" || "lastDay"
    this.period = 'total';

    // units to show in blocks "absolute" || "relative"
    this.units = 'absolute';
    console.log(this.byCountryTimeline);

    // units to show in byCountryCases block

    // initialisation of CasesByCountry block
    this.casesByCountry = new CasesByCountry(byCountryData).updateCountryCases();

    // initialisation of GlobalData block
    // this.globalDataBlock = new GlobalDataBlock(this.globalData, this.globalPopulation100k);
    // this.globalDataBlock.getCases(this.period, this.units)

    // initialisation of Chart block
    // this.chart = new CovidChart(this.globalData, this.globalPopulation100k)
  }
}
