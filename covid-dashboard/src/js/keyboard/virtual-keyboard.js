/* eslint-disable no-undef */
// voice recognition is undefined in VSCode
import Key from './key';
import './style.scss';

export default class VirtualKeyboard {
  constructor(placeOfIntegration) {
    this.inputLang = 'en';
    this.keys = [];
    this.capsPressed = false;
    this.shiftPressed = false;
    this.inputArea = placeOfIntegration;
    this.isSoundMute = true;

    this.inputEvent = new Event('keyup');
  }

  createKeys() {
    // codes beggining from the "_" symbol are custom codes
    const keyCodes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
      'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
      'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
      'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', '_langChange', '_hide',
      'Space', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight', '_speech'];
    const enLowerCases = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '&#129044;',
      '&#11134;', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
      '&#129093;', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '&#8629;',
      '&#8679;', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'EN', '&#8681;',
      ' ', '&#129044;', '&#129045;', '&#129047;', '&#129046;', '&#127908;'];
    const ruLowerCases = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', undefined,
      undefined, 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
      undefined, 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', undefined,
      undefined, 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', undefined, undefined, ' '];
    const enUpperCases = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', undefined,
      undefined, 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|',
      undefined, 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', undefined,
      undefined, 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', undefined, undefined, ' '];
    const ruUpperCases = ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', undefined,
      undefined, 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/',
      undefined, 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', undefined,
      undefined, 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', undefined, undefined, ' '];

