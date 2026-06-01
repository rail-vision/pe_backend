const express = require("express");
const cors = require("cors");

const peopleRoutes   = require("./routes/people.routes");
const assetRoutes    = require("./routes/asset.routes");
const uploadRoutes   = require("./routes/upload.routes");
const dynamicRoutes  = require("./routes/dynamic.routes");
const templateRoutes = require("./routes/template.routes");

const app = express();

/*GLOBAL MIDDLEWARE*/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

/*ROUTES*/

app.use("/api/people",    peopleRoutes);
app.use("/api/assets",    assetRoutes);
app.use("/api/upload",    uploadRoutes);
app.use("/api/dynamic",   dynamicRoutes);
app.use("/api/templates", templateRoutes);

/*DEFAULT ROUTE */

app.get("/", (req, res) => {
  res.send("API Running");
});



app.use((err, req, res, next) => {
  console.error("[Global Error]", err.code ?? "NO_CODE", err.message);

  // Multer / busboy stream errors
  if (
    err.message?.includes("Unexpected end of form") ||
    err.message?.includes("Multipart")              ||
    err.code?.startsWith("LIMIT_")
  ) {
    return res.status(400).json({
      success: false,
      message: "File upload failed. Make sure you are sending a valid multipart/form-data request.",
    });
  }

  // Our custom errors with a status code attached
  if (err.status) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
    });
  }

  // Everything else → 500
  return res.status(500).json({
    success: false,
    message: err.message ?? "Internal server error",
  });
});

module.exports = app;