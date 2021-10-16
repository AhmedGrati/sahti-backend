import { UrlGeneratorModuleOptions } from 'nestjs-url-generator';

export function urlGeneratorModuleConfig(): UrlGeneratorModuleOptions {
  return {
    appUrl: process.env.APP_URL,
  };
}