    keyCodes.forEach((elem, i) => {
      const key = new Key(elem, enLowerCases[i], ruLowerCases[i], enUpperCases[i], ruUpperCases[i]);
      this.keys.push(key);
    });
  }

  getLetter(keyObj) {
    let result;
    // if only capslock-key pressed should print capital letters,
    // punctuation marks do not change
    if (this.capsPressed && !this.shiftPressed) {
      // if upper case symbol is letter
      if (/[A-Za-zА-Яа-я]/.test(keyObj[`${this.inputLang}UpperCase`])) {
        result = keyObj[`${this.inputLang}UpperCase`];
      } else {
        result = keyObj[`${this.inputLang}LowerCase`];
      }

    // if only shift-key pressed should print capital letters
    // change punctuation marks
    } else if (!this.capsPressed && this.shiftPressed) {
      result = keyObj[`${this.inputLang}UpperCase`];

    // if both capslock and shift keys pressed should print lower case
    // change punctuation marks
    } else if (this.capsPressed && this.shiftPressed) {
      // if upper case is not a letter
      if (/[^A-Za-zА-Яа-я]/.test(keyObj[`${this.inputLang}UpperCase`])) {
        result = keyObj[`${this.inputLang}UpperCase`];
      } else {
        result = keyObj[`${this.inputLang}LowerCase`];
      }
    } else {
      result = keyObj[`${this.inputLang}LowerCase`];
    }
    return result;
  }

  charKeyAction(keyObj) {
    return () => {
      this.inputArea.focus();

      const letterToInput = this.getLetter(keyObj);
      this.inputArea.setRangeText(letterToInput, this.inputArea.selectionStart, this.inputArea.selectionEnd, 'end');

      this.inputArea.dispatchEvent(this.inputEvent);
    };
  }

  modifierKeyAction(keyObj) {
    const key = keyObj;
    return () => {
      this.inputArea.focus();
      switch (key.keyCode) {
        case 'CapsLock':
          this.capsPressed = this.capsPressed ? false : this.capsPressed = true;
          key.keyElement.classList.toggle('pressed');
          break;
        case 'ShiftLeft':
          this.shiftPressed = this.shiftPressed ? false : this.shiftPressed = true;
          key.keyElement.classList.toggle('pressed');
          break;
        case '_langChange':
          this.inputLang = this.inputLang === 'en' ? this.inputLang = 'ru' : this.inputLang = 'en';
          key.keyElement.innerHTML = this.inputLang;
          key.keyElement.style.textTransform = 'uppercase';
          break;
        case '_hide':
          document.querySelector('.keyboard').classList.add('hidden');
          this.inputArea.blur();
          break;
        case '_speech':
          try {
            this.speech(key);
          } catch {
            alert('Speech recognition is supporten only by Chrome');
          }
          break;
        case '_sound':
          if (this.isSoundMute) {
            key.keyElement.innerHTML = '&#128263;';
            this.isSoundMute = false;
          } else {
            key.keyElement.innerHTML = '&#128264;';
            this.isSoundMute = true;
          }
          break;
        default:
          break;
      }
      this.redraw();
    };
  }

  editorKeyAction(keyObj) {
    const key = keyObj;
    return () => {
      this.inputArea.focus();
      switch (key.keyCode) {
        case 'Backspace':
          this.backspace();
          break;
        case 'Enter':
          this.inputArea.setRangeText('\n', this.inputArea.selectionStart, this.inputArea.selectionEnd, 'end');
          break;
        case 'ArrowLeft':
          this.arrowLeft();
          break;
        case 'ArrowRight':
          this.arrowRight();
          break;
        default:
          break;
      }
      this.inputArea.dispatchEvent(this.inputEvent);
    };
  }

  backspace() {
    if (this.inputArea.selectionStart !== 0) {
      if (this.inputArea.selectionStart === this.inputArea.selectionEnd) {
        this.inputArea.setRangeText('', this.inputArea.selectionStart - 1, this.inputArea.selectionEnd, 'end');
      } else {
        this.inputArea.setRangeText('', this.inputArea.selectionStart, this.inputArea.selectionEnd, 'end');
      }
    }
  }

  arrowLeft() {
    if (this.inputArea.selectionStart !== 0) {
      this.inputArea.selectionStart -= 1;
      this.inputArea.selectionEnd = this.inputArea.selectionStart;
    }
  }

  arrowRight() {
    this.inputArea.selectionStart += 1;
    this.inputArea.selectionEnd = this.inputArea.selectionStart;
  }

  redraw() {
    this.keys.forEach((elem) => {
      const key = elem;
      if (elem.keyType === 'char') {
        key.keyElement.innerHTML = this.getLetter(elem);
      }
    });
  }

  recognition() {
    const recognizer = new SpeechRecognition();
    recognizer.interimResults = true;
    recognizer.lang = this.inputLang === 'en' ? 'en-US' : 'ru-Ru';
    recognizer.onresult = (event) => {
      const result = event.results[event.resultIndex];
      this.inputArea.setRangeText(result[0].transcript, this.inputArea.selectionStart, this.inputArea.selectionEnd, 'end');
    };
    recognizer.start();
  }

  speech(keyObj) {
    // eslint-disable-next-line new-cap
    const recognizer = new webkitSpeechRecognition();
    recognizer.interimResults = true;
    if (this.inputLang === 'ru') {
      recognizer.lang = 'ru-Ru';
    } else {
      recognizer.lang = 'en-US';
    }
    recognizer.onstart = () => {
      keyObj.keyElement.classList.add('pressed');
    };

    recognizer.onresult = (event) => {
      console.log(event.results);
      let res = Array.from(event.results);
      res = res.map((elem) => elem[0]);
      res = res.map((elem) => elem.transcript);
      res = res.join('');

      if (event.results[0].isFinal) {
        this.inputArea.setRangeText(res, this.inputArea.selectionStart, this.inputArea.selectionEnd, 'end');
      }
    };

    recognizer.start();

    recognizer.onend = () => {
      keyObj.keyElement.classList.remove('pressed');
    };
  }

  init() {
    // create keys objects
    this.createKeys();

    // create html structure
    const keyboardWrapper = document.createElement('div');
    keyboardWrapper.classList.add('keyboard-wrapper');

    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    keyboard.classList.add('hidden');
    keyboardWrapper.append(keyboard);

    for (let i = 0; i < 5; i++) {
      keyboard.append(document.createElement('div'));
      keyboard.lastElementChild.classList.add('keyboard-row');
      keyboard.lastElementChild.classList.add(`keyboard-row-${i + 1}`);
    }

    this.keys.forEach((obj, i) => {
      if (i < 14) {
        keyboard.querySelector('.keyboard-row-1').append(obj.keyElement);
      } else if (i < 28) {
        keyboard.querySelector('.keyboard-row-2').append(obj.keyElement);
      } else if (i < 41) {
        keyboard.querySelector('.keyboard-row-3').append(obj.keyElement);
      } else if (i < 54) {
        keyboard.querySelector('.keyboard-row-4').append(obj.keyElement);
      } else {
        keyboard.querySelector('.keyboard-row-5').append(obj.keyElement);
      }
    });

    document.body.append(keyboardWrapper);

    // event listeres for mouse events
    this.keys.forEach((elem) => {
      if (elem.keyType === 'char') {
        elem.keyElement.addEventListener('click', this.charKeyAction(elem));
      } else if (elem.keyType === 'modifier') {
        elem.keyElement.addEventListener('click', this.modifierKeyAction(elem));
      } else {
        elem.keyElement.addEventListener('click', this.editorKeyAction(elem));
      }
    });

    this.inputArea.addEventListener('click', () => {
      document.querySelector('.keyboard').classList.remove('hidden');
    });

    // event listeners for physical keyboard input
    this.inputArea.onkeydown = (e) => {
      this.keys.forEach((elem) => {
        if (elem.keyCode === e.code) {
          if (elem.keyType === 'modifier') {
            if (!elem.keyElement.classList.contains('pressed') || elem.keyCode === 'CapsLock') {
              this.modifierKeyAction(elem)();
            }
          } else {
            elem.keyElement.classList.add('pressed');
          }
        }
      });
    };

    this.inputArea.onkeyup = (e) => {
      this.keys.forEach((elem) => {
        if (elem.keyCode === e.code) {
          if (elem.keyCode === 'ShiftLeft') {
            this.modifierKeyAction(elem)();
          } else if (elem.keyCode !== 'CapsLock') {
            elem.keyElement.classList.remove('pressed');
          }
        }
      });
    };
  }
}
