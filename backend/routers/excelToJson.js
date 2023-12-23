const excelAppRouter = require('express').Router();

const multer = require('multer');
const path = require('path'); // for file path operations
const xlsx = require('xlsx');
const fs = require('fs'); // for file system operations


const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    // Validate file type and size
    if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
        || file.size > 30 * 1024 * 1024) {
      cb(new Error('Invalid file type or size'));
    } else {
      cb(null, true);
    }
  }
});

excelAppRouter.get('/', upload.single('file'), async (req, res) => {
  try {
    //const workbook = xlsx.readFile(req.file.path);
    const workbook = xlsx.readFile(req.body.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Secure file deletion
    //const filePath = path.join(__dirname, 'uploads', req.file.filename);
    //fs.unlinkSync(filePath);

    res.json(jsonData);
  } catch (error) {
    console.error(error);
    // Log error for debugging
    await new Promise((resolve, reject) => {
      fs.appendFile('error.log', `${new Date().toISOString()} - ${error.message}\n`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Send user-friendly error message
    return res.status(400).json({ error: 'Failed to process Excel file. Please check file format and try again.' });
  }
});

module.exports = excelAppRouter;


