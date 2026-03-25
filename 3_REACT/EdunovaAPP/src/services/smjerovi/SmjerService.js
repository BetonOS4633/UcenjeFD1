import { smjerovi } from "./smjerPodaci";

// 1/4 Read od CRUD-a - Create, Read, Update, Delete
async function get() {
    return{data:smjerovi}
}
// 2/4
async function getBySifra(sifra){
    return{data: smjerovi.find(s=>sifra===parseInt(sifra))}
}

// 3/4   Update od CRUD

async function promjeni(sifra,smjer){
    const index = nadiIndex(sifra)
    smjerovi[index]= {...smjerovi[index], ...smjer}
}
    
function nadiIndex(sifra){
    return smjerovi.findIndex(s => s.sifra===parseInt(sifra))
}



async function dodaj(smjer) {
    if(smjerovi.length>0){
    smjer.sifra=smjerovi[smjerovi.length-1].sifra+1;
    }else{
        smjer.sifra=1
    }

    smjerovi.push(smjer);
}

export default {
    get, 
    dodaj, 
    getBySifra,
    promjeni
}
