import { PartialType } from '@nestjs/swagger';
import { CreateStatisticaDto } from './create-statistica.dto';

export class UpdateStatisticaDto extends PartialType(CreateStatisticaDto) {}
