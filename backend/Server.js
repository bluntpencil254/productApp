const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'frontend/build')));

let products = [];

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const product = req.body;
    product.id = products.length + 1; 
    products.push(product); 
    res.status(201).json(product); 
});

app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    products = products.filter(product => product.id !== parseInt(id));
    res.status(204).send();
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
