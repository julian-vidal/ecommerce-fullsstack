const bcrypt = require("bcrypt")

module.exports = {
    hashPassword: password => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
    },
    comparePassword: (password, hashedPassword) => {
        return bcrypt.compareSync(password, hashedPassword)
    }
}