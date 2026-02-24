let filtriraniPodaci = [...sviKorisnici];
let trenutnaStranica = 1;
const redovaPoStranici = 10;
let trenutnoSortiranje = { kolona: 'id', uzlazno: true };


function osvjeziPrikaz() {
    const tijeloTablice = document.getElementById('tijeloTablice');
    tijeloTablice.innerHTML = '';
    const pocetak = (trenutnaStranica - 1) * redovaPoStranici;
    const kraj = pocetak + redovaPoStranici;
    const podaciStranice = filtriraniPodaci.slice(pocetak, kraj);
    podaciStranice.forEach(korisnik => {
        const red = document.createElement('tr');
        /*
        const datumHr = korisnik.datumUpisa.toLocaleDateString('hr-HR');
        const bodoviHr = korisnik.bodovi.toLocaleString('hr-HR', { minimumFractionDigits: 2 });
        red.innerHTML = `
            <td>${korisnik.id}</td>
            <td><span class="ime">${korisnik.ime}</span></td>
            <td><span class="ime">${korisnik.prezime}</span></td>
            <td>${datumHr}</td>
            <td>${bodoviHr}</td>
            <td>${korisnik.placeno ? '✅ Plaćeno' : '❌ Duguje'}</td>
        `;
        */
        kreirajCelijeDOM(red,korisnik);


        tijeloTablice.appendChild(red);
    });
    generirajGumboveStranica();
    izracunajStatistiku();
}

document.getElementById('poljePretraga').addEventListener('input', (e) => {
    const pojam = e.target.value.toLowerCase();
    filtriraniPodaci = sviKorisnici.filter(k => 
        (k.ime.toLowerCase() + ' ' + k.prezime.toLowerCase()).includes(pojam));
    trenutnaStranica = 1; 
    osvjeziPrikaz();
});

function poredajPodatke(nazivKolone) {
    trenutnoSortiranje.uzlazno = trenutnoSortiranje.kolona === nazivKolone ? !trenutnoSortiranje.uzlazno : true;
    trenutnoSortiranje.kolona = nazivKolone;
    document.querySelectorAll('.tablica-podataka th').forEach(th => {
        th.classList.remove('aktivno-sortiranje');
        const span = th.querySelector('span');
        if (span) span.innerText = '↕';
    });
    const aktivniTh = document.querySelector(`th[onclick*="'${nazivKolone}'"]`);
    if (aktivniTh) {
        aktivniTh.classList.add('aktivno-sortiranje');
        const span = aktivniTh.querySelector('span');
        span.innerText = trenutnoSortiranje.uzlazno ? '↑' : '↓';
    }
    filtriraniPodaci.sort((a, b) => {
        let v1 = a[nazivKolone];
        let v2 = b[nazivKolone];
        let rezultat;
        if (typeof v1 === 'string') {
            rezultat = v1.localeCompare(v2, 'hr'); // čšćđž
        } else {
            rezultat = v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
        }
        return trenutnoSortiranje.uzlazno ? rezultat : -rezultat;;
    });

    osvjeziPrikaz();
}

function generirajGumboveStranica() {
    const kontejner = document.getElementById('kontejnerStranica');
    kontejner.innerHTML = '';
    const brojStranica = Math.ceil(filtriraniPodaci.length / redovaPoStranici);
    const brojevi = Array.from({ length: brojStranica }, (_, i) => i + 1);
    brojevi.map(broj => {
        const gumb = document.createElement('button');
        gumb.className = 'gumb-stranica';
        gumb.innerText = broj;
        if (broj === trenutnaStranica) gumb.classList.add('aktivna-stranica');
        gumb.onclick = () => {
            trenutnaStranica = broj;
            osvjeziPrikaz();
        };
        kontejner.appendChild(gumb);
    });
}

function izracunajStatistiku() {
    const ispis = document.getElementById('statistickiIspis');
    const sumaBodova = filtriraniPodaci.reduce((ukupno, k) => ukupno + k.bodovi, 0);
    const sviPodmirili = filtriraniPodaci.every(k => k.placeno === true);
    const imaOdlicnih = filtriraniPodaci.some(k => k.bodovi === 100);
    const polaznikKojiJePao = filtriraniPodaci.find(k => k.bodovi < 50);
    const pozicijaPolaznik = sviKorisnici.findIndex(k => k.ime === "Mate" && k.prezime === "Rimac");
    ispis.innerHTML = `
        • Ukupno bodova (filtrirano): ${sumaBodova.toLocaleString('hr-HR')} | 
        Prosjek: ${(filtriraniPodaci.length > 0 ? sumaBodova / filtriraniPodaci.length : 0).toFixed(2)}<br>
        • Svi polaznici su platili: ${sviPodmirili ? 'DA' : 'NE'}<br>
        • Postoji netko s maksimalnim bodovima (100): ${imaOdlicnih ? 'DA' : 'NE'}<br>
        • Primjer polaznika ispod praga (50 bodova): ${polaznikKojiJePao ? polaznikKojiJePao.ime : 'Nema nitko'}<br>
        • Mate Rimac se u bazi nalazi na indeksu: ${pozicijaPolaznik}
    `;
}
document.getElementById('poljePretraga').focus();
osvjeziPrikaz();



function kreirajCelijeDOM(red,korisnik){
        const poljeId = document.createElement('td');
        poljeId.textContent = korisnik.id;
        poljeId.className = 'sifra';
        red.appendChild(poljeId);

        const poljeIme = document.createElement('td');
        const rasponIme = document.createElement('span');
        rasponIme.className = 'ime';
        rasponIme.textContent = korisnik.ime;
        poljeIme.appendChild(rasponIme);
        red.appendChild(poljeIme);

        const poljePrezime = document.createElement('td');
        const rasponPrezime = document.createElement('span');
        rasponPrezime.className = 'prezime';
        rasponPrezime.textContent = korisnik.prezime;
        poljePrezime.appendChild(rasponPrezime);
        red.appendChild(poljePrezime);

        const poljeDatum = document.createElement('td');
        poljeDatum.textContent = korisnik.datumUpisa.toLocaleDateString('hr-HR');
        red.appendChild(poljeDatum);

        const poljeBodovi = document.createElement('td');
        poljeBodovi.textContent = korisnik.bodovi.toLocaleString('hr-HR', { minimumFractionDigits: 2 });
        red.appendChild(poljeBodovi);

        const poljeStatus = document.createElement('td');
        poljeStatus.textContent = korisnik.placeno ? '✅ Plaćeno' : '❌ Duguje';
        red.appendChild(poljeStatus);

        return red;
}