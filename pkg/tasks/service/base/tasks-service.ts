import {
	asyncCreateTask as _asyncCreateTask,
	asyncTasksList as _asyncTasksList,
	asyncGetTask as _asyncGetTask,
	asyncUpdateTask as _asyncUpdateTask
} from '../../store/mongodb'
import { Task, TasksList } from '../../../shared/types'

export const asyncCreateTask = async (task: Task): Promise<Task> => {
	if (task) {
		let resultTask = await _asyncCreateTask(task)
		return resultTask
	} else {
		throw new Error('Task Object is not defined correctly');
	}
}

export const asyncTasksList = async (): Promise<TasksList> => {
	const tasksList: TasksList = await _asyncTasksList();
	if (tasksList) {
		return tasksList
	} else {
		throw new Error('There is no List of tasks specified');
	}
}

export const asyncGetTask =
	async (taskId: string): Promise<Task | undefined> => {
		let task: Task | null = await _asyncGetTask(taskId)
		if (task) {
			return task
		} else {
			throw new Error('There is no task with the specified id');
		}
	}

export const asyncUpdateTask = async (task: Task): Promise<Task> => {
	let data: Task = await _asyncUpdateTask(task)
	return data
}