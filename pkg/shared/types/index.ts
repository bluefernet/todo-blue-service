export interface Task {
	id: String;
	title: String;
	stauts: String;
	date: String;
	deleted: boolean
}

export interface TasksList {
	tasks: Task[],
	nextpageToken: String, //TODO --> PAGINAZIONE
	totalSize: Number
}

export default app;