import { PartialType } from '@nestjs/swagger';
import { CreateTurnDto } from './create-turn.dto';

export class UpdateTurnDto extends PartialType(CreateTurnDto) {}
