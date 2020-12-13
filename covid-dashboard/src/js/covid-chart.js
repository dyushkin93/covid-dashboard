import Chart from "chart.js";

export default class CovidChart {
  constructor(covidData) {
    this.chartElem = document.querySelector("#covid-chart");
    this.ctx = this.chartElem.getContext("2d");
    this.covidData = covidData;

    this.countryToShow = this.covidData.world;
    this.typeOfData = "cases";
    this.units = "absolute";
    this.period = "last"

    this.timeline = [];
    this.dataToShow = [];

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
    this.update();
  }

  /**
   * @param {Object} param0
   * @param {String} param0.country
   * @param {("cases"|"deaths"|"recovered")} param0.typeOfData
   * @param {"absolute"|"relative"} param0.units
   */
  switchData({country, typeOfData, units, period}) {
    if (country) {
      const countryCode = country.toUpperCase();
      this.countryToShow = this.covidData[countryCode];
    }

    if (typeOfData) {
      this.typeOfData = typeOfData;
    }

    if (period) {
      this.period = period;
    }
 
    if (units) {
      this.units = units;
    }

    this.update();   
  }

  update() {
    this.timeline = [];
    this.dataToShow = [];

    this.countryToShow.timeline.forEach((day) => {
      this.timeline.push(day.date);

      let oneDayData = 0;

      if (this.period === "total") {
        oneDayData = day[this.typeOfData];
      } else if (this.period === "last") {
        const key = `new${this.typeOfData.charAt(0).toUpperCase() + this.typeOfData.slice(1)}`;
        oneDayData = day[key];
      }

      if (this.units === "relative") {
        oneDayData /= (this.countryToShow.population / 100000);
      }

      this.dataToShow.push(oneDayData);
    });

    console.log(this.dataToShow);

    this.chart.data.labels = this.timeline;
    this.chart.data.datasets.forEach((dataset) => {
        dataset.data = this.dataToShow;
    });
    this.chart.update();
  }
}