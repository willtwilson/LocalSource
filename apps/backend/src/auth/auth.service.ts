import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaClient, User } from '../../generated/prisma';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaClient,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<Omit<User, 'password'>> {
    const { email, password, name } = registerUserDto;

    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      // Create user
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name, // Optional based on DTO
        },
      });

      // Don't return the password hash
      const { password: _, ...result } = user;
      return result;

    } catch (error) {
      // Handle potential Prisma errors (e.g., unique constraint violation if check somehow failed)
      console.error("Error during user registration:", error);
      throw new InternalServerErrorException('Could not register user');
    }

    // TODO: Implement email verification logic (send email with token)
  }

  // --- Validation (for LocalStrategy) ---
  async validateUser(email: string, pass: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user && await bcrypt.compare(pass, user.password)) {
      // TODO: Check if email is verified if implementing verification
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // --- Login --- 
  async login(user: Omit<User, 'password'>) {
    // `user` object comes from validateUser/LocalStrategy successful validation
    const payload = { email: user.email, sub: user.id, name: user.name }; // Customize payload as needed
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // TODO: Add validateUser method (for Passport strategy)
}
