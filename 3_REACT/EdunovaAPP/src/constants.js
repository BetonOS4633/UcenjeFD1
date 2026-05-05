export const IME_APLIKACIJE='Edunova APP'

export const RouteNames = {
    HOME: '/',
    SMJEROVI: '/smjerovi', // ovo je ruta
    SMJEROVI_NOVI: '/smjerovi/novi',
    SMJEROVI_PROMJENA: '/smjerovi/:sifra',

    POLAZNICI: '/polaznici',
    POLAZNICI_NOVI: '/polaznici/novi',
    POLAZNICI_PROMJENA: '/polaznici/:sifra',

    GRUPE: '/grupe',
    GRUPE_NOVI: '/grupe/novi',
    GRUPE_PROMJENA: '/grupe/:sifra',

    OPERATERI: '/operateri',
    OPERATERI_NOVI: '/operateri/novi',
    OPERATERI_PROMJENA: '/operateri/:sifra',
    OPERATERI_PROMJENA_LOZINKE: '/operateri/:sifra/lozinka',

    GENERIRANJE_PODATAKA: '/generiraj-podatke',
    APLIKACIJE_POLAZNIKA: '/aplikacije-polaznika',

    LOGIN: '/login',
    REGISTRACIJA: '/registracija',

    NADZORNA_PLOCA: '/nadzorna-ploca',

    TEST: 'test'
}

// memorija, localStorage, firebase
export const DATA_SOURCE = 'localStorage';


export const PrefixStorage = {
    SMJEROVI: 'smjerovi',
    POLAZNICI: 'polaznici',
    GRUPE: 'grupe',
    OPERATERI: 'operateri'
}