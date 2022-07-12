"use strict";

function operate(operator, a, b) {
  if (operator === 'add') {operator = operators.add}
  if (operator === 'subtract') {operator = operators.subtract}
  if (operator === 'multiply') {operator = operators.multiply}
  if (operator === 'divide') {operator = operators.divide}
  if (operator === 'plusMinus') {operator = operators.plusMinus}
  return operator(a, b);
}
const operators = {
  operator: null,
  add: (a, b) => a + b, 
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
  plusMinus: n => n * -1 
}
const operands = {
  a: '',
  b: ''
}

function Expression(a, operator, b, result) {
  this.a = operands.a;
  this.operator = operator;
  this.b = operands.b;
  this.result = operate(operator, +a, +b)
}

function display(n) {
  const dispVal = (n) => document.querySelector('.display--content').textContent = n;
  const rounded = Math.round(n * 1000000000) / 1000000000;
  // get rid of ERROR and put in rounding with Math.round
  return n.toString().length > 10 ? dispVal('ERROR') : dispVal(n);
}
function dispResult() {
  operands.a = new Expression(operands.a, operators.operator, operands.b).result.toString();
  return display(operands.a);
}
function equalsReset() {
  dispResult();
  operands.b = '';
  operators.operator = null;
}
const addButtonEv = () => {
  document.addEventListener('click', (event) => {
    if (event.target.matches('.btn--number')) {  
      if (operators.operator === null) {
        operands.a += event.target.value;
        return display(operands.a);
      } else if (operators.operator != null) {
        operands.b += event.target.value;
        return display(operands.b);
      }
    }
    if (event.target.matches('.btn--operator')) {
        if (operands.b.length > 0) {
          equalsReset() 
        }
        operators.operator = event.target.value;
    }
  });
};
const addEqualsEv = () => {
  document.addEventListener('click', (event) => {
    if (event.target.matches('#btn-equals')) {
      equalsReset() 
    }
  })
}
const addMiscEv = () => {
  document.addEventListener('click', (event) => {
    if (event.target.matches('#btn-plusMinus')) {
      operators.plusMinus()
    }
  })
}
const clearBtnEv = () => {
  document.addEventListener('click', (event) => {
    if (event.target.matches('#btn-clear')) {
      operands.a = '';
      operands.b = '';
      operators.operator = null;
      display('');
    }
  })
}
addButtonEv();
addEqualsEv();
addMiscEv();
clearBtnEv();
