// Try catch je mehanizam koji omogućava obradu iznimke(greške)
/*
console.log('Početak programa');

const i=7;// ovdje simuliram da je unio korisnik

const rezultat = i + varijabla;

console.log(rezultat);

console.log('Kraj programa');
*/

try{
    // ovdje je kod koji pokušavam izvesti
    console.log('Početak programa');
    const i=7;
    const rezultat=i+varijabla;
    console.log(rezultat);
    console.log('Kraj programa');
}catch(e){
    console.log('Greška', e.name, e.message, e);
}
console.log('Kraj');

// opcionalna sintaksa ima try catch finally
console.log('Primjer 2');
const i=7;
let rezultat=0;
try{
    rezultat= i+varijabla  // ovoje puklo ali skripta se nastavlj
}catch(e){
    rezultat= i+1; // ovo mi je logika koju sam definiram što se radi ako
}finally{
    console.log(rezultat);
    
}
console.log('Kraj primjer 2');


function odradiPosao() {
    const i=-5;

    if(i<0){
        throw new Error('Broj mora biti veći ili jednak 0');
    }
    return Math.sqrt(i);
}
try{
    console.log(odradiPosao());
}catch(e){
    console.log(e.message);
    
}


// koliko puta se rekurzija izvodi

let brojac = 0;

function teskaRekurzija() {
 // let a = 1; let b = 2; let c = 3; let d = 4; let e = 5;
 // let f = "Neki dugački string koji zauzima prostor";
  
  brojac++;
  teskaRekurzija();
}

try {
  teskaRekurzija();
} catch { // ne moramo navesti parametar ako ga ne koristimo
  console.log("Stog je pukao na: " + brojac);
}

 
