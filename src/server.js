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


const app = express();

app.use(cors());

app.use(express.json());

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

const PORT = 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});