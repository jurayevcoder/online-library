import { PartialType } from '@nestjs/swagger';
import { RegisterSuperadminDto } from './register-superadmin.dto';

export class UpdateSuperadminDto extends PartialType(RegisterSuperadminDto) {}
