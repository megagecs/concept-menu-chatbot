$(document).ready(function() {
    $('#chatbotMenu-boton').click(function () {
        $('#chatbotMenu-body').toggle('blind', { direction: "down" }, 1000);
    });

   $('.mostrarOpciones li').click(function () {
        //alert('click opcion');
        //lert($(this).index() + $(this).text());
        console.log($(this).text().trim());
        console.log($(this).parent().parent().attr('id'));
        console.log("'---");

        var containerID = $(this).parent().parent().attr('id');

        if ($(this).index() === 0)
        {

            if (containerID === 'chatbotMenu-body-child')
            {
                $('#chatbotMenu-body').fadeToggle("slow");
                $('.slider').toggle("slide", {
                    direction: "right"
                }, 500);
            }
        }
        else
        {
            if (containerID !== 'chatbotMenu-body-child')
            {
                $('#chatbotMenu-body').fadeToggle("slow");
                $('.slider').toggle("slide", {
                    direction: "right"
                }, 500);
            }
        }
    });

    // 1er 'li' click (return)
    /* $('.mostrarOpciones li:eq(0)').click(function () {
        alert($(this).text);
        
        //if ('')
        $('.slider').toggle("slide", {
            direction: "left"
        }, 500);
        $('#chatbotMenu-body').fadeToggle("slow");
    }); */

});