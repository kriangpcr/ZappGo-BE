import { Module } from '@nestjs/common';
import { SupabaseModule } from '@infrastructure/services/supabase/supabase.module';
import { SupabaseStorageService } from './supabase.service';

@Module({
  imports: [SupabaseModule],
  providers: [SupabaseStorageService],
  exports: [SupabaseStorageService],
})
export class SupabaseStorageModule {}
