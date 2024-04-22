let mysql = require('mysql');
const knex_connect = require('./knexfile');
const knex_package = require('knex');



// let connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });
let knex;

module.exports = {

    connectToDb: function () {
        knex = knex_package(knex_connect);
        // connection.connect();
    },
    
    // connectToDbEnd: async function () {
    //     connection.end();
    // },

    getDataFromDb: async function (table, callback) {
        knex(table).select('*')
            .then((data) => {
                callback(null, data);
            })
            .catch((err) => {
                callback(err);
            });
        // connection.query(`SELECT * FROM ${table}`,
        //     function (err, results, fields) {
        //         if (err) return callback(err, null);
        //         return callback(null, results);
        //     }
        // );
    },

    getDataFromDbById: async function (table, id, callback) {
        knex(table).where({id})
            .then((data) => {
                callback(null, data);
            })
            .catch((err) => {
                callback(err);
            });
        // connection.query(`SELECT * FROM ${table} WHERE id = ?`,
        //     [id],
        //     function (err, results, fields) {
        //         if (err) return callback(err, null);
        //         return callback(null, results);
        //     }
        // );
    },

    deleteData: async function (table, data, callback) {
        knex(table).where(data)
            .del()
            .then((data) => {
                callback(null, data);
            })
            .catch((err) => {
                callback(err);
            });
        // connection.query(`DELETE FROM ${table} WHERE ${Object.entries(data)
        //     .map((item) => {
        //         if(typeof item[1] === 'number') {
        //             return `${item[0]}=${item[1]}`;
        //         } else {
        //             return `${item[0]}='${item[1]}'`;
        //         }
        //     })
        //     .join(' AND ')}`,
        //     //[id],
        //     function (err, results, fields) {
        //         if (err) {
        //             return callback(err, null);
        //         }
        //         return callback(null, results);
        //     }
        // );
    },

    updateData: async function (table, dataObj, callback) {
        knex(table).where({id: dataObj.id})
            .update(dataObj)
            .then((data) => {
                callback(null, data);
            })
            .catch((err) => {
                callback(err);
            });
        // const updataQuery = Object.entries(dataObj)
        //     .map(item => {
        //         if(typeof item[1] === 'number') {
        //             return `${item[0]} = ${item[1]}`
        //         } else {
        //             return `${item[0]} = '${item[1]}'`;
        //         }
        //     })
        //     .join(', \n');
        // connection.query(`UPDATE ${table} SET ${updataQuery} WHERE id = ${dataObj.id}`,
        //     //[id],
        //     function (err, results, fields) {
        //         if (err) return callback(err, null);
        //         return callback(null, results);
        //     }
        // );
    },

    addToDb: async function (table, dataObj, callback) {
        knex(table).insert(dataObj)
        .then((data) => {
            callback(null, data);
        })
        .catch((err) => {
            callback(err);
        });
        // const sqlQuery = `INSERT INTO ${table + '(' + Object.keys(dataObj) + ')'} VALUES (?) `;
        // connection.query(
        //     sqlQuery,
        //     [Object.values(dataObj)],
        //     function (err, results, fields) {
        //         if (err) throw err;
        //         callback(null, results);
        //     }
        // )
    }
}