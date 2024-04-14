const http = require('http');
const workingMysql = require('./workingMysql');

workingMysql.connectToDb();

const arrTables = ['categories', 'products', 'sales', 'warehouse'];

const serverListinFunction = (req, res) => {
    
    const items = req.url.split('/');
    console.log('method: ', req.method,'   req.url: ', req.url);
    console.log(items);
    
    if( arrTables.includes(items[1]) ) {
        
        func(items[1]);
    
    } else {
        res.statusCode = 404;
        res.end('not if blok!');
    }

    function func(tableName) {

        if (req.method === 'GET') {

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');

            if (items.length === 3) {

                const categoryIndex = Number(items[2]);

                workingMysql.getDataFromDbById(tableName, categoryIndex, (error, result) => {

                    if (error) {
                        console.log(error);
                        throw error;
                    } else {
                        console.log(result[0]);                 // ********************************************
                        res.end(JSON.stringify(result[0]));
                    }

                });

            } else {

                workingMysql.getDataFromDb(tableName, (error, result) => {

                    if (error) {
                        console.log(error);
                        throw error;
                    } else {
                        console.log(result);                   // *****************************************************
                        res.end(JSON.stringify(result));
                    }

                });

            }

        } else if (req.method === 'POST') {

            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');

            req.on('data', (data) => {

                const dataObj = JSON.parse(data.toString());

                workingMysql.addToDb(tableName, dataObj, (error, result) => {

                    if (error) {
                        console.log(error);
                        throw error;
                    } else {
                        console.log('New data added:', result.insertId); // ********************************************
                        res.end(JSON.stringify(result));
                    }

                });

            });

        } else if (req.method === 'PUT') {

            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');

            req.on('data', (data) => {

                const dataObj = JSON.parse(data.toString());
                
                workingMysql.updateData(tableName, dataObj, (error, result) => {

                    if (error) {
                        console.log(error);
                        throw error;
                    } else {
                        console.log('Data updated:', result.affectedRows); // ****************************************
                        res.end(JSON.stringify(result));
                    }

                });

            });

        } else if (req.method === 'DELETE') {

            res.statusCode = 209;
            res.setHeader('Content-Type', 'application/json');

            req.on('data', (data) => {
            
                const dataObj = JSON.parse(data.toString());

                workingMysql.deleteData(tableName, dataObj, (error, result) => {
            
                    if (error) {
                        console.log(error);
                        throw error;
                    } else {
                        console.log('Data deleted:', result.affectedRows);  // *****************************************
                        res.end(JSON.stringify(result));
                    }
            
                });
            
            });
        }
    }

}

const httpserver = http.createServer();//serverListinFunction);

httpserver.on('request', serverListinFunction);

// httpserver.on('connection', connection => {
//     console.log('someone just connected!');
// });

httpserver.listen(8000, () => console.log('listing on port 8000'));