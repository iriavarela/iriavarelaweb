var tagList = false;

$( document ).ready(function() {

  tagList = capturaTags();
  $('.menuTags').html( tagList );
  $('.menuTags').append( '<i onclick="filtraProxecto(\'borrar\')" style="display:none;" class="borrarFiltros fa fa-times" aria-hidden="true"></i>' );
;
  $('.tags a').click( function(ev){
    filtraProxecto($(ev.target).text());
  } );

});

// RECOLLE LISTA DE TAGS
function capturaTags() {
  var rawTags = [];
  var tags = [];
  $('.proxecto .tags a').each( function(i,e){
    console.log($(e).text())
    if( $.inArray( $(e).text(), rawTags ) == -1 ) {
      tags.push($(e).clone() );
      rawTags.push( $(e).text() )
    }
  });

  return tags;
}



// OCULTA TODOS OS PROXECTOS QUE NON TEÑAN O TAG
function filtraProxecto(tag) {
  var elementosFila = 4;

  $('.proxectosFiltrados').html('')
  $('.proxectos').hide();
  if( tag != 'borrar') {
    setFiltroSeleccionado(tag);
    var contador = 0;
    var htmlFila = '';


    $('.proxectos .proxecto').each( function(i,e){


      if( contador == 4 ) {
        $('.proxectosFiltrados').append( filaHTML(htmlFila) );
          //console.log('fila',filaHTML(htmlFila))

        htmlFila = '';
      }

      $(e).find('.tags a').each( function(i2,e2) {
        if( $(e2).text() == tag ) {
          htmlFila += colHTML( $(e).clone().html() );
          //console.log('columna', colHTML( $(e).clone().html() ))
          contador++;
        }
      });


    });
    $('.proxectosFiltrados').append( filaHTML(htmlFila) );

    // rebind proxectos
    $('.proxectosFiltrados a').click( function(ev){
      filtraProxecto($(ev.target).text());
    } );

    $('.borrarFiltros').show();
  }
  else {
    setFiltroSeleccionado(false);
    $('.proxectos').show();
    $('.borrarFiltros').hide();
  }
}


function colHTML( interior ) {
  return '<div class="proxecto col-md-3 col-xs-6">' + interior +'</div>';
}

function filaHTML( interior ) {
  return '<div class="row">' + interior +'</div>';
}

function setFiltroSeleccionado( filtro ) {

  $('.menuTags a').removeClass('seleccionado');
  if(filtro != false) {

    $('.menuTags a').each( function(i,e){
      if($(e).text() == filtro) {
        $(e).addClass('seleccionado')
      }

    });
  }
}