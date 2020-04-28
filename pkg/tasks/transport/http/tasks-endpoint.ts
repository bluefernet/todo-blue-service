import { Request, Response } from 'express';
import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.get(
    '*',
    async (req: Request, res: Response): Promise<void> => {
        res.json({
          response: 'response ok'
        });
    },
);

export default app;
