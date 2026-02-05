
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

//8. Za upisane pojmove A i B upiši ih jedno pored drugog
if(zadatak==8){
  if(!a||!b){
    rezultat.innerHTML='Obavezno unijeti pojmove A i B'
    return  
  } 
  rezultat.innerHTML=`${a} ${b}`
  return
}






//7. Za uneseno ime grada u polju B ispiši da lije sjedište Edunove"
if( zadatak==7){
  if (!b){
    rezultat.innerHTML='Obavezan unos grada pod vrijednost B'
    return
  }
  if(b.toLowerCase ==='osijek') 
    {rezultat.innerHTML=`${b} je sjedište Edunove`}
  else{rezultat.innerHTML=`${b} nije sjedište Edunove`}
    
  return
}



//6. Za upisani broj  u D ispiši 10 puta veći broj
if (zadatak==6){

  const x=Number(d)
  if(!x || x===0 ){
    rezultat.innerHTML='D nije broj ili je nula'
      return
  }
rezultat.innerHTML=x*10
return
}


if(zadatak==5){
  console.log('Rješavamo zadatak 5');
  //Zbroj većih broje (A i B)+(C i D )
    const x=Number(a)
    const y=Number(b)
    const z=Number(c)
    const q=Number(d) 
    if(!x||!y||!z||!q){ 
      rezultat.innerHTML='Jedno od unosnih polja nije broj'
    }
      if (x>y&&z>q){rezultat.innerHTML=x+z}
      else if(y>x&&z>q){rezultat.innerHTML=y+z}
      else if(x>y&&q>z){rezultat.innerHTML=x+q}
      else if(y>x&&q>z){rezultat.innerHTML=y+q}

   return

    // moje rješenje
    //  if(x<y){g=x}else{g=y}
    //  if(z<q){h=x:}else{h=y}
    //  rezultat.innerHTML=g+h




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



