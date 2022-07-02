"use strict";
const init = null;
let a = init;
let b = init;
let operator = init;

// expand on below, much better than the other mess
// needs to be integrated into the event creation functions below


function operate(operator, a, b) {
  if (operator === 'add') {operator = add}
  if (operator === 'subtract') {operator = subtract}
  if (operator === 'multiply') {operator = multiply}
  if (operator === 'divide') {operator = divide}
  
  // if (operator === `${operator}`) {operator = operator}
  return operator(a, b);
}
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}
function Expression(a, operator, b, result) {
  this.a = a;
  this.operator = operator;
  this.b = b;
  this.result = operate(operator, a, b)
}



// --------------------------------------------------
function display(n) {
  const dispVal = (n) => document.querySelector('.display--content').textContent = n;
  return n.toString().length > 10 ? dispVal('ERROR') : dispVal(n);
}
const addButtonEv = () => {
  document.addEventListener('click', (event) => {
    if (event.target.matches('.btn--number')) {  
      if (a, b, operator === null) {
        a = +event.target.value;
        return display(a);
      } else if (operator != null) {
        b = +event.target.value;
        return display(b);
      }
    }
    if (event.target.matches('.btn--operator')) {
      if (a != null) {
        operator = event.target.value;
        console.log(event.target.value);
      }
    }
  });
};
const addEqualsEv = () => {
  document.addEventListener('click', (event) => {
    if (event.target.matches('#btn-equals')) {
      //return display(operate(operator, a, b));
      return display(new Expression(a, operator, b).result);
    }
  })
}
addButtonEv();
addEqualsEv();
