"use strict";

function operate(operator, a, b) {
  if (operator === 'add') {operator = operators.add}
  if (operator === 'subtract') {operator = operators.subtract}
  if (operator === 'multiply') {operator = operators.multiply}
  if (operator === 'divide') {operator = operators.divide}
  return operator(a, b);
}
const operators = {
  operator: null,
  add: (a, b) => a + b, 
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a === 0 || b === 0 ? 'ERROR' : a / b
}
const operands = {
  a: '',
  b: ''
}
const misc = {
  plusMinus: n => n * -1,
  percentage: n => n / 100 // finish this properly
}

function Expression(a, operator, b, result) {
  this.a = operands.a;
  this.operator = operator;
  this.b = operands.b;
  this.result = operate(operator, +a, +b) // converted to numbers at point of calc, makes +=ing strings possible for display functions
}
function display(n) {
  const dispVal = (n) => document.querySelector('.display--content').textContent = n;
  const decIndex = (n) => n.indexOf('.');
  const x = 10 ** (9 - decIndex(n));
  function roundNum(n) {
    return Math.round(n * x) / x;
  }
  // get rid of ERROR and put in rounding with Math.round
  return dispVal(roundNum(n));
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
        if (operands.a.length >= 9) {
          return display(operands.a)
        } else {
          operands.a += event.target.value;
          return display(operands.a);
        }
      } else if (operators.operator != null) {
        if (operands.b.length >= 9) {
          return display(operands.b)
        } else {
          operands.b += event.target.value;
          return display(operands.b);
        }
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
      if (operators.operator === null) {
        operands.a = misc.plusMinus(operands.a).toString();
        display(operands.a);
      }
      if (operators.operator !== null) {
        operands.b = misc.plusMinus(operands.b).toString();
        display(operands.b);
      }
    }
    if (event.target.matches('#btn-percentage')) {
      if (operators.operator === null) {
        operands.a = misc.percentage(operands.a).toString();
        display(operands.a);
      }
      if (operators.operator !== null) {
        operands.b = misc.percentage(operands.b).toString();
        display(operands.b);
      }
    }
  })
}
const clearBtnEv = () => {
  document.addEventListener('click', (event) => {
    if (event.target.matches('#btn-clear')) {
      operands.a = '';
      operands.b = '';
      operators.operator = null;
      display('0');
    }
  })
}
addButtonEv();
addEqualsEv();
addMiscEv();
clearBtnEv();
