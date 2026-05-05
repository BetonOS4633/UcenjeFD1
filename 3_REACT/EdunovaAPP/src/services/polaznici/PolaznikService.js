import PolaznikServiceLocalStorage from "./PolaznikServiceLocalStorage";
import PolaznikServiceMemorija from "./PolaznikServiceMemorija";
import { DATA_SOURCE } from "../../constants";

let Servis = null;

// 1. Odabir servisa
switch (DATA_SOURCE) {
    case 'memorija':
        Servis = PolaznikServiceMemorija;
        break;
    case 'localStorage':
        Servis = PolaznikServiceLocalStorage;
        break;
    default:
        Servis = null;
}

// 2. Definiranje defaultnog (praznog) ponašanja ako Servis nije pronađen
const PrazanServis = {
    get: async () => ({ success: false, data: []}),
    getBySifra: async (sifra) => ({ success: false, data: {} }),
    dodaj: async (polaznik) => { console.error("Servis nije učitan"); },
    promjeni: async (sifra, polaznik) => { console.error("Servis nije učitan"); },
    obrisi: async (sifra) => { console.error("Servis nije učitan"); },
    getPage: async (page, pageSize, searchTerm) => ({ success: false, data: [], totalPages: 0, totalItems: 0 })
};

// 3. Jedan jedini export na kraju
// Ako Servis postoji, koristi njega, inače koristi PrazanServis
const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (polaznik) => AktivniServis.dodaj(polaznik),
    promjeni: (sifra, polaznik) => AktivniServis.promjeni(sifra, polaznik),
    obrisi: (sifra) => AktivniServis.obrisi(sifra),
    getPage: (page, pageSize, searchTerm) => AktivniServis.getPage(page, pageSize, searchTerm)
};
