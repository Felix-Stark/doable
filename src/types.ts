export type DoableUser = {
	doUserId: string;
	userName: string;
	name: string;
	surname: string;
	email: string;
	avatar_url: string;
	contacts: string[];
	darkMode: boolean;
}

export type Task = {
	todoId: string;
	title: string;
	description: string;
	created_at: string;
	updated_at: string;
	deadline: string;
	is_completed: boolean;
	completed_at: string;
}

export type Todo = {
	title: string;
	is_done: boolean;
}

export type TodoList = {
	listId: string;
	todos: Task[]
	created_by: string;
	shared_with: string;
}

export type Message = {
	messageId: string;
	senderId: string;
	recieverId: string;
	content: string;
	timestamp: string;
	// recevied: boolean;
	// read: boolean; 
}

export type ChatRoom = {
	chatRoomId: string;
	name: string;
	participants: string[] | string;
	messages: Message[];
}

