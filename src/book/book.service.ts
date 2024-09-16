import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookmodel: mongoose.Model<Book>
    ) { }

    async findAll(): Promise<Book[]> {
        const books = await this.bookmodel.find()
        return books
    }

    async create(book:Book): Promise<{message: string; data?:Book}> {
        const res = await this.bookmodel.create(book)
        return { message: 'Book created successfully',data:res }
    }

    async findById(id:string): Promise<Book> {
        const book = await this.bookmodel.findById(id)

        if(!book){
            throw new NotFoundException('Book is not available.')
        }
        return book
    }

    async findByIdAndUpdate(id:string,book:Book): Promise<{message: string; data?:Book}> {
        const res = await this.bookmodel.findByIdAndUpdate(id,book,{new:true})

        if(!res){
            throw new NotFoundException('Book is not available.')
        }
        return { message: 'Book updated successfully',data:res }
    }

    async findByIdAndDelete(id:string): Promise<{message: string; data?:Book}> {
        const res = await this.bookmodel.findByIdAndDelete(id)

        if(!res){
            throw new NotFoundException('Book is not available.')
        }
        return { message: 'Book deleted successfully'};
    }
}
