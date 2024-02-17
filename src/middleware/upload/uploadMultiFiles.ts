import multer from 'multer';
import { UploadPath } from '../../enums/uploadPath';

require('dotenv').config();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UploadPath.FILE); // Set the destination folder where files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Set the filename to be unique
    },
});

const uploadFiles = multer({ storage });

export default uploadFiles;