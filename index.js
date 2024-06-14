const express = require('express');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const { requireToken, checkUser } = require('./middleware/authMiddleware');
const categoriesRoutes = require('./routes/categoryRoutes');
const productsRoutes = require('./routes/productsRoutes');
const salesRoutes = require('./routes/salesRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');


const app = express();

app.use(express.json());
// app.use(bodyParser.json());

app.use(cookieParser());

// app.get('*', checkUser);
// app.get('/', (req, res) => res.render('home'));

// auth
app.use('/auth', authRoutes);

// categories
app.use('/categories', requireToken, categoriesRoutes);

// products 
app.use('/products', requireToken, productsRoutes);

// sales 
app.use('/sales', requireToken, salesRoutes);

// warehouse
app.use('/warehouse', requireToken, warehouseRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
