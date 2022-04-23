const submit = document.getElementById("values-submit");
const mean = document.getElementById('mean');
const variance = document.getElementById('variance');
const pdf = document.getElementById('pmf');
const cdf = document.getElementById('cdf');
const dist = document.getElementById('dist');
const message = document.createElement('h3');
const meanValue = document.createElement('span');
const varianceValue = document.createElement('span');
const pmfValue = document.createElement('span');
const cdfValue = document.createElement('span');
let setValues = false;
// fetch("https://quickchart.io/chart?c={type:'bar',data:{labels:[2012,2013,2014,2015,2016],datasets:[{label:'Users',data:[120,60,50,180,120]}]}}")
// .then((res)=> res.text()
// ))
submit.addEventListener("click",result);
function result(e){
  e.preventDefault();
  message.innerText = "";
  switch(dist.textContent){
    case "Binomial":
      bin();
      break;
    case "Geometric":
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
  submit.parentElement.appendChild(message);
  setTimeout(function(){
     submit.parentElement.removeChild(message)
   },3000)
  mean.appendChild(meanValue);
  variance.appendChild(varianceValue);
  pmf.appendChild(pmfValue);
  cdf.appendChild(cdfValue);
  return;
}

function cdfunc(x,func,s){
  let result = 0;
  for(let i=s;i<=x;i++){
    result += func(i);
  }
  return result;
}
const fact = n => !(n>1) ? 1: fact(n-1)*n;
const combi = (n,k) => (fact(n)/(fact(k)*fact(n-k)));

function bin(){
  const x = Number(document.getElementById("x-value").value);
  const n = Number(document.getElementById("n-value").value);
  const p = Number(document.getElementById("p-value").value);
  if(!Number.isInteger(n)||n<= 0){
    message.innerText = "the value for n has to be a positive integer";
    return;
  }
  if(!Number.isInteger(x)||x< 0 || x > n ){
    message.innerText = "the value for x has to be an integer between 0 and n";
    return;
  }
  if(p < 0 || p > 1 ){
    message.innerText = "the value for p has to be a number between 0 and 1";
    return;
  }
  meanValue.innerText = +((n*p).toFixed(3));
  varianceValue.innerText = +((n*p*(1-p)).toFixed(3));
  const pmfunc = (i) =>combi(n,i)*p**i*(1-p)**(n-i);
  pmfValue.innerText = +(pmfunc(x).toFixed(3));
  cdfValue.innerText= +(cdfunc(x,pmfunc,0).toFixed(3));
}
function geo(){
  const x = Number(document.getElementById("x-value").value);
  const p = Number(document.getElementById("p-value").value);
  if(!Number.isInteger(x)||x<= 0 ){
    message.innerText = "the value for x has to be a positive integer";
    return;
  }
  if(p < 0 || p> 1 ){
    message.innerText = "the value for p has to be a number between 0 and 1";
    return;
  }
  meanValue.innerText = +((1/p).toFixed(3));
  varianceValue.innerText = +(((1-p)/p**2).toFixed(3));
  const pmfunc = (i) => p*(1-p)**(i-1);
  pmfValue.innerText = +(pmfunc(x).toFixed(3));
  cdfValue.innerText= +(cdfunc(x,pmfunc,1).toFixed(3));
}

function hyp(){
  const x = Number(document.getElementById("x-value").value);
  const n = Number(document.getElementById("n-value").value);
  const bigN = Number(document.getElementById("N-value").value);
  const bigK = Number(document.getElementById("K-value").value);
  if(!Number.isInteger(bigN)||bigN<= 0 ){
    message.innerText = "the value for N has to be a positive integer";
    return;
  }
  if(!Number.isInteger(bigk)||bigK<= 0||bigK>bigN ){
    message.innerText = "the value for K has to be an integer between 1 and N";
    return;
  }
  if(!Number.isInteger(n)||n<= 0||n>bigN){
    message.innerText = "the value for n has to be an integer between 1 and N";
    return;
  }
  if(!Number.isInteger(x)||x< 0 || x > bigK ){
    message.innerText = "the value for x has to be an integer between 0 and K";
    return;
  }
  meanValue.innerText = +((n*(bigK/bigN)).toFixed(3));
  varianceValue.innerText = +((n*(bigK/bigN)*((bigN-bigK)/bigN)*((bigN-n)/(bigN-1))).toFixed(3));
  const pmfunc =(i)=> (combi(bigK,i)*combi(bigN-bigK,n-i))/combi(bigN,n);
  pmfValue.innerText = +(pmfunc(x).toFixed(3));
  cdfValue.innerText= +(cdfunc(x,pmfunc,0).toFixed(3));
}

function neg(){
  const x = Number(document.getElementById("x-value").value);
  const p = Number(document.getElementById("p-value").value);
  const k = Number(document.getElementById("k-value").value);
  if(!Number.isInteger(k)||k<= 0){
    message.innerText = "the value for k has to be a positive integer";
    return;
  }
  if(!Number.isInteger(x)||x< k){
    message.innerText = "the value for x has to be an integer greater then k";
    return;
  }
  if(p < 0 || p> 1 ){
    message.innerText = "the value for p has to be a number between 0 and 1";
    return;
  }
  meanValue.innerText = +((k/p).toFixed(3));
  varianceValue.innerText = +(((k*(1-p))/p**2).toFixed(3));
  const pmfunc = (i)=> combi(i-1,k-1)*(1-p)**(i-k)*p**k;
  pmfValue.innerText = +(pmfunc(x).toFixed(3));
  cdfValue.innerText= +(cdfunc(x,pmfunc,k).toFixed(3));
}
function poi(){
  const l = Number(document.getElementById("l-value").value);
  const x = Number(document.getElementById("x-value").value);
  if(!Number.isInteger(x)||x< 0){
    message.innerText = "the value for x has to be a positive integer";
    return;
  }
  if(l< 0){
    message.innerText = "the value for l has to be a positive number";
    return;
  }
  meanValue.innerText = +((l*1).toFixed(3));
  varianceValue.innerText = +((l*1).toFixed(3));
  const pmfunc = (i)=> (l**i*Math.exp(-l))/fact(i);
  pmfValue.innerText = +(pmfunc(x).toFixed(3));;
  cdfValue.innerText= +(cdfunc(x,pmfunc,0).toFixed(3));
}
