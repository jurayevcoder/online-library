import { Module } from '@nestjs/common';
import { DislikesService } from './dislikes.service';
import { DislikesController } from './dislikes.controller';

@Module({
  controllers: [DislikesController],
  providers: [DislikesService]
})
export class DislikesModule {}
