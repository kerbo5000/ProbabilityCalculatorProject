const submit = document.getElementById("values-submit");
const mean = document.getElementById('mean');
const variance = document.getElementById('variance');
const pdf = document.getElementById('pmf');
const cdf = document.getElementById('cdf');
const dist = document.getElementById('dist');
const message = document.createElement('h3');
let meanValue;
let varianceValue;
let pmfValue;
let cdfValue;
submit.addEventListener("click",result);
function result(e){
  e.preventDefault();
  // let xValue = x.value;
  // let nValue= n.value;
  // let pValue = probability.value;
  // if(nValue<= 0){
  //   message.innerText = "the value for n has to be a positive integer";
  //   submit.parentElement.appendChild(message);
  //   return;
  // }
  // if(xValue< 0 || xValue > nValue ){
  //   message.innerText = "the value for x has to be an integer between 0 and n";
  //   submit.parentElement.appendChild(message);
  //   return;
  // }
  // if(pValue < 0 || pValue> 1 ){
  //   message.innerText = "the value for p has to be a number between 0 and 1";
  //   submit.parentElement.appendChild(message);
  //   return;
  // }
  switch(dist.textContent){
    case "Binomial":
      bin();
      break;
    case "Geometric":
    console.log("HI");
      geo();
      break;
    case "Hypergeometric":
      hyp()
      break;
    case "Negative Binomial":
      neg();
      break;
    case "Poisson":
      poi();
      break;
  }
  mean.appendChild(document.createTextNode(+(meanValue.toFixed(3))));
  variance.appendChild(document.createTextNode(+(varianceValue.toFixed(3))));
  pmf.appendChild(document.createTextNode(+(pmfValue.toFixed(3))));
  cdf.appendChild(document.createTextNode(+(cdfValue.toFixed(3))));
  return;
}

function cdfunc(x,func){
  let result = 0;
  for(let i=0;i<=x;i++){
    result += func(i);
  }
  return result;
}
const fact = n => !(n>1) ? 1: fact(n-1)*n;
const combi = (n,k) => (fact(n)/(fact(k)*fact(n-k)));

function bin(){
  const x = document.getElementById("x-value").value;
  const n = document.getElementById("n-value").value;
  const p = document.getElementById("p-value").value;
  meanValue = n*p;
  varianceValue = n*p*(1-p);
  const pmfunc = (i) =>combi(n,i)*p**i*(1-p)**(n-i);
  pmfValue = pmfunc(x);
  cdfValue= cdfunc(x,pmfunc);
}
function geo(){
  const x = document.getElementById("x-value").value;
  const p = document.getElementById("p-value").value;
  meanValue = 1/p;
  varianceValue = (1-p)/p**2;
  const pmfunc = (i) => (i<=0)?0: p*(1-p)**(i-1);
  pmfValue = pmfunc(x);
  cdfValue= cdfunc(x,pmfunc);
}

function hyp(){
  const x = document.getElementById("x-value").value;
  const n = document.getElementById("n-value").value;
  const bigN = document.getElementById("N-value").value;
  const bigK = document.getElementById("K-value").value;
  meanValue = n*(bigK/bigN);
  varianceValue = n*(bigK/bigN)*((bigN-bigK)/bigN)*((bigN-n)/(bigN-1));
  const pmfunc =(i)=> (combi(bigK,i)*combi(bigN-bigK,n-i))/combi(bigN,n);
  pmfValue = pmfunc(x);
  cdfValue= cdfunc(x,pmfunc);
}

function neg(){
  const x = document.getElementById("x-value").value;
  const p = document.getElementById("p-value").value;
  const k = document.getElementById("k-value").value;
  meanValue = k/p;
  varianceValue = (k*(1-p))/p**2;
  const pmfunc = (i)=>(i<k)?0: combi(i-1,k-1)*(1-p)**(i-k)*p**k;
  pmfValue = pmfunc(x);
  cdfValue= cdfunc(x,pmfunc);
}
function poi(){
  const l = document.getElementById("l-value").value;
  const x = document.getElementById("x-value").value;
  meanValue = l;
  varianceValue = l;
  const pmfunc = (i)=> (l**i*Math.exp(-l))/fact(i);
  pmfValue = pmfunc(x);
  cdfValue= cdfunc(x,pmfunc);
}
