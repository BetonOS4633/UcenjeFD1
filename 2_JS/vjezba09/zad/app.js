function ucitajBroj(s){

  const b1 = Number(s)

      if (!b1) {
      rezultat.innerHTML = 'Uneseni podatak nije broj'
      return false;
      }


      if (b1 < 2 || b1 > 1000) {
      rezultat.innerHTML = 'Uneseni broj mora biti izmedju dva i deset milijuna'
      return false;

        
  }
  return b1
}







  const zadaci={
    z1:(a,b)=>{
      console.log('Zadatak 1');
        console.log(typeof(a),typeof(b));
        constb1=ucitajBroj(a);
        if(!b1){
          return
        }
        


    },
    z2:(a,b)=>{
      console.log('Zadatak 2');

    },
    z3:(a,b)=>{
      console.log('Zadatak 3');

    },
    z4:(a,b)=>{
      console.log('Zadatak 4');

    },
    z5:(a,b)=>{
      console.log('Zadatak 5');

    }
    // ovdje dodajemo nove zadatke
  }


const rezultat = document.getElementById('rezultat');
document.getElementById('izvedi').addEventListener('click', () => {

  const a = document.getElementById('a').value;
  const b = document.getElementById('b').value;
  const zadatak = document.getElementById('zadatak').value;
  if(!(('z' + zadatak) in zadaci)){
    rezultat.innerHTML = `Nepoznati zadatak ${zadatak}`;
    return;
  }
  // poziv funkcije u objektu
  zadaci['z' + zadatak](a, b);
});
