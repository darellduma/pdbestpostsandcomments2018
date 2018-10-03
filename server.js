let http = require('http');
let fs = require('fs');
let url = require('url');

http.createServer((request,response)=>{
    let pathname = url.parse(request.url).pathname;
    response.writeHead(200,{'Content-Type': 'text/html'});

    fs.readFile(pathname.substr(1),((err,data)=>{
        if(err){
            console.log(err);
            response.writeHead(404,{'Content-Type' : 'text/html'});
        } else{
            response.writeHead(200,{'Content-Type' : 'text/html'});
            response.write(data.toString());
        }
        response.end();
    }));
}).listen(8000);

console.log('Server running at port 8000...');