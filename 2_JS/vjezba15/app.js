
// očekujemo da se poziv funkcije izvrši nakon npr2 sekunda

function duzipoziv(){
    setTimeout(()=>{
        // ovdje se čeka 5 sekundi
        console.log('Prošlo je 5 sekundi');
        povratnaFunkcija();
       },5000); // funkcija koja se izvršava nakon 5 sekundi   
}

function povratnaFunkcija(){
    console.log('Ovo je povratna funkcija');
};



console.log('Početak');
duzipoziv();
console.log('Kraj');


async function apiPoziv(naziv, url, milisekundi=1000) {
    console.log(naziv,url,milisekundi);
    return await cekaj(milisekundi);
    
    }

 async function cekaj(ms) {
    return new Promise(resolve => 
        setTimeout(() =>{ 
            resolve(7)}, 
        ms));
}
  
async function izvedi() {
    const r1 = await apiPoziv(2000);('Primrjer','ttps.//http.dog',4000);

    console.log(r1);
    console.log(await apiPoziv('p2','url2',1000));
    console.log(await apiPoziv('p3','čekam 3 sekunde',3000));
    //for(let i=0; i<10; i++){
    //    console.log(await apiPoziv(i+1,'url'+(i+1),(i+1)*1000));
    //}

    await fetch('https://dogapi.dog/api/v1/facts?number=4')
    .then(res => res.json())
    .then(data => data.facts.forEach(o => {
        const li = document.createElement('li');
        li.innerText=o;
        document.getElementById('podaci')
        .appendChild(li);
    }));
}

for(let i=0;i<10;i++){
    izvedi();
}