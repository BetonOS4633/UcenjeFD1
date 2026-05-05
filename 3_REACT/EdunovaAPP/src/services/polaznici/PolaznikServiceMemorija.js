import { polaznici } from "./PolaznikPodaci";


// 1/4 Read od CRUD
async function get(){
    return {success: true, data: [...polaznici]} // [...] stvara novi niz s istim podacima
}

async function getBySifra(sifra) {
    return {success: true, data: polaznici.find(p => p.sifra === parseInt(sifra))}
}

// 2/4 Create od CRUD
async function dodaj(polaznik){
    if(polaznici.length===0){
        polaznik.sifra=1
    }else{
        polaznik.sifra = polaznici[polaznici.length - 1].sifra + 1
    }
    
    polaznici.push(polaznik)
}

// 3/4 Update od CRUD
async function promjeni(sifra,polaznik) {
    const index = nadiIndex(sifra)
    polaznici[index] = {...polaznici[index], ...polaznik}
}

function nadiIndex(sifra){
    return polaznici.findIndex(p=>p.sifra === parseInt(sifra))
}

// 4/4 Delete od CRUD
async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        polaznici.splice(index, 1);
    }
    return;
}

// Straničenje - dohvati stranicu polaznika
async function getPage(page = 1, pageSize = 8, searchTerm = '') {
    let filteredPolaznici = [...polaznici];
    
    // Filtriranje prema search termu
    if (searchTerm && searchTerm.trim() !== '') {
        const lowerSearchTerm = searchTerm.toLowerCase().trim();
        filteredPolaznici = filteredPolaznici.filter(polaznik => {
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
    const paginatedData = filteredPolaznici.slice(startIndex, endIndex);
    const totalItems = filteredPolaznici.length;
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


export default{
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi,
    getPage
}
