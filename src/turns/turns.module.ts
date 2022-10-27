import { Module } from '@nestjs/common';
import { TurnsService } from './turns.service';
import { TurnsController } from './turns.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Turn, TurnSchema } from './schema/turns.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
    {
      name: Turn.name,
      schema: TurnSchema
    }
  ])
],
  controllers: [TurnsController],
  providers: [TurnsService]
})
export class TurnsModule {}
