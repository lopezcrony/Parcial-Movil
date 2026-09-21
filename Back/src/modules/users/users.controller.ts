import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../../common/guards/admin.guard';
import { handleControllerError } from '../../common/errors/handle-controller-error';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ActivateUserDto } from './dto/activate-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('pending')
	@UseGuards(JwtAuthGuard, AdminGuard)
	async findPending() {
		try {
			const users = await this.usersService.findPending();
			return users.map((user) => new UserResponseDto(user));
		} catch (error) {
			return handleControllerError(error);
		}
	}

	@Get('clients')
	@UseGuards(JwtAuthGuard, AdminGuard)
	async findClients() {
		try {
			const clients = await this.usersService.findClients();
			return clients.map((user) => new UserResponseDto(user));
		} catch (error) {
			return handleControllerError(error);
		}
	}

	@Get('profile')
	@UseGuards(JwtAuthGuard)
	async findProfile(@Req() request: any) {
		try {
			return new UserResponseDto(
				await this.usersService.findProfile(request.user.sub),
			);
		} catch (error) {
			return handleControllerError(error);
		}
	}

	@Patch(':id/activate')
	@UseGuards(JwtAuthGuard, AdminGuard)
	async activate(
		@Param('id', ParseIntPipe) id: number,
		@Body() data: ActivateUserDto,
	) {
		try {
			return new UserResponseDto(await this.usersService.activate(id, data));
		} catch (error) {
			return handleControllerError(error);
		}
	}

	@Patch('profile')
	@UseGuards(JwtAuthGuard)
	async completeProfile(
		@Req() request: any,
		@Body() data: UpdateUserProfileDto,
	) {
		try {
			return new UserResponseDto(
				await this.usersService.updateProfile(request.user.sub, data),
			);
		} catch (error) {
			return handleControllerError(error);
		}
	}
}
