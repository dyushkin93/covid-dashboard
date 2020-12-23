const row = document.querySelector('.row');

const casesBlock = document.getElementById('cases-block');
const casesExpand = document.querySelector('.cases-expand');
const casesContainer = document.querySelector('.cases-container');

const mapBlock = document.getElementById('map-block');
const mapContainer = document.querySelector('.map-container');
const mapExpand = document.querySelector('.map-expand');
const mapSwitcher = document.querySelector('.map-expand');

const globalBlock = document.getElementById('global');
const deskboardContainer = document.querySelector('.deskboard');
const deskboardExpand = document.querySelector('.global-expand');

const chartContainer = document.querySelector('.graph');
const chartExpand = document.querySelector('.chart-expand');
const chartWrapper = document.querySelector('.chart-wrapper');

const expandBlock = () => {
  casesExpand.addEventListener('click', () => {
    Object.values(row.children).forEach((e) => e.classList.toggle('hidden'));
    Object.values(casesBlock.children).forEach((e) => e.classList.toggle('hidden'));
    casesContainer.classList.remove('hidden');
    casesContainer.style.height = '100%';
    casesExpand.classList.remove('hidden');
    casesBlock.classList.toggle('hidden');
    casesBlock.classList.toggle('col-xl-2');
    casesBlock.classList.toggle('col-lg-3');
    casesBlock.classList.toggle('col-sm-6');
    casesBlock.classList.toggle('order-xl-first');
    casesBlock.classList.toggle('col-6');
    casesBlock.classList.toggle('order-lg-first');
    casesBlock.classList.toggle('col');
  });

  mapExpand.addEventListener('click', () => {
    Object.values(row.children).forEach((e) => e.classList.toggle('hidden'));
    Object.values(mapBlock.children).forEach((e) => e.classList.toggle('hidden'));
    mapContainer.classList.remove('hidden');
    mapSwitcher.classList.remove('hidden');
    mapContainer.style.height = '100%';
    mapExpand.classList.remove('hidden');
    mapBlock.classList.toggle('hidden');
    mapBlock.classList.toggle('col-xl-7');
    mapBlock.classList.toggle('col-lg-6');
    mapBlock.classList.toggle('col-sm-12');
    mapBlock.classList.toggle('col-12');
    mapBlock.classList.toggle('order-sm-first');
    mapBlock.classList.toggle('order-first');
    mapBlock.classList.toggle('col');

    // map is scaling only if window resize
    const resize = new Event('resize');
    window.dispatchEvent(resize);
  });

  deskboardExpand.addEventListener('click', () => {
    Object.values(row.children).forEach((e) => e.classList.toggle('hidden'));
    Object.values(globalBlock.children).forEach((e) => e.classList.toggle('hidden'));
    deskboardContainer.classList.remove('hidden');
    deskboardExpand.classList.remove('hidden');
    globalBlock.classList.toggle('hidden');
    globalBlock.classList.toggle('col-xl-3');
    globalBlock.classList.toggle('col-lg-3');
    globalBlock.classList.toggle('col-sm-6');
    globalBlock.classList.toggle('col-6');
    globalBlock.classList.toggle('col');
    deskboardContainer.classList.toggle('expand');
  });

  chartExpand.addEventListener('click', () => {
    Object.values(row.children).forEach((e) => e.classList.toggle('hidden'));
    Object.values(globalBlock.children).forEach((e) => e.classList.toggle('hidden'));
    chartContainer.classList.remove('hidden');
    chartContainer.classList.toggle('expand');
    chartExpand.classList.remove('hidden');
    globalBlock.classList.toggle('hidden');
    globalBlock.classList.toggle('col-xl-3');
    globalBlock.classList.toggle('col-lg-3');
    globalBlock.classList.toggle('col-sm-6');
    globalBlock.classList.toggle('col-6');
    globalBlock.classList.toggle('col');
    chartWrapper.classList.toggle('expand');
  });

  document.querySelectorAll('#size-btn').forEach((e) => {
    e.parentElement.addEventListener('mouseover', () => {
      e.classList.remove('hidden');
    });
    e.parentElement.addEventListener('mouseout', () => {
      e.classList.add('hidden');
    });
  });
};

export default expandBlock;
