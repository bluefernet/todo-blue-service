import {asyncCreateTask as _asyncCreateTask} from '../../store/mongodb'
import { Task } from '../../../shared/types'

export const asyncCreateTask = async(task: Task): Promise<Task> => {
	if (task){
		let resultTask = await _asyncCreateTask(task)
		return resultTask
	}else{
		throw new Error('Task Object is not defined correctly');
        
	}
}

