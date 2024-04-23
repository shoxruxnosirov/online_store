const workingMysql = require('../service/workingMysql');

const tableName = 'products';

class productsController {

    async getAll(req, res) {
        try {
            const data = await workingMysql.getAll(tableName);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ message: 'Failed to fetch users', error: err })
        }
    };

    async getById(req, res) {
        try {
            const id = req.params.id;
            const data = await workingMysql.getById(tableName, id);
            if (data.length) {
                res.status(200).json(data[0]);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Failed to fetch user', error: err })
        }
    };

    async create(req, res) {
        try {
            const data = await workingMysql.addToDb(tableName, req.body);
            res.status(201).json({ id: data[0] });
        } catch (err) {
            res.status(500).json({ message: 'Failed to create user', error: err })
        }
    };

    async update(req, res) {
        try {
            const obj = { id: req.params.id };
            Object.assign(obj, req.body);
            const updated = await workingMysql.updateData(tableName, obj);
            res.status(200).json({ updated });
        } catch (err) {
            res.status(500).json({ message: 'Failed to update user', error: err });
        }
    }

    async delete(req, res) {
        try {
            const obj = { id: req.params.id };
            Object.assign(obj, req.body);
            const deleted = await workingMysql.deleteData(tableName, obj);
            if (deleted) {
                res.status(200).json({ deleted });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Failed to delete user', error: err })
        }
    }
}


module.exports = new productsController();