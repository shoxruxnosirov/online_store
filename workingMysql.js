let mysql = require('mysql');

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

module.exports = {

    connectToDb: function () {
        connection.connect();
    },
    
    connectToDbEnd: async function () {
        connection.end();
    },

    getDataFromDb: async function (table, callback) {
        connection.query(`SELECT * FROM ${table}`,
            function (err, results, fields) {
                if (err) return callback(err, null);
                return callback(null, results);
            }
        );
    },

    getDataFromDbById: async function (table, id, callback) {
        connection.query(`SELECT * FROM ${table} WHERE id = ?`,
            [id],
            function (err, results, fields) {
                if (err) return callback(err, null);
                return callback(null, results);
            }
        );
    },

    deleteData: async function (table, data, callback) {
        connection.query(`DELETE FROM ${table} WHERE ${Object.entries(data)
            .map((item) => {
                if(typeof item[1] === 'number') {
                    return `${item[0]}=${item[1]}`;
                } else {
                    return `${item[0]}='${item[1]}'`;
                }
            })
            .join(' AND ')}`,
            //[id],
            function (err, results, fields) {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, results);
            }
        );
    },

    updateData: async function (table, dataObj, callback) {
        const updataQuery = Object.entries(dataObj)
            .map(item => {
                if(typeof item[1] === 'number') {
                    return `${item[0]} = ${item[1]}`
                } else {
                    return `${item[0]} = '${item[1]}'`;
                }
            })
            .join(', \n');
        connection.query(`UPDATE ${table} SET ${updataQuery} WHERE id = ${dataObj.id}`,
            //[id],
            function (err, results, fields) {
                if (err) return callback(err, null);
                return callback(null, results);
            }
        );
    },

    addToDb: async function (table, dataObj, callback) {
        const sqlQuery = `INSERT INTO ${table + '(' + Object.keys(dataObj) + ')'} VALUES (?) `;
        connection.query(
            sqlQuery,
            [Object.values(dataObj)],
            function (err, results, fields) {
                if (err) throw err;
                callback(null, results);
            }
        )
    }
}