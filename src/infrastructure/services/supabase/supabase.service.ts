import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { EnvironmentConfigService } from '../../config/environment-config.service';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private readonly configService: EnvironmentConfigService) {
    this.supabase = createClient(
      this.configService.getSupabaseUrl(),
      this.configService.getSupabaseKey(),
    );
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
