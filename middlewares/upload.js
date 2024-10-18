const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Setup storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,"public/assets/images/products"); // Use the correct path

  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename the file with a timestamp
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|gif|png/; // Only accept JPEG, JPG, or GIF
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
 
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Error, Image only!")); // Use Error object for error messages
    }
  },
});
// if(multer.limits.fileSize > 5000000){
//   console.log("image size is bigger");
  
// }

module.exports = upload;
