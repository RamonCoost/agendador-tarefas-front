import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../services/user.service';
import { PasswordFieldComponent } from "../../shared/components/password-field/password-field.component";


@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule, MatSelectModule,
    PasswordFieldComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get passwordControl(): FormControl {
    return this.form.get('senha') as FormControl;
  }

  get fullNameErros(): string | null {
    const fullNamecontrol = this.form.get('nome');
    if (fullNamecontrol?.hasError('required')) return 'O nome completo é obrigatório';
    if (fullNamecontrol?.hasError('minlength')) return 'Cadastre um nome com mais de 3 letras';
    return null
  }

  get emailErros(): string | null {
    const emailcontrol = this.form.get('email');
    if (emailcontrol?.hasError('required')) return 'O cadastro do email é orbrigatório';
    if (emailcontrol?.hasError('email')) return 'esse email é inválido';
    return null
  }

  submit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }

    const formData = this.form.value;

    this.userService.register(formData).subscribe({
      next: (response) => {
        console.log(`usuario registrado com sucesso`, response);
      },
      error: (error) => {
        console.error(`Erro ao registrar usuário`, error)
      }
    })
  }
}