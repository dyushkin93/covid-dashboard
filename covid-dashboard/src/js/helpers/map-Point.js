export default class Point {
  constructor(country) {
    this.type = "Feature";
    this.properties = {
      cases: country.cases,
      deaths: country.deaths,
      recovered: country.recovered,
      newCases: country.newaCses,
      newDeaths: country.newDeaths,
      neweRcovered: country.neweRcovered,
    }

    this.geometry = {
      type: "Point",
      coordinates: country.coordinates
    }
  }
}