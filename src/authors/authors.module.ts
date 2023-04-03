import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from './models/author.model';

@Module({
  imports: [SequelizeModule.forFeature([Author])],
  controllers: [AuthorsController],
  providers: [AuthorsService]
})
export class AuthorsModule {}
