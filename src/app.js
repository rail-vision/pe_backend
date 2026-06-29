const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const peopleRoutes = require("./routes/people.routes");
const assetRoutes = require("./routes/asset.routes");
const uploadRoutes = require("./routes/upload.routes");
const dynamicRoutes = require("./routes/dynamic.routes");
const templateRoutes = require("./routes/template.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const correlationRoutes = require("./routes/correlation.routes");
const financeCorrelationRoutes = require("./routes/financeCorrelation.routes");
const outlierRoutes = require("./routes/outlier.routes");
const infographicRoutes = require("./routes/infographic.routes");
const heatmapRoutes = require("./routes/heatmap.routes");
const distributionRoutes = require("./routes/distribution.routes");
const presentationRoutes = require("./routes/presentation.routes");

const errorHandler = require("./middleware/error.middleware");

const app = express();

/*GLOBAL MIDDLEWARE*/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*API ROUTES*/

app.use("/api/auth", authRoutes);
app.use("/api/people", peopleRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/dynamic", dynamicRoutes);
app.use("/api/templates", templateRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/correlation", correlationRoutes);
app.use("/api/correlation/finance", financeCorrelationRoutes);

app.use("/api/outlier", outlierRoutes);

app.use("/api/infographics", infographicRoutes);

app.use("/api/heatmap", heatmapRoutes);

app.use("/api/distribution", distributionRoutes);

app.use("/api/presentation", presentationRoutes);

/*DEFAULT ROUTE*/

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Pearl Analytics Backend API Running"
    });
});

/*GLOBAL ERROR HANDLER*/

app.use(errorHandler);

module.exports = app;