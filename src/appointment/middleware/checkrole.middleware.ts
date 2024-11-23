import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckRoleMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const user = req.user; // Obtiene el usuario de la solicitud

        if (!user) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED); // Si no hay usuario, lanza una excepción
        }

        // Verifica el rol del usuario
        if (user === 'company') {
            // Lógica para usuarios con rol de empresa
            next(); // Permite el acceso
        } else if (user === 'user') {
            // Lógica para usuarios normales
            next(); // Permite el acceso
        } else {
            // Si el rol no es válido, lanza una excepción
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }
}