import { db } from '../utils/dbConfig';
import { Budgets } from '../utils/schema';

(async () => {
  try {
    const rows = await db.select().from(Budgets);
    console.log('budgets rows', rows);
  } catch (err) {
    console.error('db error', err);
  }
})();