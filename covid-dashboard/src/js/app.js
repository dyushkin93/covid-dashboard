import GlobalDataBlock from "./global-data-block";
import CovidChart from "./covid-chart";
import CovidMap from "./map";

export default class App {
  constructor(covidData) {
    this.covidData = covidData;
    // period to show in blocks "total" || "lastDay"
    this.period = "total";

    // units to show in blocks "absolute" || "relative"
    this.units = "absolute";

    // initialisation of GlobalData block
    this.globalDataBlock = new GlobalDataBlock(this.covidData);
    
    this.globalDataBlock.switchData({
      country: "uz"
    })
    
    // initialisation of Chart block
    this.chart = new CovidChart(this.covidData);
    
    // initialisation of Map
    this.map = new CovidMap(this.covidData);
    window.addEventListener("dblclick", e => {
      this.map.switchData({
        typeOfData: "deaths",
        period: "last",
        units: "relative",
      })
      console.log("switched");
    })
    

  }
}