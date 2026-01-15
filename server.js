let http = require('http');
let url = require('url');


function start(route, handle) { 
    function onRequest(request, response) {  
        let pathname = url.parse(request.url).pathname;
        let queryData = url.parse(request.url, true).query;
        let productId = queryData.productId;

        if (pathname === '/favicon.ico') {
            response.writeHead(204);
            return response.end();
        }
        route(pathname, handle, response, productId);
    }

    http.createServer(onRequest).listen(8888);
}

exports.start = start;