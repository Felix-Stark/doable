export type DoableUser = {
	doUserId: string;
	username: string;
	email: string;
	avatar_url: string;
	darkMode: boolean;
}

export type Task = {
	taskId: string;
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
	in_list: string; //listTitle
	is_done: boolean;
	timestamp: string;
}

export type TodoList = {
	title: string;
	collaborator: string;
	created_by: string;
	timestamp: string;
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

