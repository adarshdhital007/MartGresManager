module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        name: {
            type: Sequelize.STRING
        },
        cost: {
            type: Sequelize.FLOAT
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        url: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        features: {
            type: Sequelize.ARRAY(Sequelize.STRING) 
        }
    });
    return Product;
}
