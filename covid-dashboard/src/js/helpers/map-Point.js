export default class Point {
  constructor(country) {
    this.type = 'Feature';
    this.properties = {
      countryCode: country.code,
      cases: country.cases,
      deaths: country.deaths,
      recovered: country.recovered,
      newCases: country.newCases,
      newDeaths: country.newDeaths,
      newRecovered: country.newRecovered,
    };

    this.geometry = {
      type: 'Point',
      coordinates: country.coordinates,
    };
  }
}
