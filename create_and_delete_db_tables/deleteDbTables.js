const { db } = require('../services/db');

(async function () {

    try {

        await db.schema.dropTableIfExists('users');
        await db.schema.dropTableIfExists('categories');
        await db.schema.dropTableIfExists('products');
        await db.schema.dropTableIfExists('warehouse');
        await db.schema.dropTableIfExists('sales');

        await db.destroy();

        console.log("users jadval o'chirildi!");

    } catch (err) {
        console.log('users jadvalni o\'chirishda xatolik: ', err);
    }

})();

// deleteTableUsers();