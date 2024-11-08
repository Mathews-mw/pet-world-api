import 'reflect-metadata';

import fastify from 'fastify';
import { ZodError } from 'zod';
import cors from '@fastify/cors';

import { env } from '@/env';

export const app = fastify();

app.register(cors, {
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
});

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: 'Erro de validação ao preencher os campos.', violacoes: error.issues });
	}

	if (env.NODE_ENV !== 'production') {
		console.log('handler error:', error);
	}

	return reply.status(500).send({ message: 'Internal server error.' });
});
