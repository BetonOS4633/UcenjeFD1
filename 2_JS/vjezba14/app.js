
//Generator funcije su posebna vrst funcije koje se mogu zaustaviti usljed izvođenja i nastaviti gdje su stali
// * označava da je to generator funcija
function* brojevniGenerator() {
    console.log('početak rada generatora');
    yield true;  //1. pauza
    yield 2.8;  //2. pauza
    yield 3;  //3. pauza
    return'Gotov';
}
// ovdje se funcija funcija brojevniGenerator() ne izvršava
const generator=brojevniGenerator();
// sada će se tek krenuti izvoditi funcija brojevniGenerator
/*console.log(generator.next());//value: true, done: false}
console.log(generator.next());//{value 2.8, done: false} 
console.log(generator.next()); //{value: 3, done: false}
console.log(generator.next()); //{value: 'Gotov', done: true}
*/
let g;
do{
    g=generator.next();
    console.log(g);
}while(!g.done);

function* sljedeciID() {   // * ako se nalazi ispred naziva funcije, onda je to generator funcija
    let id = 1;
    while (true) {
        yield `ID: ${id++}`;
    }
}

const id=sljedeciID();

console.log(`Sljedeci ID: ${id.next().value}`);

for(let i=0; i<10; i++){
    console.log(`Sljedeci ID: ${id.next().value}`);
}


function* razgovor() {
    let odgovor;
    while (true) {
        odgovor = yield 'Kako se zoveš?';
        console.log(`generator kaže:Drago mi je, ${odgovor}`);
    }
    
}
const chat=razgovor();
 //1. pokreni generator do prvog yield-a
 let pitanje=chat.next().value; // pitanje je sada 'Kako se zoveš?'
    console.log(pitanje);

// 2. pošalji Marko i odmah dohvati sljedeći pitanje
pitanje=chat.next('Marko').value; // pitanje je sada 'Kako se zoveš?'
console.log(pitanje);
console.log(chat.next('Marija').value);


