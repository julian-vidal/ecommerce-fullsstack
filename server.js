

// "use strict";
/* ============================================
Imports
============================================*/
const express = require("express");
// const Container = require("./utils/container");
const { Router } = express;
const axios = require("axios").default;

require("dotenv").config()

// import { Router } from express;
// import axios from "axios";




/* ============================================
Server setup
============================================*/

const app = express();
const PORT = process.env.PORT || 8081;
const MODE = process.env.MODE || "LOCAL";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const server = app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});
server.on("error", err => console.log());

const IS_ADMIN = true;
const PERMSSION_ERROR_MSG = "You don't have permission to perform this action";

const {isLoggedIn, isLoggedOut } = require("./utils/middlewares")

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
const logger = require("./utils/loggerConfig");
require("./utils/passport")

app.use(passport.initialize())
app.use(passport.session())


/* ============================================
Routes
============================================*/
const routerCarts = require("./routes/CartRoute");
app.use("/api/carts", routerCarts);


const ProductRoute = require("./routes/ProductRoute");
// const routerProducts = require("./routes/products");
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
    const products = await axios.get(`http://localhost:${PORT}/api/products`)
    logger.log("info", `User: ${req.user}`)
    res.render("pages/index", {
        title: "Homepage",
        products: products.data,
        port: PORT,
        mode: MODE,
        user: req.user
    })
})

routerFrontEnd.get("/product/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const product = await axios.get(`http://localhost:${PORT}/api/products/${id}`);
        res.render("pages/product", {
            title: `Product ID: ${req.params.id}`,
            product: product.data,
            port: PORT,
            mode: MODE,
            user: req.user
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
routerFrontEnd.post(
    "/signup",
    passport.authenticate("signup", {
        failureRedirect: "/error",
        failureMessage: "User already exists",
        usernameField: "email",
        passwordField: "password"
    }), (req,res) => {
        console.log(Object.keys(res))
        res.redirect("/")
    }
)


routerFrontEnd.get("/signup", isLoggedIn, (req,res) => {
    res.render("pages/signup", {
        title: "Sign up",
        user: req.user
    })
})

// Acoount
routerFrontEnd.get("/account", isLoggedOut, (req,res) => {
    res.render("pages/account",{
        title: "Account",
        email: req.user.email,
        user: req.user
    })
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