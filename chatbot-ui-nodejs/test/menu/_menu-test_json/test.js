//leer archivo
const fs = require('fs');

fs.readFile('dataMenu.json', 'utf-8', (err, data) => {

    console.log('inicio');
    let objMenu  = JSON.parse(data);
    console.log (objMenu);
    searchMenuXID (objMenu, "1");
    

    }
);

let objBuscado = {};
let BreakException = {};
//let resultado = searchMenuXID (objMenu, "1");

//console.log(resultado);
//console.log(objMenu);
//console.log(texto);

// recorre "Menu_Opciones"
//$.each(objMenu.Menu_Opciones, function (i, item) {


function searchMenuXID (objMenuParam, idOptBus)
{
    objMenuParam.Menu_Opciones.forEach(item => {
        
        textOpt = item.Texto;
        idOpt = item.Id;
        nivel = item.Nivel;
        hasChilds = ('Menu_Opciones' in item);

        console.log(textOpt);
        console.log(idOpt);
        console.log(nivel);

        if (item.Id === idOptBus) {
            objBuscado = item;
            console.log(objBuscado);
        }
        else {
            if ('Menu_Opciones' in item)
                objMenuParam = searchMenuXID(item.Menu_Opciones, idOpt);
        }

    });

    //return objBuscado;
}