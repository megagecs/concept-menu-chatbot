function insertChat(who, text,time = 0){
    var control 			= "";
	var arrPalabras 		= text.split(" ");
	var cantPalabras 		= arrPalabras.length;
	var tamanio 			= 0;
	var cadena 				= '';
	var cantCaracteLinea	= 21;
	
	//Por linea son maximo 21 caracteres,detectar palabras completas y no se distorsione el tamaño del div
	for(i=0; i<cantPalabras ;i++){
		palabra = arrPalabras[i];
		tamanio = tamanio + palabra.length
		if( tamanio < cantCaracteLinea ){
			cadena = cadena + palabra + ' ';
		}else{
			    if(palabra.length < cantCaracteLinea){
					cadena = cadena + '<br>' + palabra + ' ';
					tamanio = palabra.length;
				}else{
					var nroLineas=palabra.length/cantCaracteLinea;
					var ini=0;
					for(j=0;j<nroLineas;j++){
						tamanio = palabra.substr(ini, cantCaracteLinea).legnth;
						cadena = cadena + '<br>' + palabra.substr(ini, cantCaracteLinea);
						ini=ini+cantCaracteLinea;
					}
				}
		}
	}
	
    if (who == "watson"){
        control = '<div class="chat-message clearfix-chatbot">'+
                    '<img src="/bundles/img/chatbotGR/operadora.png" alt="" width="32";height="32">'+
                    '<div class="chat-message-content clearfix-chatbot">'+
						'<div class="chat-message-userWatson" id="user" disabled=false>'+cadena+'</div>'+
                    '</div>'+
                  '</div>';
    }else{
		
        control = '<div class="chat-message clearfix-chatbot ">'+
                    '<div class="chat-message-user clearfix-chatbot">'+
						'<div class="chat-message-userBoot" id="user" disabled=false>'+cadena+'</div>'+
					'<div style="float:right; margin-left: 10px">'+
						'<img src="/bundles/img/chatbotGR/person-avatar.png" alt="" width="32" height="32">'+
					'</div>'+
					'</div>'+
					'</div>'+
                  '</div>';
    }
	$("#divChatBot").append(control);
	$('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
}

function resetChat(){
    $("ul").empty();
}

var contexto = {};

$(".mytext-chatbot").on("keyup", function(e){
    if (e.which == 13){
        var text = ($(this).val()).trim();
		if(text !== "" ){
			$(this).val('');
			  insertChat("user", text);
			  setTimeout(enviarPregunta(text), 4000);
		}else{
			$(this).val('');
		}
		
    }
});

function enviarPregunta(text){
  
  try{
	  $.ajax({
			url: "/wsProxyChatBot/wsChatBot.asmx/Conversacion",
			data: "contexto=" + JSON.stringify(contexto)+"&texto=" + text,
			cache: false,
			async: true,
			timeout: 10000,
			error:function(data){
				respuesta = "Lo sentimos, por el momento no estamos disponible.";
				insertChat("watson", respuesta);
			},
			success: function (data) {
				var obj = JSON.parse(data);
				if(obj){
					contexto = obj.watson.context;
					respuesta = obj.watson.output.text[0];
					insertChat("watson", respuesta);
				}
			}
	   });
   }catch(e){
		respuesta = "Lo sentimos, por el momento no estamos disponible.";
		insertChat("watson", respuesta);
   }
   
}

(function() {

	$('#live-chat-chatbot header').on('click', function() {

		$('.chat').slideToggle(300, 'swing');
		$('.chat-message-counter').fadeToggle(300, 'swing');

	});

	$('.chat-close').on('click', function(e) {

		e.preventDefault();
		$('#live-chat-chatbot').fadeOut(300);

	});
  //Inicializa chat
  enviarPregunta('');
}) ();

/**
 * Copiado desde boot.js
 */
$(document).ready(function(){
  
  $('#close-chatbot').click(function(){
      $('#popup-chatbot').fadeOut('slow');
      $('.popup-overlay-chatbot').fadeOut('slow');
      return false;
  });

});

function changeImage() {
  var image = document.getElementById('imagenOpen-chatbot');
  if (image.src.match("open")) {
      image.src = "/bundles/img/chatbotGR/close.png";
      $('#content-popup-chatbot').fadeIn('slow');
      $('.popup-overlay-chatbot').fadeIn('slow');
      $('.popup-overlay-chatbot').height($(window).height());
  } else {
      image.src = "/bundles/img/chatbotGR/open.png";
      $("#content-popup-chatbot").hide();
  }

  
}
