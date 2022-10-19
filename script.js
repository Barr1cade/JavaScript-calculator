class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

//const digits = {Z:2000, M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
//
//function roman2arabic(str){
//  if (!/^[IVXLCDMZ]+$/i.test(str)) throw new Error('Incorrect roman number format: ' + str)
//  return str.toUpperCase().split('').reduce(function(r,v,i,arr){
//    const [ a, b, c ] = [ digits[arr[i]], digits[arr[i+1]], digits[arr[i+2]]];
//    if (b && c && a <= b && b < c)
//      throw new Error('Incorrect roman number format: ' + str);
//    return b > a ? r - a : r + a;
//  }, 0)
//}
//
//function arabic2roman(num){
//  if (!/^\-?\d+$/.test(num+'')) throw new Error('Can`t convert that arabic numeric to roman: ' + num)
//  if (num < 1) return '';
//  let result = '';
//  for (let key in digits)
//    while ( num >= digits[key] ) {
//      result += key;
//      num -= digits[key];
//    }
//  return result;
//}
//
//function calculator(string){
//  let badChars = [];
//  string = string.replace(/[^IVXLCDMZ\d+\-*\/]/gi, chr => {
//    if (chr !== ' ') badChars.push(chr);
//    return '';
//  });
//  if (badChars.length > 0)
//    throw Error('Символы не допустимы: ' + badChars.join(' '));
//  let isRoman = /^[IVXLCDMZ]+$/i,
//    vars = string.split(/[+\-*\/]/g),
//    action = string.match(/[+\-*\/]/)[0];
//  if (vars.length !== 2)
//    throw Error("Должно быть лишь два операнда");
//  let r = vars.reduce((s,v)=> s + isRoman.test(v),0);
//  if (r === 1)
//    throw Error("Оба числа должны быть либо римскими, либо арабскими, исправьте выражение: " + string);
//  else if (r === 2)
//    vars = vars.map(v=>roman2arabic(v));
//  else if (vars.reduce((s,v) => s + /^\d+$/.test(v)) < 2)
//    throw Error("Приведенные операнды не допустимы, проверьте выражение: " + string);
//  if (vars.some(v => v < 1 || v > 10))
//      throw Error("Допустимо значение операндов лишь от 1 до 10 включительно")
//  let result = Math.floor(eval(vars.join(action)))
//  return r === 0 ? result.toString() : arabic2roman(result)
//}
//
//module.exports = calculator; // Не трогайте эту строчку