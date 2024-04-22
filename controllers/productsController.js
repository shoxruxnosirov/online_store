const workingMysql = require('../service/workingMysql');

class productsController {
    constructor() {
        this.tableName = 'products';
    }

    async getAll(req, res) {
        workingMysql.getAll(this.tableName)
            .then(categories => res.status(200).json(categories))
            .catch(err => res.status(500).json({ message: 'Failed to fetch users', error: err }));
    };

    async getById(req, res) {
        const { id } = req.params;
        workingMysql.getById(this.tableName, id)
            .then(user => {
                if (user.length) {
                    res.status(200).json(user[0]);
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            })
            .catch(err => res.status(500).json({ message: 'Failed to fetch user', error: err }));
    };

    async create(req, res) {
        workingMysql.addToDb(this.tableName, req.body)
            .then((data) => res.status(201).json({ id: data[0] }))
            .catch(err => res.status(500).json({ message: 'Failed to create user', error: err }));
    };

    async update(req, res) {
        const obj = { id: req.params.id };
        Object.assign(obj, req.body);
        console.log('obj: ', obj);
        workingMysql.updateData(this.tableName, obj)
            .then(updated => {
                if (updated) {
                    res.status(200).json({ updated });
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            })
            .catch(err => res.status(500).json({ message: 'Failed to update user', error: err }));
    }

    async delete(req, res) {
        const obj = { id: req.params };
        Object.assign(obj, req.body);
        console.log('obj: ', obj);
        workingMysql.deleteData(this.tableName, obj)
            .then(deleted => {
                if (deleted) {
                    res.status(200).json({ deleted });
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            })
            .catch(err => res.status(500).json({ message: 'Failed to delete user', error: err }));
    }
}


module.exports = new productsController();