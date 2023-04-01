import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('app')
export class AppController { constructor() {} };
