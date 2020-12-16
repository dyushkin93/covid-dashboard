import Chart from 'chart.js';

export default class CovidChart {
  constructor(covidData) {
    this.chartElem = document.querySelector('#covid-chart');
    this.ctx = this.chartElem.getContext('2d');
    this.covidData = covidData;

    this.countryToShow = this.covidData.world;
    this.typeOfData = 'cases';
    this.units = 'absolute';
    this.period = 'total';

    this.timeline = [];
    this.dataToShow = [];

    this.axesOptions = {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'quarter',
          round: 'day',
          displayFormats: {
            quarter: 'MMM',
          },
        },
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback(value) {
            let res = value;
            if (value > 1000 && value < 1000000) {
              res = value / 1000;
              res = `${res}k`;
            } else if (value >= 1000000) {
              res = value / 1000000;
              res = `${res}M`;
            }
            return res;
          },
        },
      }],
    };

    this.lastOptions = {
      type: 'bar',
      data: {
        labels: this.timeline,
        datasets: [{
          label: '',
          data: this.dataToShow,
          barPercentage: 3,
          backgroundColor: 'red',
          borderColor: 'red',
        }],
      },
      options: {
        maintainAspectRatio: false,
        scales: this.axesOptions,
        legend: {
          display: false,
        },
        tooltips: {
          displayColors: false,
          callbacks: {
            label(tooltipItem) {
              return Intl.NumberFormat('ru-RU').format(tooltipItem.yLabel.toFixed(3));
            },
            title(tooltipItem) {
              return new Date(tooltipItem[0].xLabel).toDateString('en-US');
            },
          },
        },
      },
    };

    this.totalOptions = {
      type: 'line',
      data: {
        labels: this.timeline,
        datasets: [{
          label: '',
          data: this.dataToShow,
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, .2)',
          pointRadius: 0,
          pointHitRadius: 3,
        }],
      },
      options: {
        maintainAspectRatio: false,
        scales: this.axesOptions,
        legend: {
          display: false,
        },
        tooltips: {
          displayColors: false,
          callbacks: {
            label(tooltipItem) {
              return Intl.NumberFormat('ru-RU').format(tooltipItem.yLabel.toFixed(3));
            },
            title(tooltipItem) {
              return new Date(tooltipItem[0].xLabel).toDateString('en-US');
            },
          },
        },
      },
    };

    this.optionsToRender = this.totalOptions;

    this.chart = new Chart(this.ctx, this.optionsToRender);
    this.update();
  }

  /**
   * @param {Object} param0
   * @param {String} param0.country
   * @param {("cases"|"deaths"|"recovered")} param0.typeOfData
   * @param {"absolute"|"relative"} param0.units
   */
  switchData({
    country, typeOfData, units, period,
  }) {
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

      if (this.period === 'total') {
        oneDayData = day[this.typeOfData];
      } else if (this.period === 'last') {
        const key = `new${this.typeOfData.charAt(0).toUpperCase() + this.typeOfData.slice(1)}`;
        oneDayData = day[key];
      }

      if (this.units === 'relative') {
        oneDayData /= (this.countryToShow.population / 100000);
        oneDayData = oneDayData.toFixed(3);
      }

      this.dataToShow.push(oneDayData);
    });

    this.chart.destroy();

    if (this.period === 'total') {
      this.optionsToRender = this.totalOptions;
    } else if (this.period === 'last') {
      this.optionsToRender = this.lastOptions;
    }
    this.optionsToRender.data.labels = this.timeline;
    this.optionsToRender.data.datasets[0].data = this.dataToShow;

    this.chart = new Chart(this.ctx, this.optionsToRender);
  }
}
