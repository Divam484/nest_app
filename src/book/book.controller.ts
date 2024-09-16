import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Adjust the path as needed
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { createBookDto } from './dto/create-book.dto';

@Controller('books')
export class BookController {
    constructor(private bookservice: BookService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllBooks(): Promise<Book[]> {
        return this.bookservice.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createBook(
        @Body()
        book: createBookDto
    ): Promise<{message: string; data?:Book}> {
        return this.bookservice.create(book)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getBook(
        @Param('id')
        id: string
    ): Promise<Book> {
        return this.bookservice.findById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async editBook(
        @Param('id')
        id:string,
        @Body()
        book
    ): Promise<{message: string;data?:Book}>{
        return this.bookservice.findByIdAndUpdate(id,book)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteBook(
        @Param('id')
        id:string
    ): Promise<{message: string; data?:Book}>{
        return this.bookservice.findByIdAndDelete(id)
    }
}
