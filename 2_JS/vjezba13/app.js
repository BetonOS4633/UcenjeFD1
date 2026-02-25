
//OOP- Objektno Orjentisano Programiranje  u JS
//
// Naučite  napamet

// Klasa je opisnik objekta

class Osoba{
    // OOP princip učahurivanje(encapsulation)
    // skrivanje svojstava
    #ime;
    
    // omogućavanje pristupa skrivenom svojstvu
    get ime(){return this.#ime; }
    set ime(s){this.#ime = s;}

    set(s){
        this.ime=s
    }

    constructor(ime=''){

        console.log('Konstruiram objek iz klase Osoba');
        this.#ime=ime;
    }
}

// Objekt je instanca (pojavnost) klase
const o=new Osoba(); // new je poziv konstruktora
o.ime= 'Edunova'
o.setIme=('Marija')
console.log(o.ime);


const d=new Date()
console.log(d.getDay());

const jucer=new Date(2026,1,24)
const student= new Osoba('Nikolina');
console.log(student.ime);


//  OOP princip nasleđivanje(inheritance)
class Polaznik extends Osoba{
    #odradioObaveze;
    get odradioObaveze(){return this.#odradioObaveze}
    set odradioObaveze(b){this.#odradioObaveze=b}

    constructor(ime='',b=false){
        super (ime);
        this.#odradioObaveze=b
    }

}
[
    new Polaznik('Lucija',false), new Polaznik('Rita',true)
].forEach(o=>console.log(o.ime, o.odradioObaveze));


const p = new Polaznik();
p.ime='Karlo';
p.odradioObaveze=true;

console.log(p.ime, p.odradioObaveze);

class Predavac extends Osoba{

    #redoviti;
    get redoviti(){return this.#redoviti;}
    constructor(ime='',  redoviti=false){
        super(ime);
        this.#redoviti=redoviti
    }
    toString(){
        return`Ime je ${super.ime}, redovit:${this.#redoviti}}`;
    }
}

const predavac =new Predavac('Gordana', true);
console.log('${predavac}'); //
console.log (Math.random());

//Ideja obekta jest da bude kontejner za posdatke i metode koji upravljaju 
//Što s kodom koji nema potrebu pamtiti podatke već samo izvesti neku logiku

// u OOP ako želimo samo logiku

class Pomocno{
    static slucajniBroj(min=0,max){
        if(min===0&&max===0){
            returnMath.random();
        }
           return((Math.random()*max-min).toFixed());
    }
}

console.log((Pomocno.slucajniBroj()));
console.log(Pomocno.slucajniBroj(25,75));



