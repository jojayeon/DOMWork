const http = require('http');
const fs = require('fs');
const path = require("path");

const server = http.createServer((req,res) => {
  if(req.method ==="GET") {
    if(req.url === "/") {
      fs.readFile(path.join(__dirname, "index1.html"), (err, data) => {
        if(err) {
          res.writeHead(500, {"Content-type": "text/plain"});
          res.end("500code 서버자레의 에러");
          return;
        }
        res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
        res.end(data);
      })
    } else {
      res.writeHead(404, {"Content-type": "text/plain; charset=utf-8"});
      res.end("404 code 서버자레의 에러");
      return;
    }
  }else if (req.method === "POST") {
    if(req.url === "submit") {
      let body = "";
      res.on("data",(chunk)=>{
        body += chunk.tostring();
      });
      req.on("end", () => {
        const parsedData = new URLSearchParams(body);
        const title = parsedData.get("title");
        const content = parsedData.get("content");

        const jsonData = {
          title: title,
          content: content,
        };

        const jsonDataString = JSON.stringify(jsonData, null, 2);
        fs.writeFile(path.join(__dirname, "data.json"), jsonDataString, (err)=> {
          if(err) {
            res.writeHead(500, {"Content-type": "text/plain"});
            res.end("500code 서버자체의 에러");
            return;
          }
          res.writeHead(200, {"Content-type": "text/plain; charset=utf-8"});
          let jsonResponse = JSON.stringify({message: "데이터저장 성공"});
          res.end(jsonResponse);
        });
      });
    } else {
      res.writeHead(404, {"Content-type": "text/plain; charset=utf-8"});
      res.end("404 code 서버자레의 에러");
      return;
    }
  } else {
    res.writeHead(404, {"Content-type": "text/plain; charset=utf-8"});
    res.end("404 code 서버자레의 에러");
    return;
  }
})
const port = 3000;
server.listen(port, () =>{
  console.log(`http://localhost:${port}`);
});