import CasesByCountry from '../cases-by-contry';
import covidData from '../helpers/covid-data-sample';

const casesByCountry = new CasesByCountry(covidData);

describe('CasesByCountry', () => {
  it('Should return object', () => {
    expect(casesByCountry).toBeInstanceOf(Object);
  });

  it('Should return UZ data', () => {
    if (casesByCountry.search.value === 'uzbekistan') {
      expect([
        casesByCountry.country.innerText,
        casesByCountry.countryCases.innerText,
      ]).toEqual([
        covidData.UZ.name, covidData.UZ.cases,
      ]);
    }
  });

  it('Should change type of cases', () => {
    casesByCountry.switchData({ typeOfData: 'deaths' });
    expect(+casesByCountry.countryCases.innerHTML).toEqual(covidData.UZ.deaths);

    casesByCountry.switchData({ typeOfData: 'recovered' });
    expect(+casesByCountry.countryCases.innerHTML).toEqual(covidData.UZ.recovered);
  });

  it('Switch data units to people per 100k if it passed', () => {
    casesByCountry.switchData({ countryCode: 'uz', units: 'relative', typeOfData: 'cases' });
    expect(+casesByCountry.countryCases.innerHTML)
      .toEqual(Math.round(covidData.UZ.cases / (covidData.UZ.population / 100000), -2));
  });
});
