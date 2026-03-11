export const PI=3.14

export function zbroji(i,j){
    return i+j
}


export default function pozdravi (ime){
    return`Hello ${ime}, pozvao si default funciju`

}

function prva(){
    return `Ovo vidim jer sam pozvao u app.js, ${druga()}`

}

function druga(){
return 'Ovo je druga funkcija'
}

export{prva}  //ovdje se navode funcije koje će se exportati 