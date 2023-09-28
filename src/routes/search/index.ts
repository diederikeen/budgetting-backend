import { Router } from 'express';
import { authenticateUser } from '../../lib/auth';
import { supabase } from '../..';

const router = Router();

router.use(authenticateUser);

router.get('/search', async (req, res) => {
  const { search } = res.req.query;

  try {
    const { data } = await supabase.from('transactions').select(
      `
        *,
        category (id, name)
      `
    ).textSearch('note', JSON.stringify(search));

    return res.status(200).json(data);
  } catch (error) {
    throw new Error(JSON.stringify(error));
  } 
});

export default router;
