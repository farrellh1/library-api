import { IsOptional } from 'class-validator';

export class QueryBookDto {
  @IsOptional()
  search: string;

  @IsOptional()
  page: number;
}
