var C_TAG_LINK_INI = '[link]';
var C_NUM_CARSXLINEA_CHAT = 21;
var contexto = {};

function insertChat(who, text) {
	var control = "";
	var cadena = "";

	if (who == "watson") {
		cadena = transfTextoBot(text);
		control = '<div class="chat-message clearfix-chatbot">' +
			'<img src="img/chatbotGR/operadora.png" alt="" width="32";height="32">' +
			'<div class="chat-message-content clearfix-chatbot">' +
			'<div class="chat-message-userWatson" id="user" disabled=false>' + cadena + '</div>' +
			'</div>' +
			'</div>';
	} else {
		cadena = transfTextoUser(text);
		control = '<div class="chat-message clearfix-chatbot ">' +
			'<div class="chat-message-user clearfix-chatbot">' +
			'<div class="chat-message-userBoot" id="user" disabled=false>' + cadena + '</div>' +
			'<div style="float:right; margin-left: 10px">' +
			'<img src="img/chatbotGR/person-avatar.png" alt="" width="32" height="32">' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>';
	}
	$("#divChatBot").append(control);
	$('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
}

function transfTextoUser(text) {
	var arrPalabras = text.split(" ");
	var cantPalabras = arrPalabras.length;
	var tamanio = 0;
	var cadena = '';

	//Por linea son maximo 21 caracteres,detectar palabras completas y no se distorsione el tamaño del div
	for (i = 0; i < cantPalabras; i++) {
		palabra = arrPalabras[i];
		tamanio = tamanio + palabra.length
		if (tamanio < C_NUM_CARSXLINEA_CHAT) {
			cadena = cadena + palabra + ' ';
		} else {
			if (palabra.length < C_NUM_CARSXLINEA_CHAT) {
				cadena = cadena + '<br>' + palabra + ' ';
				tamanio = palabra.length;
			} else {
				var nroLineas = palabra.length / C_NUM_CARSXLINEA_CHAT;
				var ini = 0;
				for (j = 0; j < nroLineas; j++) {
					tamanio = palabra.substr(ini, C_NUM_CARSXLINEA_CHAT).legnth;
					cadena = cadena + '<br>' + palabra.substr(ini, C_NUM_CARSXLINEA_CHAT);
					ini = ini + C_NUM_CARSXLINEA_CHAT;
				}
			}
		}
	}

	return cadena;
}

function transfTextoBot(text) {
	var arrPalabras = text.split(" ");
	var cantPalabras = arrPalabras.length;
	var tamanio = 0;
	var cadena = '';
	// NEW
	var tmpPalabra;
	var isTagHTML;
	var tipoTag = '';
	var tmpBloque = '';

	//Por linea son maximo 21 caracteres,detectar palabras completas y no se distorsione el tamaño del div
	for (i = 0; i < cantPalabras; i++) {
		palabra = arrPalabras[i];

		//buscar TAG
		isTagHTML = false;
		if (palabra.startsWith(C_TAG_LINK_INI)) {
			isTagHTML = true;
			palabra = palabra.replace(C_TAG_LINK_INI, '');
			tipoTag = C_TAG_LINK_INI;
		}
		//END buscar TAG

		tamanio = tamanio + palabra.length

		if (tamanio < C_NUM_CARSXLINEA_CHAT) {
			if (isTagHTML) {
				palabra = transfHtml(tipoTag, palabra);
			}
			cadena = cadena + palabra + ' ';
		}
		else {
			if (palabra.length < C_NUM_CARSXLINEA_CHAT) //long 'palabra' cabe en linea
			{
				tamanio = palabra.length;

				if (isTagHTML) {
					palabra = transfHtml(tipoTag, palabra);
				}

				cadena = cadena + '<br>' + palabra + ' ';

			}
			else //long palabra >= linea
			{
				nroLineas = palabra.length / C_NUM_CARSXLINEA_CHAT;
				ini = 0;
				tmpBloque = '';

				for (j = 0; j < nroLineas; j++) {
					tmpPalabra = palabra.substr(ini, C_NUM_CARSXLINEA_CHAT)
					tamanio = tmpPalabra.legnth;
					tmpBloque = tmpBloque + '<br>' + tmpPalabra;
					ini = ini + C_NUM_CARSXLINEA_CHAT;
				}

				if (isTagHTML) {
					tmpBloque = transfHtml(tipoTag, tmpBloque);
				}

				cadena = cadena + tmpBloque;

			}
		}
	}

	return cadena;
}

function transfHtml(tipoTag, texto) {
	var cadRetorno = '';
	var link = '';

	if (tipoTag = C_TAG_LINK_INI) // tag [link]
	{
		link = texto.replace(/<br>/g, "");
		cadRetorno = `<a href="${link}" target="_blank">${texto}</a>`;
	}

	return cadRetorno;
}

$(".mytext-chatbot").on("keyup", function (e) {
	if (e.which === 13) { // al presionar "enter"
		var text = ($(this).val()).trim();
		if (text !== "") {
			$(this).val('');
			insertChat("user", text);
			//setTimeout(enviarPregunta(text), 4000);
			setTimeout(sendOpcionesHtml(text), 4000);
		} else {
			$(this).val('');
		}

	}
});

function sendOpcionesHtml(text)
{
	divOpciones = '<';
	insertChat("watson", divOpciones);
}

// llamada ruta interna (NodeJS)
function enviarPregunta(text) {
	let dataJSON =
	{
		"texto" : text,
		"contexto" : contexto
	};
	try {
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "/api/botCall",
			data: dataJSON,
			cache: false,
			async: true,
			timeout: 10000,
			error: function (data) {
				respuesta = "Lo sentimos, por el momento no estamos disponible.";
				insertChat("watson", respuesta);
			},
			success: function (data) {
				/* var obj = JSON.parse(data);
				if (obj) {
					contexto = obj.proceso.watson.context;
					respuesta = obj.proceso.watson.output.text[0];
					insertChat("watson", respuesta);
				} */
				console.log(data);
				contexto = data.body.proceso.watson.context;
				respuesta = data.body.proceso.watson.output.text[0];
				insertChat("watson", respuesta);
			}
		});
	} catch (e) {
		respuesta = "Lo sentimos, por el momento no estamos disponible.";
		insertChat("watson", respuesta);
	}
}


