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

    this.mapElement = document.querySelector('#map');
    this.mapMarker = document.querySelector('#mapMarker');

    this.colors = {
      cases: '#FF0000',
      newCases: '#FF0000',
      deaths: '#0000FF',
      newDeaths: '#0000FF',
      recovered: '#00FF00',
      newRecovered: '#00FF00',
    };

    this.map = new mapboxgl.Map({
      container: 'map',
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
      source: 'points',
      paint: {
        'circle-color': this.colors[this.typeOfData],
        'circle-opacity': 0.5,
        'circle-radius': this.getCircleRadius,
      },
    };

    this.map.on('load', () => {
      this.map.addSource('points', {
        type: 'geojson',
        data: this.points,
      });

      this.map.addLayer(this.layer);

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
            this.tooltip.querySelector('.marker_value').innerHTML = new Intl.NumberFormat('ru-RU').format(this.covidData[code][this.typeOfData]);

            let typeOfDataToShow = this.typeOfData;
            if (typeOfDataToShow.slice(0, 3) === 'new') {
              typeOfDataToShow = typeOfDataToShow.slice(3);
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

  get getCircleRadius() {
    const maxValue = Math.max(...this.points.features
      .map((point) => point.properties[this.typeOfData]));
    const radius = {
      property: this.typeOfData,
      stops: [
        [0, 0],
        [1, 3],
        [maxValue * 0.005, 10],
        [maxValue * 0.05, 20],
        [maxValue * 0.2, 30],
        [maxValue, 55],
      ],
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

  update() {
    if (this.period === 'last') {
      this.typeOfData = `new${this.typeOfData.charAt(0).toUpperCase() + this.typeOfData.slice(1)}`;
    }

    this.points.features.forEach((point) => {
      const countryPoint = point;
      if (this.units === 'relative') {
        const population = this.covidData[point.properties.countryCode].population / 100000;
        Object.keys(this.properties).forEach((key) => {
          if (typeof this.properties[key] === 'number') {
            this.properties[key] = (this.properties[key] / population).toFixed(3);
          }
        });
      } else if (this.units === 'absolute') {
        const country = this.covidData[point.properties.countryCode];
        countryPoint.properties.cases = country.cases;
        countryPoint.properties.newCases = country.newCases;
        countryPoint.properties.deaths = country.deaths;
        countryPoint.properties.newDeath = country.newDeath;
        countryPoint.properties.recovered = country.recovered;
        countryPoint.properties.newRecovered = country.newRecovered;
      }
    });

    this.map.getSource('points').setData(this.points);
    this.map.setPaintProperty('circles', 'circle-radius', this.getCircleRadius);
    this.map.setPaintProperty('circles', 'circle-color', this.colors[this.typeOfData]);
  }
}
