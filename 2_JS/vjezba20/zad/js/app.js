 function kvizAplikacija() {
            return {
                skupPitanja: kreirajPitanja(),
                trenutnaPitanja: [],
                indeks: 0,
                rezultat: 0,
                kvizZavrsen: false,

                // Computed property helper
                get trenutnoPitanje() {
                    return this.trenutnaPitanja[this.indeks] || {};
                },

                pokreniNoviKrug() {
                    // Moderniji način odabira 5 unikatnih pitanja
                    this.trenutnaPitanja = [...this.skupPitanja]
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 5);
                    this.indeks = 0;
                    this.rezultat = 0;
                    this.kvizZavrsen = false;
                },

                obradiOdgovor(odgovor) {
                    if (odgovor === this.trenutnoPitanje.tocno) this.rezultat++;
                    
                    if (this.indeks < 4) {
                        this.indeks++;
                    } else {
                        this.kvizZavrsen = true;
                    }
                },

                dajOcjenu() {
                    const poruke = {
                        5: 'Odličan (5)! Pravi si ES6 majstor!',
                        4: 'Vrlo dobar (4)! Skoro savršeno.',
                        3: 'Dobar (3). Solidno poznavanje.',
                        2: 'Dovoljan (2). Trebaš još učiti.',
                        default: 'Nedovoljan (1). Ponovi osnove!'
                    };
                    return 'Ocjena: ' + (poruke[this.rezultat] || poruke.default);
                }
            }
        }