"use strict";

const C_HTML_MENU_UL = '<ul class="nav nav-pills nav-stacked mostrarOpciones" data-isinit=0>[HTML_LI]</ul>';
const C_TIEMPO_EFECTO = 500;
let myData = '';
let arrNiveles = [];
let textoToWC = '';

$(document).ready(function () {

    // read 'data'
    myData = JSON.parse(data);

    // construir Menu (principal)
    let textHtml = buildMenuChat(myData, 'HOME');

    // pintar Html 
    $('#chatbotMenu-body').append(textHtml);

    // agregar 'nivel'
    console.log('nivel: ' + myData.Menu_Opciones[0].Nivel)
    addNivel(myData.Menu_Opciones[0].Nivel, textHtml);

    // log arrNiveles
    console.log(arrNiveles);
    
    $('#chatbotMenu-boton').click(function () {
        $('#chatbotMenu-body').toggle('blind', { direction: "down" }, C_TIEMPO_EFECTO);
    });

});

// evento: click en las 'opciones'
function clickOption(obj) {

    let $this = $(obj);

    console.log($this.index());
    console.log($this.text().trim());
    console.log($this.parent().parent().attr('id'));

    if ($this.index() === 0)
    {
        if ($this.text().trim() === 'RETURN') // volver anterior 'menu'
        {
            // obtener contenido html
            let idxNivActual = arrNiveles.length - 1;
            let textHtmlAnt  = arrNiveles[idxNivActual-1].html;
            
            // pintar opciones
            showOptions(textHtmlAnt, false);

            // manejo de 'niveles'
            console.log('idx nivel eliminado: ' + idxNivActual);
            arrNiveles.splice(idxNivActual, 1);
            console.log(arrNiveles);

        }
        else
        {
            console.log('arr niveles:');
            console.log(arrNiveles);
        }
    }
    else // click 'opcion'
    {
        let idOpt = $this.attr('data-id');
        let hasChilds = $this.attr('data-hasChilds');

        console.log('id opcion:' + idOpt);

        if (hasChilds === '1')
        { // tiene hijos

            // obtener contenido 'html'
            let objMenu  = searchMenuXID(myData, idOpt);
            let textHtml = buildMenuChat(objMenu, 'RETURN');

            // pintar opciones
            showOptions(textHtml, true);

            // manejo de 'niveles'
            console.log('nivel agregado: ' + objMenu.Menu_Opciones[0].Nivel);
            addNivel(objMenu.Menu_Opciones[0].Nivel, textHtml); // agregar 'nivel'
            console.log(arrNiveles);

        }
        else {
            console.log('opcion sin hijos');
        }
    }

} //END clickOption

// construir chat (div)
function buildMenuChat(objMenu, tituloMenu ) {

    console.log('*** buildMenuChat ***');

    console.log(tituloMenu);

    let textOpt    = '';
    let idOpt      = '';
    let hasChilds  = false;
    let textHtml   = '';
    let htmlMenuLI = `<li class="active" onClick='clickOption(this)'><a href="#">${tituloMenu}</a></li>`;

    if (tituloMenu === 'RETURN')
        htmlMenuLI = `<li class="active" onClick='clickOption(this)'><a href="#"><span class="glyphicon glyphicon-chevron-left">
        </span>${tituloMenu}</a></li>`;

    // recorre "Menu_Opciones"
    $.each(objMenu.Menu_Opciones, function (i, item) {
        textOpt = item.Texto;
        idOpt = item.Id;
        hasChilds = ('Menu_Opciones' in item);
        htmlMenuLI = htmlMenuLI + buildHtmlMenuLI(textOpt, hasChilds, idOpt);
    });

    textHtml = C_HTML_MENU_UL.replace('[HTML_LI]', htmlMenuLI);
    
    console.log('*** END buildMenuChat ***');

    return textHtml;

}

function searchMenuXID(refTree, idOpt) {
    let objMenu;
    let child;
    if (refTree.Menu_Opciones)
    {
        for (let i = 0; i < refTree.Menu_Opciones.length; ++i)
        {
            child = refTree.Menu_Opciones[i];
            if (child.Id === idOpt)
            {
                objMenu = child;
                break;
            }
            objMenu = searchMenuXID(child, idOpt);
            if (typeof objMenu !== 'undefined') break;
        }
        return objMenu;
    }
}

function buildHtmlMenuLI(texto, hasChilds, id) {
    let htmlLi = '';

    if (hasChilds) {
        htmlLi = `<li data-id=${id} data-hasChilds=1 onClick='clickOption(this)'>
            <a href="javascript:void(0)">
            <span class="glyphicon glyphicon-chevron-right"></span>${texto}
            </a>
        </li>`;
    }
    else {
        htmlLi = `<li data-id=${id} data-hasChilds=0 onClick='clickOption(this)'>
            <a href="javascript:void(0)">
                <span class="glyphicon"></span>${texto}
            </a>
        </li>`;
    }

    return htmlLi;

}

function showOptions(textHtml, isForward)
{
    // pintar Html
    $('#chatbotMenu-body-child').empty();
    $('#chatbotMenu-body-child').append(textHtml);

    // 'hijo' aparece y 'padre' se oculta
    if (isForward)
        runEffectForward();
    else
        runEffectReturn();

    // elemento 'padre' (se muestra actualmente)
    let elmParent = $('#chatbotMenu-body');

    // elemento 'hijo' (mostrado) se usa como 'padre'
    $('#chatbotMenu-body-child').attr("id","chatbotMenu-body");
    
    // elemento 'padre' (oculto) se toma como 'hijo'
    elmParent.attr("id","chatbotMenu-body-child");
}

function runEffectForward()
{
    $('#chatbotMenu-body').fadeOut("slow");
    $('#chatbotMenu-body-child').show("slide", {
        direction: "right"
    }, C_TIEMPO_EFECTO);
}

function runEffectReturn()
{
    $('#chatbotMenu-body').fadeOut("slow");
    $('#chatbotMenu-body-child').show("slide", {
        direction: "left"
    }, C_TIEMPO_EFECTO);
}

function addNivel(idxNivel, textoHtml)
{
    let nivel     = {};
    let arrResult = $.grep(arrNiveles, function (element, index) {
        return element.nivel === idxNivel;
    });

    if (arrResult.length === 0) // no existe
    {
        nivel = {"nivel" : idxNivel, "html" : textoHtml};
        arrNiveles.push(nivel);
    }

}
