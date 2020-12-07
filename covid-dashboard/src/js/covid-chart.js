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
    this.death = [];
    this.recovered = [];

    array.forEach(elem => {
      this.timeline.push(elem.date);
      this.cases.push(elem.new_confirmed);
      this.deaths.push(elem.new_deaths);
      this.recovered.push(elem.new_recovered);
    })
  }

  setNewData({covidData, typeOfData, units}) {
    if (dataArray) {
      this.dataArray = covidData.data.timeline;
      this.population = covidData.data.population;
    }
    
    if (typeOfData) {
      this.typeOfData = typeOfData;
    }

    if (units === "absolute") {
      this.dataToShow = this.dataToShow.map(elem => {
        return parseInt((elem / this.population), 10);
      })
    }

    this.init();
  }

  init() {
    this.options.data.labels = this.timeline;
    this.options.data.datasets.data = this.dataToShow;
    this.chart = new Chart(this.ctx, this.options);
  }

}