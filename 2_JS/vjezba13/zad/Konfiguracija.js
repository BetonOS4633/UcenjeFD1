
class Konfiguracija extends EdunovaObrada {
    
    #projekt;
    #instance;
    #procesor;
    #datum;
    #oznake;
    #imeDatoteke;
    #uvjetiPrihvaceni;
    #vrijemeObrade;
    #vrijemeObradeHR;

    constructor() {
        super(); // Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
        this.#projekt = '';
        this.#instance = 0;
        this.#procesor = 0.0;
        this.#datum = '';
        this.#oznake = [];
        this.#imeDatoteke = '';
        this.#uvjetiPrihvaceni = false;
        this.#vrijemeObrade = null;
        this.#vrijemeObradeHR = '';
    }

    // --- GETTERI I SETTERI ---

    get projekt() { return this.#projekt; }
    set projekt(v) { this.#projekt = v; }

    get instance() { return this.#instance; }
    set instance(v) { this.#instance = v; }

    get procesor() { return this.#procesor; }
    set procesor(v) { this.#procesor = v; }

    get datum() { return this.#datum; }
    set datum(v) { this.#datum = v; }

    get oznake() { return this.#oznake; }
    set oznake(v) { this.#oznake = v; }

    get imeDatoteke() { return this.#imeDatoteke; }
    set imeDatoteke(v) { this.#imeDatoteke = v; }

    get uvjetiPrihvaceni() { return this.#uvjetiPrihvaceni; }
    set uvjetiPrihvaceni(v) { this.#uvjetiPrihvaceni = v; }

    get vrijemeObrade() { return this.#vrijemeObrade; }
    set vrijemeObrade(v) { this.#vrijemeObrade = v; }

    get vrijemeObradeHR() { return this.#vrijemeObradeHR; }
    set vrijemeObradeHR(v) { this.#vrijemeObradeHR = v; }


    provjeriValjanost(el) {
        super.greske=[];

        const izvrsiProvjeru = (metoda, ...args) => { // npr metoda je Pomocno.provjeriString
            try {
                return metoda(...args);
            } catch (e) {
                super.dodajGresku({element: args[0], greska: e.message});
            }
        };

        this.#projekt = izvrsiProvjeru(Pomocno.provjeriString, el.projekt, 4, 'Nazivno projekt minimalno 4 znaka.');
        this.#instance = izvrsiProvjeru(Pomocno.provjeriCijeliBroj, el.instanci, 1, 10, 'Broj instanci mora biti između 1 i 10.');
        this.#procesor = izvrsiProvjeru(Pomocno.provjeriDecimalniBroj, el.procesor, 0.2, 'Snaga procesora mora biti min 0.2 GHz.');
        this.#datum = izvrsiProvjeru(Pomocno.provjeriDatum, el.datum, new Date(), true, 'Datum ne smije biti u prošlosti.');
        this.#oznake = izvrsiProvjeru(Pomocno.provjeriListu, el.oznake, ',', 1, 'Unesite barem jednu oznaku odvojenu zarezom.');
        this.#imeDatoteke = izvrsiProvjeru(Pomocno.provjeriDatoteku, el.datoteka, 'Morate učitati minimalno jednu datoteku datoteku.');
        this.#uvjetiPrihvaceni = izvrsiProvjeru(Pomocno.provjeriCheckBox, el.uvjeti, 'Morate prihvatiti uvjete.');

        if (super.greske.length === 0) {
            const sada = new Date();
            this.#vrijemeObrade = sada.toISOString();
            this.#vrijemeObradeHR = sada.toLocaleString('hr-HR');
        }else{
            throw new Error('⚠️ Podaci nisu ispravni'); 
        }


    }

    toJSON() {
        return {
            projekt: this.#projekt,
            instance: this.#instance,
            procesor: this.#procesor,
            datum: this.#datum,
            oznake: this.#oznake,
            imeDatoteke: this.#imeDatoteke,
            uvjetiPrihvaceni: this.#uvjetiPrihvaceni,
            vrijemeObrade: this.#vrijemeObrade,
            vrijemeObradeHR: this.#vrijemeObradeHR
        };
    }
}