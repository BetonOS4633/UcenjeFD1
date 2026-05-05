import { PrefixStorage } from "../../constants";


// Pomoćna funkcija za dohvaćanje podataka iz local storage-a
function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(PrefixStorage.POLAZNICI);
    return podaci ? JSON.parse(podaci) : [];
}

// Pomoćna funkcija za spremanje podataka
function spremiUStorage(podaci) {
    localStorage.setItem(PrefixStorage.POLAZNICI, JSON.stringify(podaci));
}

// 1/4 Read - dohvati sve
async function get() {
    const polaznici = dohvatiSveIzStorage();
    return {success: true,  data: [...polaznici] };
}

// Dohvati jedan po šifri
async function getBySifra(sifra) {
    const polaznici = dohvatiSveIzStorage();
    const polaznik = polaznici.find(p => p.sifra === parseInt(sifra));
    return {success: true,  data: polaznik };
}

// 2/4 Create - dodaj novi
async function dodaj(polaznik) {
    const polaznici = dohvatiSveIzStorage();
    
    if (polaznici.length === 0) {
        polaznik.sifra = 1;
    } else {
        // Pronalaženje najveće šifre da izbjegnemo duplikate
        const maxSifra = Math.max(...polaznici.map(p => p.sifra));
        polaznik.sifra = maxSifra + 1;
    }
    
    polaznici.push(polaznik);
    spremiUStorage(polaznici);
    return { data: polaznik };
}

// 3/4 Update - promjeni postojeći
async function promjeni(sifra, polaznik) {
    const polaznici = dohvatiSveIzStorage();
    const index = polaznici.findIndex(p => p.sifra === parseInt(sifra));
    
    if (index !== -1) {
        polaznici[index] = { ...polaznici[index], ...polaznik, sifra: parseInt(sifra) };
        spremiUStorage(polaznici);
    }
    return { data: polaznici[index] };
}

// 4/4 Delete - obriši
async function obrisi(sifra) {
    let polaznici = dohvatiSveIzStorage();
    polaznici = polaznici.filter(p => p.sifra !== parseInt(sifra));
    spremiUStorage(polaznici);
    return { message: 'Obrisano' };
}

// Straničenje - dohvati stranicu polaznika
async function getPage(page = 1, pageSize = 8, searchTerm = '') {
    let polaznici = dohvatiSveIzStorage();
    
    // Filtriranje prema search termu
    if (searchTerm && searchTerm.trim() !== '') {
        const lowerSearchTerm = searchTerm.toLowerCase().trim();
        polaznici = polaznici.filter(polaznik => {
            const ime = (polaznik.ime || '').toLowerCase();
            const prezime = (polaznik.prezime || '').toLowerCase();
            const email = (polaznik.email || '').toLowerCase();
            const oib = (polaznik.oib || '').toLowerCase();
            
            return ime.includes(lowerSearchTerm) ||
                   prezime.includes(lowerSearchTerm) ||
                   email.includes(lowerSearchTerm) ||
                   oib.includes(lowerSearchTerm);
        });
    }
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = polaznici.slice(startIndex, endIndex);
    const totalItems = polaznici.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
        success: true,
        data: paginatedData,
        currentPage: page,
        pageSize: pageSize,
        totalPages: totalPages,
        totalItems: totalItems
    };
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi,
    getPage
};
