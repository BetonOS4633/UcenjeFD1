// Koristimo IIFE i strict mode za bolju optimizaciju u v4.0
(function($) {
    let trenutnaPitanja = [];
    let indeksPitanja = 0;
    let rezultat = 0;

    // 1. Odabir pitanja koristeći "modernu miješalicu"
    const inicijalizirajPitanja = () => {
        trenutnaPitanja = [...skupPitanja].sort(() => Math.random() - 0.5).slice(0, 5);
    };

    // 2. Glavna logika prikaza
    const osvjeziKviz = () => {
        const p = trenutnaPitanja[indeksPitanja];
        
        // jQuery 4.0 omogućuje fluidno postavljanje više svojstava
        $('#tekst-pitanja').fadeOut(100, function() {
            $(this).text(p.pitanje).fadeIn(100);
        });

        $('#brojac-pitanja').text(`${indeksPitanja + 1}/5`);
        $('#traka-napretka').animate({ width: `${(indeksPitanja / 5) * 100}%` }, 400);

        // Generiranje gumba koristeći $.map (brže od .each za transformaciju podataka)
        const gumbi = $.map(p.odgovori, (odgovor) => {
            return `<button class="button gumb-odgovor secondary expanded" data-odgovor="${odgovor}">${odgovor}</button>`;
        });

        $('#popis-odgovora').html(gumbi.join(''));
    };

    // 3. Event Delegation - slušamo klik na kontejneru, a ne na svakom gumbu posebno
    // Ovo je "best practice" u jQueryju za dinamičke elemente
    $('#popis-odgovora').on('click', '.gumb-odgovor', function() {
        const odabrano = $(this).data('odgovor');
        // tu se trebalo promjeniti iz === u ===
        if (odabrano == trenutnaPitanja[indeksPitanja].tocno) {
            rezultat++;
            $(this).addClass('success'); // Brza vizualna povratna informacija
        } else {
            $(this).addClass('alert');
        }

        // Mala pauza prije idućeg pitanja za bolji UX
        setTimeout(() => {
            indeksPitanja++;
            (indeksPitanja < 5) ? osvjeziKviz() : prikaziKraj();
        }, 400);
    });

    const prikaziKraj = () => {
        $('#podrucje-kviza').slideUp(500);
        
        const ocjene = {
            5: "Savršeno! Ti si JS genijalac.",
            4: "Odlično! Vrlo malo ti fali do vrha.",
            3: "Dobro je, ali možeš ti i bolje.",
            2: "Potrebno je još malo vježbe.",
            1: "Vrati se na osnove.",
            0: "Danas baš i nije tvoj dan..."
        };

        $('#konacni-rezultat').text(`${rezultat}/5`);
        $('#tekst-ocjene').text(ocjene[rezultat] || ocjene[0]);
        $('#podrucje-rezultata').delay(500).slideDown(500);
    };

    // Inicijalizacija na "Ready" event
    $(() => {
        const restart = () => {
            rezultat = 0;
            indeksPitanja = 0;
            inicijalizirajPitanja();
            $('#podrucje-rezultata').hide();
            $('#podrucje-kviza').show();
            osvjeziKviz();
        };

        $('#restart-btn').on('click', restart);
        restart();
    });

})(jQuery);