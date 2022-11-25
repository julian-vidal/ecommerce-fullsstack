const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
// const {User} = require("../dao/UserDaoMongo")
const {User, getOneUser} = require("../controllers/UserController")
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
                return done(null, false, {message: "User doesn't exist or password doesn't match"})
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
    }, async (req, email, password, done) => {
        const user = await getOneUser(email)

        if(user) {
            return done(null, false, {message: "User already exists"})
        }

        const hashedPassword = hashPassword(password)
        const newUser = new User({
            email,
            password: hashedPassword,
            role: "CUSTOMER"
        })

        await newUser.save()
        return done(null, newUser)        
    })
)

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id,done) => {
    id = Types.ObjectId(id)
    const user = await User.findById(id)
    done (null, user)
})