"use strict";
const init = null;
let a = '';
let b = '';
let operator = init;

function operate(operator, a, b) {
  if (operator === 'add') {operator = add}
  if (operator === 'subtract') {operator = subtract}
  if (operator === 'multiply') {operator = multiply}
  if (operator === 'divide') {operator = divide}
  
  return operator(a, b);
}

const add = (a, b) => a + b; 
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function Expression(a, operator, b, result) {
  this.a = a;
  this.operator = operator;
  this.b = b;
  this.result = operate(operator, +a, +b)
}



// --------------------------------------------------
function display(n) {
  const dispVal = (n) => document.querySelector('.display--content').textContent = n;
  // get rid of ERROR and put in rounding with Math.round
  return n.toString().length > 10 ? dispVal('ERROR') : dispVal(n);
}
function dispResult() {
  a = new Expression(a, operator, b).result.toString();
  return display(a);
}
function equalsReset() {
  dispResult();
  b = '';
  operator = init;
}
const addButtonEv = () => {
  document.addEventListener('click', (event) => {
    if (event.target.matches('.btn--number')) {  
      if (operator === null) {
        a += event.target.value;
        return display(a);
      } else if (operator != null) {
        b += event.target.value;
        return display(b);
      }
    }
    if (event.target.matches('.btn--operator')) {
        if (b.length > 0) {
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
      a = '';
      b = '';
      operator = init;
      display('');
    }
  })
}
addButtonEv();
addEqualsEv();
clearBtnEv();
