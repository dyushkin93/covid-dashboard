import GlobalDataBlock from '../global-data-block';
import covidData from '../helpers/covid-data-sample';

const globalDataBlock = new GlobalDataBlock(covidData);

describe('GlobalDataBlock', () => {
  it('Return object', () => {
    expect(new GlobalDataBlock(covidData)).toBeInstanceOf(Object);
  });

  it('Display global data by default', () => {
    expect(globalDataBlock.casesElem.innerHTML).toEqual(new Intl.NumberFormat('ru-RU').format(covidData.WORLD.cases));
    expect(globalDataBlock.deathsElem.innerHTML).toEqual(new Intl.NumberFormat('ru-RU').format(covidData.WORLD.deaths));
    expect(globalDataBlock.recoveredElem.innerHTML).toEqual(new Intl.NumberFormat('ru-RU').format(covidData.WORLD.recovered));
  });
});

describe('GlobalDataBlock.switchData()', () => {
  it('Switch data to another country if it passed', () => {
    globalDataBlock.switchData({ countryCode: 'UZ' });
    expect([
      globalDataBlock.casesElem.innerHTML,
      globalDataBlock.deathsElem.innerHTML,
      globalDataBlock.recoveredElem.innerHTML,
    ]).toEqual([
      new Intl.NumberFormat('ru-RU').format(covidData.UZ.cases),
      new Intl.NumberFormat('ru-RU').format(covidData.UZ.deaths),
      new Intl.NumberFormat('ru-RU').format(covidData.UZ.recovered),
    ]);

    globalDataBlock.switchData({ countryCode: 'uz' });
    expect([
      globalDataBlock.casesElem.innerHTML,
      globalDataBlock.deathsElem.innerHTML,
      globalDataBlock.recoveredElem.innerHTML,
    ]).toEqual([
      new Intl.NumberFormat('ru-RU').format(covidData.UZ.cases),
      new Intl.NumberFormat('ru-RU').format(covidData.UZ.deaths),
      new Intl.NumberFormat('ru-RU').format(covidData.UZ.recovered),
    ]);
  });

  it('Switch data to last day if it passed', () => {
    globalDataBlock.switchData({ period: 'last' });
    expect([
      globalDataBlock.casesElem.innerHTML,
      globalDataBlock.deathsElem.innerHTML,
      globalDataBlock.recoveredElem.innerHTML,
    ]).toEqual([
      new Intl.NumberFormat('ru-RU').format(covidData.UZ.newCases),
      new Intl.NumberFormat('ru-RU').format(covidData.UZ.newDeaths),
      new Intl.NumberFormat('ru-RU').format(covidData.UZ.newRecovered),
    ]);
  });

  it('Switch data units to people per 100k if it passed', () => {
    globalDataBlock.switchData({ units: 'relative' });
    expect([
      globalDataBlock.casesElem.innerHTML,
      globalDataBlock.deathsElem.innerHTML,
      globalDataBlock.recoveredElem.innerHTML,
    ]).toEqual([
      new Intl.NumberFormat('ru-RU').format(covidData.UZ.newCases / (covidData.UZ.population / 100000)),
      new Intl.NumberFormat('ru-RU').format(covidData.UZ.newDeaths / (covidData.UZ.population / 100000)),
      new Intl.NumberFormat('ru-RU').format(covidData.UZ.newRecovered / (covidData.UZ.population / 100000)),
    ]);
  });
});
