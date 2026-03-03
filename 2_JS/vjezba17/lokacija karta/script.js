'use strict';

// poziv google karte bez upozorenja
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t.toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: "AIzaSyDzitD_-P_d5LsPby-WMK0q9NoZJ8Lgk0E", 
    v: "weekly"
});

const aplikacija = {

    sucelje: {
        sirina: document.getElementById('geografskaSirina'),
        duzina: document.getElementById('geografskaDuzina'),
        adresa: document.getElementById('adresa'),
        platnoKarte: document.getElementById('karta')
    },

    pokreni() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pozicija) => this.obradiUspjeh(pozicija),
                (greska) => this.obradiGresku(greska)
            );
        } else {
            this.sucelje.adresa.innerText = 'Geolokacija nije podržana.';
        }
    },

    async obradiUspjeh(pozicija) {
        const { latitude: geoSirina, longitude: geoDuzina } = pozicija.coords;

        this.sucelje.sirina.innerText = geoSirina.toFixed(6);
        this.sucelje.duzina.innerText = geoDuzina.toFixed(6);

        const podaciLokacije = await this.dohvatiPodatkeLokacije(geoSirina, geoDuzina);
        const tekstAdrese = `${podaciLokacije.lokacija}, ${podaciLokacije.grad}, ${podaciLokacije.drzava}`;
        this.sucelje.adresa.innerText = tekstAdrese;

        // Pozivamo asinkronu funkciju za kartu
        this.inicijalizirajKartu(geoSirina, geoDuzina, tekstAdrese);
    },

    async dohvatiPodatkeLokacije(sirina, duzina) {
        try {
            const odgovor = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${sirina}&longitude=${duzina}&localityLanguage=hr`);
            const podaci = await odgovor.json();

            return {
                lokacija: podaci.locality || 'Nepoznato',
                grad: podaci.city || '',
                drzava: podaci.countryName || ''
            };
        } catch (greska) {
            console.error('Greška pri dohvaćanju adrese:', greska);
            return { lokacija: 'Nepoznato', grad: '', drzava: '' };
        }
    },

    // NOVA METODA: Koristi AdvancedMarkerElement
    async inicijalizirajKartu(sir, duz, adresa) {
        const koordinate = { lat: sir, lng: duz };

        // Učitavanje knjižnica
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        const karta = new Map(this.sucelje.platnoKarte, {
            zoom: 15,
            center: koordinate,
            mapId: "DEMO_MAP_ID", // Obavezno za napredne markere
        });

        const marker = new AdvancedMarkerElement({
            map: karta,
            position: koordinate,
            title: 'Vaša lokacija',
        });

        const infoProzor = new google.maps.InfoWindow({
            content: `
            <div style="color: black; text-align: center;">
            <img src="slika.png" alt="slika" /> <hr />
            ${adresa}
            </div>
            `
        });

        // 2. HOVER EFEKT (Mouseover)
        // Budući da je marker HTML element, koristimo standardne DOM evente na 'element' svojstvu
        marker.element.addEventListener('mouseenter', () => {
            infoProzor.open(karta, marker);
        });

        marker.element.addEventListener('mouseleave', () => {
            infoProzor.close();
        });
    },

    obradiGresku(greska) {
        this.sucelje.adresa.innerText = `Greška: ${greska.message}`;
    }
};


aplikacija.pokreni();
