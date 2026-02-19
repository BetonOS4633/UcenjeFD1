
<<<<<<< HEAD
// beskonačna petlja
while(true){
console.log('Edunova');
break;
=======
// beskonačna while petlja
while(true){
    console.log('Edunova');
    break;
>>>>>>> f0eb9559694d2e91dbe7542ad2840a40b4e18800
}


let brojac=0;
<<<<<<< HEAD
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
=======
console.time('while petlja');
while(brojac++<100){
    //console.log(brojac);
}
console.timeEnd('while petlja');


let brojUnos = '1262';
// zbroji sve znamenke danog broja
// ulaz: 1262, izlaz: 11

console.time('ZB1');
let zbroj=0;
for(let i=0;i<brojUnos.length;i++){
    zbroj += parseInt(brojUnos[i]);
>>>>>>> f0eb9559694d2e91dbe7542ad2840a40b4e18800
}
console.log(zbroj);
console.timeEnd('ZB1');

console.time('ZB2');
<<<<<<< HEAD
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
    
=======
let broj = parseInt(brojUnos);
zbroj=0;
while(broj>0){
    zbroj += broj % 10;
    broj = broj - (broj % 10);
    broj = broj / 10; // ovo je sumljivo
}
console.log(zbroj);
console.timeEnd('ZB2');

// čitati više o optimizaciji
// Big O notacija

/**
 * ==============================================================================
 * BIG O NOTATION CHEAT SHEET
 * ==============================================================================
 * Complexity  |    Name         |  Performance |  Example
 * -------------|-----------------|--------------|-------------------------------
 * O(1)        |  Constant       |  Excellent   | Accessing array index
 * O(log n)    |  Logarithmic    |  Good        | Binary Search
 * O(n)        |  Linear         |  Fair        | Single loop (for/forEach)
 * O(n log n)  |  Linearithmic   |  Acceptable  | Efficient sorting (MergeSort)
 * O(n^2)      |  Quadratic      |  Slow        | Nested loops
 * O(2^n)      |  Exponential    |  Very Slow   | Recursive Fibonacci
 * O(n!)       |  Factorial      |  Horrible    | Traveling Salesman Problem
 * ------------------------------------------------------------------------------
 * n = broj elemenata (input size)
 * ==============================================================================
 */


// ČINJENICA: niti u for, niti u while se ne mora ući

let br=-5; // ova vrijednost 5 je ostala od koda prije

for(let i=0;i>br;i--){
    console.log('Ušao u for petlju', i);
}


// dođu podaci s API
let podaciSAPI = []; //[{ime:'Pero'}, {ime:'Marko'}]; 

while(podaciSAPI.length>0){
    console.log('Ušao u while petlju', podaciSAPI.pop()?.ime);
>>>>>>> f0eb9559694d2e91dbe7542ad2840a40b4e18800
}
