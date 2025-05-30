interface IEvent {
	id?: number,
	title: string,
	description: string,
	date: Date,
	time: string,
	status: "regular" | "important" | "urgent",
	user_id?: number,
	created_at?: Date,
	updated_at?: Date
}

export type {
	IEvent
}

