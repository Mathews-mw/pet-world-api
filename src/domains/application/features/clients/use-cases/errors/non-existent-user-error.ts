export class NonExistentUserError extends Error {
	constructor() {
		super('O usuário não existe');
	}
}
