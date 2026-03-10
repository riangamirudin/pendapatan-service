// Untuk saat ini tidak ada kebutuhan update parsial TBP yang spesifik,
// tetapi kita biarkan DTO ini sebagai partial dari CreateTbpDto jika nanti dibutuhkan.
import { PartialType } from '@nestjs/mapped-types';
import { CreateTbpDto } from './create-tbp.dto';

export class UpdateTbpDto extends PartialType(CreateTbpDto) {}
