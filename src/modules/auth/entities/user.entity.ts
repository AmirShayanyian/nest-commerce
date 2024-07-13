import { EntityName } from 'src/common/enums/entity.enum';
import { Entity } from 'typeorm';

@Entity(EntityName.User)
export class UserEntity {}
