const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({ origin: '*' }));

app.use(bodyParser.json());

const pool = new Pool({
    user: 'adarshadhital',
    host: 'localhost',
    database: 'test',
    password: '',
    port: 5432, // Default PostgreSQL port
});

// Create a table in your PostgreSQL database if not already created
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
`);

// Create a table to save purchase receipts
pool.query(`
CREATE TABLE IF NOT EXISTS purchase_receipts (
    id SERIAL PRIMARY KEY,
    username TEXT REFERENCES users(username),
    email TEXT,
    total_cost DECIMAL,
    shipping_name TEXT,
    shipping_address TEXT,
    shipping_city TEXT,
    shipping_state TEXT,
    shipping_zip TEXT,
    item_names JSONB
  );
  
`);

// Secret key for JWT (change this to a secret key of your choice)
const secretKey = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5OTIyMTQwOSwiaWF0IjoxNjk5MjIxNDA5fQ.WJhRIQhVws3UujvKNfL4HxGcqydCKtlMgLHG4EYVfwU';

// Protected route example
app.get('/protected', (req, res) => {
    // Verify the JWT token for authentication
    const token = req.headers.authorization;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).json({ error: 'Authentication failed' });
        } else {
            res.status(200).json({ message: 'Authenticated route', user: decoded.username });
        }
    });
});

// API endpoint to save purchase receipts
app.post('/save-receipt', async (req, res) => {
    try {
        // Check for the JWT token in the request headers
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: 'Authentication token is required' });
        }

        // Verify the JWT token using the secretKey
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            const username = decoded.username;
            const order = req.body;

            const query = 'INSERT INTO purchase_receipts (username, email, total_cost, shipping_name, shipping_address, shipping_city, shipping_state, shipping_zip, item_names) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';

            let itemNames = [];

            if (Array.isArray(order.cartItems)) {
                // If cartItems is an array and not empty, add item names with quantities to the itemNames array
                for (const item of order.cartItems) {
                    console.log('Item in cart:', item);
                    itemNames.push({ id: item.id, name: item.name, quantity: item.quantity, price: item.price });
                }
            }
            console.log('Constructed itemNames array:', itemNames);  // Log the constructed itemNames array

            const values = [
                username,
                order.shippingInfo.email,
                order.totalCost,
                order.shippingInfo.name,
                order.shippingInfo.address,
                order.shippingInfo.city,
                order.shippingInfo.state,
                order.shippingInfo.zip,
                JSON.stringify(itemNames),
            ];

            const client = await pool.connect();
            const result = await client.query(query, values);
            client.release();

            res.status(201).json({ message: 'Receipt saved successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while saving the receipt' });
    }
});


// API endpoint to register a new user
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username already exists
        const checkQuery = 'SELECT * FROM users WHERE username = $1';
        const checkValues = [username];

        const client = await pool.connect();
        const checkResult = await client.query(checkQuery, checkValues);

        if (checkResult.rows.length > 0) {
            // Username already exists, send an error response
            client.release();
            return res.status(400).json({ error: 'Username already exists. Please choose another username.' });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertQuery = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
        const insertValues = [username, hashedPassword];

        const insertResult = await client.query(insertQuery, insertValues);
        client.release();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
});


// API endpoint to authenticate and generate a JWT token for a user
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Fetch the user's hashed password from the database
        const query = 'SELECT * FROM users WHERE username = $1';
        const values = [username];

        const client = await pool.connect();
        const result = await client.query(query, values);

        if (result.rows.length === 0) {
            res.status(401).json({ error: 'Invalid username or password' });
        } else {
            const storedHashedPassword = result.rows[0].password;

            // Compare the provided password with the hashed password from the database
            const isPasswordValid = await bcrypt.compare(password, storedHashedPassword);

            if (isPasswordValid) {
                // Create a JWT token
                const token = jwt.sign({ username }, secretKey);

                res.status(200).json({ token });
            } else {
                res.status(401).json({ error: 'Invalid username or password' });
            }
        }

        client.release();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

// API endpoint to get order history for a user
app.get('/order-history', async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: 'Authentication token is required' });
        }

        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            const username = decoded.username;

            // Fetch order history from the database
            const query = 'SELECT * FROM purchase_receipts WHERE username = $1';
            const values = [username];

            const client = await pool.connect();
            const result = await client.query(query, values);
            client.release();

            res.status(200).json(result.rows);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching order history' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
