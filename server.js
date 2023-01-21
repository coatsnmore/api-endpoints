const http = require("http");

const server = http.createServer((request, response) => {
  const requestStart = Date.now();

  let errorMessage = null;
  let body = [];
  request.on("data", chunk => {
    body.push(chunk);
  });
  request.on("end", () => {
    body = Buffer.concat(body);
    body = body.toString();
  });
  request.on("error", error => {
    errorMessage = error.message;
  });

  response.on("finish", () => {
    const { rawHeaders, httpVersion, method, socket, url } = request;
    const { remoteAddress, remoteFamily } = socket;

    console.log(
      JSON.stringify({
        timestamp: Date.now(),
        processingTime: Date.now() - requestStart,
        rawHeaders,
        body,
        errorMessage,
        httpVersion,
        method,
        remoteAddress,
        remoteFamily,
        url
      })
    );
  });

  process(request, response);
});

const process = (request, response) => {
  setTimeout(() => {
    response.end();
  }, 100);
};

  server.listen(8888);