import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TurnsService } from './turns.service';
import { CreateTurnDto } from './dto/create-turn.dto';
import { UpdateTurnDto } from './dto/update-turn.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Controller('turns')
@ApiTags('turns')
export class TurnsController {
  constructor(private readonly turnsService: TurnsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/new')
  create(@Body() createTurnDto: CreateTurnDto) {
    return this.turnsService.create(createTurnDto);
  }

  @Get()
  findAll() {
    return this.turnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turnsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTurnDto: UpdateTurnDto) {
    return this.turnsService.update(+id, updateTurnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turnsService.remove(+id);
  }
}
