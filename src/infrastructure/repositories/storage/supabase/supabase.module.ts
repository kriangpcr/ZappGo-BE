import { Module } from '@nestjs/common';
import { SupabaseStorageService } from './supabase.service';
import { SupabaseModule } from '@infrastructure/services/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [SupabaseStorageService],
  exports: [SupabaseStorageService],
})
export class SupabaseStorageModule {}
