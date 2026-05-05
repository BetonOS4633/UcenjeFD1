import { PrefixStorage } from "../../constants";

// Pomoćna funkcija za dohvaćanje podataka iz local storage-a
function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(PrefixStorage.GRUPE);
    return podaci ? JSON.parse(podaci) : [];
}

// Pomoćna funkcija za spremanje podataka
function spremiUStorage(podaci) {
    localStorage.setItem(PrefixStorage.GRUPE, JSON.stringify(podaci));
}

// 1/4 Read - dohvati sve
async function get() {
    const grupe = dohvatiSveIzStorage();
    return {success: true,  data: [...grupe] };
}

// Dohvati jedan po šifri
async function getBySifra(sifra) {
    const grupe = dohvatiSveIzStorage();
    const grupa = grupe.find(g => g.sifra === parseInt(sifra));
    return {success: true,  data: grupa };
}

// 2/4 Create - dodaj novi
async function dodaj(grupa) {
    const grupe = dohvatiSveIzStorage();
    
    if (grupe.length === 0) {
        grupa.sifra = 1;
    } else {
        // Pronalaženje najveće šifre da izbjegnemo duplikate
        const maxSifra = Math.max(...grupe.map(g => g.sifra));
        grupa.sifra = maxSifra + 1;
    }
    
    grupe.push(grupa);
    spremiUStorage(grupe);
    return { data: grupa };
}

// 3/4 Update - promjeni postojeći
async function promjeni(sifra, grupa) {
    const grupe = dohvatiSveIzStorage();
    const index = grupe.findIndex(g => g.sifra === parseInt(sifra));
    
    if (index !== -1) {
        grupe[index] = { ...grupe[index], ...grupa, sifra: parseInt(sifra) };
        spremiUStorage(grupe);
    }
    return { data: grupe[index] };
}

// 4/4 Delete - obriši
async function obrisi(sifra) {
    let grupe = dohvatiSveIzStorage();
    grupe = grupe.filter(g => g.sifra !== parseInt(sifra));
    spremiUStorage(grupe);
    return { message: 'Obrisano' };
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
};
