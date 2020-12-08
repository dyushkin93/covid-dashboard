import GlobalDataBlock from "./global-data-block";
import CovidChart from "./covid-chart";

export default class App {
  constructor(globalData, byCountryData, byCountryTimeline) {
    this.globalData = globalData.data;
    
    this.byCountryData = byCountryData.data;

    this.byCountryTimeline = byCountryTimeline;
    
    this.globalPopulation100k = 7700000000 / 100000;
    // period to show in blocks "total" || "lastDay"
    this.period = "total";

    // units to show in blocks "absolute" || "relative"
    this.units = "absolute";

    // initialisation of GlobalData block
    this.globalDataBlock = new GlobalDataBlock(this.globalData[0], this.globalPopulation100k);
    
    // initialisation of Chart block
    this.chart = new CovidChart(this.globalData, this.globalPopulation100k);
    
    /* sample to call this method
    this.chart.setNewData({
      covidData: this.byCountryTimeline[178],
      typeOfData: "deaths",
      units: "relative"
    })*/

  }
}