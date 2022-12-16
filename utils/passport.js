const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
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
    }, async (req, email, password, done) => {
        const user = await getOneUser(email)
        // console.log({reqBody: req.body})

        if(user) {
            // console.log({user})
            return done(null, false, {message: "User already exists!!"})
        }

        const hashedPassword = hashPassword(password)
        const newUser = new User({
            email,
            password: hashedPassword,
            role: "CUSTOMER",
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address,
            age: req.body.age,
            phone_number: req.body.phone_number,
            photo: req.body.photo,
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