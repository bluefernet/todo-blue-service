import { Request, Response } from 'express';
import express from 'express';
import { json } from 'body-parser';
import { urlencoded } from 'body-parser';
import { asyncTasksStateList} from '../../service/base/tasks-service'
import corsOptions from '../../../shared/cors';

const app = express();
const cors = require("cors");

app.use(json());
app.use(urlencoded());
app.use(cors(corsOptions))

app.get(
	'*',
	cors(corsOptions),
	async (req: Request, res: Response): Promise<void> => {
		const state = <string>req.query.state;
		console.log('tasks-status-ednpoint ' +state);
		try {
			const tasks = await asyncTasksStateList(state);
			res.json({
				tasks: tasks.tasks,
				nextPageTokem: tasks.nextpageToken,
				totalSize: tasks.totalSize
			})
		} catch (error) {
			res.json({
				status: error
			})
		}
	}
)

export default app;