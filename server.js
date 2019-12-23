const http = require("http"),
  url = require("url"),
  fs = require("fs");

//Create a server
http
  .createServer((request, response) => {
    //Variable that holds the request url
    var addr = request.url;
    //Variable to parse the url
    var parsedUrl = url.parse(addr, true);
    //Empty variable ready for a filePath
    var filePath = "";

    //Check if the user has requested the documentation
    if (parsedUrl.includes("documentation")) {
      filePath = __dirname + "/documentation.html";
    } else {
      //If they haven't send them home
      filePath = "index.html";
    }

    //Let's write the request using the file system module
    fs.appendFile(
      "../log.txt",
      "URL: " + addr + "\nTimestamp: " + new Date() + "\n\n",
      function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Added to log.");
        }
      }
    );
  })
  .listen(8080);
