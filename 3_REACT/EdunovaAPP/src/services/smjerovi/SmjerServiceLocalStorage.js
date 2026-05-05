import { PrefixStorage } from "../../constants";


function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(PrefixStorage.SMJEROVI);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
    localStorage.setItem(PrefixStorage.SMJEROVI, JSON.stringify(podaci));
}

async function get() {
    const smjerovi = dohvatiSveIzStorage();
    return {success: true,  data: [...smjerovi] };
}

async function getBySifra(sifra) {
    const smjerovi = dohvatiSveIzStorage();
    const smjer = smjerovi.find(s => s.sifra === parseInt(sifra));
    return {success: true,  data: smjer };
}

async function dodaj(smjer) {
    const smjerovi = dohvatiSveIzStorage();
    
    if (smjerovi.length === 0) {
        smjer.sifra = 1;
    } else {
        const maxSifra = Math.max(...smjerovi.map(s => s.sifra));
        smjer.sifra = maxSifra + 1;
    }
    
    smjerovi.push(smjer);
    spremiUStorage(smjerovi);
    return { data: smjer };
}

async function promjeni(sifra, smjer) {
    const smjerovi = dohvatiSveIzStorage();
    const index = smjerovi.findIndex(s => s.sifra === parseInt(sifra));
    
    if (index !== -1) {
        smjerovi[index] = { ...smjerovi[index], ...smjer};
        spremiUStorage(smjerovi);
    }
    return { data: smjerovi[index] };
}

async function obrisi(sifra) {
    let smjerovi = dohvatiSveIzStorage();
    smjerovi = smjerovi.filter(s => s.sifra !== parseInt(sifra));
    spremiUStorage(smjerovi);
    return { message: 'Obrisano' };
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
};
