import { Request, Response } from 'express';
import express from 'express';
import { json } from 'body-parser';
import { urlencoded } from 'body-parser';
import { Task } from '../../../shared/types'
import { asyncCreateTask } from '../../service/base/tasks-service'

const app = express();
app.use(json());
app.use(urlencoded());

// POST /artists
app.post(
	'*',
	// jwt('secret'),
	async (req: Request, res: Response): Promise<void> => {
		const task: Task = req.body;
		let data: Task = await asyncCreateTask(task);
		res.json(data);
	},
);
