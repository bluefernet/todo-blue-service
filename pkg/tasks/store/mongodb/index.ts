import MongoDatabase from '../../../shared/mongodb'
import { Task, TasksList } from '../../../shared/types'
import * as constants from '../../../shared/constants'
import { ulid } from 'ulid'

export const asyncCreateTask = async (task: Task): Promise<Task> => {
	const client = await MongoDatabase.connect();
	task.id = ulid();
	const result = await client
		.db("db")
		.collection(constants.COLLECTION_TASKS)
		.insertOne(task);
	console.log(result)
	return task;
}

export const asyncTasksList = async (): Promise<TasksList> => {
	const client = await MongoDatabase.connect();
	const tasks = await client
		.db('db')
		.collection(constants.COLLECTION_TASKS)
		.find({}, { projection: { _id: 0 } })
		.toArray();

	const tasksList: TasksList = {
		tasks: tasks,
		nextpageToken: '',
		totalSize: tasks.length
	}
	return tasksList
}

export const asyncGetTask = async (taskId: string): Promise<Task | null> => {
	const client = await MongoDatabase.connect();
	let data: Task | null = await client
		.db('db')
		.collection(constants.COLLECTION_TASKS)
		.findOne({ id: taskId, deleted: false }, { projection: { _id: 0 } });
	return data
}

export const asyncUpdateTask = async (task: Task): Promise<Task> => {
	const client = await MongoDatabase.connect();
	let data = await client
		.db('db')
		.collection(constants.COLLECTION_TASKS)
		.updateOne({ id: task.id }, { task })
	console.log(data)
	return task
}