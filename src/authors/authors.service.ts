import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './models/author.model';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author) private authorRepo: typeof Author) {}

    async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
        const author = await this.authorRepo.create(createAuthorDto);
        return author;
    }

    async getAllAuthor(){
        const authories = await this.authorRepo.findAll({include: {all: true}});
        return authories;
    }

    async getOneAuthor(id: number): Promise<Author>{
        const author = await this.authorRepo.findByPk(id);
        return author;
    }

    async delOneAuthor(id: number){
        return this.authorRepo.destroy({where: {id}});
    }

    async updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto){
        const author = await this.authorRepo.update(updateAuthorDto,{
            where: {id},
        })
    }
}
