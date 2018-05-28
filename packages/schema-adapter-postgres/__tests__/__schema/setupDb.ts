import knex from 'knex';

export const db = knex({
  client: 'pg',
  connection: process.env.TEST_FFLAMINGO_DATABASE_URL
});

export async function setupDb() {
  try {
    await db.transaction(async trx => {
      await trx.schema.createTableIfNotExists('users', tb => {
        tb.increments('id');
        tb.string('name');
        tb.string('email');
      });
    });
    await setupData();
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

export async function setupData() {
  await db.transaction(async trx => {
    await trx.batchInsert('users', [
      { id: 1, name: 'mario', email: 'mario@fflamingo.org' },
      { id: 2, name: 'gino', email: 'gino@fflamingo.org' }
    ]);
  });
}

export async function clearDb() {
  await db.transaction(async trx => {
    await trx.schema.dropTable('users');
  });
}
