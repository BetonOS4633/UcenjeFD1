// funcinalne metode - skraćuju kod, standarno se koriste

// prvo nam trebaju podaci

const korisnici =[
 {id:1,ime:'Ana', prezime:'Kartek', godina:25, admin:false},
 {id:2,ime:'Karlo', prezime:'Kotig', godina:29, admin:true},
 {id:3,ime:'Ivan', prezime:'Ivić', godina:30, admin:true},
 {id:4,ime:'Marija', prezime:'Marić', godina:28, admin:true},
 {id:5,ime:'Marko', prezime:'Marković', godina:17, admin:true}
];
// forEach()- prolazi kroz svaki element niza i izvršava funkciju nad njim, ne vraća novi niz

// onako kako zanmo ispisati imena korisnika jedno ispod drugog

for(let i=0; i<korisnici.length; i++){
     console.log(korisnici[i].ime);
}    

console.log('------------------');

// forEach() metoda
// korisnici.forEach(function(korisnik){
//     console.log(korisnik.ime);
// });
// arrow funkcija
korisnici.forEach(korisnik => console.log(korisnik.ime));       
console.log('-----___-----');

korisnici.forEach(o=> console.log(o.ime)); // o je element niza, može biti bilo koji naziv, ali se obično koristi o ili el  
console.log('----------');

korisnici.forEach(o=> console.log(`${o.ime} ${o.prezime}`));




korisnici.forEach(o=>{
    let poruka='Poštovan';
    if(!o.ime.endsWith('a')){
        poruka+='i gospodine ';
    }else{poruka+='a gospođo '}
    
    console.log(`${poruka} ${o.ime} ${o.prezime}`);
});

const samoImena=korisnici.map(o=>o.ime);
console.log(samoImena)

const maliNiz=korisnici.map(({id,ime,prezime})=>({sifra:id, imeOsobe:ime+ ' ' + prezime}))
console.log(maliNiz);
console.log('*********************');



//find
const pronaden=korisnici.find(o=>o.id===3)
console.log(pronaden);

console.log(korisnici.find(o=>o.id===10)?.ime);
console.log('*********************');


console.log(korisnici.findIndex(o=>o.ime==='Marija'));




// filter
console.log(korisnici.filter(o=> o.godina>30));


//reduce  Zbraja sve godine korisnika, prvi argument je funkcija koja se izvršava nad svakim elementom niza, a drugi argument je početna vrijednost akumulatora (suma)
//const sumaGodina=korisnici.reduce((suma,o)=>suma+o.godina,0);
console.log(korisnici.reduce((suma,o)=>suma+o.godina,0));
 

//some - provjerava da li neki element niza zadovoljava uvjet, vraća true ili false
const imaAdmina=korisnici.some(o=>o.admin);// admin je boolean, pa ne treba uspoređivati sa true, dovoljno je samo o=>o.admin
console.log(imaAdmina?'Postoji admin':'Ne postoji admin');

//every - provjerava da li svi elementi niza zadovoljavaju uvjet, vraća true ili false
const sviPunoljetni=korisnici.every(o => o.godina >= 18);
console.log(sviPunoljetni?'Svi su punoljetni':'Nisu svi punoljetni');


