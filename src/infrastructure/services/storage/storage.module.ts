import { Module } from '@nestjs/common';
import { SupabaseStorageModule } from './supabase.module';

@Module({
  imports: [SupabaseStorageModule],
  exports: [SupabaseStorageModule],
})
export class StorageModule {}
