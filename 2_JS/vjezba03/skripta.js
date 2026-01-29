// operatori
// =       operator dodjeljivanja
// typeof     omogoćuje pristup tipu podatka
// ==         operator uspoređivanja samo po vrijednosti
// ===        uspoređuje po tipu i vrijednosti


// aritmetički operatori
// +-*/
const a=2, b=3;    //ulaz
let rez=a+b;       // algoritam
console.log(rez);  // izlaz

// modulo operator %
// ostatak nakon cjelobrojnog djeljenja
console.log (9%2)  //=1
console.log (10%2)  //=0

console.log(1000%100===0); //=true

// operatori dodjele
// =
// želim uvečati vrijed reza za 2
rez=rez+2; // u matematici se prvo izvodi desna strana i dodjeljuje lijevoj
console.log(rez); // 7
rez += 2,
console.log(rez); // 9
rez -=5; //4

const x=2;
rez +=x
console.log(rez); // 6

//ako ovo imaš u kodu kod tebe :) :()

rez +=1
console.log(rez); // 7

// operatori inkrement i decremenz
rez++; //ALINITI SE OVAKO NE RADI
console.log(rez); //8

// u isto vrijeme možeš
console.log(rez++); // 8 prvo ispiše rezultat i nako toga uveća
console.log(++rez); // 10 (prvo uvećava tek onda koristi )
console.log(--rez); // 9 prvo umanji i onda koristi
console.log(rez--); // 9 prvo koristi i onda umanji
console.log(rez);  //8

// operatori uspoređivanja

console.log(5==5);   //true
console.log('5'==5); //true
console.log(3==7);   //false

//=== uspoređuje i po tipu i po vrijednosti
console.log('Osijek'==='Osijek'); //true
console.log('Osijek'=== 'osijek'); // false
console.log(5==='5'); //false
console.log('Edunova'==='Druga škola'); // false

//!=  različito
console.log(4!=3) //true
console.log('4'!=4); // false

// >   veće od
// >= veće i jednako
let godine=18 
console.log(godine>18); //false
console.log(godine>=18); // true

// <manje od
// <= manje i jednako
godine=21
console.log(godine<21); // false
console.log(godine<=21); //true

// logički operatori
// and (i), or(ili), not(ne)
//booleova tablica and (&&) mora se u JS mora se napisati &&
 const i1 = 5 == '5'; //true
const i2 =  7>9; //false

console.log(i1 && i2); //false

// boolova tablica OR(||)  ALT+GR WW
console.log(i1 || i2); //true

// booleova tablica NOT (!)
console.log(!i1); // false

// ternareni operator -> koristit ćemo ga u If naredbi
// ? :
const poruka = godine >= 18 ?'Punoljetan':'Maloljetan';
console.log(poruka); //'Punoljetan'

// spajanje stringova(concarenation) +
const skola='Edunova'
console.log('Najpolja škola je'+ skola); //ovo se ne preporuča, već koristi beck tips
console.log(`Najpolja škola je ${skola}`); //
const razred=5
console.log('Idem u ' + razred + '.razred.');
console.log(`Idem u ${razred}. razred.`);


// spred operato (...)
// koristi se na nizovima i objektima

// na nizu
const niz=[2,2,3,3];
console.log(niz); // niz

const noviNiz=[1,...niz, 4];
console.log(noviNiz);


//na objektu
const osoba={
    ime:'Pero',
    prezime:'Perić'
};
console.log(osoba);
// želim proširiti pojam osobe
const polaznik={
    ...osoba,
    edukacija:'Frontend'
};
console.log(polaznik);

// destrukcija -> suproitno od spreda
// niz
const[prvi, drugi]=[1,2]; // s desne stranese nalazi niz s dva elementa on je napravio dvije varijabčle koje imaju vrijednost
console.log(prvi);
console.log(drugi);

// ojekt destructing
const{prezime, ...objektBezPrezimena}= polaznik;
console.log(objektBezPrezimena);
console.log(prezime); 

// nukll coalescing(??)
let sifra =null;
console.log(sifra??'Šifra nije postavljena'); // ako je šifra postavljena ispituje se njezina vrijednost inače ispisuje se

//malo kompeksniji JSON
const korisnik={
    adresa:{
        grad:'Osijek'}
};

console.log(korisnik.adresa.grad); // ispisuje Osijek
console.log(korisnik.adresa.ulica); // undefined

console.log(korisnik?.adresa.ulica); // undefined, bez greške

// typeof, instanceof
console.log([3,4,5] instanceof Array); // true

// in operator
console.log('prezime'in osoba); // true
console.log('prezime'in objektBezPrezimena); // false

//nećemo koristiti- operatore na bitovima(& i |) - tko želi neka samostalno proući
 