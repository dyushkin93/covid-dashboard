import Chart from "chart.js";

export default class CovidChart {
  constructor(covidData, population) {
    this.chartElem = document.querySelector("#covid-chart");
    this.ctx = this.chartElem.getContext("2d");

    this.timeline = [];
    this.cases = [];
    this.deaths = [];
    this.recovered = [];

    this.dataArray = covidData;
    this.globalPopulation = population;
    this.countryPopulation = this.globalPopulation;

    this.typeOfData = "cases";
    this.units = "absolute";

    this.dataToShow = this.cases;

    this.options = {
      type: "bar",
      data: {
        labels: this.timeline,
        datasets: [{
            label: "",
            data: this.dataToShow,
            barPercentage: 1,
            backgroundColor: "red",
            borderColor: "red"
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            type: "time",
            time: {
              unit: "quarter",
              round: "day",
              displayFormats: {
                quarter: "MMM"
              }
            }
          }],
          yAxes: [{
            ticks: {
                beginAtZero: true,
                callback: function(value, index, values) {
                  let res = value;
                  if (value > 1000 && value < 1000000) {
                    res = value / 1000;
                    res = `${res}k`;
                  } else if (value >= 1000000) {
                    res = value / 1000000;
                    res = `${res}M`;
                  }
                  return res;
              }
            }
          }]
        },
        legend: {
          display: false,
        }
      }
    }

    this.chart = new Chart(this.ctx, this.options);
  }

  set dataArray(array) {
    this.timeline = [];
    this.cases = [];
    this.deaths = [];
    this.recovered = [];

    array.forEach(elem => {
      this.timeline.push(elem.date);
      this.cases.push(elem.new_confirmed);
      this.deaths.push(elem.new_deaths);
      this.recovered.push(elem.new_recovered);
    })
  }

  /**
   * @param {Object} param0
   * @param {Array} param0.covidData
   * @param {("cases"|"deaths"|"recovered")} param0.typeOfData
   * @param {"absolute"|"relative"} param0.units
   */
  setNewData({covidData, typeOfData, units}) {
    console.log(this.chart)
    if (covidData) {
      if (covidData.data) {
        this.covidData = covidData.data.timeline[0];
        this.countryPopulation = covidData.data.population / 100000;
      } else {
        this.covidData = covidData[0];
        this.countryPopulation = this.globalPopulation;
      }
    }
    
    if (typeOfData) {
      this.typeOfData = typeOfData;
    }
    this.dataToShow = this[this.typeOfData];

    if (units) {
      this.units = units;
    }

    if (this.units === "relative") {
      this.dataToShow = this.dataToShow.map(elem => {
        return ((elem / this.countryPopulation).toFixed(2));
      })
    } else if (this.units === "absolute") {
      this.dataToShow = this[this.typeOfData];
    }

    this.chart.data.labels = this.timeline;
    this.chart.data.datasets.forEach((dataset) => {
        dataset.data = this.dataToShow;
    });
    this.chart.update();
  }
}