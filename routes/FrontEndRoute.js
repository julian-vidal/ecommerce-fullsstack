const multer = require("multer")

let storage = multer.diskStorage({
    destination: function(req,res,cb) {
        cb(null, "public/uploads")
    },
    filename: function(req,file,cb) {
        console.log("Executing filename", file);
        let extension = file.originalname.split(".")[file.originalname.length-1]
        cb(null, `${req.body.email}.${extension}`)
    }
})


let upload = multer({
    storage
})

module.exports = upload