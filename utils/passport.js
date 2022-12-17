const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const {getOneUser, createUser} = require("../controllers/UserController")
const {comparePassword, hashPassword} = require("./bcrypt")
const {Types} = require("mongoose")
const logger = require("./loggerConfig")

passport.use(
    "login",
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, async (email, password, done) => {
        try {
            const user = await getOneUser(email)

            if (!user || !comparePassword(password, user.password)){
                const message = "User doesn't exist or password doesn't match"
                logger.log("error", message)
                return done(null, false, {message})
            }
            return done(null, user)

        } catch (error) {
            return logger.log("error", error)
        }
    })    
)

passport.use(
    "signup",
    new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email",
        passwordField: "password"
    }, async (req,email,password, done) => {
        const user = await createUser(req)
        return done(null, user)
    })
)

passport.serializeUser((user, done) => {
    done(null, user.email)
})

passport.deserializeUser(async (email,done) => {
    const user = await getOneUser(email)
    done (null, user)
})