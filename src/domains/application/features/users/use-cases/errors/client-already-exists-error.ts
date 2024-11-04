export class ClientAlreadyExistsError extends Error {
	constructor(email: string) {
		super(`O e-mail "${email}" já está cadastrado.`);
	}
}
