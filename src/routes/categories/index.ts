import { Router } from 'express';
import { authenticateUser } from '../../lib/auth';
import { supabase } from '../..';

const router = Router();

router.use(authenticateUser);

router.get('/categories', async (req, res) => {
  try {
    const { data } = await supabase.from('categories').select(); 
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return new Error(JSON.stringify(error));
  }
});

export default router;
