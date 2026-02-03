
const rezultat = document.getElementById('rezultat');
document.getElementById('izvedi').addEventListener('click', () => {
  rezultat.innerHTML='';
  const a = document.getElementById('a').value;
  const b = document.getElementById('b').value;
  const c = document.getElementById('c').value;
  const d = document.getElementById('d').value;
  const zadatak = document.getElementById('zadatak').value;




  

if(zadatak==2){
    const x=Number(a)
    if(!x){
      rezultat.innerHTML='A nije broj'
      return
    }

    const y=Number(b)
      if(!y){
      rezultat.innerHTML='B nije broj'
      return

    }const z=Number(c)
      if(!z){
      rezultat.innerHTML='C nije broj'
      return
    }

if (x<y&&x<z){rezultat.innerHTML=x}
else if(y<z&&y<x){rezultat.innerHTML=y}
else {rezultat.innerHTML=z}
      


  return
}


  // Za svaki zadatak zahtijevamo određene ulaze
  if (zadatak === '1') {
    //console.log('1. zadatak');
    //console.log(a);

    const x = Number(a); // mogu dobiti NaN
    if(!x){
      rezultat.innerHTML='A nije broj';
      return;
    }

    const y = Number(b);
    if(!y){
      rezultat.innerHTML='B nije broj';
      return;
    }
    // ovdje sam siguran kako imam brojeve u varijablama x i y
    if(x>y){
      rezultat.innerHTML=x;
    }else if(y>x){
      rezultat.innerHTML=y;
    }else{
      rezultat.innerHTML='A i B su isti';
    }
    /*
    if(a>b){
      rezultat.innerHTML=a;
    }else{
      rezultat.innerHTML=b;
    }
      */
    return; // short curcuiting prekida izvođenje cijele funkcije ()=>{}
  }

  // Ovdje će doći drugi zadatak

  
  // ovo će se ispisati ako u HTML dodatke option za zadatak a ovdje ga ne obradite
  rezultat.innerHTML = `Nepoznati zadatak ${zadatak}`;
});



