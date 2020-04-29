import { Request, Response } from 'express';
import express from 'express';
import { json } from 'body-parser';
import { urlencoded } from "body-parser";
import {
	asyncTasksList,
	asyncCreateTask
} from '../../service/base/tasks-service';
import { Task } from '../../../shared/types'
import corsOptions from "../../../shared/cors";

const app = express();
const cors = require("cors");

app.use(json());
app.use(json());
app.use(urlencoded());
app.use(cors(corsOptions));

// POST - /tasks

app.get(
	'*',
	cors(corsOptions),
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
	cors(corsOptions),
	async (req: Request, res: Response): Promise<void> => {
		const task: Task = req.body;
		let data: Task = await asyncCreateTask(task);
		res.json(data);
	},
);

export default app;