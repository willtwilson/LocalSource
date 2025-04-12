import { Module, Global } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';

@Global() // Optional: Make PrismaClient available globally
@Module({
  providers: [
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
  ],
  exports: [PrismaClient],
})
export class PrismaModule {} 