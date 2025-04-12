import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, User } from '../../../generated/prisma'; // Adjust path as needed

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaClient, // Inject Prisma if needed to validate user exists/is active
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not set in environment variables');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: { sub: number; email: string }): Promise<Omit<User, 'password'> | null> {
    // Payload contains { sub: userId, email: userEmail, ... } from AuthService.login
    // You might want to fetch the user from DB here to ensure they still exist / are active
    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      throw new UnauthorizedException('User not found or invalid token');
    }
    // TODO: Add checks like user.isActive?
    const { password, ...result } = user;
    return result; // This will be attached to req.user on protected routes
  }
} 