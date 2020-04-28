import MongoDatabase from '../../../shared/mongodb'
import { Task } from '../../../shared/types'
import * as constants from '../../../shared/constants'

export const asyncCreateTask = async (task: Task): Promise<Task> => {
	const client = await MongoDatabase.connect();
	const result = await client
		.db("db")
		.collection(constants.COLLECTION_TASKS)
		.insertOne(task);
	console.log(result)
	return task;

}