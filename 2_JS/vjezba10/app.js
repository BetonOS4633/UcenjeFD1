// rekurzija je funkcija koja poziva samu sebe uz uvjet da se negdje u njoj nalazi uvjet za prekidanje rekurzije


// ono što znamo zbroj prvih 100 brojeva
let sum= 0;
for (let i = 1; i <= 100; i++) {
    sum += i;
}
console.log(sum);


function zbroji(broj){
    ///uvjet prekida funcije
    if(broj === 1){
        return 1;
    }
    return broj + zbroji(broj-1);
}

console.log(zbroji(100));

//stack overflow error - previše poziva funkcije, nema uvjeta za prekidanje rekurzije
function zbroji2(0)