import { grupe } from "./GrupaPodaci";


// 1/4 Read od CRUD
async function get(){
    return {success: true, data: [...grupe]} // [...] stvara novi niz s istim podacima
}

async function getBySifra(sifra) {
    return {success: true, data: grupe.find(g => g.sifra === parseInt(sifra))}
}

// 2/4 Create od CRUD
async function dodaj(grupa){
    if(grupe.length===0){
        grupa.sifra=1
    }else{
        grupa.sifra = grupe[grupe.length - 1].sifra + 1
    }
    
    grupe.push(grupa)
}

// 3/4 Update od CRUD
async function promjeni(sifra,grupa) {
    const index = nadiIndex(sifra)
    grupe[index] = {...grupe[index], ...grupa}
}

function nadiIndex(sifra){
    return grupe.findIndex(g=>g.sifra === parseInt(sifra))
}

// 4/4 Delete od CRUD
async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        grupe.splice(index, 1);
    }
    return;
}


export default{
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}
