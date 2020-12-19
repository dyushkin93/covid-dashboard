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

const expandBlock = () => {
  casesExpand.addEventListener('click', () => {
    Object.values(row.children).forEach((e) => e.classList.toggle('hidden'));
    Object.values(casesBlock.children).forEach((e) => e.classList.toggle('hidden'));
    casesContainer.classList.remove('hidden');
    casesContainer.style.height = '100%';
    casesExpand.classList.remove('hidden');
    casesBlock.classList.toggle('hidden');
    casesBlock.classList.toggle('col-2');
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
    mapBlock.classList.toggle('col-7');
    mapBlock.classList.toggle('col');

    // map is scaling only if window resize
    const resize = new Event('resize');
    window.dispatchEvent(resize);
  });

  deskboardExpand.addEventListener('click', () => {
    Object.values(row.children).forEach((e) => e.classList.toggle('hidden'));
    Object.values(globalBlock.children).forEach((e) => e.classList.toggle('hidden'));
    deskboardContainer.classList.remove('hidden');
    deskboardContainer.style.height = '100%';
    deskboardExpand.classList.remove('hidden');
    globalBlock.classList.toggle('hidden');
    globalBlock.classList.toggle('col-3');
    globalBlock.classList.toggle('col');
  });

  chartExpand.addEventListener('click', () => {
    Object.values(row.children).forEach((e) => e.classList.toggle('hidden'));
    Object.values(globalBlock.children).forEach((e) => e.classList.toggle('hidden'));
    chartContainer.classList.remove('hidden');
    chartContainer.classList.toggle('expand');
    chartExpand.classList.remove('hidden');
    globalBlock.classList.toggle('hidden');
    globalBlock.classList.toggle('col-3');
    globalBlock.classList.toggle('col');
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
