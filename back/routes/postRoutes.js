const service = require("../controllers/Post");
const route = require("express").Router();
const protection = require('../middleware/authMiddleware');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, '../public/img');
//     },
//     filename: function(req, file, cb) {   
//         cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if(allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

// let upload = multer({ storage, fileFilter });

route.post("/service/addPost/:id", service.addPost);
route.get("/service/get", service.getPost);
route.get("/service/getSingleService/:id", service.getSinglePost);
route.delete("/service/deleteService/:id", protection, service.deletePost);

module.exports = route;