const provjeriTekst = (element) => {
    if (!element || !element.value || element.value.trim().length < 4) {
        element.focus();
        throw new Error('Naziv projekta mora sadržavati barem 4 znaka.');
    }
       
    return element.value.trim();
};

const provjeriCijeliBroj = (element) => {
    const broj = parseInt(element.value);
    if (!broj || broj < 1 || broj > 10) {
        element.focus();
        throw new Error('Broj instanci mora biti cijeli broj između 1 i 10.');
    }
    return broj;
};

const provjeriDecimalniBroj = (element) => {
    const broj = parseFloat(element.value);
    if (!broj || broj < 0.5) {
        element.focus();
        throw new Error('Snaga procesora mora biti minimalno 0.5 GHz.');
    }  
    return broj;
};

const provjeriDatum = (element) => {
    element.focus();
    if (!element.value){
        element.focus();
        throw new Error('Molimo odaberite važeći datum.');
    } 
    const izabraniDatum = new Date(element.value);
    const danas = new Date();
    danas.setHours(0,0,0,0);
    if (izabraniDatum < danas){
        element.focus();
        throw new Error('Datum ne može biti u prošlosti.');
    }
    return element.value;
};

const provjeriListu = (element) => {
    const sirovaLista = element.value.split(','); 
    const konacnaLista = []; 

    for (let i = 0; i < sirovaLista.length; i++) {
        const trenutniClan = sirovaLista[i].trim();
        if (trenutniClan !== '') {
            konacnaLista.push(trenutniClan);
        }
    }
    if (konacnaLista.length === 0){
        element.focus();
        throw new Error('Unesite barem jednu oznaku odvojenu zarezom.');
    } 
    return konacnaLista;
};

const provjeriDatoteku = (element) => {
    if (!element.files || element.files.length === 0) {
        element.focus();
        throw new Error('Morate učitati barem jednu datoteku.');
    }
    return element.files[0].name;
};

const provjeriLogiku = (element) => {
    if (!element || !element.checked){
        element.focus();
        throw new Error('Morate se složiti s uvjetima korištenja.');
    } 
    return true;
};
