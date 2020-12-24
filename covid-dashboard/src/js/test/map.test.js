import CovidMap from '../map';
import covidData from '../helpers/covid-data-sample';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}));

let covidMap;
beforeEach(() => {
  covidMap = new CovidMap(covidData);
});
describe('CovidChart', () => {
  it('Return object', () => {
    expect(covidMap).toBeInstanceOf(Object);
  });

  it('Build geoJSON points with properties about COVID data', () => {
    Object.values(covidData).filter((country) => country.code !== 'all')
      .forEach((country, i) => {
        expect(covidMap.points.features[i].properties.countryCode).toEqual(country.code);
        expect(covidMap.points.features[i].properties.cases).toEqual(country.cases);
        expect(covidMap.points.features[i].properties.deaths).toEqual(country.deaths);
        expect(covidMap.points.features[i].properties.recovered).toEqual(country.recovered);
        expect(covidMap.points.features[i].properties.newCases).toEqual(country.newCases);
        expect(covidMap.points.features[i].properties.newDeaths).toEqual(country.newDeaths);
        expect(covidMap.points.features[i].properties.newRecovered).toEqual(country.newRecovered);
        expect(covidMap.points.features[i].geometry.coordinates).toEqual(country.coordinates);
      });
  });
});
