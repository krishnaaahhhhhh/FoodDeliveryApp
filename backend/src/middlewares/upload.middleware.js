const multer = require('multer');

// Configure multer to store files in memory.
// This is good for small files and for passing to cloud storage services.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = {
    upload
};
