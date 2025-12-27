import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import {FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'input-password-field',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './password-field.component.html',
  styleUrl: './password-field.component.scss'
})
export class PasswordFieldComponent {
  hide = signal(true);

  @Input({required: true}) control!: FormControl //non-null assertion operator - Essa propriedade vai vir em tempo de execução

    get passwordErros(): string | null {
    const passwordcontrol = this.control;
    if (passwordcontrol?.hasError('required')) return 'O cadastro da senha é obrigatória';
    if (passwordcontrol?.hasError('minlength')) return 'Cadastre uma senha com no mínimo 6 dígitos'; 
    return null
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
