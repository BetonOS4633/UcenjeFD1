const { createApp } = Vue;
const brojPitanja = 6;

createApp({
    data() {
        return {
            pitanjaZaKrug: [],
            indeks: 0,
            rezultat: 0,
            pokaziRezultate: false,
            brojPitanja: brojPitanja
        }
    },
    computed: {
        // Automatski dohvaća trenutno pitanje na temelju indeksa
        trenutnoPitanje() {
            return this.pitanjaZaKrug[this.indeks] || {};
        },
        // Izračunava širinu progres trake
        progres() {
            return (this.indeks / this.brojPitanja) * 100;
        },
        // Logika ocjenjivanja prebačena u computed radi čistoće
        izracunajOcjenu() {
            const poruke = [
                'Nedovoljan (1). Ponovi osnove!',
                'Nedovoljan (1). Ponovi osnove!',
                'Dovoljan (2). Trebaš još malo učiti.',
                'Dobar (3). Solidno poznavanje.',
                'Vrlo dobar (4)! Skoro savršeno.',
                'Odličan (5)! Pravi si ES6 majstor!'
            ];
            return "Ocjena: " + poruke[this.rezultat];
        }
    },
    methods: {
        pokreniKrug() {
            // Skraćena verzija miješanja i odabira 5 unikatnih pitanja
            this.pitanjaZaKrug = [...skupPitanja]
                .sort(() => 0.5 - Math.random())
                .slice(0, 5);
            
            this.indeks = 0;
            this.rezultat = 0;
            this.pokaziRezultate = false;
        },
        obradiOdgovor(odabrano) {
            if (odabrano === this.trenutnoPitanje.tocno) {
                this.rezultat++;
            }

            if (this.indeks < this.brojPitanja-1) {
                this.indeks++;
            } else {
                this.pokaziRezultate = true;
            }
        }
    },
    mounted() {
        this.pokreniKrug();
    }
}).mount('#app');