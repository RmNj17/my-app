// src/auth/admin.guard.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard extends JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // This should be set by JwtStrategy

    // Log user data here for debugging
    console.log('AdminGuard user:', user);

    if (!user || user.role !== 'admin') {
      throw new UnauthorizedException('Access denied. Admins only.');
    }

    return super.canActivate(context); // Ensures JwtAuthGuard still validates token
  }
}
