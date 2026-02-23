const obrazac = document.getElementById('obrazac-podataka');
const kontejnerPogreske = document.getElementById('ispis-pogreske');
document.getElementById('naziv-projekta').focus();

obrazac.addEventListener('submit', (dogadaj) => {
    dogadaj.preventDefault();
    kontejnerPogreske.innerText = ''; 
    try {
        const konacniPodaci = {
            projekt: provjeriTekst(document.getElementById('naziv-projekta')),
            instance: provjeriCijeliBroj(document.getElementById('broj-instanci')),
            procesor: provjeriDecimalniBroj(document.getElementById('snaga-procesora')),
            datum: provjeriDatum(document.getElementById('datum-pokretanja')),
            oznake: provjeriListu(document.getElementById('oznake-sustava')),
            imeDatoteke: provjeriDatoteku(document.getElementById('datoteka-postavki')),
            uvjetiPrihvaceni: provjeriLogiku(document.getElementById('potvrda-uvjeta')),
            vrijemeObrade: new Date(),
            vrijemeObradeHR: new Date().toLocaleString('hr-HR')
        };
        console.log('%c 🎉 PODACI USPJEŠNO PROVJERENI (JSON):', 'color: #00d4ff; font-weight: bold;');
        console.log(JSON.stringify(konacniPodaci, null, 4));
        kontejnerPogreske.innerText = 'Pogledajte podatke u konzoli';
        document.getElementById('naziv-projekta').focus();
    } catch (pogreska) {
        kontejnerPogreske.innerText = '⚠️ ' + pogreska.message;
       // console.warn('Provjera valjanosti podataka nije uspjela:', pogreska.message, pogreska);
    }
});