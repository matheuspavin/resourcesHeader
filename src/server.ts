import errorHandler from "errorhandler";

import app from "./app";

/**
 *  /TODO
  remove for production
 */
app.use(errorHandler());

const server = app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
});

export default server;