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

    // units to show in byCountryCases block

    // initialisation of CasesByCountry block
    this.casesByCountry = new CasesByCountry(covidData).updateBlock();

    // initialisation of GlobalData block
    this.globalDataBlock = new GlobalDataBlock(this.covidData);

    // initialisation of Chart block
    this.chart = new CovidChart(this.covidData);

    // initialisation of Map
    this.map = new CovidMap(this.covidData);

    expandBlock();

    this.row = document.querySelector('.row');
    this.cases = document.getElementById('cases-block');
    this.sizeBtn = document.getElementById('size-btn');
    this.cases.addEventListener('mouseover', () => {
      this.sizeBtn.classList.remove('hidden');
    });
    this.cases.addEventListener('mouseout', () => {
      this.sizeBtn.classList.add('hidden');
    });

    this.list = Object.values(this.row.children);
    this.list.forEach((e) => {
      e.addEventListener('mouseover', () => e.children[0].classList.remove('hidden'));
      e.addEventListener('mouseout', () => e.children[0].classList.add('hidden'));
    });
    console.log(this.list[0].children.filter);
  }
}
