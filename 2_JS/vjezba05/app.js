//switch je višestruko grananje
// sve što može i switch može i IF
// switch se koristi kada imamo više uvjeta i kada se uvjeti odnose na istu varijablu
// switch koristi seve

const ocjena=3

switch(ocjena){
    case 1:
        console.log("Nedovoljan");
        break;
    case 2:
        console.log("Dovoljan");
        break; 
    case 3:
        console.log("Dobar");
        break;
    case 4:
        console.log("Vrlo dobar");
        break;
    case 5:
        console.log("Odličan");
        break;  
    default: 
        console.log("Nije broj između 1 i 5");
}