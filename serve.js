import { getPortPromise } from "portfinder";
import { Server } from "node-static";
import { createServer } from "http";

/** @type {NWJS_Helpers.WindowOpenOption} */
const options = {};

const main = async () => {
  const port = await getPortPromise({ port: 9000 });

  var file = new Server("./app", { cache: 0 });

  createServer((req, res) => {
      req
        .addListener("end", () =>
          file.serve(req, res, (err) => err && err.status === 404 && file.serveFile("/index.html", 200, {}, req, res)),
        )
        .resume();
    })
    .listen(port, "localhost");

  // eslint-disable-next-line no-undef
  nw.Window.open("http://localhost:" + port, options, () => {});
};

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "development") nw.Window.open("http://localhost:5173", options, () => {});
else main();
