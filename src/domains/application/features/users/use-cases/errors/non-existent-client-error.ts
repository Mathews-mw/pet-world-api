export class NonExistentClientError extends Error {
	constructor() {
		super('O cliente não existe');
	}
}
