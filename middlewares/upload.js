const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Setup storage for multer
const storage = multer.diskStorage({
    description:(req,file,cb)=>{
        cb(null, 'public/assets/image/categoris');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+ '-' + file.originalname); // Rename the file with a timstamp
    }
});


const upload = multer({
    storage:storage,
    limits:{fileSize:5000000},
    fileFilter:(req,file,cb)=>{
        const filetypes = /jpeg|jpg|gif/; 
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if(mimetype&&extname){
            return cb(null,true);
        }else{
            cb('Error,Image only!');
        }
      }

});

module.exports = upload