import { IUUIDService } from '@domain/adapters/uuid.interface';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UUIDService implements IUUIDService {
  generate_uuidv4(): string {
    return uuidv4();
  }
}
