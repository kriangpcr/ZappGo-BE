import { Image } from '@domain/model';
import { IGenericRepository } from './abstracts/generic-repository.abstract';

export abstract class ImageRepository extends IGenericRepository<Image> {}
