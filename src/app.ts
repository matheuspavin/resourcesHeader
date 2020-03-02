import express from "express";
import compression from "compression"; 
import bodyParser from "body-parser";
// import mongo from "connect-mongo";
// import path from "path";
// import mongoose from "mongoose";
// import bluebird from "bluebird";
// import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

// const MongoStore = mongo(session);

// Controllers
import * as headerController from "./controllers/header";


// Create Express server
const app = express();

// // Connect to MongoDB
// const mongoUrl = MONGODB_URI;
// mongoose.Promise = bluebird;

// mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
//     () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
// ).catch(err => {
//     console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
//     // process.exit();
// });

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({
//     resave: true,
//     saveUninitialized: true,
//     secret: SESSION_SECRET,
//     store: new MongoStore({
//         url: mongoUrl,
//         autoReconnect: true
//     })
// }));
app.use((req, res, next) => {
    next();
});
app.use((req, res, next) => {
    next();
});

/**
 * primary routes.
 */
app.get("/header", headerController.getHeader);

export default app;