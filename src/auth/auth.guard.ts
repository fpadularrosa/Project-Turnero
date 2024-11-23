import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        if (!request.user && request.url === '/') {
            // Redirige a /login si no está logueado y está en la ruta /
            request.res.redirect('/login');
            return false; // Evita el acceso a la ruta raíz
        }
        return true; // Permite el acceso si está logueado o a otras rutas
    }
}