const { db } = require('../services/workingDB');

(async function () {

    try {

        await db.schema.createTable('users', function (table) {
            table.increments('id').primary();
            //   table.string('name').notNullable();
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
            // table.timestamp('created_at').notNullable().defaultTo(db.fn.now());
            table.timestamps(true, true);
        });

        await db.schema.createTable('categories', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
        });

        await db.schema.createTable('products', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.integer('category_id').notNullable();
            table.enu('quantity', ['kg', 'per', 'litr']).notNullable()
            table.decimal('price', 10, 2).notNullable();
        });

        await db.schema.createTable('warehouse', function (table) {
            table.increments('id').primary();
            table.integer('product_id').notNullable();
            table.integer('amount').notNullable();
        });

        await db.schema.createTable('sales', function (table) {
            table.increments('id').primary();
            table.integer('product_id').notNullable();
            table.integer('amount').notNullable();
            table.timestamp('date').notNullable().defaultTo(db.fn.now());
        });

        await db.destroy();

        console.log("users jadval yaratildi!");


    } catch (err) {
        console.log('users jadvalni yaratishda xatolik: ', err);
    }

})();