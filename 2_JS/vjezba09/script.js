const ispisiUKonzolu=false;


// funkcija je skup naredbi koje izvrsavaju odredjeni zadatak
// funkcija se definira pomocu kljucne rijeci function, zatim slijedi naziv funkcije, zagrada i tijelo funkcije 
// function nazivFunkcije(){
//     // tijelo funkcije
// }    



// funkcija moze imati parametre, koji su varijable koje se nalaze unutar zagrada funkcije
// function nazivFunkcije(parametar1, parametar2){
//     // tijelo funkcije
// }    
// funkcija se poziva tako da se napise naziv funkcije i zagrada, a unutar zagrada se navode argumenti koji se prosljedjuju funkciji

// funciju možemo pozvati prije definiranja, jer se funkcije hoistaju, odnosno podižu na vrh svog opsega, pa su dostupne prije nego što su definirane
pozdraviSvijet

// osnovne vrste funkcija su:


// 1.ne prima vrijednost ne vraća vrijednost
// definiranje funkcije
function pozdraviSvijet(){
    console.log("Pozdrav svijete!");
    return;// može se napisati i 
}
// pozivanje funkcije
pozdraviSvijet();


// 2. prima parametre ne vraća vrijednost
function parniBrojevi(odBroja, doBroja){

    const max= odBroja > doBroja ? odBroja : doBroja;
    const min= odBroja < doBroja ? odBroja : doBroja;       
    for(let  i=min; i <= max; i++){
        if(i % 2 === 0){
            console.log(i);
        }
    }
}


// pozivanje funkcije
log('Prvi poziv');
parniBrojevi(3,8);
log('Drugi poziv');
parniBrojevi(59,65);
log('Treći poziv');
parniBrojevi(12,7);



function log(poruka) {
    if(ispisiUKonzolu){
        return;
    }
    console.log('--------------------------');
    console.log(poruka);
    console.log('________________________');
        
}


//3. Ne prima parametre, vraća vrijednost
// definicija
function slucajniBroj(){  //ona je tipa number
    const broj=Math.random();
    log(broj);
    const uvecano=broj*1000;
    const intb=parseInt(uvecano);
    return(intb);
}
// i funciju koja vraća vrijednost možemo pozvati bez da ju dodijelimo nekom/nečemu.
slucajniBroj();

//ispravna način poziva funkciju kaoja vraća vrijednost
const sb=slucajniBroj();
log(sb);

// slučajni broj načini

console.log((Math.random()*1000).toFixed(0));   //slučajni broj od 0 do 999
console.log((Math.random()*58-22+22).toFixed(0)); // slućajni broj od 22 do 58

//4. Prima parametre, vraća vrijednost-----> NAJČEŠĆE KORIŠTEN
// definiraj funcije
function zbojPrimBrojeva(odBroja, doBroja){
    let suma=0, prim=true;
    for(let i=odBroja;i<doBroja;i++){

        prim=true
        for(let j=2;j<i;j++){
            if(i%j===0){
                prim=false;
                break;
            }
        }
        if(prim){
            suma +=i;
        }
    }
    return suma

}

// pozdravArrow(); -> ovo je funkcija, ali nije definirana, jer je definirana kao arrow funkcija, a arrow funkcije se ne hoistaju, odnosno nisu dostupne prije nego što su definirane

log(zbojPrimBrojeva(3,80));

//arrow funkcija
const pozdravArrow=()=>console.log('Hellov Arrow'); // ovo je funcija

pozdravArrow();

// funcija u objektu
const brojivi={
    slucajniBroj(){
        // tu bi došao kod koji ima slacajniBroj
                return 7;
    },
    nula:()=>{return(0)}
}


log(brojivi['slucajniBroj']());