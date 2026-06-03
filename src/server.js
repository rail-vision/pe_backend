const express = require('express');

const cors = require('cors');

const incomeRoutes = require('./routes/incomeRoutes');

const expenseRoutes = require('./routes/expenseRoutes');

const supplierRoutes = require('./routes/supplierRoutes');

const dataRoutes = require('./routes/dataRoutes');

const inventoryRoutes = require('./routes/inventoryRoutes');

const activityRoutes = require('./routes/activityRoutes');

const departmentRoutes = require("./routes/departmentRoutes");


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

app.use('/api/inventory', inventoryRoutes);

app.use('/api/activity', activityRoutes);

app.use('/api/department',departmentRoutes);

const PORT = 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});