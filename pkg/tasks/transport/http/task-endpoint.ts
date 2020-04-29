import { Request, Response } from 'express';
import express from 'express';
import { json } from 'body-parser';
import { urlencoded } from 'body-parser';
import { Task } from '../../../shared/types'
import { asyncGetTask, asyncUpdateTask } from '../../service/base/tasks-service'

const app = express();
app.use(json());
app.use(urlencoded());

app.put(
	'*',
	async (req: Request, res: Response): Promise<void> => {
		let task: Task = req.body;
		const taskID = <string>req.query.id;
		try {
			task = await asyncUpdateTask(taskID, task);
			res.json({
				response: 'response ok',
				taskUpdate: task
			})
		} catch (error) {
			res.json({
				error: error
			})
		}
	}
)

app.get(
	'*',
	async (req: Request, res: Response): Promise<void> => {
		const taskID = <string>req.query.id;
		console.log('task-ednpoint ' +taskID);
		try {
			const task = await asyncGetTask(taskID);
			res.json({
				task: task
			})
		} catch (error) {
			res.json({
				status: error
			})
		}
	}
)

export default app;