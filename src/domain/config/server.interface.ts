export interface ServerConfig {
  getPort(): number;
  getPrefix(): string;
  getSupabaseUrl(): string;
  getSupabaseKey(): string;
}
