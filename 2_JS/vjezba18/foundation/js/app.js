$(document).foundation();

//u$() dolazi selektor
//.click je jedna od 1000 mogućnosti jQuery nudi
// u click() dolazi funcija
$('#promjeniNaslov').click(function(){
    console.log('Klicnuo sam Simle button')
    $('#naslov').text('Dobro došli');

// sprečava zadano pobnašanje elementa
    return false;

});

// kada kliknem Succes button 

$('#sakrijKomponente').click(()=>{
    console.log('može arrow function');
    $('#komponente').hide();
    return false;
    
})


$('#pokaziKomponente').dblclick(()=>{
    $('#komponente').show();
});


$('#oblikujNaslov').click(()=>{
    $('#naslov').css('color ','red');
    $('#naslov').css('text-decoratin','underline');
    $('#naslov').after('<hr />');
    return false
});


const boja = 'rgb(214.8186602871, 235.9894736842, 250.0313397129)';

$('.callout.primary').mouseover(function(){
    // $(this) je onaj na kojem si trenutno
    $(this).css('background-color','#eee');
});

$('.callout.primary').mouseout(function(){
    // $(this) je onaj na kojem si trenutno
    $(this).css('background-color',boja);
});

$('#unos').keyup(function(e){
    if(e.key==='b' || e.key==='B'){
        $('p').css('color','red');
    }

    if(e.key==='r' || e.key==='R'){
        $('p').css('color','black');
    }
});