import CasesByCountry from './cases-by-contry';
import GlobalDataBlock from './global-data-block';
import CovidChart from './covid-chart';
import CovidMap from './map';
import expandBlock from './helpers/expand';

export default class App {
  constructor(covidData) {
    this.covidData = covidData;
    // period to show in blocks "total" || "lastDay"
    this.period = 'total';

    // units to show in blocks "absolute" || "relative"
    this.units = 'absolute';

    this.blocks = {
      globalData: new GlobalDataBlock(this.covidData),
      chart: new CovidChart(this.covidData),
      map: new CovidMap(this.covidData),
      casesByCounty: new CasesByCountry(covidData, this),
    };

    expandBlock();
  }

  switchBlocksData(options) {
    Object.values(this.blocks).forEach((block) => {
      block.switchData(options);
    });
  }
}
