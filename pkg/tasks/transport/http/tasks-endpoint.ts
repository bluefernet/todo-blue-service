import { Request, Response } from 'express';
import express from 'express';
import { json } from 'body-parser';
import {
	asyncTasksList,
	asyncCreateTask
} from '../../service/base/tasks-service';
import { Task } from '../../../shared/types'

const app = express();
app.use(json());

// POST - /tasks

app.get(
	'*',
	async (req: Request, res: Response): Promise<void> => {
		let tasksList = await asyncTasksList();
		res.json({
			tasks: tasksList.tasks,
			nextPageToken: tasksList.nextpageToken,
			totalSize: tasksList.totalSize
		});
	},
);

app.post(
	'*',
	// jwt('secret'),
	async (req: Request, res: Response): Promise<void> => {
		const task: Task = req.body;
		let data: Task = await asyncCreateTask(task);
		res.json(data);
	},
);

export default app;