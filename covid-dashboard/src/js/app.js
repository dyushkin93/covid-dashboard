import CasesByCountry from './cases-by-contry';
import GlobalDataBlock from './global-data-block';
import CovidChart from './covid-chart';
import CovidMap from './map';
import expandBlock from './helpers/expand';
import overlay from './helpers/overlay';

export default class App {
  constructor(covidData) {
    this.covidData = covidData;
    this.row = document.querySelector('.row');
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

    overlay();
    expandBlock();
    this.addHover();
  }

  switchBlocksData(options) {
    Object.values(this.blocks).forEach((block) => {
      block.switchData(options);
    });
  }

  addHover() {
    console.log(Object.values(this.row.children));
    Object.values(this.row.children).forEach((e) => {
      Object.values(e.children).forEach((el) => {
        el.addEventListener('mouseover', () => {
          el.classList.add('hover');
        });
        el.addEventListener('mouseout', () => {
          el.classList.remove('hover');
        });
      });
    });
  }
}
