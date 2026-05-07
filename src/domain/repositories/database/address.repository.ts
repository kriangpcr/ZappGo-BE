import { Address } from '@domain/model';
import { IGenericRepository } from './abstracts/generic-repository.abstract';

export abstract class AddressRepository extends IGenericRepository<Address> {
  abstract getByUserId(userId: string): Promise<Address[]>;
}
