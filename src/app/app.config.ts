import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../environment/environment';
import { routes } from './app.routes';
import { getAppConfigProvider } from './shared/app-config/app-config.token';
import { authInterceptor } from './shared/utils/interceptors/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    getAppConfigProvider(environment),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    // importProvidersFrom(ToastrModule.forRoot()),
    provideToastr(),
  ],
};
