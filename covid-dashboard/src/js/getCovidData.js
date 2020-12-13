
// there is no data for countries below
const countriesExceptions = ["AX", "AS", "AI", "AQ", "AW", "BQ", "IO", "BM", "BV", "CC", "KY", "CK", "CW", "CX",
"FO", "TF", "PF", "FK", "GP", "GF", "GI", "GL", "VA", "GG", "GU", "IM", "HK", "HM", "JE", "KP", "YT", "MM", "NC",
"NU", "KI", "MO", "NF", "PW", "PR", "SJ", "MF", "VG", "TK", "TM", "VI", "MQ", "FM", "MS", "NR", "MP", "PN", "RE",
"SH", "SX", "TV", "GS", "UM", "PS", "BL", "PM", "TO", "TC", "WF", "EH"];

class Country {
  constructor(code, name, population, coorditanes) {
    this.code = code;
    this.name = name;
    this.population = population;
    this.coorditanes = coorditanes;
    this.timeline = [];
  }

  /**
   * @param {Object} obj - timeline
   * @param {Object} obj.cases
   * @param {Object} obj.deaths
   * @param {Object} obj.recovered
   *  
   */
  async setTimeline() {
    const obj = await this.getTimelineFromAPI();
    if (obj) {
      for (const key in obj.cases) {
        if (obj.cases.hasOwnProperty(key)) {
          const day = {
            date: new Date(key),
            cases: obj.cases[key],
            deaths: obj.deaths[key],
            recovered: obj.recovered[key]
          }
          this.timeline.push(day);
        }
      }
      this.timeline.reverse();

      this.calculatePerDayData()

      this.cases = this.timeline[0].cases;
      this.deaths = this.timeline[0].deaths;
      this.recovered = this.timeline[0].recovered;
      this.newCases = this.timeline[0].newCases;
      this.newDeaths = this.timeline[0].newDeaths;
      this.newRecovered = this.timeline[0].newRecovered;
    }
  }
  

  async getTimelineFromAPI() {
    let countryTimeline;
    const countryUrl = `https://disease.sh/v3/covid-19/historical/${this.code}?lastdays=all`;
    const countryRes = await fetch(countryUrl);
    if (countryRes.status >= 200 && countryRes.status < 300) {
      countryTimeline = await countryRes.json();
      if (this.code !== "all") {
        countryTimeline = countryTimeline.timeline;
      }
    }
    return countryTimeline;
  }

  calculatePerDayData() {
    this.timeline.forEach((day, i, arr) => {
      if (i < this.timeline.length - 1) {
        day.newCases = day.cases - arr[i + 1].cases;
        day.newDeaths = day.deaths - arr[i + 1].deaths;
        day.newRecovered = day.recovered - arr[i + 1].recovered;
      } else {
        day.newCases = day.cases;
        day.newDeaths = day.deaths;
        day.newRecovered = day.recovered;
      }
    })
  }
}

/**
 * @returns {Object}
 */
export default async function getCovidData() {
  const countriesListUrl = 'https://corona-api.com/countries';
  const countriesListRes = await fetch(countriesListUrl);
  /**
   * @typedef {Array} countriesList - array of countries
   * @property {String} data[].code- country code
   * @property {Object} data[].coorditanes - country coordinates
   * @property {String} data[].name- country name
   * @property {String} data[].population - country population
   */
  let countriesList = await countriesListRes.json();
  countriesList = countriesList.data;

  const covidData = {
    world: new Country("all", "world", 7700000000, null)
  }

  await covidData.world.setTimeline();

  for (let i = 0; i < countriesList.length; i++) {
    const country = countriesList[i];
    if (!countriesExceptions.includes(country.code)) {
      covidData[country.code] = new Country(
        country.code,
        country.name,
        country.population,
        country.coordinates
      )
  
      await covidData[country.code].setTimeline();
    }
  }

  return covidData
}