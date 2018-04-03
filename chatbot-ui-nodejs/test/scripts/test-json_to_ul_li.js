const JSON = {
    menu: [
        {id: '0',sub: [
            {name: 'lorem ipsum 0-0',link: '0-0', sub: null},
            {name: 'lorem ipsum 0-1',link: '0-1', sub: null},
            {name: 'lorem ipsum 0-2',link: '0-2', sub: null}
            ]
        },
        {id: '1',sub: null},
        {id: '2',sub: [
            {name: 'lorem ipsum 2-0',link: '2-0', sub: null},
            {name: 'lorem ipsum 2-1',link: '2-1', sub: null},
            {name: 'lorem ipsum 2-2',link: '2-2', sub: [
                {name: 'lorem ipsum 2-2-0',link: '2-2-0', sub: null},
                {name: 'lorem ipsum 2-2-1',link: '2-2-1', sub: null},
                {name: 'lorem ipsum 2-2-2',link: '2-2-2', sub: null},
                {name: 'lorem ipsum 2-2-3',link: '2-2-3', sub: null},
                {name: 'lorem ipsum 2-2-4',link: '2-2-4', sub: null},
                {name: 'lorem ipsum 2-2-5',link: '2-2-5', sub: null},
                {name: 'lorem ipsum 2-2-6',link: '2-2-6', sub: null}
            ]},
            {name: 'lorem ipsum 2-3',link: '2-3', sub: null},
            {name: 'lorem ipsum 2-4',link: '2-4', sub: null},
            {name: 'lorem ipsum 2-5',link: '2-5', sub: null}
            ]
        },
        {id: '3',sub: null}
    ]
};

function buildList(data, isSub){
    let html = (isSub)?'<div>':''; // Wrap with div if true
    html += '<ul>';
    for(item in data){
        html += '<li>';
        if(typeof(data[item].sub) === 'object'){ // An array will return 'object'
            if(isSub){
                html += '<a href="' + data[item].link + '">' + data[item].name + '</a>';
            } else {
                html += data[item].id; // Submenu found, but top level list item.
            }
            html += buildList(data[item].sub, true); // Submenu found. Calling recursively same method (and wrapping it in a div)
        } else {
            html += data[item].id // No submenu
        }
        html += '</li>';
    }
    html += '</ul>';
    html += (isSub)?'</div>':'';
    return html;
}

let res = buildList(JSON.menu, false);
console.log(res);