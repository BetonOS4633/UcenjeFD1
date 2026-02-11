// itericija , ponavljanje  petljež
// klasična petlja for
// for (inicijalizacija; uvjet; promjena variable)
// for petlja mora imati jednu varijablu
// 10. puta  jedno ispod drugogo


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
// krače
console.log('====================');
for (let i=0; i<10;i++){
console.log('Edunova');
}
// još krače
console.log('====================');
for(let i=0;i<10;i++)console.log('Edunova');


console.log('====================');
for(let i=0;i<10;i++){
    console.log(`Vrijednost i je ${i}`)

}

console.log('====================');
let suma=0
for(let i=0;i<=10;i++){
    console.log(`${suma}+${i+1}=`);
            suma += i+1;
    console.log('suma',suma);
    //debugger;
}

// petlja se može preskočiti i nasilno prekinuti
for(let i=0;i<10;i++){
    if(i===3){continue};// preskoči
if(i===7){break};
    console.log(i);
}


//petlja u petlji
console.log('====================');
for(let i=0;i<10;i++){  
    for(let j=0;j<10;j++){
        console.log(                (i+1)*(j+1));
        
    }
}
// for sa nizom
console.log('====================');
const niz=[1,2,3,45,6,]; 
for(let i=0;i<niz.length;i++){
    console.log(niz[i]);
}  


// pojednostavljena sintaksa ali samo za prolazak
console.log('====================');
for(const broj of niz){
    console.log(broj);
}

// string je niz znakova
console.log('====================');
const ime='Marko'
for(let i=0; i<ime.length;i++){
    console.log(ime[i]);
}

// beskonačna petlja
let broj=0; 
for(;;){
    console.log('Beskonačna petlja ' + broj++);
if (broj>50){break; } ;
}




