let trenutnaPitanja = [];
let indeksTrenutnogPitanja = 0;
let rezultat = 0;

function odaberiPitanja() {
    trenutnaPitanja = [];
    let iskoristeniIndeksi = [];

    // Glavna petlja koja se izvodi dok ne skupimo točno 5 unikatnih pitanja
    for (let i = 0; trenutnaPitanja.length < 5; i++) {
        // 1. Generiraj nasumični indeks iz cijelog skupa pitanja
        let nasumicniIndeks = Math.floor(Math.random() * skupPitanja.length);
        
        // 2. Ručna provjera: Je li ovaj indeks već odabran?
        let vecPostoji = false;
        for (let j = 0; j < iskoristeniIndeksi.length; j++) {
            if (iskoristeniIndeksi[j] === nasumicniIndeks) {
                vecPostoji = true;
                break; // Pronađen duplikat, prekini provjeru
            }
        }
        
        // 3. Ako indeks NIJE već korišten, dodaj pitanje u naš niz
        if (!vecPostoji) {
            // Umjesto spread operatora, direktno dodajemo element
            trenutnaPitanja.push(skupPitanja[nasumicniIndeks]);
            iskoristeniIndeksi.push(nasumicniIndeks);
        }
    }
}

function pokreniKrug() {
    // Nasumično odaberi 5 pitanja iz skupa
    odaberiPitanja();
    
    indeksTrenutnogPitanja = 0;
    rezultat = 0;
    document.getElementById('podrucje-kviza').style.display = 'block';
    document.getElementById('podrucje-rezultata').style.display = 'none';
    prikaziPitanje();
}

function prikaziPitanje() {
    const p = trenutnaPitanja[indeksTrenutnogPitanja];
    document.getElementById('tekst-pitanja').innerText = p.pitanje;
    document.getElementById('brojac-pitanja').innerText = `Pitanje ${indeksTrenutnogPitanja + 1}/5`;
    
    // Traka napretka
    const napredak = ((indeksTrenutnogPitanja) / 5) * 100;
    document.getElementById('traka-napretka').style.width = napredak + '%';

    const popisOdgovora = document.getElementById('popis-odgovora');
    popisOdgovora.innerHTML = '';
    
    for (let i = 0; i < p.odgovori.length; i++) {
    const opcija = p.odgovori[i]; // Dohvaćamo trenutnu opciju pomoću indeksa
    
    const gumb = document.createElement('button');
    gumb.className = 'btn gumb-odgovor py-3 px-4';
    gumb.innerText = opcija;
    
    // Postavljanje funkcije na klik
    gumb.onclick = () => obradiOdgovor(opcija);
    
    popisOdgovora.appendChild(gumb);
}
}

function obradiOdgovor(odabrano) {
    if (odabrano === trenutnaPitanja[indeksTrenutnogPitanja].tocno) {
        rezultat++;
    }

    indeksTrenutnogPitanja++;
    if (indeksTrenutnogPitanja < 5) {
        prikaziPitanje();
    } else {
        prikaziRezultate();
    }
}

function prikaziRezultate() {
    document.getElementById('podrucje-kviza').style.display = 'none';
    document.getElementById('podrucje-rezultata').style.display = 'block';
    document.getElementById('konacni-rezultat').innerText = `${rezultat}/5`;
    
    let ocjena = '';
    
    switch (rezultat) {
        case 5:
            ocjena = 'Odličan (5)! Pravi si ES6 majstor!';          
            break;  
        case 4:
            ocjena = 'Vrlo dobar (4)! Skoro savršeno.';
            break;
        case 3:             
            ocjena = 'Dobar (3). Solidno poznavanje.';
            break;
               
        case 2:
            ocjena = 'Nedovoljan (1). Ponovi osnove!';
            break;
        case 1:
            ocjena = 'Nedovoljan (0). Potrebno je učiti više!';
            break;
        default:
            ocjena='nije ocjena';
    }

    
    //if (rezultat === 5) ocjena = 'Odličan (5)! Pravi si ES6 majstor!';
    //else if (rezultat === 4) ocjena = 'Vrlo dobar (4)! Skoro savršeno.';
    //else if (rezultat === 3) ocjena = 'Dobar (3). Solidno poznavanje.';
    //else if (rezultat === 2) ocjena = 'Dovoljan (2). Trebaš još malo učiti.';
    //else ocjena = 'Nedovoljan (1). Ponovi osnove!';
    
    document.getElementById('tekst-ocjene').innerText = 'Ocjena: ' + ocjena;
}

// Inicijalno pokretanje
pokreniKrug();