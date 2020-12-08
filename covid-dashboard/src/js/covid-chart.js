import Chart from "chart.js";

export default class CovidChart {
  constructor(covidData, population) {
    this.chartElem = document.createElement("canvas");
    this.chartElem.setAttribute("width", 400);
    this.chartElem.setAttribute("height", 400);
    this.ctx = this.chartElem.getContext("2d");

    this.timeline = [];
    this.cases = [];
    this.deaths = [];
    this.recovered = [];

    this.dataArray = covidData;
    this.population = population

    this.dataToShow = this.cases;

    document.body.append(this.chartElem);

    this.options = {
      type: 'bar',
      data: {
        labels: this.timeline,
        datasets: [{
            label: "",
            data: this.dataToShow,
            borderWidth: 1,
            barPercentage: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: "time",
            time: {
              unit: 'quarter',
              round: 'day',
              displayFormats: {
                quarter: 'MMM'
              }
            }
          }],
          yAxes: [{
            ticks: {
                beginAtZero: true
            }
          }]
        },
        legend: {
          display: false,
        }
      }
    }
  }

  set dataArray(array) {
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
   * 
   * @param {Object} param0
   * @param {Array} param0.covidData
   * @param {string} param0.typeOfData
   * @param {string} param0.units
   */
  setNewData({covidData, typeOfData, units}) {
    if (covidData) {
      this.dataArray = covidData.data.timeline;
      this.population = covidData.data.population;
    }
    
    if (typeOfData) {
      this.typeOfData = typeOfData;
      this.dataToShow = this[this.typeOfData];
    }

    if (units === "relative") {
      this.dataToShow = this.dataToShow.map(elem => {
        return ((elem / this.population).toFixed(2));
      })
    } else if (units === "absolute") {
      this.dataToShow = this[this.typeOfData];
    }

    this.chart.data.labels = this.timeline;
    this.chart.data.datasets.forEach((dataset) => {
        dataset.data = this.dataToShow;
    });
    this.chart.update();
  }

  init() {
    this.options.data.labels = this.timeline;
    this.options.data.datasets.data = this.dataToShow;
    this.chart = new Chart(this.ctx, this.options);
    console.log(this.chart.data)

  }

}