class Pomocno {

    static provjeriString(element, minDuljina, porukaGreske) {
        if (!element || !element.value || element.value.trim().length < minDuljina) {
            throw new Error(porukaGreske);
        }
        return element.value.trim();
    }

    static provjeriCijeliBroj(element, min, max, porukaGreske) {
        const broj = parseInt(element.value);
        if (isNaN(broj) || broj < min || broj > max) {
            throw new Error(porukaGreske);
        }
        return broj;
    }

    static provjeriDecimalniBroj(element, min, porukaGreske) {
        const broj = parseFloat(element.value);
        if (isNaN(broj) || broj < min) {
            throw new Error(porukaGreske);
        }
        return broj;
    }

    static provjeriDatum(element, referentniDatum, moraBitiBuducnost, porukaGreske) {
        if (!element.value) {
            throw new Error(porukaGreske);
        }

        const izabraniDatum = new Date(element.value);
        const usporedni = new Date(referentniDatum);
        usporedni.setHours(0, 0, 0, 0);

        if (moraBitiBuducnost && izabraniDatum < usporedni) {
            throw new Error(porukaGreske);
        }
        return element.value;
    }

    static provjeriListu(element, separator, minElemenata, porukaGreske) {
        const sirovaLista = element.value.split(separator);
        const konacnaLista = sirovaLista
            .map(clan => clan.trim())
            .filter(clan => clan !== '');

        if (konacnaLista.length < minElemenata) {
            throw new Error(porukaGreske);
        }
        return konacnaLista;
    }

    static provjeriDatoteku(element, porukaGreske) {
        if (!element.files || element.files.length === 0) {
            throw new Error(porukaGreske);
        }
        return element.files[0].name;
    }

    static provjeriCheckBox(element, porukaGreske) {
        if (!element || !element.checked) {
            throw new Error(porukaGreske);
        }
        return true;
    }

    static kreirajElement(naziv,tekst,css=''){
        const noviElement = document.createElement(naziv);
        noviElement.innerText = tekst;
        noviElement.className = css;
        return noviElement;
    }
}