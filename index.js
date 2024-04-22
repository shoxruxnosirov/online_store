const workingMysql = require('./service/workingMysql');
const express = require('express');
const bodyParser = require('body-parser');
const categoriesController = require('./controllers/categoriesController');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const warehouseController = require('./controllers/warehouseController');


const app = express();

app.use(bodyParser.json());

workingMysql.connectToDb();


// categories

app.get('/categories', categoriesController.getAll);

app.get('/categories/:id', categoriesController.getById);

app.post('/categories', categoriesController.create);

app.put('/categories/:id', categoriesController.update);

app.delete('/categories/:id', categoriesController.delete);


// products 

app.get('/categories', productsController.getAll);

app.get('/categories/:id', productsController.getById);

app.post('/categories', productsController.create);

app.put('/categories/:id', productsController.update);

app.delete('/categories/:id', productsController.delete);


// sales 

app.get('/categories', salesController.getAll);

app.get('/categories/:id', salesController.getById);

app.post('/categories', salesController.create);

app.put('/categories/:id', salesController.update);

app.delete('/categories/:id', salesController.delete);


// warehouse

app.get('/categories', warehouseController.getAll);

app.get('/categories/:id', warehouseController.getById);

app.post('/categories', warehouseController.create);

app.put('/categories/:id', warehouseController.update);

app.delete('/categories/:id', warehouseController.delete);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
