
const rezultat = document.getElementById('rezultat');
document.getElementById('izvedi').addEventListener('click', () => {
  rezultat.innerHTML = '';
  const a = document.getElementById('a').value;
  const zadatak = document.getElementById('zadatak').value;

  switch (zadatak) {
    case '1':
      // rješavanje 1. zadatak

      // kraj rješavanje 1. zadatak
    break;
    case '2':
      // rješavanje 2. zadatak

      // kraj rješavanje 2. zadatak
    break;
    case '3':
      // rješavanje 3. zadatak

      // kraj rješavanje 3. zadatak
    break;

    case '4':
      rezultat.innerHTML=a.length
    
    
    
      break
<<<<<<< HEAD

    default:
      rezultat.innerHTML = `Nepoznati zadatak ${zadatak}`;
=======
    //Za unesene broj ispiši sve brojeve od 1 do tog broja odvojeno zarezomk
    case '5':
      const dobroja=Number(a);
      if (!a){
        rezultat.innerHTML='Niste unijeli broj';
        return;
      }
      
      let s='';

      for(let i=1;i<=dobroja;i++){
        console.log(i+',');
      if(i===dobroja)s+=i;
      else  s += i + ', ';
    
        }
        rezultat.innerHTML=s;

    break

  default:
    rezultat.innerHTML = `Nepoznati zadatak ${zadatak}`;
>>>>>>> 4029f78c1ada5dbb1a63bff01584908e5ad2eaaf
  }

});


// Zadaci

// 1. zadatak
// Napiši program koji prima string komandu ("start", "stop", "pauza") i ispisuje odgovarajuću poruku.
// Primjer ulaza: "pause"
// Ispis: "Pauza programa"

// 2. zadatak
// Napiši program koji prima ocjenu ("A", "B", "C", "D", "F") i ispisuje:
// "Položio" za "A", "B", "C"
// "Nije položio" za "D" i "F"

// 3. zadatak
// Napiši program koji prima broj bodova (0–100) i ispisuje ocjenu:
// < 50 → "Nedovoljan"
// 50–64 → "Dovoljan"
// 65–79 → "Dobar"
// 80–89 → "Vrlo dobar"
// 90–100 → "Odličan"
// Napomena: koristi switch(true).

