 /**
 * GENERATOR FUNKCIJA: tijekUpoznavanja
 * Upravlja stanjima aplikacije koristeći 'yield'.
 */
function* tijekUpoznavanja() {
    // 1. KORAK: Tražimo ime
    // yield šalje objekt prema van i pauzira funkciju
    const ime = yield { 
        naslov: 'Tko si ti?', 
        opis: 'Prvo nam reci svoje ime kako bismo znali s kim pričamo.', 
        prikaziUnos: true 
    };

// 1.5 KORAK: Tražimo godinu
    // yield šalje objekt prema van i pauzira funkciju
    const godina = yield { 
        naslov: `Koliko imaš godina ${ime}?`, 
        opis: 'Sad nam reci svoje godine.', 
        prikaziUnos: true 
    };




    // 2. KORAK: Tražimo grad (koristimo 'ime' dobiveno iz prethodnog koraka)
    const grad = yield { 
        naslov: `Drago nam je, ${ime}!`, 
        opis: 'Iz kojeg grada dolaziš?', 
        prikaziUnos: true 
    };

    // 3. KORAK: Završna poruka
    return { 
        naslov: 'Sve je spremno!', 
        opis: `Pozdrav za ${ime} starog  ${godina} godina iz grada ${grad}. Uspješno ste završili proces!`, 
        prikaziUnos: false,
        gotovo: true 
    };
}

// Inicijalizacija elemenata (JavaScript varijable na hrvatskom)
const tijek = tijekUpoznavanja();
const gumbDalje = document.getElementById('gumb-dalje');
const naslovElement = document.getElementById('glavni-naslov');
const opisElement = document.getElementById('glavni-opis');
const kontejnerUnosa = document.getElementById('kontejner-unosa');
const poljeZaUnos = document.getElementById('polje-za-unos');

let zadnjiUnosKorisnika = '';

/**
 * FUNKCIJA: izvršiSljedećiKorak
 * Poziva se na klik gumba i budi generator.
 */
function izvrsiSljedeciKorak() {
    setTimeout(() => {
        poljeZaUnos.focus();
    }, 100); // Mali timeout da se fokus postavi nakon ažuriranja UI-a


    // Spremi što je korisnik upisao prije nego što krenemo na sljedeći yield
    zadnjiUnosKorisnika = poljeZaUnos.value;
    poljeZaUnos.value = ''; // Očisti polje za sljedeći put

    // Prosljeđujemo unos natrag u generator pomoću .next()
    const rezultat = tijek.next(zadnjiUnosKorisnika);

    if (!rezultat.done) {
        const podaci = rezultat.value;
        
        // Ažuriranje sučelja (UI)
        naslovElement.innerText = podaci.naslov;
        opisElement.innerText = podaci.opis;
        
        if (podaci.prikaziUnos) {
            kontejnerUnosa.classList.remove('skriveno');
        } else {
            kontejnerUnosa.classList.add('skriveno');
        }

        gumbDalje.innerText = 'Nastavi';
    } else {
        // Kraj - generator je vratio 'return'
        const konacniPodaci = rezultat.value;
        naslovElement.innerText = konacniPodaci.naslov;
        opisElement.innerText = konacniPodaci.opis;
        
        gumbDalje.classList.add('skriveno');
        kontejnerUnosa.classList.add('skriveno');
    }
}

gumbDalje.addEventListener('click', izvrsiSljedeciKorak);

poljeZaUnos.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        izvrsiSljedeciKorak();
    }       });
