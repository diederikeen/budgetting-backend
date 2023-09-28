import { Request, Router } from 'express';
import z from 'zod';

import { supabase } from '../../index';
import { authenticateUser } from '../../lib/auth';

const router = Router();

const transactionPostSchema = z.object({
  category: z.number(),
  note: z.string().optional(),
  amount: z.string(),
  data: z.date().optional(),
});

router.use(authenticateUser);

router.get('/transactions', async (req, res) => {
  try {
    const { data } = await supabase.from('transactions').select(
      `
        *,
        category (id, name, icon_name)
      `
    ).eq('uuid', res.locals.user.id);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return new Error(JSON.stringify(error));
  }
});

router.delete('/transactions/delete', async (req, res) => {
  const { transaction_id } = res.req.query;
  
  if (!transaction_id) {
    return;
  }

  try {
    const { error } = await supabase.from('transactions').delete().eq('id', transaction_id);
    if (error) {
      return res.status(500).json({error});
    }

    return res.status(200).json({
      message: 'Transaction succesfully deleted',
    })
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }

});

router.post('/transactions/create', async (req: Request, res) => {
  const body = transactionPostSchema.parse(req.body);
  const { id } = res.locals.user;

  if (!id) {
    return;
  }

  try {
    const data = await supabase.from('transactions').insert({...body, uuid: id})
    return res.status(201).json(data);
  } catch(error) {
    console.error(error);
    return new Error(JSON.stringify(error));
  }

});

export default router;
