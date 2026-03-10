import { IsInt, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Response setelah STS berhasil dikirim (POST /pendapatan/sts).
 */
export class StsResponseDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  id_sts: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  no_sts: string;

  @ApiProperty({ example: 'dikirim' })
  @IsString()
  @IsNotEmpty()
  status: string;
}
