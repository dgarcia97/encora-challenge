import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { map, tap } from "rxjs";

export const isNotLoginGuard: CanActivateFn = () => {
  const router = inject(Router);
  return inject(AuthService).isLogin()
    .pipe(
      tap(isLogin => {
        if (isLogin) {
          router.navigate(['/home']);
        }
      }),
      map(response => !response)
    );
};
