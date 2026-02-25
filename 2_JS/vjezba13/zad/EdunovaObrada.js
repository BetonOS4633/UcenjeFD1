class EdunovaObrada {
    #greske;

    constructor() {
        this.#greske = [];
    }

    get greske() { return this.#greske; }
    set greske(v) { this.#greske = v; }

    dodajGresku(greska) { 
        this.#greske.push(greska); 
    }

}