import { Controller, Get, Post, Body, Param, Put, Delete,UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Adjust the path as needed
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UserController {
    constructor(private userservice: UserService) { }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userservice.findAll()
    }

    @Post()
    async createUser(
        @Body()
        user
    ): Promise<{message: string; data?:User}> {
        return this.userservice.create(user)
    }

    @Post('login')
    async login(
        @Body()
        user
    ): Promise<{message: string; data?:User; token?:string}> {
        return this.userservice.login(user)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUser(
        @Param('id')
        id: string
    ): Promise<User> {
        return this.userservice.findById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async editUser(
        @Param('id')
        id:string,
        @Body()
        user
    ): Promise<{message: string;data?:User}>{
        return this.userservice.findByIdAndUpdate(id,user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUser(
        @Param('id')
        id:string
    ): Promise<{message: string; data?:User}>{
        return this.userservice.findByIdAndDelete(id)
    }
}
