function transfTexto(text) {
	let arrPalabras = text.split(" ");
	let cantPalabras = arrPalabras.length;
	let tamanio = 0;
	let cadena  = '';
	let nroLineas;
	let ini ;

	for (i = 0; i < cantPalabras; i++) {
		palabra = arrPalabras[i];
		if (palabra.length >= C_NUM_CARSXLINEA_CHAT) {
			nroLineas = palabra.length / C_NUM_CARSXLINEA_CHAT;
			tmpBloque = '';
			ini = 0;

			for (j = 0; j < nroLineas; j++) {
				tmpBloque = tmpBloque + palabra.substr(ini, C_NUM_CARSXLINEA_CHAT) + '<br>';
				ini = ini + C_NUM_CARSXLINEA_CHAT;
			}
			palabra=tmpBloque;
		}
		cadena=cadena+palabra+' ';
	}

	return cadena;
}

const C_NUM_CARSXLINEA_CHAT = 37;
/* const textoChat = `Para las consultas de Agenciamiento los correos de atención al cliente son:
Sede Ilo: Iloatencionalcliente@tramarsa.com.pe
Sede Lima: atencionalcliente@tramarsa.com.pe
Sede Matarani: mataraniatencionalcliente@tramarsa.com.pematarani
Sede Paita: Paitaatencionalcliente@tramarsa.com.pe`; */
//const textoChat = '1234567890123456789012345678901234';
const textoChat = `123456789012345678901234567890abcdefg1234
123456789012345678901234567890abcdefg5678
hijk`;
let retFunc = transfTexto(textoChat);

console.log(retFunc);