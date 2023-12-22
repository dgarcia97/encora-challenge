import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { tap } from "rxjs";

export const isLoginGuard: CanActivateFn = () => {

  const router = inject(Router);
  return inject(AuthService).isLogin()
    .pipe(
      tap(isLogin => {
        if (!isLogin) {
          router.navigate(['/login']);
        }
      })
    );
};
