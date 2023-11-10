const db = require('../models');
const Products = db.products;
const Op = db.Sequelize.Op;

// Create a new product with the URL, description, and features
exports.createProduct = (req, res) => {
    const { name, cost, quantity, url, description, features } = req.body;

    db.products.create({
        name: name,
        cost: cost,
        quantity: quantity,
        url: url,
        description: description,
        features: features // Include the features field
    })
        .then(product => {
            res.status(201).json(product);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

// Get all products or filter by name
exports.getAllProduct = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    Products.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Internal server error'
            });
        });
};

// Get a product by ID
exports.getProductById = (req, res) => {
    const id = req.params.productId;

    Products.findByPk(id)
        .then(data => {
            if (data) {
                res.json(data);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

// Update a product by ID, including the description and features fields
exports.updateProduct = (req, res) => {
    const id = req.params.productId;
    const { name, cost, quantity, url, description, features } = req.body;

    Products.findByPk(id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            product.name = name;
            product.cost = cost;
            product.quantity = quantity;
            product.url = url;
            product.description = description;
            product.features = features; // Include the features field

            product.save()
                .then(updatedProduct => {
                    res.json(updatedProduct);
                })
                .catch(err => {
                    res.status(500).json({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

// Delete a product by ID
exports.deleteProduct = (req, res) => {
    const id = req.params.productId;

    Products.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.json({ message: 'Product deleted successfully' });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};
