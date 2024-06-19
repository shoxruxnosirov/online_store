const { db } = require('../services/db');

(async function () {

    try {

        await db.schema.dropTableIfExists('users');
        await db.schema.dropTableIfExists('categories');
        await db.schema.dropTableIfExists('products');
        await db.schema.dropTableIfExists('warehouse');
        await db.schema.dropTableIfExists('sales');

        await db.destroy();

        console.log("db jadvallar o'chirildi!");

    } catch (err) {
        console.log('db jadvallarni o\'chirishda xatolik: ', err);
    }

})();

// deleteTableUsers();
