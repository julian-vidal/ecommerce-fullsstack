const multer = require("multer")

let storage = multer.diskStorage({
    destination: function(req,res,cb) {
        cb(null, "uploads")
    },
    filename: function(req,file,cb) {
        let extension = this.filename.split(".")[this.filename.length-1]
        cb(null, `${req.body.email}.${extension}`)
    }
})


let upload = multer({
    storage
})

upload.post()