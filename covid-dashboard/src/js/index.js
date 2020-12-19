import 'normalize-css';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import '../scss/style.scss';
import App from './app';
import getCovidData from './getCovidData';

async function main() {
  // get all data from API
  const covidData = await getCovidData();

  // create app object
  const covidApp = new App(covidData);

  // show last data update date
  document.querySelector('#last-update').innerHTML = covidData.world.lastUpdate.toLocaleString('en-US');

  // handler of switchers
  document.querySelectorAll('.paginator .arrow').forEach((arrow) => {
    arrow.addEventListener('click', (e) => {
      const listedElems = [];
      const paginatorType = e.target.parentElement.dataset.param;
      const paginatorSelector = `[data-param=${paginatorType}] .paginator-container`;
      document.querySelectorAll(paginatorSelector).forEach((paginator) => {
        listedElems.push(Array.from(paginator.children));
      });

      const activeIndex = listedElems[0].findIndex((elem) => elem.classList.contains('active'));
      let newIndex = activeIndex;
      switch (e.target.id) {
        case 'chevron-right':
          newIndex += 1;
          break;
        case 'chevron-left':
          newIndex -= 1;
          break;
        default:
          break;
      }

      switch (newIndex) {
        case -1:
          newIndex = listedElems[0].length - 1;
          break;
        case listedElems[0].length:
          newIndex = 0;
          break;
        default:
          break;
      }

      listedElems.forEach((elem) => {
        elem[activeIndex].classList.remove('active');
        elem[newIndex].classList.add('active');
      });
      covidApp.switchBlocksData({
        [paginatorType]: listedElems[0][newIndex].dataset.value,
      });
    });
  });
}

// app init
main();
