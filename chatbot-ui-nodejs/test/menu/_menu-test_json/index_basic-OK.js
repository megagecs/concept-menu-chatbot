const C_HTML_MENU_UL = '<ul class="nav nav-pills nav-stacked mostrarOpciones" data-isinit=0>[HTML_LI]</ul>';
let myData = '';

$(document).ready(function () {

    // read 'data'
    myData = JSON.parse(data);

    // construir Menu (principal)
    buildMenuChat(myData, 'HOME', '#chatbotMenu-body');

    //initialise();

    $('#chatbotMenu-boton').click(function () {
        $('#chatbotMenu-body').toggle('blind', { direction: "down" }, 500);
    });

});

/* $('.mostrarOpciones li').click(function () {
    console.log($(this).index());
    console.log($(this).text().trim());

    let containerID = $(this).parent().parent().attr('id');

    if ($(this).index() === 0)
    {

        if ($(this).text().trim() === 'RETURN')
        { // volver anterior 'menu'
            runEffect();
           // $('#chatbotMenu-body-child').empty(); //remover 'UL'
        }

    }
    else // click 'opcion'
    {
        let idOpt = $(this).attr('data-id');
        let hasChilds = $(this).attr('data-hasChilds');
        if (hasChilds) { // tiene hijos
            $('#chatbotMenu-body-child').empty();
            let objMenu = searchMenuXID(myData, idOpt);
            buildMenuChat(objMenu, 'RETURN', '#chatbotMenu-body-child')
            runEffect();
        }

    }
}); */


function clickOption(obj) {

    //console.log(this);

    let $this = $(obj);

    console.log($this.index());
    console.log($this.text().trim());

    if ($this.index() === 0)
    {
        if ($this.text().trim() === 'RETURN')
        { // volver anterior 'menu'
            runEffect();
           // $('#chatbotMenu-body-child').empty(); //remover 'UL'
        }
    }
    else // click 'opcion'
    {
        let idOpt = $this.attr('data-id');
        let hasChilds = $this.attr('data-hasChilds');
        if (hasChilds) { // tiene hijos
            $('#chatbotMenu-body-child').empty();
            let objMenu = searchMenuXID(myData, idOpt);
            buildMenuChat(objMenu, 'RETURN', '#chatbotMenu-body-child')
            runEffect();
        }
    }

} //END clickOption

// construir chat (div)
function buildMenuChat(objMenu, tituloMenu, nombreDiv) {

    console.log('*** buildMenuChat ***');

    console.log(objMenu);
    console.log(tituloMenu);
    console.log(nombreDiv);

    let textOpt = '';
    let idOpt = '';
    let hasChilds = false;
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

        console.log(textOpt);

        //console.log(i)
        //console.log(item);
        //console.log(item.Menu_Opciones[0]);
    });
    

    textHtml = C_HTML_MENU_UL.replace('[HTML_LI]', htmlMenuLI);
    $(nombreDiv).append(textHtml);

    //initialise($(nombreDiv));

    console.log('*********');

}

function searchMenuXID(refTree, idOpt) {
    let objMenu = {};

    $.each(refTree.Menu_Opciones, function (i, item) {
        if (item.Id === idOpt) {
            objMenu = item;
            return false;//break
        }
        else {
            if ('Menu_Opciones' in item)
                objMenu = searchMenuXID(item.Menu_Opciones, idOpt);
        }
    });

    console.log('Menu encontrado:');
    console.log(objMenu);

    return objMenu;

}


function buildHtmlMenuLI(texto, hasChilds, id) {
    let htmlLi = '';

    if (hasChilds) {
        htmlLi = `<li data-id=${id} data-hasChilds=${hasChilds} onClick='clickOption(this)'>
            <a href="javascript:void(0)">
            <span class="glyphicon glyphicon-chevron-right"></span>${texto}
            </a>
        </li>`;
    }
    else {
        htmlLi = `<li data-id=${id} data-hasChilds=${hasChilds} onClick='clickOption(this)'>
            <a href="javascript:void(0)">
                <span class="glyphicon"></span>${texto}
            </a>
        </li>`;
    }

    return htmlLi;

}

function runEffect()
{
    $('#chatbotMenu-body').fadeToggle("slow");
    $('#chatbotMenu-body-child').toggle("slide", {
        direction: "right"
    }, 500);
}