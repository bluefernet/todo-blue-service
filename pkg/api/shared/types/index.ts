interface Task {
	id: String,
	title: String,
	stauts: String,
	date: String
}

interface TasksList {
	tasks: Task,
	nextpageToken: String,
	totalSize: Number
}