const myData = 
{
    "Menu_Opciones" :
    [
        {
            "Texto": "Group 1",
            "Id": "1",
            "Nivel": "1",
            "Menu_Opciones":
            [
                {
                    "Texto": "Sub Group 1.1",
                    "Id": "1.1",
                    "Nivel": "2",
                    "Menu_Opciones":
                    [
                        {
                            "Texto":"Item 1.1.1",
                            "Id": "1.1.1",
                            "Nivel": "3"
                        },
                        {
                            "Texto":"Item 1.1.2",
                            "Id": "1.1.2",
                            "Nivel": "3",
                        },
                        {
                            "Texto":"Item 1.1.3",
                            "Id": "1.1.3",
                            "Nivel": "3"
                        }
                    ]
                },
                {
                    "Texto": "Sub Group 2",
                    "Id": "2.1",
                    "Nivel": "2",
                    "Menu_Opciones":
                    [
                        {
                            "Texto":"Item 2.1.1",
                            "Id": "2.1.1",
                            "Nivel": "3",
                            "Menu_Opciones":
                            [
                                {
                                    "Texto":"Item 2.1.1.1",
                                    "Id": "2.1.1.1",
                                    "Nivel": "4"
                                },
                                {
                                    "Texto":"Item 2.1.1.2",
                                    "Id": "2.1.1.2",
                                    "Nivel": "4"
                                },
                            ]
                        },
                        {
                            "Texto":"Item 2.2",
                            "Nivel": "3"
                        },
                        {
                            "Texto":"Item 2.3",
                            "Nivel": "3"
                        }
                    ]
                },

            ]
        },
        {
            "Texto": "Group 2",
            "Id": "2",
            "Nivel": "1",
            "Menu_Opciones":
            [
                {
                    "Texto": "Item 2.1",
                    "Id": "2.1",
                    "Nivel": "2",
                },
                {
                    "Texto": "Item 2.2",
                    "Id": "2.2",
                    "Nivel": "2",
                }
            ]
        },
        {
            "Texto": "Item 3",
            "Id": "2",
            "Nivel": "1",
        },
        {
            "Texto": "Item 4",
            "Id": "2",
            "Nivel": "1",
        }
    ]
};

function buildMenuAccordion(data)
{
    let textHtml = '<ul>';
    let item;
    
    // recorre "Menu_Opciones"
    for (item in data)
    {
        if (typeof(data[item].Menu_Opciones) === 'object') 
        { // tiene hijos
            textHtml += 
            `<li class="has-children" data-hasChilds=1 onClick='clickOption(this)'>
                <input type="checkbox" name="${data[item].Texto}" id="${data[item].Id}" checked>
			    <label for="${data[item].Id}">${data[item].Texto}</label>`;
            textHtml += buildMenuAccordion(data[item].Menu_Opciones, true);
            textHtml += '</li>';
        }
        else
        {
            textHtml += `<li data-hasChilds=0 onClick='clickOption(this)'><a href="#">${data[item].Texto}</a></li>`;
        }
    }

    textHtml += '</ul>';

    return textHtml;
}

console.log(buildMenuAccordion(myData.Menu_Opciones));