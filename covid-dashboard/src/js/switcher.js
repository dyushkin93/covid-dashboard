// const cases = document.getElementById('cases');
// const death = document.getElementById('death');
// const recovered = document.getElementById('recovered');
// const switcher = document.getElementById('switcher');
// const mapSwitcher = document.getElementById('map-switcher');
// const deskBoardSwitcher = document.getElementById('deskboard-switcher');
// const units = document.getElementById('units');

// const properties = {
//   isCases: true,
//   isDeath: false,
//   isRecovered: false,
//   isAbsolute: true,
//   relative: false,
// };

// switcher.addEventListener('click', (e) => {
//   if (e.target.id === cases.id) {
//     properties.isCases = true;
//     properties.isDeath = false;
//     properties.isRecovered = false;
//     console.log('cases');
//     console.log(properties);
//   }
//   if (e.target.id === death.id) {
//     properties.isCases = false;
//     properties.isDeath = true;
//     properties.isRecovered = false;
//     console.log('death');
//     console.log(properties);
//   }
//   if (e.target.id === recovered.id) {
//     properties.isCases = false;
//     properties.isDeath = false;
//     properties.isRecovered = true;
//     console.log('rec');
//     console.log(properties);
//   }
// });

// mapSwitcher.addEventListener('click', (e) => {
//   if (e.target.id === cases.id) {
//     properties.isCases = true;
//     properties.isDeath = false;
//     properties.isRecovered = false;
//     console.log('cases');
//   }
//   if (e.target.id === death.id) {
//     properties.isCases = false;
//     properties.isDeath = true;
//     properties.isRecovered = false;
//     console.log('death');
//   }
//   if (e.target.id === recovered.id) {
//     properties.isCases = false;
//     properties.isDeath = false;
//     properties.isRecovered = true;
//     console.log('rec');
//   }
// });

// deskBoardSwitcher.addEventListener('click', (e) => {
//   if (e.target === units) {
//     properties.relative = !properties.relative;
//   }
// });

// function getType() {
//   if (properties.isCases) {
//     return 'cases';
//   }
//   if (properties.isDeath) {
//     return 'death';
//   }
//   console.log('asd');
//   return 'recovered';
// }

// function getUnits() {
//   if (properties.isAbsolute) {
//     return 'abolute';
//   } return 'relative';
// }

// export { getType, getUnits };

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
  }

  getType() {
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
    });

    this.deskBoardSwitcher.addEventListener('click', (e) => {
      if (e.target === this.units) {
        this.properties.relative = !this.properties.relative;
      }
    });
    if (this.properties.isCases) {
      return 'cases';
    }
    if (this.properties.isDeath) {
      return 'death';
    }
    console.log('asd');
    return 'recovered';
  }
}
