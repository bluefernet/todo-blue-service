import MongoDatabase from '../../../shared/mongodb'
import { Task, TasksList } from '../../../shared/types'
import * as constants from '../../../shared/constants'
import { ulid } from 'ulid'

export const asyncCreateTask = async (task: Task): Promise<Task> => {
	const client = await MongoDatabase.connect();
	task.id = ulid();
	task.deleted = false;
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
		.find({ deleted: false }, { projection: { _id: 0 } })
		.toArray();

	const tasksList: TasksList = {
		tasks: tasks,
		nextpageToken: '',
		totalSize: tasks.length
	}
	return tasksList
}

export const asyncTasksStateList =
	async (_state: string): Promise<TasksList> => {
		const client = await MongoDatabase.connect();
		const tasks = await client
			.db('db')
			.collection(constants.COLLECTION_TASKS)
			.find({ state: _state, deleted: false }, { projection: { _id: 0 } })
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
	console.log('store-mongodb ' + taskId);
	let data: Task | null = await client
		.db('db')
		.collection(constants.COLLECTION_TASKS)
		.findOne({ id: taskId, deleted: false }, { projection: { _id: 0 } });
	console.log(data)
	return data
}

export const asyncUpdateTask = async (task: Task): Promise<Task> => {
	const client = await MongoDatabase.connect();
	console.log('UpdateTask deleted ' + task.deleted)
	console.log('UpdateTask deleted ' + task.deleted.valueOf())
	if(
		String(task.deleted) == 'true'
	){
		task.deleted = true
	}else{
		if (String(task.deleted) == 'false') {
			task.deleted = false
		}
		throw new Error('deleted - boolean value not correct');
		
	}
	String(task.deleted)
	task.deleted = task.deleted.valueOf()
	console.log('UpdateTask deleted ' + task.deleted)
	let data = await client
		.db('db')
		.collection(constants.COLLECTION_TASKS)
		.updateOne({ id: task.id }, { $set: task })
	return task
}