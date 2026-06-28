const express = require("express");
const cors = require("cors");

const authRoutes     = require("./routes/auth.routes");     
const peopleRoutes   = require("./routes/people.routes");
const assetRoutes    = require("./routes/asset.routes");
const uploadRoutes   = require("./routes/upload.routes");
const dynamicRoutes  = require("./routes/dynamic.routes");
const templateRoutes = require("./routes/template.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const correlationRoutes = require("./routes/correlation.routes");
const financeCorrelationRoutes =require("./routes/financeCorrelation.routes");
const outlierRoutes =require("./routes/outlier.routes");
const infographicRoutes =require("./routes/infographic.routes");
const heatmapRoutes =require("./routes/heatmap.routes");



const app = express();

/*GLOBAL MIDDLEWARE*/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*ROUTES*/

app.use("/api/auth",      authRoutes);      
app.use("/api/people",    peopleRoutes);
app.use("/api/assets",    assetRoutes);
app.use("/api/upload",    uploadRoutes);
app.use("/api/dynamic",   dynamicRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/correlation", correlationRoutes);
app.use("/api/correlation/finance",financeCorrelationRoutes);
app.use("/api/outlier",outlierRoutes);
app.use("/api/infographics",infographicRoutes);
app.use("/api/heatmap",heatmapRoutes);
app.use(
  "/api/distribution",
  require(
    "./routes/distribution.routes"
  )
);

app.use(
  "/api/presentation",
  require(
    "./routes/presentation.routes"
  )
);

/*DEFAULT ROUTE*/

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use((err, req, res, next) => {
  console.error("[Global Error]", err.code ?? "NO_CODE", err.message);

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

  if (err.status) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message ?? "Internal server error",
  });
});

module.exports = app;