import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTurnDto } from './dto/create-turn.dto';
import { UpdateTurnDto } from './dto/update-turn.dto';
import { Turn, TurnDocument } from './schema/turns.schema';
import { Model } from 'mongoose';

@Injectable()
export class TurnsService {
  constructor(@InjectModel(Turn.name) private turnsModule: Model<TurnDocument>){}

  async create(createTurnDto: CreateTurnDto) {
    const newTurn = await this.turnsModule.create(createTurnDto);
    return newTurn;
  }

  findAll() {
    return `This action returns all turns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} turn`;
  }

  update(id: number, updateTurnDto: UpdateTurnDto) {
    return `This action updates a #${id} turn`;
  }

  remove(id: number) {
    return `This action removes a #${id} turn`;
  }
}
