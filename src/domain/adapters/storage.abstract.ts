export abstract class IStorageService {
  abstract makeBucket(bucket_name: string): Promise<void>;
  abstract listBuckets(): Promise<
    {
      name: string;
      creationDate: Date;
    }[]
  >;
  abstract bucketExists(bucket_name: string): Promise<boolean>;
  abstract removeBucket(bucket_name: string): Promise<any>;
  abstract listObjects(bucket_name: string): Promise<void>;

  abstract getObject(bucket_name: string, object_name: string): Promise<any>;
  abstract putObject(
    bucket_name: string,
    object_name: string,
    object: Buffer,
    options?: any,
  ): Promise<any>;
  abstract removeObject(bucket_name: string, object_name: string): Promise<any>;
  abstract getPublicUrl(
    bucket_name: string,
    object_name: string,
  ): Promise<string>;
}
