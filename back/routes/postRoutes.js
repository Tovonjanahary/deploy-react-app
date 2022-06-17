const service = require("../controllers/Post");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const route = require("express").Router();
const protection = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../build/img');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

route.post("/service/addPost/:id", upload.single('image'), service.addPost);
route.get("/service/get", service.getPost);
route.get("/service/getSingleService/:id", service.getSinglePost);
route.delete("/service/deleteService/:id", protection, service.deletePost);

module.exports = route;