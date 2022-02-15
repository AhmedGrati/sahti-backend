export interface AuthTokenStrategy {
  getSecret(): string;
  getExpirationTime(): string;
}
