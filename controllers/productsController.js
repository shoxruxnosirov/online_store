const db = require('../services/db');

const tableName = 'products';

class productsController {

    async getAll(req, res) {
        try {
            const data = await db.getAll(tableName);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ message: 'Failed to fetch products', error: err })
        }
    };

    async getById(req, res) {
        try {
            const id = req.params.id;
            const data = await db.getById(tableName, id);
            if (data.length) {
                res.status(200).json(data[0]);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Failed to fetch product', error: err })
        }
    };

    async create(req, res) {
        try {
            const data = await db.createData(tableName, req.body);
            res.status(201).json({ id: data[0] });
        } catch (err) {
            res.status(500).json({ message: 'Failed to create product', error: err })
        }
    };

    async update(req, res) {
        try {
            const obj = { id: req.params.id };
            Object.assign(obj, req.body);
            const updated = await db.updateData(tableName, obj);
            res.status(200).json({ updated });
        } catch (err) {
            res.status(500).json({ message: 'Failed to update product', error: err });
        }
    }

    async delete(req, res) {
        try {
            const obj = { id: req.params.id };
            Object.assign(obj, req.body);
            const deleted = await db.deleteData(tableName, obj);
            if (deleted) {
                res.status(200).json({ deleted });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Failed to delete product', error: err })
        }
    }
}


module.exports = new productsController();