import { Injectable } from '@nestjs/common';
import { SupabaseService } from '@infrastructure/services/supabase/supabase.service';
import { IStorageService } from '@domain/adapters/storage.abstract';

@Injectable()
export class SupabaseStorageService implements IStorageService {
  constructor(private readonly supabaseClient: SupabaseService) {}
  async makeBucket(bucket_name: string): Promise<void> {
    await this.supabaseClient.getClient().storage.createBucket(bucket_name);
  }
  async listBuckets(): Promise<{ name: string; creationDate: Date }[]> {
    const response = await this.supabaseClient
      .getClient()
      .storage.listBuckets();
    return response.data.map((bucket) => ({
      name: bucket.name,
      creationDate: new Date(bucket.created_at),
    }));
  }
  async bucketExists(bucket_name: string): Promise<boolean> {
    const response = await this.supabaseClient
      .getClient()
      .storage.getBucket(bucket_name);
    if (response.error) {
      return false;
    }
    return true;
  }
  removeBucket(bucket_name: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  listObjects(bucket_name: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async getObject(bucket_name: string, object_name: string): Promise<Buffer> {
    const response = await this.supabaseClient
      .getClient()
      .storage.from(bucket_name)
      .download(object_name);
    if (response.error) {
      throw response.error;
    }
    const arrayBuffer = await response.data.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }
  async putObject(
    bucket_name: string,
    object_name: string,
    object: Buffer,
    options?: { contentType?: string },
  ): Promise<any> {
    return this.supabaseClient
      .getClient()
      .storage.from(bucket_name)
      .upload(object_name, object, {
        upsert: true,
        ...options,
      });
  }

  async removeObject(bucket_name: string, object_name: string): Promise<any> {
    return this.supabaseClient
      .getClient()
      .storage.from(bucket_name)
      .remove([object_name]);
  }

  async getPublicUrl(
    bucket_name: string,
    object_name: string,
  ): Promise<string> {
    const { data } = this.supabaseClient
      .getClient()
      .storage.from(bucket_name)
      .getPublicUrl(object_name);

    return data.publicUrl;
  }
}
