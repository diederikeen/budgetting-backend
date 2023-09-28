import express, { Application } from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js'

import transactionsRoute from './routes/transactions';
import categoriesRoute from './routes/categories';
import searchRoute from './routes/search';

dotenv.config();

const supaurl = process.env.SUPABASE_URL as string;
const supakey = process.env.SUPABASE_KEY as string;

export const supabase = createClient(supaurl, supakey)

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/health', (_, res) => res.status(200).json({message: 'Everything seems up!'}))

app.use(transactionsRoute);
app.use(categoriesRoute);
app.use(searchRoute);


app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
