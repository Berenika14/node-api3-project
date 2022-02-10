// require your server and launch it

const server = require("./api/server");

const PORT = 3333;

server.listen(PORT, () => {
  console.log("Server listening on port 3333 😀");
});