// llamada servicio ASMX (scriptor)
/* function enviarPregunta(text) {

	try {
		$.ajax({
			url: "/wsProxyChatBot/wsChatBot.asmx/Conversacion",
			data: "contexto=" + JSON.stringify(contexto) + "&texto=" + text,
			cache: false,
			async: true,
			timeout: 10000,
			error: function (data) {
				respuesta = "Lo sentimos, por el momento no estamos disponible.";
				insertChat("watson", respuesta);
			},
			success: function (data) {
				var obj = JSON.parse(data);
				if (obj) {
					contexto = obj.watson.context;
					respuesta = obj.watson.output.text[0];
					insertChat("watson", respuesta);
				}
			}
		});
	} catch (e) {
		respuesta = "Lo sentimos, por el momento no estamos disponible.";
		insertChat("watson", respuesta);
	}

} */

/* (function() {

	
}) (); */

/**
 * Copiado desde boot.js
 */
$(document).ready(function () {

	$('#close-chatbot').click(function () {
		$('#popup-chatbot').fadeOut('slow');
		$('.popup-overlay-chatbot').fadeOut('slow');
		return false;
	});

	$('#live-chat-chatbot header').on('click', function () {
		$('.chat').slideToggle(300, 'swing');
		$('.chat-message-counter').fadeToggle(300, 'swing');
	});

	$('.chat-close').on('click', function (e) {
		e.preventDefault();
		$('#live-chat-chatbot').fadeOut(300);
	});

	//Inicializa chat
	//enviarPregunta('');

});

function changeImage() {
	var image = document.getElementById('imagenOpen-chatbot');
	if (image.src.match("open")) {
		image.src = "img/chatbotGR/close.png";
		$('#content-popup-chatbot').fadeIn('slow');
		$('.popup-overlay-chatbot').fadeIn('slow');
		$('.popup-overlay-chatbot').height($(window).height());
	} else {
		image.src = "img/chatbotGR/open.png";
		$("#content-popup-chatbot").hide();
	}
}
