const n = document.getElementById("n-value");
const x = document.getElementById("x-value");
const probability = document.getElementById("p-value");
const submit = document.getElementById("values-submit");
const meanValue = document.createElement("td");
const varianceValue = document.createElement("td");
const pmfValue = document.createElement("td");
const cdfValue = document.createElement("td");
const mean = document.getElementById('mean');
const variance = document.getElementById('variance');
const pdf = document.getElementById('pmf');
const cdf = document.getElementById('cdf');
const message = document.createElement('h3');
let valuesSet = false;
submit.addEventListener("click",result);
function result(e){
  e.preventDefault();
  let xValue = x.value;
  let nValue= n.value;
  let pValue = probability.value;
  if(nValue<= 0){
    message.innerText = "the value for n has to be a positive integer";
    submit.parentElement.appendChild(message);
    return;
  }
  if(xValue< 0 || xValue > nValue ){
    message.innerText = "the value for x has to be an integer between 0 and n";
    submit.parentElement.appendChild(message);
    return;
  }
  if(pValue < 0 || pValue> 1 ){
    message.innerText = "the value for p has to be a number between 0 and 1";
    submit.parentElement.appendChild(message);
    return;
  }
  //meanValue.style.left= "-10px";
  meanValue.innerText = +(nValue*pValue).toFixed(2);
  varianceValue.innerText = +(nValue*pValue*(1-pValue)).toFixed(2);
  pmfValue.innerText = +(pmfunc(nValue,pValue,xValue)).toFixed(3);
  cdfValue.innerText = +(cdfunc(nValue,pValue,xValue)).toFixed(3);
  mean.appendChild(meanValue);
  variance.appendChild(varianceValue);
  pmf.appendChild(pmfValue);
  cdf.appendChild(cdfValue);
  return;
}
function pmfunc(n,p,x){
  return (fact(n)/(fact(x)*fact(n-x)))*p**x*(1-p)**(n-x);
}
function cdfunc(n,p,x){
  let result = 0;
  for(let i=0;i<=x;i++){
    result += pmfunc(n,p,i);
  }
  return result;
}
const fact = n => !(n>1) ? 1: fact(n-1)*n;
