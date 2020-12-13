import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = 'pk.eyJ1IjoiZHl1c2hraW45MyIsImEiOiJja2loeDVjdXAwYjhlMzBwYmdhaWhwNnc2In0.nu3gIVzrRiwm1qqK6EGmEA';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/dyushkin93/ckihx7sv06zez19k0dnpdbkdx', // stylesheet location
  center: [30, 40], // starting position [lng, lat]
  zoom: 2, // starting zoom
  maxPitch: 0,
  dragRotate: 0
});

const nav = new mapboxgl.NavigationControl({
  showZoom: true
})

map.addControl(nav, "bottom-right");