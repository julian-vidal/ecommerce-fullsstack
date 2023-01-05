require("dotenv").config()
const {getAll, getOne} = require("../models/ProductModel")
const {PORT, MODE} = process.env
let {newUserAdminEmail} = require("../utils/nodemailerConfig")
const logger = require("../utils/loggerConfig")

// GET Requests
const index = async(req, res) => {
    try {
        const products = await getAll()
        res.render("pages/index", {
            title: "Homepage",
            products,
            port: PORT,
            mode: MODE,
            user: req.user
        })
    } catch (error) {
        logger.log("error", `Error at controllers/FrontEndController function index`)
    }
}

const singleProduct = async(req,res) => {
    const id = req.params.id;
    try {
        const product = await getOne(id)
        // console.log({product});
        res.render("pages/product", {
            title: `Product ID: ${id}`,
            product,
            port: PORT,
            mode: MODE,
            user: req.user,
            qty: 1,
        })
    } catch (err) {
        logger.log("error", `Error at controllers/FrontEndController function singleProduct`)
    }
}

const getLogin = (req,res) => {
    res.render("pages/login", {
        title: "Login",
        user: req.user
    })
}

const getSignup = (req,res) => {
    res.render("pages/signup", {
        title: "Sign up",
        user: req.user
    })
}

const getChat = (req,res) => {
    res.render("pages/chat", {
        title: "Chat",
        user: req.user
    })
}

const account = (req,res) => {
    res.render("pages/account",{
        title: "Account",
        email: req.user.email,
        user: req.user
    })
}

const logout = (req,res) => {
    req.session.destroy()

    req.logout(() => {
        res.redirect("/login")
    })
}

const error = (req, res) => {
    const {messages} = req.session
    let error
    typeof messages !== "undefined" ? error = messages[messages.length-1] : error = "Something went wrong"

    res.render("pages/error",{
        error,
        title: "Error",
        user: req.user
    })
}


// POST Requests
const postLogin = (req, res) => {
    req.session.user = req.user
    res.redirect("/account")
}

const postSignup = async (req,res) => {
    const {first_name, last_name, email, address, age, phone_number, photo} = req.body;
    console.log({reqBody: req.body});
    await newUserAdminEmail(first_name, last_name, email, address, age, phone_number)
    logger.log("info", `New user registered: ${first_name, last_name, email, address, age, phone_number}`)
    res.redirect("/account")
}

module.exports = {
    index,
    singleProduct,
    getLogin,
    getSignup,
    account,
    logout,
    error,
    getChat,
    postLogin,
    postSignup
}