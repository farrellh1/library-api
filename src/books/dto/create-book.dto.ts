import { Prisma } from '@prisma/client';
import { IsDecimal, IsNotEmpty} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  category: string;

  @IsDecimal()
  @IsNotEmpty()
  rating: Prisma.Decimal;

  @IsNotEmpty()
  synopsys: string;

  @IsNotEmpty()
  file: string;
}
