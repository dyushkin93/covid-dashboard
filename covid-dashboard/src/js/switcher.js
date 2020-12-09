export default class TypesAndUnits {
  constructor() {
    this.cases = document.getElementById('cases');
    this.death = document.getElementById('death');
    this.recovered = document.getElementById('recovered');
    this.switcher = document.getElementById('switcher');
    this.mapSwitcher = document.getElementById('map-switcher');
    this.deskBoardSwitcher = document.getElementById('deskboard-switcher');
    this.units = document.getElementById('units');

    this.properties = {
      isCases: true,
      isDeath: false,
      isRecovered: false,
      isAbsolute: true,
      relative: false,
    };

    this.switcher.addEventListener('click', (e) => {
      if (e.target.id === this.cases.id) {
        this.properties.isCases = true;
        this.properties.isDeath = false;
        this.properties.isRecovered = false;
        console.log('cases');
        console.log(this.properties);
      }
      if (e.target.id === this.death.id) {
        this.properties.isCases = false;
        this.properties.isDeath = true;
        this.properties.isRecovered = false;
        console.log('death');
        console.log(this.properties);
      }
      if (e.target.id === this.recovered.id) {
        this.properties.isCases = false;
        this.properties.isDeath = false;
        this.properties.isRecovered = true;
        console.log('rec');
        console.log(this.properties);
      }
      this.getType();
    });

    this.mapSwitcher.addEventListener('click', (e) => {
      if (e.target.id === this.cases.id) {
        this.properties.isCases = true;
        this.properties.isDeath = false;
        this.properties.isRecovered = false;
        console.log('cases');
      }
      if (e.target.id === this.death.id) {
        this.properties.isCases = false;
        this.properties.isDeath = true;
        this.properties.isRecovered = false;
        console.log('death');
      }
      if (e.target.id === this.recovered.id) {
        this.properties.isCases = false;
        this.properties.isDeath = false;
        this.properties.isRecovered = true;
        console.log('rec');
      }
      this.getType();
    });

    this.deskBoardSwitcher.addEventListener('click', (e) => {
      if (e.target === this.units) {
        this.properties.relative = !this.properties.relative;
      }
    });
  }

  Type() {
    if (this.properties.isCases) {
      console.log('a');
      return 'cases';
    }
    if (this.properties.isDeath) {
      console.log('b');
      return 'death';
    }
    console.log('c');
    return 'recovered';
  }
}
