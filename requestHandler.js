const mariadb = require('./database/connect/mariadb');
const fs = require('fs');
const main_View = fs.readFileSync('./main.html', 'utf-8')
const orderlist_View = fs.readFileSync('./orderlist.html', 'utf-8')


function main(response) {
    console.log("main");

    mariadb.query("select * from product", function(err, rows) {
        console.log(rows);
    })

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(main_View);
    response.end();
}

function orderlist(response) {
    console.log("orderlist");

    response.writeHead(200, {'Content-Type': 'text/html'});

    mariadb.query("select * from orderlist", function(err, rows) {
        response.write(orderlist_View);

        rows.forEach(Element => {
            response.write("<tr>"
                + "<td>" + Element.product_id + "</td>"
                + "<td>" + Element.order_date + "</td>"
                + "</tr>");
            });
        
        response.write("</table>");
        response.end();
    })
}

function redRacket(response) {
    fs.readFile('./img/redRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end(); 
    })
}

function blueRacket(response) {
    fs.readFile('./img/blueRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end(); 
    })
}

function blackRacket(response) {
    fs.readFile('./img/blackRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end(); 
    })
}

function getCss(response) {
    fs.readFile('main.css', function(err, data) {
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.write(data);
        response.end(); 
    })
}

function order(response, productId) {
    response.writeHead(200, {'Content-Type': 'text/html'});

    mariadb.query("insert into orderlist values (?, ?)", [productId, new Date().toLocaleDateString()], function(err, rows) {
        console.log(rows);
    })
}

let handle = {};
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

/* image directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;
handle['/main.css'] = getCss;

exports.handle = handle;