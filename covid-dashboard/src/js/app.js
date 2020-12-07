import GlobalDataBlock from "./global-data-block";

export default class App {
  constructor(globalData, byCountryData, countryTimeline) {
    this.globalData = globalData.data;
    
    this.byCountryData = byCountryData.data;
    this.countryTimeline = countryTimeline.data;
    this.population100k = 7700000000 / 100000;
    console.log(this.globalData)
    // period to show in blocks "total" || "lastDay"
    this.period = "total";

    // units to show in blocks "absolute" || "relative"
    this.unit = "absolute";

    this.globalDataBlock = new GlobalDataBlock(this.globalData, this.population100k);
    this.globalDataBlock.getCases(this.period, this.unit)
  }
}