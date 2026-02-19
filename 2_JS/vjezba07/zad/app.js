
const rezultat = document.getElementById('rezultat');
document.getElementById('izvedi').addEventListener('click', () => {

  const a = document.getElementById('a').value;
  const b = document.getElementById('b').value;
  const zadatak = document.getElementById('zadatak').value;

  switch (zadatak) {
    case '1':
      // rješavanje 1. zadatak
      // 1. Za uneseni cijeli broj u polje A veći od 2 i manji od 10M ispiši da li je prim (prosti) broj ili ne.

        const a1= Number(a );
        console.log(a1);
        if(!a1){rezultat.innerHTML = `Niste unijeli broj`; return; }
        if(a1<2||a1>10000000){rezultat.innerHTML = `Broj mora biti između 2 i 10 milijuna`; return; }
      console.log(a1);
      let prim = true;
      let sCime=0;
      let brojac=0;
      for(let i=2;i<=a1;i++){
        if(brojac++ % 1000 === 0) {console.log(brojac, a1,i,'=', a1%i);}
        
        if(a1%i===0){ 
          sCime=i;
          prim=false;
          //console.log(a1,'je djeljiv sa',i,);
          break;
        }
      }

      if(prim){rezultat.innerHTML = `Broj ${a1} je prost.`; }
      else{rezultat.innerHTML = `Broj ${a1} nije prost. Djeljiv je sa ${sCime}`; }




        // kraj rješavanje 1. zadatak
    break;
    case '2':
      // rješavanje 2. zadatak
      // 2. Za uneseni cijeli broj u polje A ispiši da li je savršen broj ili ne. Savršen broj je onaj koji je jednak zbroju svojih djelitelja (npr. 6=1+2+3, 28=1+2+4+7+14).




      // kraj rješavanje 2. zadatak
    break;
    case '3':
      // rješavanje 3. zadatak

      // kraj rješavanje 3. zadatak
    break;
    case '4':
      // rješavanje 4. zadatak
        //4. Za unesenu riječ u polje A provjerite da li je palindrom ili ne
        //  Ružan edo na žur

        let s='';
        //debugger;
        for (let i=0;i<a.length;i++){
            if(a[i]!=' '){
              s+=a[i].toLowerCase();
                        
            }
          

        }
         console.log('s=',s);

        




      // kraj rješavanje 4. zadatak
    break;
    case '5':
      // rješavanje 5. zadatak

      // kraj rješavanje 5. zadatak
    break;
    case '6':
      // rješavanje 6. zadatak

      // kraj rješavanje 6. zadatak
    break;
    case '7':
      // rješavanje 7. zadatak

      // kraj rješavanje 7. zadatak
    break;

    default:
      rezultat.innerHTML = `Nepoznati zadatak ${zadatak}`;
  }

  
  // ovo će se ispisati ako u HTML dodatke option za zadatak a ovdje ga ne obradite
});
const poveznica = document.getElementById('poveznica');
poveznica.href='https://enciklopedija.hr/clanak/primbrojevi';
document.getElementById('zadatak').addEventListener('change', (event) => {
   switch (event.target.value) {
    case '1':
      poveznica.href='https://enciklopedija.hr/clanak/primbrojevi';
    break;
    case '2':
      poveznica.href='https://www.enciklopedija.hr/clanak/savrseni-broj';
    break;
    case '3':
      poveznica.href='https://hafura.wordpress.com/2017/09/13/armstrongov-broj-ispitni-zadatak/';
    break;
    case '4':
      poveznica.href='https://www.enciklopedija.hr/clanak/palindrom';
    break;
    case '5':
      poveznica.href='https://www.coursera.org/articles/what-are-stop-words';
    break;
    case '6':
      poveznica.href='https://enciklopedija.hr/clanak/samoglasnik';
    break;
    case '7':
      poveznica.href='https://hjp.znanje.hr/index.php?show=search_by_id&id=d1ZlWhU%3D';
    break;
    default:
      poveznica.href='#';
  }
});



const stopRijeci = [
  'a', 'ako', 'ali', 'bi', 'bih', 'bila', 'bili', 'bilo', 'bio', 'bismo', 
  'biste', 'biti', 'bumo', 'da', 'do', 'duž', 'ga', 'hoće', 'hoćemo', 'hoćete', 
  'hoćeš', 'hoću', 'i', 'iako', 'idemo', 'ideš', 'ide', 'iz', 'iza', 'iznad', 
  'ja', 'jako', 'jer', 'jesmo', 'jeste', 'jesu', 'je', 'kad', 'kada', 'kao', 
  'kroz', 'li', 'me', 'mene', 'meni', 'mi', 'mimo', 'mene', 'moj', 'moja', 
  'moje', 'mu', 'na', 'nad', 'nakon', 'nam', 'nama', 'nas', 'naš', 'naša', 
  'naše', 'našu', 'ne', 'nego', 'neka', 'neki', 'nekog', 'neko', 'nema', 'netko', 
  'neće', 'nećemo', 'nećete', 'nećeš', 'neću', 'ni', 'nije', 'nijedan', 'nikad', 
  'nismo', 'niste', 'nisu', 'njega', 'njegov', 'njegova', 'njegovo', 'njemu', 'njen', 
  'njena', 'njeno', 'njih', 'njihov', 'njihova', 'njihovo', 'njim', 'njima', 'njoj', 
  'nju', 'o', 'od', 'odmah', 'on', 'ona', 'onaj', 'onam', 'onamo', 'one', 
  'oni', 'ono', 'onolika', 'onoliko', 'onoliki', 'onoliku', 'ova', 'ovaj', 'ovdje', 
  'ove', 'ovi', 'ovo', 'ovuda', 'pa', 'pak', 'po', 'pod', 'pored', 'poslije', 
  'povrh', 'preko', 'pri', 'pred', 'prema', 'sa', 'sam', 'samo', 'se', 'sebe', 
  'sebi', 'si', 'smo', 'ste', 'su', 'sve', 'svi', 'svog', 'svoj', 'svoja', 
  'svoje', 'ta', 'taj', 'tako', 'tamo', 'te', 'tebe', 'tebi', 'ti', 'to', 
  'točno', 'u', 'uz', 'vam', 'vama', 'vas', 'vaš', 'vaša', 'vaše', 'već', 
  'vi', 'vrlo', 'za', 'zar', 'će', 'ćemo', 'ćete', 'ćeš', 'ću', 'što', 'the', 
  'and', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 
  'had', 'do', 'does', 'did', 'but', 'if', 'or', 'because', 'as', 'until', 
  'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 
  'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 
  'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 
  'further', 'then', 'once'
];