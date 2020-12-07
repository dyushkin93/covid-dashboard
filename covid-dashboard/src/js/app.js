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
    console.log(this.byCountryTimeline)

    // initialisation of GlobalData block
    // this.globalDataBlock = new GlobalDataBlock(this.globalData, this.globalPopulation100k);
    // this.globalDataBlock.getCases(this.period, this.units)
    
    // initialisation of Chart block
    // this.chart = new CovidChart(this.globalData, this.globalPopulation100k)



  }
}