const multer = require("multer");

const storage = multer.memoryStorage();

/*
|--------------------------------------------------------------------------
| MIME TYPE MAP
|--------------------------------------------------------------------------
*/

const allowedMimeTypes = new Set([
  // CSV
  "text/csv",
  "text/plain",
  "application/csv",

  // TSV
  "text/tab-separated-values",
  "text/tsv",

  // XLSX
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

  // XLS (legacy)
  "application/vnd.ms-excel",
  "application/excel",
  "application/x-excel",

  // JSON
  "application/json",
  "text/json",

  // XML
  "application/xml",
  "text/xml",
]);

/*
|--------------------------------------------------------------------------
| EXTENSION WHITELIST
|--------------------------------------------------------------------------
*/

const allowedExtensions = new Set([
  ".csv",
  ".tsv",
  ".xlsx",
  ".xls",
  ".json",
  ".xml",
]);

/*
|--------------------------------------------------------------------------
| FILE FILTER
|--------------------------------------------------------------------------
*/

const fileFilter = (req, file, cb) => {
  const ext = "." + file.originalname.split(".").pop().toLowerCase();

  const mimeOk = allowedMimeTypes.has(file.mimetype);
  const extOk  = allowedExtensions.has(ext);

  if (mimeOk || extOk) {
    return cb(null, true);
  }

  return cb(
    Object.assign(
      new Error(
        `Unsupported file type. ` +
        `Received mime="${file.mimetype}" ext="${ext}". ` +
        `Accepted: .csv, .tsv, .xlsx, .xls, .json, .xml`
      ),
      { code: "INVALID_FILE_TYPE", status: 400 }
    ),
    false
  );
};

/*
|--------------------------------------------------------------------------
| MULTER CONFIG
|--------------------------------------------------------------------------
*/

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024,
    files: 1,
  },
  fileFilter,
});

/*MULTER WRAPPER*/

const multerUpload = (req, res, next) => {
  upload.single("file")(req, res, (err) => {

    if (!err) return next();

    console.error("[Multer Error]", err.code ?? "NO_CODE", err.message);

    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        success: false,
        message: "File too large. Maximum allowed size is 50MB.",
      });
    }

    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        success: false,
        message: "Unexpected field name. Use 'file' as the form field name.",
      });
    }

    if (err.code === "INVALID_FILE_TYPE") {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    return res.status(400).json({
      success: false,
      message: `File upload failed: ${err.message}`,
    });
  });
};

module.exports = { multerUpload };