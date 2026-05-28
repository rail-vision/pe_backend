const express = require("express");

const cors = require("cors");

const peopleRoutes = require("./routes/people.routes");

const assetRoutes = require("./routes/asset.routes");

const uploadRoutes = require("./routes/upload.routes");

const dynamicRoutes = require("./routes/dynamic.routes");

const app = express();

app.use(cors());

app.use(express.json());

/*Routes*/

app.use("/api/people", peopleRoutes);

app.use("/api/assets", assetRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/dynamic", dynamicRoutes);



/*Default Route*/

app.get("/", (req, res) => {

  res.send("API Running");

});

module.exports = app;