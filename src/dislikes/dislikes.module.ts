import { Module } from '@nestjs/common';
import { DislikesService } from './dislikes.service';
import { DislikesController } from './dislikes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dislike } from './models/dislike.model';

@Module({
  imports: [SequelizeModule.forFeature([Dislike])],
  controllers: [DislikesController],
  providers: [DislikesService]
})
export class DislikesModule {}
