import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserLoginPayload, UserService } from '../../services/user.service';
import { PasswordFieldComponent } from "../../shared/components/password-field/password-field.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule, MatSelectModule,
    PasswordFieldComponent,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  form: FormGroup<{ email: FormControl<string>, senha: FormControl<string> }>;
  isloading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      senha: this.formBuilder.control('', { validators: [Validators.required, Validators.minLength(6)], nonNullable: true })
    });
  }

  get passwordControl(): FormControl {
    return this.form.get('senha') as FormControl;
  }

  get emailErros(): string | null {
    const emailcontrol = this.form.get('email');
    if (emailcontrol?.hasError('required')) return 'A informação do email é orbrigatório';
    if (emailcontrol?.hasError('email')) return 'esse email é inválido';
    return null
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }

    const formData = this.form.value as UserLoginPayload;

    this.isloading = true;

    this.userService.login(formData)
      .pipe(finalize(() => this.isloading = false))
      .subscribe({
        next: (response) => {
          this.authService.saveToken(response)
          this.router.navigate(['/'])
        },
        error: (error) => {
          console.error(`Erro ao entrar`, error)
        }
      })
  }
}
