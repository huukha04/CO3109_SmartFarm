export type LoginResponse = {
	id: string,
	email: string,
	name: string | null,
	image: string | null,
	accessToken: string,
	provider?: string,
}