import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../../config/environment-config.module';
import { SupabaseService } from './supabase.service';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
