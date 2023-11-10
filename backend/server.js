const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./models');

db.sequelize.sync().then(() => {
    console.log('Connected to the database');
}).catch((err) => {
    console.error('Failed to connect to the database:', err);
});

// Define your routes
const productRoutes = require('./routes/product.routes');
app.use('/api', productRoutes); 

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
});


