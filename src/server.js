require('dotenv').config();
const express = require('express');

const cors = require('cors');

const incomeRoutes = require('./routes/income.routes');

const expenseRoutes = require("./routes/expense.routes");

const supplierRoutes = require('./routes/supplier.routes');

const dataRoutes = require("./routes/data.routes");

const inventoryRoutes = require('./routes/inventory.routes');

const activityRoutes = require("./routes/activity.routes");

const departmentRoutes = require("./routes/department.routes");

const dynamicRoutes =require("./routes/dynamic.routes");

const departmentRoutes = require("./routes/departmentRoutes");
const peopleRoutes   = require("./routes/people.routes");
const assetRoutes    = require("./routes/asset.routes");
const uploadRoutes   = require("./routes/upload.routes");
const dynamicRoutes  = require("./routes/dynamic.routes");
const templateRoutes = require("./routes/template.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true })); 

//test routes 

app.get('/', (req, res) => {
  res.send('API Running')
})

app.use('/api/income', incomeRoutes);

app.use('/api/expense', expenseRoutes);

app.use('/api/supplier', supplierRoutes);

app.use('/api/data', dataRoutes);

app.use("/api/inventory",inventoryRoutes);

app.use('/api/activity', activityRoutes);

app.use('/api/department',departmentRoutes);

app.use("/api/dynamic",dynamicRoutes);
app.use("/api/people",    peopleRoutes);
app.use("/api/assets",    assetRoutes);
app.use("/api/upload",    uploadRoutes);
app.use("/api/dynamic",   dynamicRoutes);
app.use("/api/templates", templateRoutes);

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

const PORT = 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});