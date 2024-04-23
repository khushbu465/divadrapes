const express = require('express');
const cors = require("cors")
const helmet = require("helmet")
const path = require("path")
const app = express();
require('./db/db');

// Middleware
app.use(express.json());
app.use(cors())
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome Home ');
});
const adminusers = require('./routes/adminusers');
const sliders = require('./routes/sliders');
const products = require('./routes/products');
const customers = require('./routes/customers');
const offers = require('./routes/offers');
const categories = require('./routes/categories');
const contacts = require('./routes/contacts');
const brands = require('./routes/brands');
const coupons = require('./routes/coupons');

app.use("/adminuser", adminusers);
app.use("/sliders", sliders);
app.use("/products", products);
app.use("/customers", customers);
app.use("/offers", offers);
app.use("/categories", categories);
app.use("/contacts", contacts);
app.use("/brands", brands);
app.use("/coupon", coupons);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

module.exports = app;