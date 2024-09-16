import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private usermodel: mongoose.Model<User>
    ) { }

    async findAll(): Promise<User[]> {
        const users = await this.usermodel.find()
        return users
    }

    async create(user: User): Promise<{ message: string; data?: User; token?: string }> {
        const hashPassword = await bcrypt.hash(user.password, 10);
        const userData = {
             email: user.email, 
             password: hashPassword,
             profile:user.profile,
             isAdmin : user.isAdmin ? true : false
            }
        const res = await this.usermodel.create(userData)
        return { message: 'User created successfully', data: res }
    }

    async login(user: User): Promise<{ message: string; data?: User; token?: string }> {
        const res = await this.usermodel.findOne({ email: user.email });
        if (!res) throw new NotFoundException('User not found');

        const isPasswordValid = await bcrypt.compare(user.password, res.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        // Generate JWT token
        const token = jwt.sign(
            { id: res._id, email: res.email },
            process.env.JWT_SECRET,
            { expiresIn: '23h' }
        );
        res.password = undefined;
        return {
            message: 'User login successfully',
            data: res,
            token: token
        };
    }

    async findById(id: string): Promise<User> {
        const user = await this.usermodel.findById(id)

        if (!user) {
            throw new NotFoundException('User is not available.')
        }
        return user
    }

    async findByIdAndUpdate(id: string, user: User): Promise<{ message: string; data?: User }> {
        const res = await this.usermodel.findByIdAndUpdate(id, user, { new: true })

        if (!res) {
            throw new NotFoundException('User is not available.')
        }
        return { message: 'User updated successfully', data: res }
    }

    async findByIdAndDelete(id: string): Promise<{ message: string; data?: User }> {
        const res = await this.usermodel.findByIdAndDelete(id)

        if (!res) {
            throw new NotFoundException('User is not available.')
        }
        return { message: 'User deleted successfully' };
    }
}
