"use strict";
const init = null;
let operator = init;

function operate(operator, a, b) {
  if (operator === 'add') {operator = operators.add}
  if (operator === 'subtract') {operator = operators.subtract}
  if (operator === 'multiply') {operator = operators.multiply}
  if (operator === 'divide') {operator = operators.divide}
  return operator(a, b);
}
const operators = {
  operator: init,
  add: (a, b) => a + b, 
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
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
  // get rid of ERROR and put in rounding with Math.round
  return n.toString().length > 10 ? dispVal('ERROR') : dispVal(n);
}
function dispResult() {
  operands.a = new Expression(operands.a, operator, operands.b).result.toString();
  return display(operands.a);
}
function equalsReset() {
  dispResult();
  operands.b = '';
  operator = init;
}
const addButtonEv = () => {
  document.addEventListener('click', (event) => {
    if (event.target.matches('.btn--number')) {  
      if (operator === null) {
        operands.a += event.target.value;
        return display(operands.a);
      } else if (operator != null) {
        operands.b += event.target.value;
        return display(operands.b);
      }
    }
    if (event.target.matches('.btn--operator')) {
        if (operands.b.length > 0) {
          equalsReset() 
        }
        operator = event.target.value;
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
const clearBtnEv = () => {
  document.addEventListener('click', (event) => {
    if (event.target.matches('#btn-clear')) {
      operands.a = '';
      operands.b = '';
      operator = init;
      display('');
    }
  })
}
addButtonEv();
addEqualsEv();
clearBtnEv();
