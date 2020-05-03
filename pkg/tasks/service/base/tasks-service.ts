import {
	asyncCreateTask as _asyncCreateTask,
	asyncTasksList as _asyncTasksList,
	asyncGetTask as _asyncGetTask,
	asyncUpdateTask as _asyncUpdateTask,
	asyncTasksStateList as _asyncTasksStateList
} from '../../store/mongodb'
import { Task, TasksList } from '../../../shared/types'
import * as constants from '../../../shared/constants'

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

export const asyncTasksStateList =
	async (_state: string): Promise<TasksList> => {
		if (_state != '' && _state != null && _state != undefined) {
			if (_state != constants.TASK_STATUS_DONE
				&& _state != constants.TASK_STATUS_TODO
				&& _state != constants.TASK_STATUS_DOING) {
				throw new Error('Specified state is not correct');
			}
		} else {
			throw new Error('State is not defined');
		}

		const tasksList: TasksList = await _asyncTasksStateList(_state);

		if (tasksList) {
			return tasksList
		} else {
			throw new Error('There is no List of tasks specified');
		}
	}

export const asyncGetTask =
	async (taskId: string): Promise<Task> => {

		let task: Task = await _asyncGetTask(taskId)
		if (task) {
			return task
		} else {
			throw new Error('There is no task with the specified id');
		}

	}

export const asyncUpdateTask =
	async (taskID: string, task: Task): Promise<Task> => {
		if (taskID != task.id && task.id != null && task.id != '') {
			throw new Error
			('You cannot modify the id, you are trying to update a different record');
		}

		if (String(task.deleted) == 'true') {
			task.deleted = true
		} else {
			if (String(task.deleted) == 'false') {
				task.deleted = false
			} else {
				throw new Error('deleted - Boolean value not correct');
			}
		}

		let data: Task = await _asyncUpdateTask(task)
		return data
	}