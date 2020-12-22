import CovidChart from '../covid-chart';
import covidData from '../helpers/covid-data-sample';
import 'jest-canvas-mock';

let covidChart;
beforeEach(() => {
  covidChart = new CovidChart(covidData);
});
describe('CovidChart', () => {
  it('Return object', () => {
    expect(covidChart).toBeInstanceOf(Object);
  });

  it('Display global cummulative cases chart as default', () => {
    const cases = covidData.WORLD.timeline.map((day) => day.cases);
    expect(covidChart.chart.data.datasets[0].data).toEqual(cases);
  });
});

describe('CovidChart.switchData()', () => {
  it('Switch to country cummulative cases chart if country code passed', () => {
    const cases = covidData.UZ.timeline.map((day) => day.cases);
    covidChart.switchData({ countryCode: 'UZ' });

    expect(covidChart.chart.data.datasets[0].data).toEqual(cases);

    covidChart.switchData({ countryCode: 'uz' });
    expect(covidChart.chart.data.datasets[0].data).toEqual(cases);
  });

  it('Switch to deaths chart if \'deaths\' data type passed', () => {
    const deaths = covidData.WORLD.timeline.map((day) => day.deaths);
    covidChart.switchData({ typeOfData: 'deaths' });

    expect(covidChart.chart.data.datasets[0].data).toEqual(deaths);
  });

  it('Switch to recovered chart if \'recovered\' data type passed', () => {
    const recovered = covidData.WORLD.timeline.map((day) => day.recovered);
    covidChart.switchData({ typeOfData: 'recovered' });

    expect(covidChart.chart.data.datasets[0].data).toEqual(recovered);
  });

  it('Switch to daily growth chart if \'last\' period type passed', () => {
    const newCases = covidData.WORLD.timeline.map((day) => day.newCases);
    covidChart.switchData({ period: 'last' });

    expect(covidChart.chart.data.datasets[0].data).toEqual(newCases);
  });

  it('Switch units to people per 100k if \'revative\' units type passed', () => {
    const cases = covidData.WORLD.timeline.map((day) => (day.cases
    / (covidData.WORLD.population / 100000)).toFixed(3));
    covidChart.switchData({ units: 'relative' });

    expect(covidChart.chart.data.datasets[0].data).toEqual(cases);
  });
});
