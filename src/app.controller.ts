import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
    @Get('/')
    @UseGuards(AuthGuard)
    getRoot() {
        return 'Bienvenido a la ruta raíz';
    }
}