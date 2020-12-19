export default class Key {
  constructor(keyCode, enLowerCase, ruLowerCase, enUpperCase, ruUppercase) {
    this.keyCode = keyCode;
    this.enLowerCase = enLowerCase;
    this.ruLowerCase = ruLowerCase;
    this.enUpperCase = enUpperCase;
    this.ruUpperCase = ruUppercase;
    this.keyElement = document.createElement('button');
    this.keyElement.innerHTML = this.enLowerCase;
    if (/CapsLock|^Shift|Tab|_langChange|_hide|_speech|_sound/.test(this.keyCode)) {
      this.keyType = 'modifier';
    } else if (/Backspace|Enter|^Arrow/.test(this.keyCode)) {
      this.keyType = 'editor';
    } else {
      this.keyType = 'char';
    }
  }
}
