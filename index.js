const express = require('express');
const bodyParser = require('body-parser');
const workingMysql = require('./workingMysql');


const app = express();

app.use(bodyParser.json());

workingMysql.connectToDb();


// categories

app.get('/categories', (req, res) => {
    workingMysql.getAll('categories')
      .then(categories => res.status(200).json(categories))
      .catch(err => res.status(500).json({ message: 'Failed to fetch users', error: err }));
  });

  app.get('/categories/:id', (req, res) => {
    const { id } = req.params;
    workingMysql.getById('categories', id)
      .then(user => {
            if (user.length) {
                res.status(200).json(user[0]);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
      })
      .catch(err => res.status(500).json({ message: 'Failed to fetch user', error: err }));
  })

app.post('/categories', (req, res) => {
    workingMysql.addToDb('categories', req.body)
      .then((data) => res.status(201).json({id: data[0]}))
      .catch(err => res.status(500).json({ message: 'Failed to create user', error: err }));
  });

//   app.put('/categories')
  app.put('/categories/:id', (req, res) => {
    const obj = { id: req.params.id };
    Object.assign(obj, req.body);
    console.log('obj: ', obj);
    workingMysql.updateData('categories', obj)
      .then(updated => {
            if (updated) {
                res.status(200).json({ updated });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
      })
      .catch(err => res.status(500).json({ message: 'Failed to update user', error: err }));
  });

  app.delete('/categories/:id', (req, res) => {
    const obj = { id: req.params };
    Object.assign(obj, req.body);
    console.log('obj: ',obj);
    workingMysql.deleteData('categories', obj)
      .then(deleted => {
            if (deleted) {
                res.status(200).json({ deleted });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
      })
      .catch(err => res.status(500).json({ message: 'Failed to delete user', error: err }));
  });




const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
