import mapboxgl from "mapbox-gl";
import Point from "./helpers/map-Point";
mapboxgl.accessToken = 'pk.eyJ1IjoiZHl1c2hraW45MyIsImEiOiJja2loeDVjdXAwYjhlMzBwYmdhaWhwNnc2In0.nu3gIVzrRiwm1qqK6EGmEA';

export default class CovidMap {
  constructor(covidData) {
    this.covidData = covidData;
    this.typeOfData = "cases";
    this.units = "absolute";
    this.period = "total";

    this.colors = {
      cases: "#FF0000",
      deaths: "#0000FF",
      recovered: "#00FF00",
    }

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/dyushkin93/ckihx7sv06zez19k0dnpdbkdx', // stylesheet location
      center: [30, 40], // starting position [lng, lat]
      zoom: 2, // starting zoom
      maxPitch: 0,
      dragRotate: 0
    });

    this.nav = new mapboxgl.NavigationControl({
      showZoom: true
    });

    this.map.addControl(this.nav, "bottom-right");

    this.points = {
      "type": "FeatureCollection",
      "features": []
    }

    for (const key in this.covidData) {
      if (this.covidData.hasOwnProperty(key) && key !== "world") {
        const country = this.covidData[key];
        this.points.features.push(new Point(country));
      }
    }

    this.map.on("load", () => {
      this.map.addLayer({
        id: "circles",
        type: "circle",
        source: {
          type: "geojson",
          data: this.points,
        },
        paint: {
          "circle-color": this.colors[this.typeOfData],
          "circle-opacity": .5,
          "circle-radius": {
            property: this.typeOfData,
            stops: [
              [100, 3],
              [1000000, 15],
              [5000000, 45],
              [20000000, 70]
            ]
          }
        }
      })
    })
  }
}