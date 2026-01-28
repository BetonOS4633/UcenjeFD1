//  varijabla je prostor u memoriji
// može biti različitih tipova
// u JS se može sefinirati na tri različita načina

//Ulaz podatka u program
//promt uvijek unosi string
const ime='Edunova'//prompt('Unesi svoje ime');
//Fiksno stavljam neku vrijednu da mi pri izvođenu ne pita
// ako hoćemo može testirati obriši 'Edunova'

console.log(`Dobar dan ${ime}!`);

console.log(typeof ime, ime);


const unosGodina='2026' //prompt('Unesi godinu');

// konverzija u broj
const godina=Number(unosGodina);

console.log(typeof godina, godina );

// odavde ne unosim promt već fiksno

//decimani broj - floatin point
const unosDecimalniBroj='3.14'// unos točke

const decimalniBroj = parseFloat(unosDecimalniBroj);

console.log(typeof decimalniBroj,decimalniBroj);


//cijeli broj
const cijeliBroj=parseInt('12');
console.log(typeof cijeliBroj, cijeliBroj);

//logička vrijednost
const logickaVrijednost = true;

console.log(typeof logickaVrijednost, logickaVrijednost);


//const je konstanta, varijabla se ne može mijenjati
//logickaVrijednost=false; // ne može se mijenjati varijablu koja je konstata

//"prava varijabla u JS
let broj=7;

//let dozvoljava primjenu vrijednosti varijable
broj=9;


console.log(typeof broj, broj);


//let broj=2; Ne može se redeklarirati varijabla s Let

//JS je intepreter
broj='9' // ja sada mijenjam tip varijable

console.log(typeof broj, broj);

// STARO, ne koristiti - što znači da ne postoji

var i=7;
console.log(typeof i,i);
i='7';
console.log(typeof i, i)
var i=true; // var omogućava redeklaracija i to nije dobro
console.log(typeof i,i);


const velikiCijeliBroj=654654654654654313n;
console.log(typeof velikiCijeliBroj, velikiCijeliBroj);

let x;
console.log(typeof x,x);
x=6
console.log(typeof x,x);

let y=null;
console.log(typeof y,y);

// JSON- javaSript Obect
const osobaObjekt={
    ime:'Pero',
    gonina:27,
    znaProgramirati: true
    };

    console.log(typeof osobaObjekt, osobaObjekt);
console.table(osobaObjekt);
const brojevi=[2,3,1,2];  //niz
console.log(typeof brojevi, brojevi);


const podaciBackend=[
    {
        ime:'Pero',
        prezime:'Perić'
    },
    {
        ime:'Ana',
        prezime:'Majić'
    }
];
console.table(podaciBackend) ;


function pozdrav(){
    console.log('Hello iz funkcije');
}
console.log(typeof pozdrav, pozdrav);


//trenutačni način pisanja funkcija
const pozdravi=() => console.log('Hello iz funkcije');

console.log(typeof pozdravi, pozdravi );


const id1=Symbol('id'); //  ovo ispod je opis
const id2=Symbol('id');

console.log(typeof id1, id1);

//operator provjere jednakosti
// == -> provjera samo vrijednost'2' nije jednako 2
// == -> provjerava po tipu i vrijednosti '2' nije jednako 2

console.log(id1==id2);
console.log(id1===id1);


