import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { AuthService } from "../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }
  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(): void {
    const successfulAuth = this.authService.doAuth(this.loginForm.value.email, this.loginForm.value.password);

    if (successfulAuth) {
      this.router.navigate(['/home']);
    } else {
      this.snackBar.open('Wrong credentials!', '', {
        duration: 2000,
        panelClass: ['red-snackbar']
      })
    }
  }

  private createForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl<string>('test@test.com', [Validators.required, Validators.email]),
      password: new FormControl<string>('123', Validators.required)
    });
  }

}
