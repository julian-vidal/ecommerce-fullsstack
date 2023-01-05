

// "use strict";
/* ============================================
Imports
============================================*/
const express = require("express");
// const Container = require("./utils/container");
require("dotenv").config()
const cluster = require("cluster")
const {cpus} = require("os")
const logger = require("./utils/loggerConfig");

/* ============================================
Server setup
============================================*/
const numCPUs = cpus().length
/*
if (cluster.isPrimary) {
    logger.log("info", `Cluster started. CPUS: ${numCPUs}`)
    logger.log("info", `PID: ${process.pid}`)
    for (let i=0; i<numCPUs; i++) {
        cluster.fork()
    }

    cluster.on("exit", worker => {
        logger.log("warn", `Worker ${worker.process.pid} died`)
    })
} else {

}
*/


const app = express();
const PORT = process.env.PORT || 8081;
const MODE = process.env.MODE || "LOCAL";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const server = app.listen(PORT, () => {
    logger.log("info", `Server is listening at port ${PORT}`)
});
server.on("error", err => logger.log("error", err ));

const IS_ADMIN = true;
const PERMSSION_ERROR_MSG = "You don't have permission to perform this action";



// app.use("/public", express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/public"))
/* ============================================
Express Session
============================================*/

const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(session({
    store: new MongoStore({
        mongoUrl: process.env.MONGO_URL_SESSIONS,
        // ttl: 60*60*24,
        // retries:0
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
})) 

/* ============================================
Passport
============================================*/

const passport = require("passport");
// require("./utils/passport")

app.use(passport.initialize())
app.use(passport.session())

/* ============================================
EJS setup
============================================*/
app.set("view engine", "ejs");
app.set("views", "./views");


/* ============================================
Routes
============================================*/
const routerCarts = require("./routes/CartRoute");
app.use("/api/carts", routerCarts);


const ProductRoute = require("./routes/ProductRoute");
app.use("/api/products", ProductRoute);

const UserRuote = require("./routes/UserRoute")
app.use("/api/users", UserRuote)

const routerSession = require("./routes/SessionRoute")
app.use("/api/session", routerSession)

const routerOrders = require("./routes/OrderRoute")
app.use("/api/orders", routerOrders)

const routerFrontEnd = require("./routes/FrontEndRoute")
app.use("/", routerFrontEnd);