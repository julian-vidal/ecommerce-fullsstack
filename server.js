

// "use strict";
/* ============================================
Imports
============================================*/
const express = require("express");
// const Container = require("./utils/container");
const { Router } = express;
require("dotenv").config()
const cluster = require("cluster")
const {cpus} = require("os")
const logger = require("./utils/loggerConfig");
let {newUserAdminEmail, sendEmail2Admin} = require("./utils/nodemailerConfig")
const {isLoggedIn, isLoggedOut, gzipMiddleware } = require("./utils/middlewares")
const ProductModel = require("./models/ProductModel");

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
require("./utils/passport")

app.use(passport.initialize())
app.use(passport.session())


/* ============================================
Routes
============================================*/
const routerCarts = require("./routes/CartRoute");
app.use("/api/carts", routerCarts);


const ProductRoute = require("./routes/ProductRoute");
app.use("/api/products", ProductRoute);

const UserRuote = require("./routes/UserRoute")
app.use("/api/users", UserRuote)

/* ============================================
EJS setup
============================================*/
app.set("view engine", "ejs");
app.set("views", "./views");

const routerFrontEnd = Router();
app.use("/", routerFrontEnd);




// app.use(express.static(__dirname + "/../dist"));


routerFrontEnd.get("/", async (req,res) => {
    const products = await ProductModel.getAll()
    res.render("pages/index", {
        title: "Homepage",
        products,
        port: PORT,
        mode: MODE,
        user: req.user
    })
})

routerFrontEnd.get("/product/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const product = await ProductModel.getOne(id)
        res.render("pages/product", {
            title: `Product ID: ${id}`,
            product,
            port: PORT,
            mode: MODE,
            user: req.user,
            qty: 1,
        })
    } catch (err) {
        console.log(err)
    }
    
})

// Login
routerFrontEnd.get("/login", isLoggedIn, (req,res) => {
    
    res.render("pages/login", {
        title: "Login",
        user: req.user
    })
})

routerFrontEnd.post(
    "/login",
    passport.authenticate("login", {
        failureRedirect: "/error",
        failureMessage: "Invalid username or password",
        usernameField: "email",
        passwordField: "password"
    }), (req,res) => {
        req.session.user = req.user
        res.redirect("/account")
    }

)

// Signup

const multer =  require("./routes/FrontEndRoute")
routerFrontEnd.post(
    "/signup",
    passport.authenticate("signup", {
        failureRedirect: "/error",
        // failureMessage: "User already exists",
        usernameField: "email",
        passwordField: "password"
    }),
    multer.single("photo"),
    async (req,res) => {
        console.log("Aqui todo bien")
        newUserAdminEmail.subject = `New customer registered: ${req.body.first_name} ${req.body.last_name} (${req.body.email})`
        newUserAdminEmail.html = `
        Hi,<br><br>
        A new customer registered:<br>
        Name: ${req.body.first_name} ${req.body.last_name}<br>
        Email: ${req.body.email}<br>
        Address: ${req.body.address}<br>
        Age: ${req.body.age}<br>
        Phone Number: ${req.body.phone_number}
        `
        await sendEmail2Admin(newUserAdminEmail)
        logger.log("info", `New user registered: ${req.body.email}`)
        res.redirect("/")
    }
)


routerFrontEnd.get("/signup", isLoggedIn, (req,res) => {
    res.render("pages/signup", {
        title: "Sign up",
        user: req.user
    })
})

// Account
routerFrontEnd.get("/account", isLoggedOut, (req,res) => {
    res.render("pages/account",{
        title: "Account",
        email: req.user.email,
        user: req.user
    })
    logger.log("info", req.user)
})


// Logout
routerFrontEnd.get("/logout", isLoggedOut, (req,res) => {
    req.session.destroy()

    req.logout(() => {
        res.redirect("/login")
    })
} )

// Error
routerFrontEnd.get("/error", (req,res) => {
    const {messages} = req.session
    let error
    typeof messages !== "undefined" ? error = messages[messages.length-1] : error = "Something went wrong"

    res.render("pages/error",{
        error,
        title: "Error",
        user: req.user
    })
})