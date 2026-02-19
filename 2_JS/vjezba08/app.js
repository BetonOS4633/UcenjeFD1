
// beskonačna petlja
while(true){
console.log('Edunova');
break;
}


let brojac=0;
console.time('While petlja');
while (brojac++<100)
     {
    console.log(brojac);
    
}
console.timeEnd('While petlja');


let brojUnos=1262;
//zbroji sve znamenke danog broja
//ulaz 1262; izlaz 11

console.time('ZB1');

let zbroj=0;
for (let i=0;i<brojUnos.lenght;i++){
    zbroj +=parseInt(brojUnos[i])
}
console.log(zbroj);
console.timeEnd('ZB1');

console.time('ZB2');
let broj=parseInt(brojUnos)
zbroj=0;
while(broj>0){
    zbroj+=broj%10;
    //console.log(zbroj);
    
    broj=broj-(broj%10);
    //console.log(broj);
    
    broj=broj/10

}
console.log(zbroj)

console.timeEnd('ZB2');

// čitati o optimizaciji Big O notaciju

// Činjenica niti u FOR niti u WHILE , se ne mora uči
let br=-5; //ova vrijednost je ostala od prije
for(let i=0;i>br;i--){
    console.log('Ušao u for petlju, i');    
}
let podaciSAPI=['Pero']
while(podaciSAPI.length>0) {
    console.log('Ušao u while petlju', podaciSAPI.pop()?.ime);   
    
}
