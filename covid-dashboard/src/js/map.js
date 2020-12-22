import mapboxgl from 'mapbox-gl';
import Point from './helpers/map-Point';

mapboxgl.accessToken = 'pk.eyJ1IjoiZHl1c2hraW45MyIsImEiOiJja2loeDVjdXAwYjhlMzBwYmdhaWhwNnc2In0.nu3gIVzrRiwm1qqK6EGmEA';

export default class CovidMap {
  constructor(covidData) {
    this.covidData = covidData;
    this.typeOfData = 'cases';
    this.units = 'absolute';
    this.period = 'total';
    this.tooltipTimeout = undefined;
    this.tooltip = document.createElement('div');

    this.mapElement = document.querySelector('#map') || document.createElement('div');
    this.mapMarker = document.querySelector('#mapMarker');
    this.colors = {
      cases: '#8b0000',
      newCases: '#8b0000',
      deaths: '#ffffff',
      newDeaths: '#ffffff',
      recovered: '#006400',
      newRecovered: '#006400',
    };

    this.map = new mapboxgl.Map({
      container: this.mapElement,
      style: 'mapbox://styles/dyushkin93/ckihx7sv06zez19k0dnpdbkdx', // stylesheet location
      center: [30, 40], // starting position [lng, lat]
      zoom: 2, // starting zoom
      maxPitch: 0,
      dragRotate: 0,
    });

    this.nav = new mapboxgl.NavigationControl({
      showZoom: true,
    });

    this.map.addControl(this.nav, 'bottom-right');

    this.points = {
      type: 'FeatureCollection',
      features: [],
    };

    Object.values(this.covidData).forEach((country) => {
      if (country.code !== 'all') {
        this.points.features.push(new Point(country));
      }
    });

    this.layer = {
      id: 'circles',
      type: 'circle',
      source: 'circles',
      paint: {
        'circle-color': this.colors[this.typeOfData],
        'circle-opacity': 0.5,
        'circle-radius': this.getCircleRadius,
      },
    };

    this.map.on('load', () => {
      this.map.addSource('circles', {
        type: 'geojson',
        data: this.points,
      });

      this.map.addLayer(this.layer);

      this.addLegend();

      this.map.on('mousemove', this.showTooltip);

      this.map.on('mouseout', () => {
        clearTimeout(this.tooltipTimeout);
      });

      this.map.on('mousedown', () => {
        clearTimeout(this.tooltipTimeout);
        setTimeout(() => {
          this.tooltip.remove();
          this.tooltip.innerHTML = '';
        }, 400);
      });
    });

    this.showTooltip = (e) => {
      clearTimeout(this.tooltipTimeout);
      setTimeout(() => {
        this.tooltip.remove();
        this.tooltip.innerHTML = '';
      }, 400);
      this.tooltipTimeout = setTimeout(async () => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/
        ${e.lngLat.lng},${e.lngLat.lat}.json?types=country&access_token=${mapboxgl.accessToken}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.features.length > 0) {
          this.tooltip.append(this.mapMarker.content.cloneNode(true));
          const markerElem = this.tooltip.querySelector('.marker');
          this.tooltip.querySelector('.marker_country-name').innerHTML = data.features[0].text;
          markerElem.style.right = `${this.mapElement.clientWidth - e.point.x}px`;
          markerElem.style.bottom = `${this.mapElement.clientHeight - e.point.y + 16}px`;

          const code = data.features[0].properties.short_code.toUpperCase();

          if (this.covidData[code]) {
            let markerValue = 0;
            this.points.features.forEach((point) => {
              if (point.properties.countryCode === code) {
                markerValue = point.properties[this.typeOfData];
              }
            });
            this.tooltip.querySelector('.marker_value').innerHTML = new Intl.NumberFormat('ru-RU').format(markerValue);

            let typeOfDataToShow = this.typeOfData;
            if (typeOfDataToShow.slice(0, 3) === 'new') {
              typeOfDataToShow = typeOfDataToShow.slice(3);
            }
            if (this.period === 'last') {
              typeOfDataToShow = `New ${typeOfDataToShow}`;
            }
            this.tooltip.querySelector('.marker_cases').innerHTML = typeOfDataToShow;

            let unitsToShow = this.units;
            if (unitsToShow === 'absolute') {
              unitsToShow = 'people';
            } else if (unitsToShow === 'relative') {
              unitsToShow = 'per 100k people';
            }
            this.tooltip.querySelector('.marker_units').innerHTML = unitsToShow;
          } else {
            this.tooltip.querySelector('.marker_cases').innerHTML = 'no data';
          }

          this.mapElement.append(this.tooltip);
        }
      }, 500);
    };
  }

  addLegend() {
    this.mapElement.append(document.querySelector('#map-legend').content);

    const header = this.mapElement.querySelector('.legend-type-of-data');
    if (this.period === 'total') {
      header.innerHTML = this.typeOfData;
    } else {
      header.innerHTML = `New ${this.typeOfData.slice(3)}`;
    }

    const units = this.mapElement.querySelectorAll('.legend-units');
    units.forEach((elem) => {
      const unitsElem = elem;
      if (this.units === 'absolute') {
        unitsElem.innerHTML = 'people';
      } else if (this.units === 'relative') {
        unitsElem.innerHTML = 'per 100k people';
      }
    });
    const radius = this.getCircleRadius;

    const listElements = Array.from(this.mapElement.querySelectorAll('.legend-list-item'));
    radius.stops.forEach(([value, size], i) => {
      const marker = listElements[i].querySelector('.legend-marker');
      marker.style.width = `${size * 2}px`;
      marker.style.height = `${size * 2}px`;
      marker.style.backgroundColor = this.colors[this.typeOfData];

      const valueElem = listElements[i].querySelector('.legend-value');
      valueElem.innerHTML = new Intl.NumberFormat('ru-RU').format(value);
    });
  }

  get getCircleRadius() {
    const maxValue = Math.max(...this.points.features
      .map((point) => point.properties[this.typeOfData]));

    let stops = [];
    if (maxValue >= 10000000) {
      stops = [
        [1000, 5],
        [100000, 10],
        [1000000, 20],
        [5000000, 30],
        [10000000, 55],
      ];
    } else if (maxValue >= 1000000) {
      stops = [
        [100, 5],
        [10000, 10],
        [100000, 20],
        [1000000, 30],
        [5000000, 55],
      ];
    } else if (maxValue >= 100000) {
      stops = [
        [10, 5],
        [1000, 10],
        [10000, 20],
        [50000, 30],
        [100000, 40],
      ];
    } else if (maxValue >= 10000) {
      stops = [
        [1, 3],
        [100, 5],
        [1000, 10],
        [5000, 20],
        [10000, 30],
      ];
    } else if (maxValue >= 5000) {
      stops = [
        [1, 2],
        [50, 5],
        [100, 10],
        [1000, 15],
        [5000, 20],
      ];
    } else {
      stops = [
        [0.01, 1],
        [0.1, 5],
        [1, 10],
        [100, 15],
        [1000, 20],
      ];
    }

    const radius = {
      property: this.typeOfData,
      stops,
    };
    return radius;
  }

  switchData({ typeOfData, period, units }) {
    if (typeOfData) {
      this.typeOfData = typeOfData;
    }

    if (period) {
      this.period = period;
    }

    if (units) {
      this.units = units;
    }

    this.update();
  }

  focusOnCountry(country) {
    let zoom;
    let coordinates;
    if (country === 'WORLD') {
      zoom = 2;
      coordinates = [30, 40];
    } else {
      zoom = 5;
      coordinates = this.points.features
        .find((point) => point.properties.countryCode === country)
        .geometry.coordinates;
    }
    this.map.flyTo({
      center: coordinates,
      zoom,
      speed: 1.2,
    });
  }

  update() {
    if (this.period === 'last') {
      if (this.typeOfData.slice(0, 3) !== 'new') {
        this.typeOfData = `new${this.typeOfData.charAt(0).toUpperCase() + this.typeOfData.slice(1)}`;
      }
    } else if (this.period === 'total') {
      if (this.typeOfData.slice(0, 3) === 'new') {
        this.typeOfData = this.typeOfData.slice(3);
        this.typeOfData = this.typeOfData.charAt(0).toLowerCase() + this.typeOfData.slice(1);
      }
    }

    this.points.features.forEach((point) => {
      const countryPoint = point;
      const country = this.covidData[point.properties.countryCode];
      if (this.units === 'relative') {
        const population = this.covidData[point.properties.countryCode].population / 100000;
        Object.keys(countryPoint.properties).forEach((key) => {
          if (typeof countryPoint.properties[key] === 'number') {
            countryPoint.properties[key] = parseFloat((country[key]
                / population).toFixed(3));
          }
        });
      } else if (this.units === 'absolute') {
        countryPoint.properties.cases = country.cases;
        countryPoint.properties.newCases = country.newCases;
        countryPoint.properties.deaths = country.deaths;
        countryPoint.properties.newDeaths = country.newDeaths;
        countryPoint.properties.recovered = country.recovered;
        countryPoint.properties.newRecovered = country.newRecovered;
      }
    });

    this.addLegend();
    this.map.getSource('circles').setData(this.points);
    this.map.setPaintProperty('circles', 'circle-radius', this.getCircleRadius);
    this.map.setPaintProperty('circles', 'circle-color', this.colors[this.typeOfData]);
  }
}
