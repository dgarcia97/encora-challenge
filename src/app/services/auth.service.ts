import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private email = 'test@test.com';
  private password = '123';
  private isLogin$ : BehaviorSubject<boolean>;

  constructor() {
    const isLoginLS = localStorage.getItem('isLogin');
    this.isLogin$ = new BehaviorSubject<boolean>(!!isLoginLS);
  }

  isLogin(): Observable<boolean> {
    return this.isLogin$;
  }

  doLogin(): void {
    this.isLogin$.next(true);
    localStorage.setItem('isLogin', '1');
  }

  doLogOut(): void {
    this.isLogin$.next(false);
    localStorage.removeItem('isLogin');
  }

  doAuth(email: string, password: string): boolean {
    if (email === this.email && password === this.password) {
      this.doLogin();
      return true;
    } else {
      return false;
    }
  }
}
