//  iteracije, ponavljanje koraka, petlje, loops

// klasična for petlja

// for(inicijalni uvjet  ;  uvijet prekida telje  ; promjena varijable)
// for petlja mora imati jednu varijablu
// ta varijabla će morati mijenjati svoju vrijednost, definiramo je s let

// 10. puta jedno ispod drugog ispišite u konzoli Edunova
// loše riješenje
console.log('Edunova');
console.log('Edunova');
console.log('Edunova');
console.log('Edunova');
console.log('Edunova');
console.log('Edunova');
console.log('Edunova');
console.log('Edunova');
console.log('Edunova');
console.log('Edunova');

console.log('===============================');

for(let i=0;i<10;i++){
    console.log('Edunova');
}

console.log('===============================');

for(let i=0;i<10;i++) console.log('Edunova');

console.log('===============================');

for(let i=0;i<10;i++){
    console.log(`Vrijednost i je ${i}`);
}


console.log('===============================');

let suma=0;
for(let i=0;i<10;i++){
    console.log(`${suma} + ${i+1} = `);
    suma += i+1;
    console.log(suma);
    //debugger;
}
console.log('suma',suma);


// petlja se može preskočiti i nasilno prekinuti
console.log('===============================');

for(let i=0;i<10;i++){
    if(i===3){
        continue; // preskoči console.log
    }
    if(i===7){
        break; // nasilno prekini petlju bez obzira na vrijednost i
    }
    console.log(i);
}

console.log('===============================');
// petlja u petlji

for(let i=0; i<10; i++){
    for(let j=0;j<10;j++){
        console.log( (i+1) * (j+1) );
    }
}
console.log('===============================');

// for s nizom

const niz = [2,3,45,5,6];

for(let i=0;i<niz.length-1;i++){
    console.log(niz[i]);
}
console.log('===============================');
// pojednostavljena sintaksa ali samo za prolazak
for(const broj of niz){
    console.log(broj);
}


console.log('===============================');

// string je niz (ne fromalno ali je)

const ime = 'Marko'; //string
for(let i=0;i<ime.length;i++){
    console.log(ime[i]);
}


console.log('===============================');

// beskonačna petlja
let broj=0;
for(;;){
    console.log(broj++);
    //if(broj>50){
        break;
  //  }
}