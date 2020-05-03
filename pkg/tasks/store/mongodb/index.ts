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

	if (result.result.ok != 1) {
		throw new Error('Insert operation failed');
	}

	return task;
}

export const asyncTasksList = async (): Promise<TasksList> => {
	const client = await MongoDatabase.connect();
	const tasks = await client
		.db('db')
		.collection(constants.COLLECTION_TASKS)
		.find({ deleted: false }, { projection: { _id: 0 } })
		.sort({ date: 1 }) //Decrescente
		.toArray();
	//TODO- LIMIT/SKIP --> PAGINAZIONE
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
			.sort({ date: 1 }) //Crescente
			.toArray();

		if (!tasks) {
			throw new Error('No Tasks found for the specified state');
		}

		const tasksList: TasksList = {
			tasks: tasks,
			nextpageToken: '',
			totalSize: tasks.length
		}
		return tasksList
	}

export const asyncGetTask = async (taskId: string): Promise<Task> => {
	const client = await MongoDatabase.connect();

	let data = await client
		.db('db')
		.collection(constants.COLLECTION_TASKS)
		.findOne({ id: taskId, deleted: false }, { projection: { _id: 0 } });

	return data
}

export const asyncUpdateTask = async (task: Task): Promise<Task> => {
	const client = await MongoDatabase.connect();

	let result = await client
		.db('db')
		.collection(constants.COLLECTION_TASKS)
		.updateOne({ id: task.id }, { $set: task })

	if (result.result.ok != 1) {
		throw new Error('Update operation failed');
	}

	return task
}