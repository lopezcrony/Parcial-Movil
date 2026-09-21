import {
	HttpException,
	InternalServerErrorException,
} from '@nestjs/common';

export function handleControllerError(error: unknown): never {
	if (error instanceof HttpException) {
		throw error;
	}

	throw new InternalServerErrorException('Ocurrió un error interno');
}